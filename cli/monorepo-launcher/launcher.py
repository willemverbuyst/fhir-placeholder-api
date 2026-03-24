#!/usr/bin/env python3
"""Interactive monorepo launcher for apps/services.

Supports running mixed targets:
- pnpm app dev scripts
- arbitrary shell commands
- executables
"""

from __future__ import annotations

import argparse
import errno
import importlib
import importlib.util
import json
import os
import shutil
import signal
import subprocess
import sys
import threading
import time
from dataclasses import dataclass
from pathlib import Path
from typing import Dict, List, Optional, Sequence, Tuple


@dataclass(frozen=True)
class Target:
    id: str
    name: str
    kind: str
    cwd: Path
    command: str
    args: Tuple[str, ...]
    env: Dict[str, str]
    shell: bool


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Launch selected monorepo targets.")
    parser.add_argument(
        "--manifest",
        default="cli/monorepo-launcher/targets.json",
        help="Path to launcher manifest JSON (default: cli/monorepo-launcher/targets.json)",
    )
    return parser.parse_args()


def read_manifest(repo_root: Path, manifest_path: str) -> List[Target]:
    full_manifest_path = (repo_root / manifest_path).resolve()
    if not full_manifest_path.exists():
        raise FileNotFoundError(
            f"Manifest file not found: {full_manifest_path}. "
            "Copy cli/monorepo-launcher/targets.example.json to targets.json first."
        )

    with full_manifest_path.open("r", encoding="utf-8") as file:
        raw_manifest = json.load(file)

    if not isinstance(raw_manifest, dict) or not isinstance(
        raw_manifest.get("targets"), list
    ):
        raise ValueError("Manifest must be an object with a 'targets' array.")

    parsed_targets: List[Target] = []
    seen_ids: set[str] = set()

    for item in raw_manifest["targets"]:
        target = parse_target(item=item, repo_root=repo_root)
        if target.id in seen_ids:
            raise ValueError(f"Duplicate target id found: {target.id}")
        seen_ids.add(target.id)
        parsed_targets.append(target)

    if not parsed_targets:
        raise ValueError("Manifest has no targets. Add at least one target entry.")

    return parsed_targets


def parse_target(item: object, repo_root: Path) -> Target:
    if not isinstance(item, dict):
        raise ValueError("Each target must be an object.")

    required_text_fields = ("id", "name", "kind", "cwd", "command")
    for field in required_text_fields:
        value = item.get(field)
        if not isinstance(value, str) or not value.strip():
            raise ValueError(f"Target '{field}' must be a non-empty string.")

    args_raw = item.get("args", [])
    if not isinstance(args_raw, list) or any(not isinstance(arg, str) for arg in args_raw):
        raise ValueError("Target 'args' must be an array of strings when provided.")

    env_raw = item.get("env", {})
    if not isinstance(env_raw, dict) or any(
        not isinstance(key, str) or not isinstance(value, str)
        for key, value in env_raw.items()
    ):
        raise ValueError("Target 'env' must be an object with string keys/values.")

    shell_raw = item.get("shell", False)
    if not isinstance(shell_raw, bool):
        raise ValueError("Target 'shell' must be a boolean when provided.")

    cwd = (repo_root / item["cwd"]).resolve()
    return Target(
        id=item["id"],
        name=item["name"],
        kind=item["kind"],
        cwd=cwd,
        command=item["command"],
        args=tuple(args_raw),
        env=env_raw,
        shell=shell_raw,
    )


def choose_targets(targets: Sequence[Target]) -> List[Target]:
    selected_by_questionary = choose_targets_questionary(targets)
    if selected_by_questionary is not None:
        return selected_by_questionary

    print("Select targets to run (comma-separated indexes).")
    for index, target in enumerate(targets, start=1):
        print(f"  [{index}] {target.name} ({target.id})")

    while True:
        try:
            raw = input("Selection (e.g. 1,3,4): ").strip()
        except KeyboardInterrupt:
            print("\nSelection cancelled.")
            return []
        if not raw:
            print("Choose at least one target.")
            continue

        try:
            indexes = parse_index_selection(raw=raw, max_index=len(targets))
        except ValueError as exc:
            print(str(exc))
            continue

        return [targets[index - 1] for index in indexes]


def choose_targets_questionary(targets: Sequence[Target]) -> Optional[List[Target]]:
    if importlib.util.find_spec("questionary") is None:
        return None
    questionary = importlib.import_module("questionary")

    choices = [
        questionary.Choice(title=f"{target.name} ({target.id})", value=target.id)
        for target in targets
    ]
    try:
        selected_ids = questionary.checkbox(
            "Select targets to run:",
            choices=choices,
        ).ask()
    except KeyboardInterrupt:
        print("\nSelection cancelled.")
        return []
    if selected_ids is None:
        return []

    selected_id_set = set(selected_ids)
    return [target for target in targets if target.id in selected_id_set]


def parse_index_selection(raw: str, max_index: int) -> List[int]:
    unique_indexes: set[int] = set()
    for token in raw.split(","):
        stripped = token.strip()
        if not stripped.isdigit():
            raise ValueError(f"Invalid index: '{stripped}'. Use numbers only.")
        index = int(stripped)
        if index < 1 or index > max_index:
            raise ValueError(f"Index out of range: {index}. Valid range is 1-{max_index}.")
        unique_indexes.add(index)

    if not unique_indexes:
        raise ValueError("No valid targets selected.")

    return sorted(unique_indexes)


