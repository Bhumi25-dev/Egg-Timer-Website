// audio.js - Background music controller

class BackgroundMusic {
    constructor() {
        this.audio = new Audio('../Components/lofi.mp3');
        this.audio.loop = true;
        this.audio.volume = 0.3; // 30% volume
        this.isPlaying = false;
        
        // Create UI controls
        this.createControls();
        
        // Try to autoplay (may be blocked by browser)
        this.attemptAutoplay();
    }
    
    createControls() {
        // Create music toggle button
        const btn = document.createElement('button');
        btn.id = 'music-toggle';
        btn.innerHTML = '🎵 Play Music';
        btn.style.cssText = `
            position: fixed;
            bottom: 25px;
            right: 25px;
            z-index: 1000;
            padding: 10px 16px;
            background: #ffc784;
            border: 3px solid #a67233;
            border-radius: 12px;
            cursor: pointer;
            font-family: 'Comic Neue', cursive;
            font-size: 15px;
            color: #ff8b00;
            box-shadow: 0 6px 0 #a67233;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
        `;
        
        btn.addEventListener("mouseenter", () => {
            btn.style.transform = "translateY(-2px)";
        });

        btn.addEventListener("mouseleave", () => {
            btn.style.transform = "translateY(0)";
        });

        btn.addEventListener("click", () => this.toggle());

        // ADD BUTTON TO PAGE
        document.body.appendChild(btn);

        // SAVE REFERENCE
        this.button = btn;
    }
    
    async attemptAutoplay() {
        try {
            await this.audio.play();
            this.isPlaying = true;
            this.updateButton();
        } catch (err) {
            console.log('Autoplay blocked by browser. User interaction required.');
            this.isPlaying = false;
        }
    }
    
    toggle() {
        if (this.isPlaying) {
            this.audio.pause();
            this.isPlaying = false;
        } else {
            this.audio.play().catch(e => console.log('Playback failed:', e));
            this.isPlaying = true;
        }
        this.updateButton();
    }
    
    updateButton() {
        this.button.innerHTML = this.isPlaying ? '🔇 Mute Music' : '🎵 Play Music';
        this.button.style.transform = this.isPlaying ? 'scale(1.05)' : 'scale(1)';
    }
    
    // Call this when timer ends to fade out music
    fadeOut() {
        const fade = setInterval(() => {
            if (this.audio.volume > 0.05) {
                this.audio.volume -= 0.05;
            } else {
                this.audio.pause();
                this.isPlaying = false;
                this.updateButton();
                clearInterval(fade);
            }
        }, 100);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.bgMusic = new BackgroundMusic();
});