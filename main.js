// Custom Video Player Logic - Wrapped in function for dynamic loading
window.initCustomVideoPlayers = function() {
    const videoContainers = document.querySelectorAll('.custom-player:not(.initialized)');
    
    function formatTimeLocal(seconds) {
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
        
        const handleFSChange = () => {
            if (!(document.fullscreenElement || document.webkitFullscreenElement)) {
                video.muted = true;
                video.dispatchEvent(new Event('volumechange'));
            }
        };
        document.addEventListener('fullscreenchange', handleFSChange);
        document.addEventListener('webkitfullscreenchange', handleFSChange);

        const togglePlay = (e) => {
            if (e) { e.preventDefault(); e.stopPropagation(); }
            if (video.paused) {
                video.muted = false;
                video.play().catch(() => {});
            } else {
                video.pause();
            }
        };

        const openViewer = async (e) => {
            if (e.target.closest('.control-btn')) return;
            e.preventDefault(); e.stopPropagation();
            
            if (container.querySelector('.yt-container')) {
                window.playYTHome(container);
                return;
            }

            try {
                if (container.requestFullscreen) await container.requestFullscreen();
                else if (container.webkitRequestFullscreen) await container.webkitRequestFullscreen();
                video.muted = false;
                video.play();
            } catch (err) { console.warn(err); }
        };

        const clickTarget = container.closest('.showcase-card') || container.closest('.project-card') || container;
        clickTarget.addEventListener('click', openViewer);
        
        if (playPauseBtn) playPauseBtn.addEventListener('click', togglePlay);
        if (centerPlayBtn) centerPlayBtn.addEventListener('click', openViewer);
        if (video) video.addEventListener('click', openViewer);

        if (container.dataset.behavior === 'hover') {
            const hoverTarget = container.closest('.showcase-card') || container;
            hoverTarget.addEventListener('mouseenter', () => video.play().catch(() => {}));
            hoverTarget.addEventListener('mouseleave', () => { if(!document.fullscreenElement) video.pause(); });
        }

        video.addEventListener('play', () => {
            container.classList.add('playing');
            container.classList.remove('paused');
        });
        video.addEventListener('pause', () => {
            container.classList.remove('playing');
            container.classList.add('paused');
        });

        video.addEventListener('loadedmetadata', () => {
            if (durationEl) durationEl.textContent = formatTimeLocal(video.duration);
            if (progressBar) progressBar.max = video.duration;
        });

        video.addEventListener('timeupdate', () => {
            if (currentTimeEl) currentTimeEl.textContent = formatTimeLocal(video.currentTime);
            if (progressBar && !container.dataset.scrubbing) {
                progressBar.value = video.currentTime;
            }
        });

        if (progressBar) {
            progressBar.addEventListener('change', () => {
                video.currentTime = progressBar.value;
            });
        }
    });

    // Auto-hide controls logic
    videoContainers.forEach(container => {
        let hideControlsTimeout;
        container.addEventListener('mousemove', () => {
            container.dataset.state = "hover";
            clearTimeout(hideControlsTimeout);
            const video = container.querySelector('video');
            if (video && !video.paused) {
                hideControlsTimeout = setTimeout(() => { container.dataset.state = ""; }, 2500); 
            }
        });
    });
};

document.addEventListener('DOMContentLoaded', () => {
    // Basic Navbar & UI
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

    window.initCustomVideoPlayers();

    if (!window.YT) {
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(tag);
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
                        if (!container.classList.contains('bg-loop')) {
                            initYTControls(container, event.target);
                        }
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
                            startYTProgressLoop(container, event.target);
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

function initYTControls(container, player) {
    const playBtn = container.querySelector('.yt-play-btn');
    const muteBtn = container.querySelector('.yt-mute-btn');
    const volSlider = container.querySelector('.yt-volume-slider');
    const progressBar = container.querySelector('.yt-progress');
    const qualityOptions = container.querySelectorAll('.quality-option');

    if (playBtn) {
        playBtn.onclick = (e) => {
            e.stopPropagation();
            const state = player.getPlayerState();
            state === 1 ? player.pauseVideo() : player.playVideo();
        };
    }
    if (muteBtn) {
        muteBtn.onclick = (e) => {
            e.stopPropagation();
            player.isMuted() ? player.unMute() : player.mute();
        };
    }
    if (volSlider) {
        volSlider.oninput = (e) => {
            player.setVolume(e.target.value);
            if (e.target.value > 0) player.unMute();
        };
    }
    if (progressBar) {
        progressBar.oninput = (e) => {
            const duration = player.getDuration();
            player.seekTo((e.target.value / 100) * duration);
        };
    }
    qualityOptions.forEach(btn => {
        btn.onclick = (e) => {
            e.stopPropagation();
            player.setPlaybackQuality(btn.dataset.vq);
            qualityOptions.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        };
    });
}

function startYTProgressLoop(container, player) {
    const progressBar = container.querySelector('.yt-progress');
    const currTimeEl = container.querySelector('.current-time');
    const durationEl = container.querySelector('.duration');
    
    function formatTime(s) {
        const m = Math.floor(s / 60);
        const sec = Math.floor(s % 60);
        return `${m}:${sec < 10 ? '0' : ''}${sec}`;
    }

    const update = () => {
        if (player.getPlayerState() !== 1) return;
        const curr = player.getCurrentTime();
        const dur = player.getDuration();
        if (dur > 0) {
            if (progressBar) progressBar.value = (curr / dur) * 100;
            if (currTimeEl) currTimeEl.textContent = formatTime(curr);
            if (durationEl) durationEl.textContent = formatTime(dur);
        }
        requestAnimationFrame(update);
    };
    update();
}

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
