export class BlockerUI {
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
        document.body.classList.add('pureguard-blocked-body'); // Prevent scroll

        document.getElementById('pureguard-back-btn').addEventListener('click', () => {
            window.history.back();
        });
    }

    static blurMedia() {
        document.body.classList.add('pureguard-blur-media');
    }
}
