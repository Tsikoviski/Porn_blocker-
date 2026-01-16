export class Scanner {
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
            'masturbat': 8,  // stem
            'orgasm': 7
        };
    }

    scanPage() {
        let score = 0;

        // 1. Metadata Scan
        score += this.scanMetadata();

        // 2. URL Scan
        score += this.scanUrl();

        // 3. Content Scan (Visible Text)
        score += this.scanBody();

        return score;
    }

    scanMetadata() {
        let metaScore = 0;
        const title = document.title.toLowerCase();

        for (const [word, weight] of Object.entries(this.keywords)) {
            if (title.includes(word)) metaScore += weight * 2; // Title matches are high confidence
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
        // Optimization: Sample only first N characters or key headers
        // For a hackathon/demo, we scan everything but keep it light.

        let bodyScore = 0;
        const textToScan = document.body.innerText.substring(0, 5000).toLowerCase(); // Limit scan to first 5k chars for perf

        for (const [word, weight] of Object.entries(this.keywords)) {
            // Count occurrences
            const regex = new RegExp(`\\b${word}\\b`, 'gi');
            const count = (textToScan.match(regex) || []).length;
            if (count > 0) {
                // Diminishing returns for repeated words
                bodyScore += (weight * Math.min(count, 5));
            }
        }

        return bodyScore;
    }
}
