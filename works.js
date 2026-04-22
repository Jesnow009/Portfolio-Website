document.addEventListener('DOMContentLoaded', () => {
    renderShowcase();
});

// Force render if script loads late
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    renderShowcase();
}

function renderShowcase() {
    const app = document.getElementById('showcase-app');
    if (!app || app.dataset.rendered === "true") return;
    app.dataset.rendered = "true";

    // 1. Unified Cinematic Data
    const myVideos = [
        { youtubeId: "RAO0_nqH4wc", title: "MARCO", subtitle: "Cut beyond the story—into the pulse", category: "Featured", type: "mashup", isHero: true },
        { youtubeId: "sJ8Bt_0QaqE", title: "John Wick Mashup", subtitle: "“You don’t hunt him. He hunts you.”", category: "Beyond the Cut", type: "mashup" },
        { youtubeId: "El7yOj4H7lw", title: "Wheel of the Time", subtitle: "“Fate is not chosen… it is woven.”", category: "Beyond the Cut", type: "mashup" },
        { youtubeId: "e9fVDeoYKqI", title: "Avatar cut", subtitle: "“Not just a planet… a living soul.”", category: "Beyond the Cut", type: "mashup" },
        { youtubeId: "3RkFnMO1AkA", title: "Parava", subtitle: "“Not just birds… they carried our dreams.”", category: "Beyond the Cut", type: "mashup" },
        { youtubeId: "1fhLCzN3W9g", title: "What is Editing", subtitle: "“Stories aren’t filmed—they’re built in the edit.”", category: "Beyond the Cut", type: "mashup" },
        { youtubeId: "4sEgxSRhnGg", title: "Tamil Filmmakers", subtitle: "“They don’t follow trends—they create movements.”", category: "Beyond the Cut", type: "mashup" },
        { youtubeId: "IeAYIBU9zXE", title: "Monologue", subtitle: "The pulse of dialogue: mastering the beat of performance and emotion.", category: "Viral Reels", type: "reel" },
        { youtubeId: "GZ9zKBOjbiE", title: "Client Video", subtitle: "High-velocity visual rhythm designed for maximum audience engagement.", category: "Viral Reels", type: "reel" },
        { youtubeId: "ZJl4KgRSLAk", title: "Weekend Movies", subtitle: "Cinematic atmosphere captured in the fleeting moments of leisure.", category: "Viral Reels", type: "reel" },
        { youtubeId: "VirH3BAegXk", title: "Client Video", subtitle: "A curated showcase of professional narrative and visual excellence.", category: "Viral Reels", type: "reel" },
        { youtubeId: "y0QlnHrg3jE", title: "A day with Sneha Shetty Kohli", subtitle: "Honored to host Sneha Shetty Kohli at our campus.", category: "Special Projects", type: "mashup" },
        { youtubeId: "FmwkYXGVKVU", title: "Sneha Shetty Intro", subtitle: "“From screen to stage—stories that inspire.”", category: "Special Projects", type: "mashup" },
        { youtubeId: "B7kyZeNBV4g", title: "Vijay Raghavendra", subtitle: "“From passion to legacy—his journey continues.”", category: "Special Projects", type: "mashup" },
        { youtubeId: "nX49Q0PDnZg", title: "Love Birds", subtitle: "“Love, captured in its purest form.”", category: "Special Projects", type: "mashup" },
        { youtubeId: "iSYg39mT96I", title: "shooting stars", subtitle: "“From stage to soul—every moment mattered.”", category: "Special Projects", type: "mashup" },
        { youtubeId: "KBEsvHxO5Xs", title: "Sore: A Wife from the Future", subtitle: "Proof that some hearts are worth the ache.", category: "Love Reels", type: "mashup" },
        { youtubeId: "-DjlWTcy9WQ", title: "Palm Springs", subtitle: "If I’m stuck forever, I’m glad it’s with you.", category: "Love Reels", type: "mashup" },
        { youtubeId: "0eC-R5cjrV4", title: "St. Aloysius College Name Intro", subtitle: "“Not just a college… a journey that defines us.”", category: "Identity & Intros", type: "mashup" },
        { youtubeId: "fF-eysi64SE", title: "Department of Media Studies", subtitle: "“We don’t just study media… we create it.”", category: "Identity & Intros", type: "mashup" },
        { youtubeId: "5ggrnfuBGEw", title: "St. Aloysius College Logo Intro", subtitle: "“Where Stories Begin”", category: "Identity & Intros", type: "mashup" },
        { youtubeId: "NAxQEAwgjsI", title: "shooting stars", subtitle: "“Written in the Stars”", category: "Identity & Intros", type: "mashup" },
        { youtubeId: "IeMedCR-u-I", title: "shooting stars", subtitle: "“Destined to Shine”", category: "Identity & Intros", type: "mashup" },
        { youtubeId: "n1Ei_vhqdd0", title: "dott.fx Signature", subtitle: "Signature type intro", category: "Identity & Intros", type: "mashup" },
        { youtubeId: "1nM34AdYkIY", title: "dott.fx Thunder", subtitle: "Thunder effect reveal", category: "Identity & Intros", type: "mashup" }
    ];

    const heroVid = myVideos.find(v => v.isHero) || myVideos[0];
    
    // 2. Render UI
    console.log("Rendering Showcase...");
    let html = `
        <div class="showcase-hero custom-player" id="hero-player-container" onclick="window.playHeroFS()">
            <div class="hero-video-wrap" style="position: absolute; top:0; left:0; width:100%; height:100%; overflow: hidden; pointer-events: none; z-index: -1;">
                <iframe id="hero-yt-iframe"
                    src="https://www.youtube.com/embed/${heroVid.youtubeId}?enablejsapi=1&autoplay=1&mute=1&loop=1&playlist=${heroVid.youtubeId}&controls=0&modestbranding=1&rel=0&vq=hd1080" 
                    frameborder="0" 
                    style="width: 100vw; height: 56.25vw; min-height: 100vh; min-width: 177.77vh; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); opacity: 1; border: none;" 
                    allow="autoplay; fullscreen">
                </iframe>
                <div class="yt-cover-image" style="background: url('https://img.youtube.com/vi/${heroVid.youtubeId}/maxresdefault.jpg') center/cover; position: absolute; top:0; left:0; width:100%; height:100%; z-index:1; transition: opacity 0.8s ease;"></div>
            </div>
            <div class="hero-vignette"></div>
            <div class="hero-content" style="z-index: 10;">
                <span class="hero-badge">Featured Cinematic Edit</span>
                <h1 class="hero-title">${heroVid.title}</h1>
                <p class="hero-subtitle">${heroVid.subtitle}</p>
                <div class="hero-actions">
                    <button class="hero-play-btn" onclick="window.playHeroFS()">
                        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                        Play Fullscreen
                    </button>
                    <button id="hero-mute-btn" class="mute-btn hero-mute-btn" style="background: rgba(255,255,255,0.2); border: 1px solid #fff; border-radius: 50%; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; cursor: pointer; backdrop-filter: blur(5px);">
                        <svg class="icon-muted" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>
                        <svg class="icon-unmuted" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" style="display:none;"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
                    </button>
                </div>
            </div>
            <div class="hero-fade-bottom"></div>
        </div>
        <div class="showcase-rows-container" style="position: relative; z-index: 5;">
    `;

    const categories = ["Love Reels", "Beyond the Cut", "Special Projects", "Viral Reels", "Identity & Intros"];
    categories.forEach(cat => {
        const vids = myVideos.filter(v => v.category && v.category.toLowerCase().trim() === cat.toLowerCase().trim() && !v.isHero);
        if (vids.length === 0) {
            console.warn(`No videos found for category: ${cat}`);
            return;
        }

        html += `
            <div class="showcase-row reveal" style="margin-bottom: 3rem; opacity: 1;">
                <h2 class="row-title" style="margin-left: 4%; font-size: 1.9rem; border-left: 4px solid #e50914; padding-left: 15px; margin-bottom: 1rem;">${cat}</h2>
                <div class="slider-wrapper" style="position: relative;">
                    <button class="slider-arrow left-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="15 18 9 12 15 6"></polyline></svg></button>
                    <div class="row-slider" style="overflow-x: auto; scrollbar-width: none; display: flex; gap: 20px;">
                        <div class="slider-track" style="display: flex; gap: 20px; padding: 10px 4%;">
                            ${vids.map(v => `
                                <div class="${v.type === 'reel' ? 'showcase-card vertical' : 'showcase-card horizontal'}" onclick="window.playGalleryItem(this)" style="flex: 0 0 auto;">
                                    <div class="project-img custom-player" data-behavior="hover">
                                        <div class="yt-container" data-yt-id="${v.youtubeId}">
                                            <div class="yt-iframe-placeholder" style="position: absolute; top:0; left:0; width:100%; height:110%; top:-5%;">
                                                <iframe src="https://www.youtube.com/embed/${v.youtubeId}?enablejsapi=1&mute=1&loop=1&playlist=${v.youtubeId}&controls=0&modestbranding=1&rel=0&vq=hd720" style="width:100%; height:100%; border:none;" allow="autoplay; fullscreen"></iframe>
                                            </div>
                                            <div class="yt-cover-image" style="background: url('https://img.youtube.com/vi/${v.youtubeId}/maxresdefault.jpg') center/cover; position:absolute; top:0; left:0; width:100%; height:100%; z-index:2;"></div>
                                            
                                            <div class="player-controls yt-controls" style="z-index: 10;">
                                                <div class="progress-container"><input type="range" class="progress-bar yt-progress" min="0" max="100" value="0" step="0.1"></div>
                                                <div class="controls-main">
                                                    <div class="controls-left">
                                                        <button class="control-btn yt-play-btn">
                                                            <svg class="icon-play" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                                                            <svg class="icon-pause" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="display:none;"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
                                                        </button>
                                                        <div class="volume-container">
                                                            <button class="control-btn yt-mute-btn">
                                                                <svg class="icon-unmuted" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
                                                                <svg class="icon-muted" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:none;"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>
                                                            </button>
                                                            <input type="range" class="volume-slider yt-volume-slider" min="0" max="100" value="100">
                                                        </div>
                                                        <div class="time-display" style="font-size:12px; margin-left:10px;"><span class="current-time">0:00</span> / <span class="duration">0:00</span></div>
                                                    </div>
                                                    <div class="controls-right">
                                                        <div class="inline-quality-selector" style="display:flex; gap:5px;">
                                                            <button class="quality-option active" data-vq="hd720">720p</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <button class="center-play-btn"><svg viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg></button>
                                        </div>
                                    </div>
                                    <div class="card-metadata"><h3>${v.title}</h3><p>${v.subtitle}</p></div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    <button class="slider-arrow right-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="9 18 15 12 9 6"></polyline></svg></button>
                </div>
            </div>
        `;
    });

    html += `</div>`;
    app.innerHTML = html;

    // 3. Post-Render Setup
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    document.querySelectorAll('.slider-wrapper').forEach(wrapper => {
        const slider = wrapper.querySelector('.row-slider');
        wrapper.querySelector('.left-arrow').onclick = (e) => { e.stopPropagation(); slider.scrollBy({ left: -window.innerWidth * 0.7, behavior: 'smooth' }); };
        wrapper.querySelector('.right-arrow').onclick = (e) => { e.stopPropagation(); slider.scrollBy({ left: window.innerWidth * 0.7, behavior: 'smooth' }); };
    });

    if (!window.YT) {
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(tag);
    } else {
        window.onYouTubeIframeAPIReady();
    }
}

// GLOBAL YOUTUBE ENGINE
window.activePlayers = window.activePlayers || {};
window.onYouTubeIframeAPIReady = function() {
    console.log("YouTube API Ready...");
    // Hero
    const heroFrame = document.getElementById('hero-yt-iframe');
    if (heroFrame && !window.ytHeroPlayer) {
        window.ytHeroPlayer = new YT.Player('hero-yt-iframe', {
            events: {
                'onReady': (e) => { e.target.mute(); e.target.playVideo(); },
                'onStateChange': (e) => {
                    if (e.data === 1) {
                        const cover = document.querySelector('#hero-player-container .yt-cover-image');
                        if (cover) cover.style.opacity = '0';
                    }
                }
            }
        });
    }

    // Gallery
    document.querySelectorAll('.yt-container').forEach((el, idx) => {
        const iframe = el.querySelector('iframe');
        if (!iframe || iframe.id) return; 
        const frameId = `yt-gallery-${idx}-${Math.random().toString(36).substr(2, 5)}`;
        iframe.id = frameId;
        const player = new YT.Player(frameId, {
            events: {
                'onReady': (e) => {
                    initShowcaseControls(el, e.target);
                },
                'onStateChange': (e) => {
                    const card = el.closest('.showcase-card');
                    const centerBtn = el.querySelector('.center-play-btn');
                    const cover = el.querySelector('.yt-cover-image');
                    const playIcon = el.querySelector('.icon-play');
                    const pauseIcon = el.querySelector('.icon-pause');

                    if (e.data === 1) { // Playing
                        card.classList.add('playing');
                        if (cover) cover.style.opacity = '0';
                        if (centerBtn) centerBtn.style.opacity = '0';
                        if (playIcon) playIcon.style.display = 'none';
                        if (pauseIcon) pauseIcon.style.display = 'block';
                    } else {
                        card.classList.remove('playing');
                        if (centerBtn) centerBtn.style.opacity = '1';
                        if (playIcon) playIcon.style.display = 'block';
                        if (pauseIcon) pauseIcon.style.display = 'none';
                    }
                }
            }
        });
        window.activePlayers[frameId] = player;
        el.dataset.frameId = frameId;
    });
};

function initShowcaseControls(container, player) {
    const playBtn = container.querySelector('.yt-play-btn');
    const muteBtn = container.querySelector('.yt-mute-btn');
    const volSlider = container.querySelector('.yt-volume-slider');
    const progressBar = container.querySelector('.yt-progress');
    const qualityBtns = container.querySelectorAll('.quality-option');

    if (playBtn) {
        playBtn.onclick = (e) => { e.stopPropagation(); player.getPlayerState() === 1 ? player.pauseVideo() : player.playVideo(); };
    }
    if (muteBtn) {
        muteBtn.onclick = (e) => {
            e.stopPropagation();
            if (player.isMuted()) { 
                player.unMute(); 
                container.querySelector('.icon-muted').style.display='none'; 
                container.querySelector('.icon-unmuted').style.display='block'; 
            } else { 
                player.mute(); 
                container.querySelector('.icon-muted').style.display='block'; 
                container.querySelector('.icon-unmuted').style.display='none'; 
            }
        };
    }
    if (volSlider) {
        volSlider.oninput = (e) => { e.stopPropagation(); player.setVolume(e.target.value); if(e.target.value > 0) player.unMute(); };
    }
    if (progressBar) {
        progressBar.oninput = (e) => { e.stopPropagation(); player.seekTo((e.target.value / 100) * player.getDuration()); };
    }
    qualityBtns.forEach(btn => {
        btn.onclick = (e) => {
            e.stopPropagation();
            player.setPlaybackQuality(btn.dataset.vq);
            qualityBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        };
    });

    setInterval(() => {
        if (player.getPlayerState() === 1) {
            const cur = player.getCurrentTime();
            const dur = player.getDuration();
            if (dur > 0) {
                if (progressBar) progressBar.value = (cur / dur) * 100;
                container.querySelector('.current-time').textContent = formatTime(cur);
                container.querySelector('.duration').textContent = formatTime(dur);
            }
        }
    }, 1000);
}

function formatTime(s) {
    const m = Math.floor(s / 60);
    const rs = Math.floor(s % 60);
    return `${m}:${rs < 10 ? '0' : ''}${rs}`;
}

window.playHeroFS = function() {
    if (window.ytHeroPlayer) {
        window.ytHeroPlayer.unMute();
        window.ytHeroPlayer.playVideo();
        const container = document.getElementById('hero-player-container');
        if (container.requestFullscreen) container.requestFullscreen();
        else if (container.webkitRequestFullscreen) container.webkitRequestFullscreen();
    }
};

window.playGalleryItem = function(card) {
    const container = card.querySelector('.yt-container');
    const frameId = container.dataset.frameId;
    const player = window.activePlayers[frameId];
    if (player) {
        player.unMute();
        player.playVideo();
        const fullTarget = card.querySelector('.project-img');
        if (fullTarget.requestFullscreen) fullTarget.requestFullscreen();
        else if (fullTarget.webkitRequestFullscreen) fullTarget.webkitRequestFullscreen();
    }
};

document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
        if (window.ytHeroPlayer) window.ytHeroPlayer.pauseVideo();
        Object.values(window.activePlayers).forEach(p => p.pauseVideo());
    }
});
