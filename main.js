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
                        
                        // Enforce perfect looping for background videos
                        if (e.data === YT.PlayerState.ENDED && container.classList.contains('bg-loop')) {
                            player.seekTo(0);
                            player.playVideo();
                        }
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
                    if (cur > 20) infoMsg.style.opacity = '0';
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

window.toggleFSHome = function(btn, e) {
    if (e) e.stopPropagation();
    const fullTarget = btn.closest('.project-img');
    if (!document.fullscreenElement && !document.webkitFullscreenElement && !fullTarget.classList.contains('mobile-fullscreen')) {
        try {
            if (fullTarget.requestFullscreen) fullTarget.requestFullscreen();
            else if (fullTarget.webkitRequestFullscreen) fullTarget.webkitRequestFullscreen();
            else fullTarget.classList.add('mobile-fullscreen');
        } catch (err) { fullTarget.classList.add('mobile-fullscreen'); }
    } else {
        if (document.exitFullscreen) document.exitFullscreen();
        else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
        fullTarget.classList.remove('mobile-fullscreen');
    }
};

window.playYTHome = function(btn) {
    const container = btn.closest('.yt-container') || btn.querySelector('.yt-container');
    if (!container) return;
    const ytid = container.dataset.ytId;
    if (ytid) {
        window.openCinematicModal(ytid);
    }
};

document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement && !document.webkitFullscreenElement) {
        if(window.ytHomePlayers) Object.values(window.ytHomePlayers).forEach(p => p.pauseVideo());
    }
});

/* ======================================================================
   PREMIUM CINEMATIC LIGHTBOX ENGINE
   ====================================================================== */
let cinematicPlayer = null;
let clUpdateInterval = null;
window.galleryVideosList = [];
window.currentGalleryIndex = -1;

window.buildGalleryList = function() {
    window.galleryVideosList = [];
    document.querySelectorAll('.yt-container:not(.bg-loop)').forEach(container => {
        const id = container.dataset.ytId;
        if (id && !window.galleryVideosList.includes(id)) window.galleryVideosList.push(id);
    });
};

