// Navbar & Mobile Menu
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (navbar && window.scrollY > 50) navbar.classList.add('scrolled');
        else if (navbar) navbar.classList.remove('scrolled');
    });

    // Reveal on Scroll
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    revealElements.forEach(el => observer.observe(el));

    // YouTube API Injection
    if (!window.YT) {
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(tag);
    } else {
        if (window.onYouTubeIframeAPIReady) window.onYouTubeIframeAPIReady();
    }
});

// GLOBAL YOUTUBE ENGINE (HOME PAGE)
window.ytHomePlayers = window.ytHomePlayers || {};

window.onYouTubeIframeAPIReady = function() {
    document.querySelectorAll('.yt-container').forEach((container, idx) => {
        const iframe = container.querySelector('iframe');
        if (!iframe || iframe.id) return;

        const frameId = `yt-main-${idx}-${Math.random().toString(36).substr(2, 4)}`;
        iframe.id = frameId;
        container.dataset.frameId = frameId;

        const player = new YT.Player(frameId, {
            events: {
                'onReady': (e) => {
                    e.target.setPlaybackQuality('hd720'); // Default as requested
                    initHomeYTControls(container, e.target);
                },
                'onStateChange': (e) => {
                    const card = container.closest('.project-card');
                    const cover = container.querySelector('.yt-cover-image');
                    const centerBtn = card ? card.querySelector('.center-play-btn') : null;
                    const controls = container.querySelector('.player-controls');
                    
                    if (e.data === YT.PlayerState.PLAYING) {
                        if (card) card.classList.add('playing');
                        if (cover) cover.style.opacity = '0';
                        if (centerBtn) centerBtn.style.opacity = '0';
                        if (controls) controls.style.opacity = '1';
                    } else if (e.data === YT.PlayerState.PAUSED || e.data === YT.PlayerState.ENDED) {
                        if (card) card.classList.remove('playing');
                        if (centerBtn) centerBtn.style.opacity = '1';
                    }
                }
            }
        });
        window.ytHomePlayers[frameId] = player;

        // Hover Behavior
        const hoverTarget = container.closest('.project-img');
        if (hoverTarget && hoverTarget.dataset.behavior === 'hover') {
            hoverTarget.onmouseenter = () => player.playVideo();
            hoverTarget.onmouseleave = () => { if (!document.fullscreenElement) player.pauseVideo(); };
        }
    });
};

function initHomeYTControls(container, player) {
    const playBtn = container.querySelector('.yt-play-btn');
    const muteBtn = container.querySelector('.yt-mute-btn');
    const volSlider = container.querySelector('.yt-volume-slider');
    const progressBar = container.querySelector('.yt-progress');
    const qualityBtns = container.querySelectorAll('.quality-option');
    const infoMsg = container.querySelector('.quality-info-msg');

    if (playBtn) playBtn.onclick = (e) => { e.stopPropagation(); player.getPlayerState() === 1 ? player.pauseVideo() : player.playVideo(); };
    if (muteBtn) muteBtn.onclick = (e) => { e.stopPropagation(); player.isMuted() ? player.unMute() : player.mute(); };
    if (volSlider) volSlider.oninput = (e) => { e.stopPropagation(); player.setVolume(e.target.value); };
    if (progressBar) progressBar.oninput = (e) => { e.stopPropagation(); player.seekTo((e.target.value / 100) * player.getDuration()); };

    qualityBtns.forEach(btn => {
        btn.onclick = (e) => {
            e.stopPropagation();
            const q = btn.dataset.vq;
            player.setPlaybackQuality(q);
            qualityBtns.forEach(b => { 
                b.classList.remove('active'); 
                b.style.background='transparent'; 
                b.style.color='white';
                b.style.opacity='0.5';
            });
            btn.classList.add('active');
            btn.style.background='white';
            btn.style.color='black';
            btn.style.opacity='1';
        };
    });

    // Sync Progress Loop
    setInterval(() => {
        if (player.getPlayerState() === 1) {
            const cur = player.getCurrentTime();
            const dur = player.getDuration();
            if (dur > 0) {
                if (progressBar) progressBar.value = (cur / dur) * 100;
                container.querySelector('.current-time').textContent = formatTimeHome(cur);
                container.querySelector('.duration').textContent = formatTimeHome(dur);
                
                // 10 Second Auto-Hide Logic
                if (infoMsg) {
                    if (cur > 10) infoMsg.style.opacity = '0';
                    else infoMsg.style.opacity = '1';
                }
            }
        }
    }, 1000);
}

function formatTimeHome(s) {
    const m = Math.floor(s / 60);
    const rs = Math.floor(s % 60);
    return `${m}:${rs < 10 ? '0' : ''}${rs}`;
}

window.playYTHome = function(btn) {
    const container = btn.closest('.yt-container') || btn.querySelector('.yt-container');
    if (!container) return;
    const frameId = container.dataset.frameId;
    const player = window.ytHomePlayers[frameId];
    if (player) {
        player.unMute();
        player.playVideo();
        const fullTarget = container.closest('.project-img');
        if (fullTarget.requestFullscreen) fullTarget.requestFullscreen();
        else if (fullTarget.webkitRequestFullscreen) fullTarget.webkitRequestFullscreen();
    }
};

document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement && !document.webkitFullscreenElement) {
        Object.values(window.ytHomePlayers).forEach(p => p.pauseVideo());
    }
});
