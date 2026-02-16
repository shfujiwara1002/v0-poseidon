#!/usr/bin/env python3
"""Stable local SPA preview server for prototype/dist.
- Serves real static files when present
- SPA fallback to index.html only for route-like paths
- Returns 404 for missing asset files
- Sends no-store cache headers to avoid stale hashed bundle issues
"""

from __future__ import annotations

import argparse
import http.server
import mimetypes
import os
import posixpath
from pathlib import Path
from urllib.parse import unquote, urlsplit


class SPAHandler(http.server.SimpleHTTPRequestHandler):
    root: Path

    def _sanitize_path(self, request_path: str) -> Path:
        # Normalize URL path to avoid traversal and preserve only local path parts.
        raw_path = urlsplit(request_path).path
        path = posixpath.normpath(unquote(raw_path)).lstrip("/")
        if path in ("", "."):
            return self.root / "index.html"
        return self.root / path

    def _resolve_target(self, request_path: str) -> tuple[Path, bool]:
        candidate = self._sanitize_path(request_path)

        if candidate.exists() and candidate.is_file():
            return candidate, True

        # If the request looks like an asset file (has extension), keep 404.
        if candidate.suffix:
            return candidate, False

        # Route-like path -> SPA fallback.
        return self.root / "index.html", True

    def _send_target(self, with_body: bool) -> None:
        target, ok = self._resolve_target(self.path)
        if not ok:
            self.send_error(404, "File not found")
            return

        ctype = mimetypes.guess_type(str(target))[0] or "application/octet-stream"
        try:
            data = target.read_bytes()
        except OSError:
            self.send_error(404, "File not found")
            return

        self.send_response(200)
        self.send_header("Content-Type", ctype)
        self.send_header("Content-Length", str(len(data)))
        # Prevent stale index/assets causing blank screen due to hash mismatch.
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        self.end_headers()
        if with_body:
            self.wfile.write(data)

    def do_GET(self) -> None:
        self._send_target(with_body=True)

    def do_HEAD(self) -> None:
        self._send_target(with_body=False)

    def log_message(self, fmt: str, *args) -> None:
        print(fmt % args)


def main() -> int:
    parser = argparse.ArgumentParser(description="Serve Vite dist with SPA fallback")
    parser.add_argument("--root", default="dist", help="Directory to serve (default: dist)")
    parser.add_argument("--host", default="127.0.0.1", help="Host to bind (default: 127.0.0.1)")
    parser.add_argument("--port", type=int, default=4173, help="Port to bind (default: 4173)")
    args = parser.parse_args()

    root = Path(args.root).resolve()
    if not root.exists() or not root.is_dir():
        raise SystemExit(f"Root directory does not exist: {root}")

    handler = SPAHandler
    handler.root = root

    with http.server.ThreadingHTTPServer((args.host, args.port), handler) as httpd:
        print(f"SPA preview server running on http://{args.host}:{args.port} (root={root})")
        httpd.serve_forever()


if __name__ == "__main__":
    raise SystemExit(main())