window.openCinematicModal = function(youtubeId) {
    window.buildGalleryList();
    window.currentGalleryIndex = window.galleryVideosList.indexOf(youtubeId);
    
    let modal = document.getElementById('cinematic-lightbox-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'cinematic-lightbox-modal';
        modal.innerHTML = `
            <div class="cl-backdrop" onclick="window.closeCinematicModal()"></div>
            <div class="cl-content">
                <button class="cl-close" onclick="window.closeCinematicModal()">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
                <button class="cl-nav cl-prev" onclick="window.navCinematicModal(-1)">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
                </button>
                <button class="cl-nav cl-next" onclick="window.navCinematicModal(1)">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </button>
                <div class="cl-player-wrapper" onclick="window.toggleClControls()">
                    <div class="cl-spinner" id="cl-spinner"></div>
                    <div class="cl-blur-bg" id="cl-blur-bg"></div>
                    <div id="cl-yt-mount"></div>
                    
                    <div class="cl-controls-overlay" onclick="event.stopPropagation()">
                        <div class="cl-progress-wrap" onclick="window.seekCl(event)">
                            <div class="cl-progress-bar"><div class="cl-progress-fill" id="cl-progress"></div></div>
                        </div>
                        <div class="cl-controls-main">
                            <div class="cl-controls-group">
                                <button class="cl-btn" onclick="window.toggleClPlay()">
                                    <svg id="cl-icon-play" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style="display:none;"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                                    <svg id="cl-icon-pause" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
                                </button>
                                <div class="cl-volume-wrap">
                                    <button class="cl-btn" onclick="window.toggleClMute()">
                                        <svg id="cl-icon-unmuted" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
                                        <svg id="cl-icon-muted" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:none;"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>
                                    </button>
                                    <input type="range" class="cl-volume-slider" id="cl-vol" min="0" max="100" value="100" oninput="window.setClVol(this.value)">
                                </div>
                                <span class="cl-time"><span id="cl-time-cur">0:00</span> / <span id="cl-time-dur">0:00</span></span>
                            </div>
                            <div class="cl-controls-group">
                                <button class="cl-btn cl-speed-btn" onclick="window.cycleClSpeed()" id="cl-speed">1x</button>
                                <button class="cl-btn" onclick="window.toggleClFS()">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="cl-loading-msg" id="cl-loading-msg">Video quality may take a few seconds to reach maximum resolution</div>
        `;
        document.body.appendChild(modal);

        let startX = 0, startY = 0;
        modal.addEventListener('touchstart', e => { startX = e.changedTouches[0].screenX; startY = e.changedTouches[0].screenY; }, {passive:true});
        modal.addEventListener('touchend', e => {
            let dx = e.changedTouches[0].screenX - startX;
            let dy = e.changedTouches[0].screenY - startY;
            if (Math.abs(dx) > Math.abs(dy)) {
                if (dx > 50) window.navCinematicModal(-1);
                else if (dx < -50) window.navCinematicModal(1);
            } else {
                if (dy > 100) window.closeCinematicModal();
            }
        }, {passive:true});

        document.addEventListener('keydown', e => {
            if (modal.classList.contains('active')) {
                if (e.key === 'Escape') window.closeCinematicModal();
                if (e.key === 'ArrowLeft') window.navCinematicModal(-1);
                if (e.key === 'ArrowRight') window.navCinematicModal(1);
            }
        });
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    if(window.ytHomePlayers) Object.values(window.ytHomePlayers).forEach(p => { if(p && p.pauseVideo) p.pauseVideo(); });
    if(window.activePlayers) Object.values(window.activePlayers).forEach(p => { if(p && p.pauseVideo) p.pauseVideo(); });

    window.loadCinematicVideo(youtubeId);
};

window.loadCinematicVideo = function(youtubeId) {
    const blurBg = document.getElementById('cl-blur-bg');
    const spinner = document.getElementById('cl-spinner');
    const msg = document.getElementById('cl-loading-msg');
    
    blurBg.style.backgroundImage = `url('https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg')`;
    blurBg.style.opacity = '1';
    spinner.style.display = 'block';
    msg.classList.add('show');

    if (!cinematicPlayer) {
        cinematicPlayer = new YT.Player('cl-yt-mount', {
            videoId: youtubeId,
            playerVars: { autoplay: 1, controls: 0, modestbranding: 1, rel: 0, playsinline: 1, vq: 'hd1080' },
            events: {
                'onReady': (e) => {
                    e.target.playVideo();
                    window.startClSync();
                },
                'onStateChange': (e) => {
                    if (e.data === YT.PlayerState.PLAYING) {
                        blurBg.style.opacity = '0';
                        spinner.style.display = 'none';
                        setTimeout(() => msg.classList.remove('show'), 4000);
                        document.getElementById('cl-icon-play').style.display = 'none';
                        document.getElementById('cl-icon-pause').style.display = 'block';
                    } else if (e.data === YT.PlayerState.PAUSED || e.data === YT.PlayerState.ENDED) {
                        document.getElementById('cl-icon-play').style.display = 'block';
                        document.getElementById('cl-icon-pause').style.display = 'none';
                    }
                }
            }
        });
    } else {
        cinematicPlayer.loadVideoById({videoId: youtubeId, suggestedQuality: 'hd1080'});
    }
};

window.closeCinematicModal = function() {
    const modal = document.getElementById('cinematic-lightbox-modal');
    if (modal) modal.classList.remove('active');
    document.body.style.overflow = '';
    if (cinematicPlayer && cinematicPlayer.pauseVideo) cinematicPlayer.pauseVideo();
    if (clUpdateInterval) clearInterval(clUpdateInterval);
};

window.navCinematicModal = function(dir) {
    if (window.galleryVideosList.length === 0) return;
    window.currentGalleryIndex += dir;
    if (window.currentGalleryIndex < 0) window.currentGalleryIndex = window.galleryVideosList.length - 1;
    if (window.currentGalleryIndex >= window.galleryVideosList.length) window.currentGalleryIndex = 0;
    window.loadCinematicVideo(window.galleryVideosList[window.currentGalleryIndex]);
};

window.toggleClPlay = function() {
    if(cinematicPlayer.getPlayerState() === 1) cinematicPlayer.pauseVideo();
    else cinematicPlayer.playVideo();
};

window.toggleClMute = function() {
    if(cinematicPlayer.isMuted()) {
        cinematicPlayer.unMute();
        document.getElementById('cl-icon-unmuted').style.display = 'block';
        document.getElementById('cl-icon-muted').style.display = 'none';
        document.getElementById('cl-vol').value = cinematicPlayer.getVolume();
    } else {
        cinematicPlayer.mute();
        document.getElementById('cl-icon-unmuted').style.display = 'none';
        document.getElementById('cl-icon-muted').style.display = 'block';
        document.getElementById('cl-vol').value = 0;
    }
};

window.setClVol = function(val) {
    cinematicPlayer.unMute();
    cinematicPlayer.setVolume(val);
    if(val > 0) {
        document.getElementById('cl-icon-unmuted').style.display = 'block';
        document.getElementById('cl-icon-muted').style.display = 'none';
    } else {
        document.getElementById('cl-icon-unmuted').style.display = 'none';
        document.getElementById('cl-icon-muted').style.display = 'block';
    }
};

window.seekCl = function(e) {
    const wrap = e.currentTarget;
    const rect = wrap.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    cinematicPlayer.seekTo(pos * cinematicPlayer.getDuration());
};

window.toggleClFS = function() {
    const modal = document.getElementById('cinematic-lightbox-modal');
    if (!document.fullscreenElement && !document.webkitFullscreenElement) {
        if (modal.requestFullscreen) modal.requestFullscreen();
        else if (modal.webkitRequestFullscreen) modal.webkitRequestFullscreen();
    } else {
        if (document.exitFullscreen) document.exitFullscreen();
        else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
    }
};

window.cycleClSpeed = function() {
    const rates = [0.5, 1, 1.25, 1.5, 2];
    let cur = cinematicPlayer.getPlaybackRate();
    let nextIdx = (rates.indexOf(cur) + 1) % rates.length;
    cinematicPlayer.setPlaybackRate(rates[nextIdx]);
    document.getElementById('cl-speed').textContent = rates[nextIdx] + 'x';
};

window.toggleClControls = function() {
    const modal = document.getElementById('cinematic-lightbox-modal');
    modal.classList.toggle('show-controls');
};

window.startClSync = function() {
    if (clUpdateInterval) clearInterval(clUpdateInterval);
    clUpdateInterval = setInterval(() => {
        if(cinematicPlayer && cinematicPlayer.getPlayerState() === 1) {
            const cur = cinematicPlayer.getCurrentTime() || 0;
            const dur = cinematicPlayer.getDuration() || 0;
            if(dur > 0) {
                document.getElementById('cl-progress').style.width = ((cur/dur)*100) + '%';
                document.getElementById('cl-time-cur').textContent = window.formatTimeHome(cur);
                document.getElementById('cl-time-dur').textContent = window.formatTimeHome(dur);
            }
        }
    }, 500);
};
