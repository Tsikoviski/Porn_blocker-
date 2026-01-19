# PureGuard Mobile Installation Guide

PureGuard works on mobile browsers through platform-specific installation methods.

## Platform Support

| Platform | Browser | Method |
|----------|---------|--------|
| iOS | Safari | App Store / Sideload |
| Android | Firefox | Add-ons (AMO) |
| Android | Kiwi Browser | Manual Install |
| Android | Yandex Browser | Manual Install |

> **Note**: Chrome for Android does not support extensions.

---

## iOS Safari

### Option 1: App Store (Recommended)
*Coming soon - pending App Store approval*

### Option 2: Build from Source (Requires Mac)

**Requirements:**
- Mac with Xcode 14+
- iOS 15.0+ device
- Apple Developer account (free for personal testing)

**Steps:**

1. **Clone the repository**
   ```bash
   git clone https://github.com/Tsikoviski/Porn_blocker-.git
   cd Porn_blocker-/ios-safari/PureGuard
   ```

2. **Open in Xcode**
   ```bash
   open PureGuard.xcodeproj
   ```

3. **Configure signing**
   - Select the project in the navigator
   - Go to Signing & Capabilities
   - Select your development team

4. **Build and run**
   - Connect your iPhone/iPad
   - Select it as the destination
   - Press ⌘R to build and run

5. **Enable the extension**
   - Open Settings → Safari → Extensions
   - Enable PureGuard
   - Grant all permissions

---

## Firefox for Android

### Prerequisites
- Firefox for Android version 113.0 or later
- [Download Firefox](https://play.google.com/store/apps/details?id=org.mozilla.firefox)

### Installation Steps

1. **Download the extension package**
   - Get `pureguard-firefox.xpi` from our [releases page](https://github.com/Tsikoviski/Porn_blocker-/releases)

2. **Open Firefox Add-ons**
   - Tap the menu (⋮) → Add-ons
   - Tap "Install Add-on From File"

3. **Select the file**
   - Navigate to your Downloads
   - Select `pureguard-firefox.xpi`

4. **Grant permissions**
   - Tap "Add" when prompted
   - Allow all requested permissions

### Alternative: Build for Firefox

```bash
# Clone repository
git clone https://github.com/Tsikoviski/Porn_blocker-.git
cd Porn_blocker-

# Copy Firefox manifest
cp manifest.firefox.json manifest.json

# Package the extension
zip -r pureguard-firefox.xpi . -x "*.git*" -x "ios-safari/*" -x "landing-page/*"
```

---

## Kiwi Browser (Android)

Kiwi Browser supports Chrome extensions on Android.

### Prerequisites
- [Download Kiwi Browser](https://play.google.com/store/apps/details?id=com.kiwibrowser.browser)

### Installation Steps

1. **Download the extension**
   - Get `pureguard-extension.zip` from [pureguard.pro](https://pureguard.pro)

2. **Extract the zip**
   - Use a file manager to extract the contents

3. **Enable Developer Mode**
   - Open Kiwi Browser
   - Go to `kiwi://extensions`
   - Enable "Developer mode"

4. **Load the extension**
   - Tap "Load unpacked"
   - Navigate to the extracted folder
   - Select the folder containing `manifest.json`

5. **Verify installation**
   - The PureGuard icon should appear in the toolbar

---

## Yandex Browser (Android)

Similar to Kiwi Browser, Yandex supports Chrome extensions.

### Steps

1. Download `pureguard-extension.zip`
2. Extract the contents
3. Open Yandex Browser settings
4. Navigate to Extensions
5. Enable developer mode
6. Load the unpacked extension

---

## Troubleshooting

### iOS: Extension not showing
- Run the container app at least once
- Restart Safari
- Check Settings → Safari → Extensions

### Firefox: Installation blocked
- Enable installation from unknown sources in Firefox settings
- Ensure you're using Firefox 113.0 or later

### Kiwi: Extension crashes
- Clear browser cache
- Reinstall the extension
- Ensure you have the latest Kiwi Browser version

---

## Need Help?

- [GitHub Issues](https://github.com/Tsikoviski/Porn_blocker-/issues)
- [Documentation](https://github.com/Tsikoviski/Porn_blocker-)