def validate_targets(targets: Sequence[Target]) -> None:
    for target in targets:
        if not target.cwd.exists() or not target.cwd.is_dir():
            raise ValueError(f"[{target.id}] cwd does not exist or is not a directory: {target.cwd}")

        if target.shell:
            continue

        if os.path.sep in target.command or (os.path.altsep and os.path.altsep in target.command):
            command_path = (target.cwd / target.command).resolve()
            if not command_path.exists():
                raise ValueError(f"[{target.id}] command path not found: {command_path}")
            continue

        resolved = shutil.which(target.command)
        if resolved is None:
            raise ValueError(f"[{target.id}] command not found in PATH: {target.command}")


def start_target(target: Target) -> subprocess.Popen[str]:
    env = os.environ.copy()
    env.update(target.env)

    if target.shell:
        command = " ".join([target.command, *target.args]).strip()
        return subprocess.Popen(
            command,
            cwd=str(target.cwd),
            env=env,
            shell=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            bufsize=1,
            preexec_fn=os.setsid,
        )

    return subprocess.Popen(
        [target.command, *target.args],
        cwd=str(target.cwd),
        env=env,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
        bufsize=1,
        preexec_fn=os.setsid,
    )


def stream_output(
    process: subprocess.Popen[str],
    target_name: str,
    stream_name: str,
    stream: Optional[object],
) -> None:
    if stream is None:
        return

    try:
        for line in iter(stream.readline, ""):
            print(f"[{target_name}:{stream_name}] {line.rstrip()}")
    except (OSError, ValueError):
        # Streams can be closed while tearing down after Ctrl+C.
        return
    finally:
        try:
            stream.close()
        except (OSError, ValueError):
            pass


def stop_process(process: subprocess.Popen[str], target_name: str) -> None:
    if process.poll() is not None:
        return

    try:
        os.killpg(os.getpgid(process.pid), signal.SIGTERM)
    except ProcessLookupError:
        return
    except OSError as exc:
        if exc.errno == errno.ESRCH:
            return
        print(f"[{target_name}] failed to terminate process group: {exc}", file=sys.stderr)


def kill_process(process: subprocess.Popen[str], target_name: str) -> None:
    if process.poll() is not None:
        return

    try:
        os.killpg(os.getpgid(process.pid), signal.SIGKILL)
    except ProcessLookupError:
        return
    except OSError as exc:
        if exc.errno == errno.ESRCH:
            return
        print(f"[{target_name}] failed to kill process group: {exc}", file=sys.stderr)


def run_targets(targets: Sequence[Target]) -> int:
    processes: List[Tuple[Target, subprocess.Popen[str]]] = []
    threads: List[threading.Thread] = []

    for target in targets:
        process = start_target(target)
        processes.append((target, process))
        print(f"Started {target.name} with pid {process.pid}")

        stdout_thread = threading.Thread(
            target=stream_output,
            args=(process, target.name, "stdout", process.stdout),
            daemon=True,
        )
        stderr_thread = threading.Thread(
            target=stream_output,
            args=(process, target.name, "stderr", process.stderr),
            daemon=True,
        )
        stdout_thread.start()
        stderr_thread.start()
        threads.extend([stdout_thread, stderr_thread])

    try:
        while True:
            exit_codes = [(target, proc.poll()) for target, proc in processes]
            running_count = sum(1 for _, code in exit_codes if code is None)

            failed = [(target, code) for target, code in exit_codes if code not in (None, 0)]
            if failed:
                failed_target, failed_code = failed[0]
                print(
                    f"{failed_target.name} exited with code {failed_code}. Stopping all targets.",
                    file=sys.stderr,
                )
                for target, proc in processes:
                    stop_process(proc, target.name)
                return int(failed_code) if failed_code is not None else 1

            if running_count == 0:
                return 0

            time.sleep(0.2)
    except KeyboardInterrupt:
        print("\nReceived Ctrl+C, stopping all targets...")
        for target, proc in processes:
            stop_process(proc, target.name)
        return 130
    finally:
        deadline = time.time() + 8
        for _, proc in processes:
            remaining = deadline - time.time()
            if remaining <= 0:
                break
            try:
                proc.wait(timeout=remaining)
            except subprocess.TimeoutExpired:
                pass

        for target, proc in processes:
            if proc.poll() is None:
                kill_process(proc, target.name)
        for thread in threads:
            thread.join(timeout=1)

    return 0


def main() -> int:
    args = parse_args()
    repo_root = Path(__file__).resolve().parents[2]

    try:
        targets = read_manifest(repo_root=repo_root, manifest_path=args.manifest)
        selected_targets = choose_targets(targets)
        if not selected_targets:
            print("No targets selected. Exiting.")
            return 0

        validate_targets(selected_targets)
        return run_targets(selected_targets)
    except KeyboardInterrupt:
        print("\nInterrupted. Exiting.")
        return 130
    except (FileNotFoundError, ValueError, json.JSONDecodeError) as exc:
        print(f"Error: {exc}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
