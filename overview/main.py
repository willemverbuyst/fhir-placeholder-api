from pathlib import Path
import json
import os
import re


FALLBACK_DESCRIPTION = "No description in README.md."
WHAT_IS_THIS_HEADER = "## What is this?"
MARKDOWN_HEADER_PATTERN = re.compile(r"^\s*#{1,6}\s+")
MARKDOWN_LINK_PATTERN = re.compile(r"\[([^\]]+)\]\([^)]+\)")


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


def main() -> None:
  default_output_path = Path(__file__).resolve().parent / "overview.json"
  output_path = Path(os.getenv("OVERVIEW_OUTPUT_PATH", default_output_path))
  project_root = Path(__file__).resolve().parent.parent
  sections = ["apps", "cli", "packages", "services"]
  overview_data = {}
  for section in sections:
    overview_data[section] = get_child_directory_descriptions(project_root / section)

  output_path.write_text(
    json.dumps(overview_data, indent=2) + "\n",
    encoding="utf-8",
  )


if __name__ == "__main__":
  main()