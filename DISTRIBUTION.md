# PureGuard Distribution Guide

## Chrome Web Store (Chrome, Brave, Edge, Opera)

1. **Package**:
   - Zip the contents of the `Porn_blocker-` folder (excluding `.git` and any system files).
   - Command: `zip -r pureguard.zip . -x "*.git*"`

2. **Upload**:
   - Go to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/dev/dashboard).
   - Click "Add new item".
   - Upload `pureguard.zip`.

3. **Listing**:
   - Fill in Title, Description, and upload Screenshots/Icon.
   - **Privacy Policy**: Required since we use `activeTab` and `scripting`. State clearly that no data leaves the device.
   - **Justification**: You will need to justify the `declarativeNetRequest` and `scripting` permissions. Explain it is for "Blocking inappropriate content based on user settings".

## Firefox Add-ons (AMO)

1. **Package**:
   - Zip the contents (same as above).

2. **Upload**:
   - Go to [Mozilla Add-on Developer Hub](https://addons.mozilla.org/developers/).
   - Select "Submit a New Add-on".
   - Select "On this site" (Self-hosted) or "Firefox Add-ons Manager" (Public).

3. **Review**:
   - Mozilla reviews code manually sometimes. Ensure code is readable.
   - Note: Manifest V3 is supported but check if `background.service_worker` needs to be purely event-driven or if minor tweaks are needed (Firefox sometimes prefers `background.scripts` for non-persistent pages in transition, but supports MV3 service workers now).

## Microsoft Edge Add-ons

1. **Package**:
   - Use the same `pureguard.zip` from Chrome.

2. **Upload**:
   - Go to [Partner Center](https://partner.microsoft.com/en-us/dashboard/microsoftedge/overview).
   - Create a new extension and upload the zip.

## Safari (App Store)

1. **Build**:
   - Archive the app in Xcode (Product > Archive).
2. **Distribute**:
   - Validate and Upload to App Store Connect.
   - Submit for Review.
   - **Note**: Apple requires the container app to be functional (e.g., show status or instructions).
