
import os

required_files = [
    "manifest.json",
    "background/service_worker.js",
    "background/state_manager.js",
    "background/dnr_manager.js",
    "content/content_script.js",
    "content/scanner.js",
    "content/blocker_ui.js",
    "content/styles.css",
    "popup/popup.html",
    "popup/popup.js",
    "popup/popup.css",
    "options/options.html",
    "options/options.js",
    "rules/blocklist_basic.json",
    "icons/icon128.png",
    "icons/icon48.png",
    "icons/icon16.png",
    "SAFARI_CONVERSION.md",
    "DISTRIBUTION.md"
]

base_dir = "/Users/user/Porn_blocker-"
missing = []

for f in required_files:
    path = os.path.join(base_dir, f)
    if not os.path.exists(path):
        missing.append(f)

if missing:
    print("Missing files:")
    for m in missing:
        print(f"- {m}")
else:
    print("All required files present!")
