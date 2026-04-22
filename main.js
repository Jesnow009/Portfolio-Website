// Custom Video Player Logic - Wrapped in function for dynamic loading
window.initCustomVideoPlayers = function() {
    const videoContainers = document.querySelectorAll('.custom-player:not(.initialized)');
    
    function formatTime(seconds) {
        if (isNaN(seconds)) return "0:00";
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    }

    videoContainers.forEach(container => {
        container.classList.add('initialized');
        const video = container.querySelector('video');
        if (!video) return;

        const centerPlayBtn = container.querySelector('.center-play-btn');
        const playPauseBtn = container.querySelector('.play-pause-btn');
        const muteBtn = container.querySelector('.mute-btn');
        const volumeSlider = container.querySelector('.volume-slider');
        const progressBar = container.querySelector('.progress-bar');
        const currentTimeEl = container.querySelector('.current-time');
        const durationEl = container.querySelector('.duration');
        const fullscreenBtn = container.querySelector('.fullscreen-btn');
        
        let manuallyPaused = false;

        const togglePlay = (e) => {
            if (e) { e.preventDefault(); e.stopPropagation(); }
            if (video.paused) {
                video.muted = false;
                video.play().catch(() => {});
                manuallyPaused = false;
            } else {
                video.pause();
                manuallyPaused = true;
            }
        };

        const openViewer = async (e) => {
            if (e.target.closest('.control-btn')) return;
            e.preventDefault(); e.stopPropagation();
            
            if (container.querySelector('.yt-container')) {
                window.playYTHome(container);
                return;
            }

            const isFullscreen = document.fullscreenElement || document.webkitFullscreenElement;
            if (isFullscreen) {
                togglePlay();
                return;
            }

            try {
                if (container.requestFullscreen) await container.requestFullscreen();
                else if (container.webkitRequestFullscreen) await container.webkitRequestFullscreen();
                if (video) {
                    video.muted = false;
                    if (video.paused) await video.play();
                }
                manuallyPaused = false;
            } catch (err) { console.warn(err); }
        };

        const clickTarget = container.closest('.showcase-card') || container.closest('.project-card') || container;
        clickTarget.style.cursor = 'pointer';
        clickTarget.addEventListener('click', openViewer);
        
        if (playPauseBtn) playPauseBtn.addEventListener('click', togglePlay);
        if (centerPlayBtn) centerPlayBtn.addEventListener('click', openViewer);
        if (video) video.addEventListener('click', openViewer);

        if (container.dataset.behavior === 'hover') {
            const hoverTarget = container.closest('.showcase-card') || container;
            hoverTarget.addEventListener('mouseenter', () => {
                if (!manuallyPaused) video.play().catch(() => {});
            });
            hoverTarget.addEventListener('mouseleave', () => {
                if (!video.paused) { video.pause(); manuallyPaused = false; }
            });
        }

        video.addEventListener('play', () => {
            container.classList.add('playing');
            container.classList.remove('paused');
        });
        
        video.addEventListener('pause', () => {
            container.classList.remove('playing');
            container.classList.add('paused');
        });

        video.addEventListener('timeupdate', () => {
            if (currentTimeEl) currentTimeEl.textContent = formatTime(video.currentTime);
            if (progressBar && !container.dataset.scrubbing) {
                progressBar.value = video.currentTime;
            }
        });
    });
};

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Sticky Nav
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (navbar && window.scrollY > 50) navbar.classList.add('scrolled');
        else if (navbar) navbar.classList.remove('scrolled');
    });

    // Reveal Observer
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

    // Initialize local players
    window.initCustomVideoPlayers();

    // YouTube API Load
    if (!window.YT) {
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
});

// GLOBAL YOUTUBE LOGIC
window.ytHomePlayers = {};
window.onYouTubeIframeAPIReady = function() {
    document.querySelectorAll('.yt-container').forEach(container => {
        const iframe = container.querySelector('iframe');
        if (iframe && !iframe.id) {
            const frameId = `yt-home-${Math.random().toString(36).substr(2, 9)}`;
            iframe.id = frameId;
            container.dataset.frameId = frameId;
            
            new YT.Player(frameId, {
                events: {
                    'onReady': (event) => {
                        window.ytHomePlayers[frameId] = event.target;
                    },
                    'onStateChange': (event) => {
                        const card = container.closest('.showcase-card') || container.closest('.project-card');
                        const projImg = container.closest('.project-img');
                        const centerBtn = projImg ? projImg.querySelector('.center-play-btn') : null;
                        
                        if (event.data === YT.PlayerState.PLAYING) {
                            if (card) card.classList.add('playing');
                            if (centerBtn) { centerBtn.style.opacity = '0'; centerBtn.style.pointerEvents = 'none'; }
                            const cover = container.querySelector('.yt-cover-image');
                            if (cover) cover.style.opacity = '0';
                        } else {
                            if (card) card.classList.remove('playing');
                            if (centerBtn) { centerBtn.style.opacity = '1'; centerBtn.style.pointerEvents = 'auto'; }
                        }
                    }
                }
            });
        }
    });
};

window.playYTHome = function(element) {
    const container = element.classList.contains('yt-container') ? element : element.querySelector('.yt-container');
    if (!container) return;
    const frameId = container.dataset.frameId;
    const player = window.ytHomePlayers[frameId];
    
    if (player && typeof player.playVideo === 'function') {
        player.unMute();
        player.playVideo();
    }
    
    const projImg = container.closest('.project-img') || container;
    if (projImg) {
        if (projImg.requestFullscreen) projImg.requestFullscreen();
        else if (projImg.webkitRequestFullscreen) projImg.webkitRequestFullscreen();
    }
};
