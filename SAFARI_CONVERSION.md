# Porting PureGuard to Safari

Since PureGuard is built as a standard WebExtension (Manifest V3), it is compatible with Safari, but requires wrapping in a native App container.

## Prerequisites
- macOS with Xcode 12+ installed.
- Apple Developer Account (for distribution).

## Conversion Steps

1. **Prepare the Extension**:
   Ensure you have the full source code in a directory (e.g., `~/Porn_blocker-/`).

2. **Run the Converter**:
   Open Terminal and run:
   ```bash
   xcrun safari-web-extension-converter /path/to/Porn_blocker-
   ```

3. **Xcode Project**:
   - The command will generate an Xcode project.
   - Open the project in Xcode.
   - The converter creates a wrapper app. You can customize the app icon and name in Xcode.

4. **Adjust Manifest (If needed)**:
   - Safari generally supports Manifest V3, but check for specific API incompatibilities in the `resources` folder inside the Xcode project.
   - `declarativeNetRequest` is supported, but ensure rule resources are correctly referenced.

5. **Build and Run**:
   - Select your Mac as the target.
   - Click "Run" (Play button).
   - This will launch the "PureGuard" container app.
   - Open Safari > Settings > Extensions and enable "PureGuard".

## Notes
- **Persisting State**: `browser.storage.local` works the same.
- **Background Service Worker**: Safari supports service workers for background scripts in MV3.
- **Blocking**: The `declarativeNetRequest` API is fully supported.
