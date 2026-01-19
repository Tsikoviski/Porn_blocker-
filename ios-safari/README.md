# PureGuard for iOS Safari

This directory contains the Xcode project to build PureGuard as an iOS Safari extension.

## Requirements

- **macOS** with Xcode 14.0 or later
- **iOS 15.0+** target device or simulator
- Apple Developer Account (for App Store distribution)

## Project Structure

```
PureGuard/
├── PureGuard.xcodeproj/       # Xcode project file
├── PureGuard/                 # iOS container app
│   ├── AppDelegate.swift
│   ├── SceneDelegate.swift
│   ├── ViewController.swift
│   ├── Main.storyboard
│   ├── LaunchScreen.storyboard
│   ├── Assets.xcassets/
│   └── Info.plist
└── PureGuard Extension/       # Safari Web Extension
    ├── SafariWebExtensionHandler.swift
    ├── Resources/             # Links to main extension files
    └── Info.plist
```

## Build Instructions

### 1. Open the Project
```bash
open /Users/user/Porn_blocker-/ios-safari/PureGuard/PureGuard.xcodeproj
```

### 2. Configure Signing
1. Select the **PureGuard** project in the navigator
2. Select each target (PureGuard and PureGuard Extension)
3. Go to **Signing & Capabilities**
4. Select your development team
5. Xcode will automatically manage signing

### 3. Add App Icon (Optional)
1. Open `Assets.xcassets`
2. Select `AppIcon`
3. Drag your 1024x1024 app icon image

### 4. Build and Run
1. Select an iOS Simulator or connected device
2. Press **⌘R** or click the **Run** button
3. The PureGuard app will launch

### 5. Enable the Extension
1. Open **Settings** > **Safari** > **Extensions**
2. Enable **PureGuard**
3. Grant all requested permissions

## Testing on Device

To test on a physical iOS device:

1. Connect your iPhone/iPad via USB
2. Trust the computer on your device
3. Select your device as the run destination
4. Build and run (first run may take longer)

## Distribution

### TestFlight (Recommended for Testing)
1. Archive the app: **Product** > **Archive**
2. Upload to App Store Connect
3. Invite testers via TestFlight

### App Store
1. Archive the app
2. Submit for App Store review
3. Provide required metadata and screenshots

## Troubleshooting

### Extension not appearing in Safari
- Ensure you've run the container app at least once
- Check **Settings** > **Safari** > **Extensions**
- Restart Safari

### Build errors
- Ensure the extension Resources folder links to the correct paths
- Clean build folder: **Product** > **Clean Build Folder** (⇧⌘K)

## Note on Extension Resources

The extension automatically references the main extension files from the parent directory:
- `manifest.json`
- `background/`
- `content/`
- `popup/`
- `options/`
- `rules/`
- `icons/`

This means changes to the main extension files are automatically reflected in the iOS build.
