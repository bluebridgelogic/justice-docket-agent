#!/usr/bin/env python3
"""Build deterministic runtime-only plugin archives; performs no network calls."""
from hashlib import sha256
import json
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED, ZipInfo

ROOT = Path(__file__).resolve().parents[1]
PACKAGE = ROOT / "plugins" / "justice-docket"
VERSION = json.loads((PACKAGE / "plugin.json").read_text())["version"]
DIST = ROOT / "dist"
DIST.mkdir(exist_ok=True)

def files_for(client):
    names = ["plugin.json", "mcp.json"] if client == "portable" else [".claude-plugin/plugin.json", ".mcp.json"]
    paths = [PACKAGE / name for name in names]
    paths.extend(sorted((PACKAGE / "skills").rglob("*.md")))
    for path in paths:
        if path.is_symlink() or not path.is_file() or not path.resolve().is_relative_to(PACKAGE.resolve()):
            raise ValueError("runtime file is missing or outside the package")
    return sorted(paths)

checksums = []
for client in ("portable", "claude"):
    output = DIST / f"justice-docket-{client}-{VERSION}.zip"
    with ZipFile(output, "w", compression=ZIP_DEFLATED, compresslevel=9) as archive:
        for path in files_for(client):
            info = ZipInfo(path.relative_to(PACKAGE).as_posix(), date_time=(1980, 1, 1, 0, 0, 0))
            info.compress_type = ZIP_DEFLATED
            info.external_attr = 0o100644 << 16
            archive.writestr(info, path.read_bytes(), compress_type=ZIP_DEFLATED, compresslevel=9)
    checksums.append(f"{sha256(output.read_bytes()).hexdigest()}  {output.name}")
(DIST / "SHA256SUMS").write_text("\n".join(checksums) + "\n")
print(f"Built two runtime-only {VERSION} archives and SHA256SUMS.")
