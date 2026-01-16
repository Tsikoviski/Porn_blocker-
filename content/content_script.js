// ============================================
// SCANNER CLASS
// ============================================
class Scanner {
    constructor(settings) {
        this.settings = settings;
        this.THRESHOLD_SUSPICIOUS = 15;
        this.THRESHOLD_BLOCK = 40;

        // Basic keywords with weights
        this.keywords = {
            'porn': 10,
            'xxx': 10,
            'sex': 5,
            'nude': 5,
            'naked': 5,
            'erotic': 4,
            'hentai': 10,
            'gangbang': 10,
            'milf': 8,
            'amateur': 3,
            'tube': 2,
            'video': 1,
            'hardcore': 8,
            'softcore': 6,
            'fetish': 5,
            'masturbat': 8,
            'orgasm': 7
        };
    }

    scanPage() {
        let score = 0;
        score += this.scanMetadata();
        score += this.scanUrl();
        score += this.scanBody();
        return score;
    }

    scanMetadata() {
        let metaScore = 0;
        const title = document.title.toLowerCase();

        for (const [word, weight] of Object.entries(this.keywords)) {
            if (title.includes(word)) metaScore += weight * 2;
        }

        const metas = document.querySelectorAll('meta[name="description"], meta[name="keywords"]');
        metas.forEach(meta => {
            const content = (meta.content || '').toLowerCase();
            for (const [word, weight] of Object.entries(this.keywords)) {
                if (content.includes(word)) metaScore += weight;
            }
        });

        return metaScore;
    }

    scanUrl() {
        let urlScore = 0;
        const href = window.location.href.toLowerCase();
        for (const [word, weight] of Object.entries(this.keywords)) {
            if (href.includes(word)) urlScore += weight;
        }
        return urlScore;
    }

    scanBody() {
        let bodyScore = 0;
        if (!document.body) return 0;

        const textToScan = document.body.innerText.substring(0, 5000).toLowerCase();

        for (const [word, weight] of Object.entries(this.keywords)) {
            const regex = new RegExp(`\\b${word}\\b`, 'gi');
            const count = (textToScan.match(regex) || []).length;
            if (count > 0) {
                bodyScore += (weight * Math.min(count, 5));
            }
        }

        return bodyScore;
    }
}

// ============================================
// BLOCKER UI CLASS
// ============================================
class BlockerUI {
    static checkExists() {
        return !!document.getElementById('pureguard-overlay');
    }

    static showBlockScreen() {
        if (this.checkExists()) return;

        // Stop audio/video
        const medias = document.querySelectorAll('video, audio');
        medias.forEach(m => m.pause());

        const overlay = document.createElement('div');
        overlay.id = 'pureguard-overlay';
        overlay.innerHTML = `
            <div class="pureguard-container">
                <div class="pureguard-icon">🛡️</div>
                <h1>Content Blocked</h1>
                <p>PureGuard has detected inappropriate content on this page.</p>
                <button id="pureguard-back-btn">Go Back</button>
            </div>
        `;

        document.body.appendChild(overlay);
        document.body.classList.add('pureguard-blocked-body');

        document.getElementById('pureguard-back-btn').addEventListener('click', () => {
            window.history.back();
        });
    }

    static blurMedia() {
        document.body.classList.add('pureguard-blur-media');
    }
}

// ============================================
// MAIN EXECUTION
// ============================================
(async () => {
    // Get settings from background
    let settings = {};
    try {
        settings = await chrome.runtime.sendMessage({ action: 'getSettings' }) || {};
    } catch (e) {
        console.log('PureGuard: Could not get settings, using defaults.');
    }

    if (settings.whitelist && settings.whitelist.includes(window.location.hostname)) {
        console.log('PureGuard: Whitelisted domain, skipping scan.');
        return;
    }

    const scanner = new Scanner(settings);

    // Wait for body to be available
    const runScan = () => {
        const score = scanner.scanPage();
        console.log(`PureGuard: Page Score = ${score}`);

        if (score >= scanner.THRESHOLD_BLOCK) {
            BlockerUI.showBlockScreen();
        } else if (score >= scanner.THRESHOLD_SUSPICIOUS) {
            BlockerUI.blurMedia();
        }
    };

    // Run initial scan when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', runScan);
    } else {
        runScan();
    }

    // Observer for dynamic content (SPAs)
    const observeChanges = () => {
        if (!document.body) return;

        const observer = new MutationObserver(() => {
            const newScore = scanner.scanPage();
            if (newScore >= scanner.THRESHOLD_BLOCK) {
                BlockerUI.showBlockScreen();
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });
    };

    if (document.body) {
        observeChanges();
    } else {
        document.addEventListener('DOMContentLoaded', observeChanges);
    }
})();
