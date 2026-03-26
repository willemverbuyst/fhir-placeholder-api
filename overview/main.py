from pathlib import Path
import json
import os


def get_child_directory_names(directory_path: Path) -> list[str]:
  return sorted(
    child.name for child in directory_path.iterdir() if child.is_dir()
  )


def main() -> None:
  default_output_path = Path(__file__).resolve().parent / "overview.json"
  output_path = Path(os.getenv("OVERVIEW_OUTPUT_PATH", default_output_path))
  project_root = Path(__file__).resolve().parent.parent
  overview_data = {
    "apps": get_child_directory_names(project_root / "apps"),
    "packages": get_child_directory_names(project_root / "packages"),
    "services": get_child_directory_names(project_root / "services"),
  }

  output_path.write_text(
    json.dumps(overview_data, indent=2) + "\n",
    encoding="utf-8",
  )


if __name__ == "__main__":
  main()