"""Local dev server: serves the site and lets tools/extract.html save hero frames.

Usage:  python tools/frame_server.py   (then open http://127.0.0.1:5179/tools/extract.html)
Only accepts writes under frames/ and only from this machine.
"""
import os
import re
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ALLOWED = re.compile(r"^frames/(manifest\.json|[a-z]+/(desktop|mobile)/frame_\d{3}\.webp)$")


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def do_POST(self):
        rel = self.path.removeprefix("/__save/")
        if not self.path.startswith("/__save/") or not ALLOWED.match(rel):
            self.send_error(403)
            return
        data = self.rfile.read(int(self.headers.get("Content-Length", 0)))
        target = os.path.join(ROOT, *rel.split("/"))
        os.makedirs(os.path.dirname(target), exist_ok=True)
        with open(target, "wb") as f:
            f.write(data)
        self.send_response(204)
        self.end_headers()

    def log_message(self, *args):
        pass


if __name__ == "__main__":
    ThreadingHTTPServer(("127.0.0.1", 5179), Handler).serve_forever()
