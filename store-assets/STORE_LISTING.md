# Chrome Web Store Listing

## Short Description (132 chars max)
Privacy-first, offline adult content blocker. No data collection. Multi-layer protection with smart scoring. Works offline.

## Full Description
🛡️ **PureGuard - Take Control of Your Browsing**

A privacy-first, completely offline adult content blocker that keeps you safe without compromising your privacy.

**✨ Key Features:**
• 🌐 **Network-Level Blocking** - Blocks known adult domains before pages load
• 🔍 **Smart Content Analysis** - Keyword scoring system analyzes page content
• ⚡ **Instant Response** - Pauses media, blurs images, shows blocking overlays
• 🔒 **100% Private** - Zero data collection, everything runs locally
• 🎚️ **Adjustable Strictness** - Low, Standard, and Strict modes
• 📝 **Custom Whitelist** - Trust specific sites you choose

**🔐 Privacy First:**
PureGuard operates ENTIRELY offline. No servers, no analytics, no tracking. All content analysis happens on your device. Your browsing history never leaves your browser.

**⚙️ How It Works:**
1. Network layer blocks known adult domains
2. Content scanner analyzes page text with weighted keywords  
3. Scoring system (0-100) determines action:
   - Safe (0-14): Normal browsing
   - Suspicious (15-39): Media blurred
   - Blocked (40+): Full overlay displayed

**🌍 Cross-Browser:**
Works on Chrome, Edge, Brave, and other Chromium browsers.

**📖 Open Source:**
View the code on GitHub: https://github.com/Tsikoviski/Porn_blocker-

---

## Category
Productivity

## Tags
- content blocker
- parental control
- privacy
- safe browsing
- adult filter

## Permission Justifications

### declarativeNetRequest
"Required to block known adult domains at the network level before pages load. This provides the first layer of protection."

### declarativeNetRequestWithHostAccess  
"Required in combination with declarativeNetRequest to apply blocking rules across all websites the user visits."

### scripting
"Required to analyze page content (text, titles, metadata) to detect inappropriate material that isn't in the static domain blocklist."

### storage
"Required to save user preferences (strictness level, whitelist) locally on the device. No data is synced or transmitted."

### activeTab
"Required to access the current tab's content for scanning when the user navigates to a new page."

### tabs
"Required to detect when the user navigates to a new page so the content scanner can run on the new content."

### Host Permission (<all_urls>)
"Required because the extension needs to scan content on ANY website the user visits, not just specific domains. Adult content can appear on any site."
