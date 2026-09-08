"""Verify the deployed public files match the build, without authentication."""
from pathlib import Path
from urllib.request import Request, urlopen
from urllib.parse import urljoin, urlparse
import hashlib
import os
import time

root = Path(__file__).resolve().parents[1] / "dist"
base = os.environ["PUBLIC_SITE_URL"].rstrip("/") + "/"
assert urlparse(base).scheme == "https", "Public HTTPS URL required"
checks = {
    "": "index.html",
    "projects/": "projects/index.html",
    "projects/primavera-p6-project-controls/": "projects/primavera-p6-project-controls/index.html",
    "cv/": "cv/index.html",
    "downloads/Ali_Bayoumi_CV.pdf": "downloads/Ali_Bayoumi_CV.pdf",
    "downloads/Ali_Bayoumi_Project_Controls_Case_Study.pdf": "downloads/Ali_Bayoumi_Project_Controls_Case_Study.pdf",
    "downloads/Ali_Bayoumi_Project_Controls_Case_Study.pptx": "downloads/Ali_Bayoumi_Project_Controls_Case_Study.pptx",
    "assets/site.css": "assets/site.css",
    "assets/site.js": "assets/site.js",
    "assets/og.png": "assets/og.png",
    "assets/favicon.svg": "assets/favicon.svg",
}
for route, file in checks.items():
    expected = hashlib.sha256((root / file).read_bytes()).digest()
    last_error = None
    for attempt in range(6):
        try:
            request = Request(urljoin(base, route), headers={"User-Agent": "Portfolio-Public-Check/1.0"})
            with urlopen(request, timeout=25) as response:
                assert response.status == 200, f"HTTP {response.status}"
                actual = hashlib.sha256(response.read()).digest()
            assert actual == expected, "Served file differs from the current build"
            print(f"PASS 200 and SHA-256 match: {route or '/'}", flush=True)
            break
        except Exception as error:
            last_error = error
            if attempt < 5:
                time.sleep(5)
    else:
        raise RuntimeError(f"Public check failed for {route or '/'}: {last_error}")
print("All public routes, CV, presentation downloads and primary assets verified.", flush=True)
