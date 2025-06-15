#!/usr/bin/env python3
"""
Minimal static-file HTTP server with SPA fallback.
• Python ≥3.7 (uses the “directory” attribute on SimpleHTTPRequestHandler)
• Ctrl-C to stop
"""

import http.server
import socketserver
import argparse
import pathlib
import mimetypes
import os

class SPARequestHandler(http.server.SimpleHTTPRequestHandler):
    # default directory is injected by TCPServer in main()
    def __init__(self, *args, directory=None, **kwargs):
        super().__init__(*args, directory=directory, **kwargs)

    # Return index.html instead of 404 so client-side routing works
    def send_error(self, code, message=None, explain=None):
        if code == 404:
            index = pathlib.Path(self.directory) / "index.html"
            if index.exists():
                self.path = "/index.html"
                return http.server.SimpleHTTPRequestHandler.do_GET(self)
        return super().send_error(code, message, explain)

# Add Brotli / wasm etc. mime types Expo sometimes needs
mimetypes.add_type("application/wasm", ".wasm")
mimetypes.add_type("image/avif", ".avif")

def main():
    parser = argparse.ArgumentParser(description="Serve a static folder with SPA fallback")
    parser.add_argument("dir", nargs="?", default="web-build", help="folder to serve (default: ./web-build)")
    parser.add_argument("-p", "--port", type=int, default=3000, help="port (default: 3000)")
    parser.add_argument("--host", default="0.0.0.0", help="host/IP to bind (default: 0.0.0.0)")
    args = parser.parse_args()

    web_root = pathlib.Path(args.dir).resolve()
    if not web_root.exists():
        raise SystemExit(f"❌  directory {web_root} does not exist")

    handler = lambda *a, **kw: SPARequestHandler(*a, directory=str(web_root), **kw)

    with socketserver.TCPServer((args.host, args.port), handler) as httpd:
        url = f"http://{args.host if args.host != '0.0.0.0' else 'localhost'}:{args.port}"
        print(f"Serving {web_root} at {url}  (Ctrl-C to quit)")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n🛑  Stopped")

if __name__ == "__main__":
    main()
