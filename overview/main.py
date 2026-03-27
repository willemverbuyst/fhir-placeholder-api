from datetime import datetime
from pathlib import Path
import json
import os
import re


FALLBACK_DESCRIPTION = "No description in README.md."
WHAT_IS_THIS_HEADER = "## What is this?"
MARKDOWN_HEADER_PATTERN = re.compile(r"^\s*#{1,6}\s+")
MARKDOWN_LINK_PATTERN = re.compile(r"\[([^\]]+)\]\([^)]+\)")
REPO_DEPENDENCY_PREFIX = "@repo/"


def _extract_what_is_this_description(readme_path: Path) -> str:
  if not readme_path.exists():
    return FALLBACK_DESCRIPTION

  content = readme_path.read_text(encoding="utf-8")
  lines = content.splitlines()

  try:
    header_index = lines.index(WHAT_IS_THIS_HEADER)
  except ValueError:
    return FALLBACK_DESCRIPTION

  section_lines: list[str] = []
  for line in lines[header_index + 1 :]:
    if MARKDOWN_HEADER_PATTERN.match(line):
      break
    section_lines.append(line)

  description = "\n".join(section_lines).strip()
  if not description:
    return FALLBACK_DESCRIPTION

  # Keep only visible link text from Markdown links.
  return MARKDOWN_LINK_PATTERN.sub(r"\1", description)


def get_child_directory_descriptions(directory_path: Path) -> dict[str, str]:
  child_directories = sorted(
    child for child in directory_path.iterdir() if child.is_dir()
  )
  return {
    child.name: _extract_what_is_this_description(child / "README.md")
    for child in child_directories
  }


def _extract_internal_package_dependencies(item_directory_path: Path) -> list[str]:
  package_json_path = item_directory_path / "package.json"
  if not package_json_path.exists():
    return []

  package_data = json.loads(package_json_path.read_text(encoding="utf-8"))
  dependencies = package_data.get("dependencies", {})
  if not isinstance(dependencies, dict):
    return []

  internal_dependency_names = [
    dependency_name.removeprefix(REPO_DEPENDENCY_PREFIX)
    for dependency_name in dependencies
    if dependency_name.startswith(REPO_DEPENDENCY_PREFIX)
  ]
  return sorted(internal_dependency_names)


def main() -> None:
  default_output_path = Path(__file__).resolve().parent / "overview.json"
  output_path = Path(os.getenv("OVERVIEW_OUTPUT_PATH", default_output_path))
  project_root = Path(__file__).resolve().parent.parent
  sections = ["apps", "cli", "packages", "services"]
  overview_data = {
    "title": "Overview of the Monorepo",
    "about": _extract_what_is_this_description(Path(__file__).resolve().parent / "README.md"),
    "sections": {},
    "dependencies": {},
    "created_at": datetime.now().isoformat()
  }
  
  for section in sections:
    section_path = project_root / section
    overview_data["sections"][section] = get_child_directory_descriptions(section_path)
    overview_data["dependencies"][section] = {}

    for item_name in overview_data["sections"][section]:
      item_path = section_path / item_name
      internal_dependencies = _extract_internal_package_dependencies(item_path)
      if internal_dependencies:
        overview_data["dependencies"][section][item_name] = internal_dependencies

  output_path.write_text(
    json.dumps(overview_data, indent=2) + "\n",
    encoding="utf-8",
  )


if __name__ == "__main__":
  main()