# PureGuard - Offline Porn Blocker Extension

A privacy-first, offline-capable adult content blocker for Chrome, Firefox, Edge, Brave, and Safari.

![Shield](icons/icon128.png)

## Features

- 🛡️ **Multi-Layer Protection**: Network blocking + Content analysis + Behavioral controls
- 🔒 **100% Offline**: No data leaves your device, ever
- ⚡ **High Performance**: Minimal CPU usage with smart scanning
- 🎚️ **Adjustable Strictness**: Low, Standard, and Strict modes
- 🌐 **Cross-Browser**: Works on all major browsers

## Installation

### Chrome / Brave / Edge
1. Download the extension zip from our [landing page](https://your-vercel-url.vercel.app)
2. Extract the zip file
3. Go to `chrome://extensions`
4. Enable **Developer Mode** (top right)
5. Click **Load Unpacked**
6. Select the extracted folder

### Firefox
1. Go to `about:debugging#/runtime/this-firefox`
2. Click **Load Temporary Add-on**
3. Select `manifest.json` from the extracted folder

### Safari
See [SAFARI_CONVERSION.md](SAFARI_CONVERSION.md) for Xcode build instructions.

## How It Works

### Layer 1: Network Blocking
Uses `declarativeNetRequest` to block known adult domains at the network level before the page even loads.

### Layer 2: Content Analysis
Scans page content (title, URL, body text) using a weighted keyword scoring system:
- **Score < 15**: Safe - No action
- **Score 15-39**: Suspicious - Media is blurred
- **Score 40+**: Blocked - Full overlay displayed

### Layer 3: Behavioral Controls
- Pauses all video/audio elements
- Displays blocking overlay
- Prevents scrolling

## Project Structure

```
├── manifest.json           # Extension manifest (MV3)
├── background/
│   ├── service_worker.js   # Background service worker
│   ├── state_manager.js    # Settings management
│   └── dnr_manager.js      # Dynamic rule management
├── content/
│   ├── content_script.js   # Main content analysis engine
│   └── styles.css          # Blocking overlay styles
├── popup/
│   ├── popup.html          # Extension popup UI
│   ├── popup.js            # Popup logic
│   └── popup.css           # Popup styles
├── options/
│   ├── options.html        # Settings page
│   └── options.js          # Settings logic
├── rules/
│   └── blocklist_basic.json # Static domain blocklist
└── icons/                   # Extension icons
```

## Privacy

- ✅ No data collection
- ✅ No remote servers
- ✅ No analytics
- ✅ All processing happens locally on your device

## License

MIT License - Feel free to use, modify, and distribute.

## Contributing

Pull requests are welcome! Please read the contribution guidelines first.
