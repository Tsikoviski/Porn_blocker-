# Privacy Policy for PureGuard

**Last Updated: January 16, 2026**

## Overview

PureGuard ("the Extension") is a browser extension designed to block adult content. This privacy policy explains how the Extension handles user data.

## Data Collection

**PureGuard does NOT collect, store, transmit, or share any personal data.**

Specifically:
- ❌ No browsing history is collected
- ❌ No personal information is collected
- ❌ No data is sent to external servers
- ❌ No analytics or tracking
- ❌ No cookies are used
- ❌ No third-party services are integrated

## Data Storage

The Extension stores the following data **locally on your device only**:
- User preferences (strictness level)
- Whitelisted domains you manually add

This data is stored using the browser's built-in `chrome.storage.local` API and never leaves your device.

## Permissions Explained

| Permission | Purpose |
|------------|---------|
| `declarativeNetRequest` | Block known adult domains at the network level |
| `scripting` | Analyze page content to detect inappropriate material |
| `storage` | Save your preferences locally |
| `activeTab` | Access current tab for content scanning |
| `tabs` | Detect page navigation for re-scanning |
| `<all_urls>` | Required to scan and block content on all websites |

## Offline Operation

PureGuard operates **entirely offline**. All content analysis happens locally in your browser. No internet connection is required for the Extension to function after installation.

## Third-Party Services

PureGuard does not use any third-party services, APIs, or analytics platforms.

## Children's Privacy

PureGuard does not knowingly collect any data from anyone, including children under 13.

## Changes to This Policy

If we update this privacy policy, we will update the "Last Updated" date above. Continued use of the Extension after changes constitutes acceptance of the new policy.

## Contact

For questions about this privacy policy, please open an issue on our GitHub repository:
https://github.com/Tsikoviski/Porn_blocker-

## Summary

**Your privacy is absolute.** PureGuard runs entirely on your device with zero data collection.
