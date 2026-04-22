document.addEventListener('DOMContentLoaded', () => {
    renderShowcaseEngine();
});

if (document.readyState === 'complete' || document.readyState === 'interactive') {
    renderShowcaseEngine();
}

function renderShowcaseEngine() {
    const app = document.getElementById('showcase-app');
    if (!app || app.dataset.rendered === "true") return;
    app.dataset.rendered = "true";

    const myVideos = [
        { youtubeId: "RAO0_nqH4wc", title: "MARCO", subtitle: "Cut beyond the story—into the pulse", category: "Featured", type: "mashup", isHero: true },
        { youtubeId: "sJ8Bt_0QaqE", title: "John Wick Mashup", subtitle: "“You don’t hunt him. He hunts you.”", category: "Beyond the Cut", type: "mashup" },
        { youtubeId: "El7yOj4H7lw", title: "Wheel of the Time", subtitle: "“Fate is not chosen… it is woven.”", category: "Beyond the Cut", type: "mashup" },
        { youtubeId: "e9fVDeoYKqI", title: "Avatar cut", subtitle: "“Not just a planet… a living soul.”", category: "Beyond the Cut", type: "mashup" },
        { youtubeId: "3RkFnMO1AkA", title: "Parava", subtitle: "“Not just birds… they carried our dreams.”", category: "Beyond the Cut", type: "mashup" },
        { youtubeId: "1fhLCzN3W9g", title: "What is Editing", subtitle: "“Stories aren’t filmed—they’re built in the edit.”", category: "Beyond the Cut", type: "mashup" },
        { youtubeId: "4sEgxSRhnGg", title: "Tamil Filmmakers", subtitle: "“They don’t follow trends—they create movements.”", category: "Beyond the Cut", type: "mashup" },
        { youtubeId: "8j_sVKgPXNw", title: "youth", subtitle: "“Capturing the pulse of the next generation.”", category: "Instagram Reels", type: "reel" },
        { youtubeId: "y0QlnHrg3jE", title: "A day with Sneha Shetty Kohli", subtitle: "Honored to host Sneha Shetty Kohli at our campus.", category: "Special Projects", type: "mashup" },
        { youtubeId: "FmwkYXGVKVU", title: "Sneha Shetty Intro", subtitle: "“From screen to stage—stories that inspire.”", category: "Special Projects", type: "mashup" },
        { youtubeId: "B7kyZeNBV4g", title: "Vijay Raghavendra", subtitle: "“From passion to legacy—his journey continues.”", category: "Special Projects", type: "mashup" },
        { youtubeId: "nX49Q0PDnZg", title: "Love Birds", subtitle: "“Love, captured in its purest form.”", category: "Special Projects", type: "mashup" },
        { youtubeId: "iSYg39mT96I", title: "shooting stars", subtitle: "“From stage to soul—every moment mattered.”", category: "Special Projects", type: "mashup" },
        { youtubeId: "IeAYIBU9zXE", title: "Monologue", subtitle: "The pulse of dialogue: mastering the beat of performance and emotion.", category: "Viral Reels", type: "reel" },
        { youtubeId: "GZ9zKBOjbiE", title: "Client Video", subtitle: "High-velocity visual rhythm designed for maximum audience engagement.", category: "Viral Reels", type: "reel" },
        { youtubeId: "ZJl4KgRSLAk", title: "Weekend Movies", subtitle: "Cinematic atmosphere captured in the fleeting moments of leisure.", category: "Viral Reels", type: "reel" },
        { youtubeId: "VirH3BAegXk", title: "Client Video", subtitle: "A curated showcase of professional narrative and visual excellence.", category: "Viral Reels", type: "reel" },
        { youtubeId: "0eC-R5cjrV4", title: "St. Aloysius College Name Intro", subtitle: "“Not just a college… a journey that defines us.”", category: "Identity & Intros", type: "mashup" },
        { youtubeId: "fF-eysi64SE", title: "Department of Media Studies", subtitle: "“We don’t just study media… we create it.”", category: "Identity & Intros", type: "mashup" },
        { youtubeId: "5ggrnfuBGEw", title: "St. Aloysius College Logo Intro", subtitle: "“Where Stories Begin”", category: "Identity & Intros", type: "mashup" },
        { youtubeId: "NAxQEAwgjsI", title: "shooting stars", subtitle: "“Written in the Stars”", category: "Identity & Intros", type: "mashup" },
        { youtubeId: "IeMedCR-u-I", title: "shooting stars", subtitle: "“Destined to Shine”", category: "Identity & Intros", type: "mashup" },
        { youtubeId: "n1Ei_vhqdd0", title: "dott.fx Signature", subtitle: "Signature type intro", category: "Identity & Intros", type: "mashup" },
        { youtubeId: "1nM34AdYkIY", title: "dott.fx Thunder", subtitle: "Thunder effect reveal", category: "Identity & Intros", type: "mashup" }
    ];

    const heroVid = myVideos.find(v => v.isHero) || myVideos[0];
    
    let html = `
        <div class="showcase-hero" id="hero-player-container" style="background: #000; height: 75vh; min-height: 500px; position: relative; overflow: hidden; display: flex; align-items: center;">
            <div class="hero-image-wrap" style="position: absolute; top:0; left:0; width:100%; height:100%; z-index: 1;">
                <img src="backdrop_timeline.jpg.jpg" style="width:100%; height:100%; object-fit: cover; opacity: 0.8; filter: brightness(0.6) contrast(1.1);">
            </div>
            <div class="hero-vignette" style="z-index: 2; position: absolute; top:0; left:0; width:100%; height:100%; background: linear-gradient(to right, rgba(0,0,0,0.8), transparent, rgba(0,0,0,0.8)), linear-gradient(to top, #000, transparent);"></div>
            <div class="hero-content" style="z-index: 10; position: relative; padding: 0 4%;">
                <span style="color: #e50914; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; font-size: 0.9rem; border-left: 3px solid #e50914; padding-left: 10px; margin-bottom: 20px; display: inline-block;">Professional Showcase</span>
                <h1 style="font-size: 5rem; font-weight: 900; line-height: 1; margin: 10px 0 20px 0;">PORTFOLIO</h1>
                <p style="font-size: 1.2rem; color: #ccc; max-width: 500px; line-height: 1.6;">Advanced Video Editing & Motion Design. Exploring the boundaries of visual storytelling through high-fidelity mashups and viral reel content.</p>
            </div>
            <div class="hero-fade-bottom" style="z-index: 3; position: absolute; bottom:0; left:0; width:100%; height:150px; background: linear-gradient(to top, #000, transparent);"></div>
        </div>
        <div class="showcase-rows-container" style="background: #000; position: relative; z-index: 5;">
    `;

    const categories = ["Beyond the Cut", "Instagram Reels", "Special Projects", "Viral Reels", "Identity & Intros"];
    categories.forEach(cat => {
        const vids = myVideos.filter(v => v.category && v.category.toLowerCase().trim() === cat.toLowerCase().trim() && !v.isHero);
        if (vids.length === 0) return;

        html += `
            <div class="showcase-row reveal" style="padding: 2.5rem 0;">
                <h2 class="row-title" style="margin-left: 4%; font-size: 1.9rem; border-left: 4px solid #e50914; padding-left: 15px; margin-bottom: 1.5rem; text-transform: uppercase; letter-spacing: 1px;">${cat}</h2>
                <div class="slider-wrapper">
                    <button class="slider-arrow left-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="15 18 9 12 15 6"></polyline></svg></button>
                    <div class="row-slider" style="display:flex; overflow-x:auto; scrollbar-width:none; padding: 10px 4%;">
                        <div class="slider-track" style="display:flex; gap:20px;">
                            ${vids.map(v => `
                                <div class="${v.type === 'reel' ? 'showcase-card vertical' : 'showcase-card horizontal'}" onclick="window.playGalleryItem(this)" style="flex:0 0 auto;">
                                    <div class="project-img custom-player" data-behavior="hover" style="background:#000;">
                                        <div class="yt-container" data-yt-id="${v.youtubeId}">
                                            <div class="yt-iframe-placeholder" style="position: absolute; top:0; left:0; width:100%; height:110%; top:-5%; transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);">
                                                <iframe src="https://www.youtube.com/embed/${v.youtubeId}?enablejsapi=1&mute=1&loop=1&playlist=${v.youtubeId}&controls=0&modestbranding=1&rel=0&vq=hd720" style="width:100%; height:100%; border:none; position:absolute;" allow="autoplay; fullscreen"></iframe>
                                            </div>
                                            <div class="yt-cover-image" style="background: url('https://img.youtube.com/vi/${v.youtubeId}/maxresdefault.jpg') center/cover; position:absolute; top:0; left:0; width:100%; height:100%; z-index:2; transition: opacity 0.5s ease;"></div>
                                            
                                            <div class="player-controls yt-controls" style="z-index: 10; opacity: 0; transition: opacity 0.3s ease;">
                                                <div class="progress-container" style="padding: 0 10px;"><input type="range" class="progress-bar yt-progress" min="0" max="100" value="0" step="0.1" style="width:100%;"></div>
                                                <div class="controls-main" style="display:flex; align-items:center; justify-content:space-between; padding: 5px 10px;">
                                                    <div class="controls-left" style="display:flex; align-items:center; gap:10px;">
                                                        <button class="control-btn yt-play-btn" style="background:none; border:none; color:white; cursor:pointer;">
                                                            <svg class="icon-play" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                                                            <svg class="icon-pause" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style="display:none;"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
                                                        </button>
                                                        <div class="volume-container" style="display:flex; align-items:center; gap:5px;">
                                                            <button class="control-btn yt-mute-btn" style="background:none; border:none; color:white; cursor:pointer;">
                                                                <svg class="icon-unmuted" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
                                                                <svg class="icon-muted" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:none;"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>
                                                            </button>
                                                            <input type="range" class="volume-slider yt-volume-slider" min="0" max="100" value="100" style="width:40px;">
                                                        </div>
                                                        <div class="time-display" style="font-size:11px; font-weight:600; color:#eee;"><span class="current-time">0:00</span> / <span class="duration">0:00</span></div>
                                                    </div>

                                                    <!-- Dynamic Info Message -->
                                                    <div class="quality-info-msg" style="font-size: 10px; color: #ffffff; opacity: 1; transition: opacity 1.5s ease; flex-grow: 1; text-align: center; letter-spacing: 0.5px; font-weight: 700;">
                                                        “Video quality will automatically adjust to maximum within a few seconds based on your connection.”
                                                    </div>

                                                    <div class="controls-right" style="display:flex; align-items:center; gap:4px;">
                                                        ${cat === 'Instagram Reels' ? `<button class="rotate-btn" style="background:rgba(255,255,255,0.1); border:none; color:white; font-size:10px; font-weight:700; padding:3px 8px; border-radius:4px; cursor:pointer; text-transform:uppercase;" onclick="window.toggleRotate(this, event)">Rotate</button>` : ''}
                                                        <button class="quality-btn" data-vq="highres" style="background:rgba(255,255,255,0.1); border:none; color:white; font-size:10px; font-weight:700; padding:3px 8px; border-radius:4px; cursor:pointer;">2160p</button>
                                                        <button class="quality-btn" data-vq="hd1080" style="background:rgba(255,255,255,0.1); border:none; color:white; font-size:10px; font-weight:700; padding:3px 8px; border-radius:4px; cursor:pointer;">1080p</button>
                                                        <button class="quality-btn active" data-vq="hd720" style="background:#e50914; border:none; color:white; font-size:10px; font-weight:800; padding:3px 8px; border-radius:4px; cursor:pointer; box-shadow: 0 0 10px rgba(229, 9, 20, 0.5);">720p</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <button class="center-play-btn" style="z-index: 5;"><svg viewBox="0 0 24 24" fill="white" width="40" height="40"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg></button>
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

    // Listeners
    document.querySelectorAll('.slider-wrapper').forEach(wrapper => {
        const slider = wrapper.querySelector('.row-slider');
        wrapper.querySelector('.left-arrow').onclick = (e) => { e.stopPropagation(); slider.scrollBy({ left: -window.innerWidth * 0.7, behavior: 'smooth' }); };
        wrapper.querySelector('.right-arrow').onclick = (e) => { e.stopPropagation(); slider.scrollBy({ left: window.innerWidth * 0.7, behavior: 'smooth' }); };
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('active'); observer.unobserve(e.target); } });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    if (!window.YT) {
        const tag = document.createElement('script'); tag.src = "https://www.youtube.com/iframe_api"; document.body.appendChild(tag);
    } else { if(window.onYouTubeIframeAPIReady) window.onYouTubeIframeAPIReady(); }
}

// INTELLIGENT PLAYER ENGINE
window.activePlayers = window.activePlayers || {};
window.onYouTubeIframeAPIReady = function() {
    document.querySelectorAll('.yt-container').forEach((el, idx) => {
        const iframe = el.querySelector('iframe');
        if (!iframe || iframe.id) return;
        const frameId = `yt-intel-${idx}-${Math.random().toString(36).substr(2, 4)}`;
        iframe.id = frameId;
        const player = new YT.Player(frameId, {
            events: {
                'onReady': (e) => { 
                    e.target.setPlaybackQuality('hd720'); 
                    initProfessionalControls(el, e.target); 
                },
                'onStateChange': (e) => {
                    const card = el.closest('.showcase-card');
                    const cover = el.querySelector('.yt-cover-image');
                    const centerBtn = el.querySelector('.center-play-btn');
                    const controls = el.querySelector('.player-controls');
                    if (e.data === 1) { 
                        card.classList.add('playing');
                        if (cover) cover.style.opacity = '0';
                        if (centerBtn) centerBtn.style.opacity = '0';
                        if (controls) controls.style.opacity = '1';
                    } else { card.classList.remove('playing'); if (centerBtn) centerBtn.style.opacity = '1'; }
                }
            }
        });
        window.activePlayers[frameId] = player;
        el.dataset.frameId = frameId;
        const card = el.closest('.showcase-card');
        card.onmouseenter = () => { player.playVideo(); };
        card.onmouseleave = () => { if (!document.fullscreenElement) player.pauseVideo(); };
    });
};

function initProfessionalControls(container, player) {
    const playBtn = container.querySelector('.yt-play-btn');
    const muteBtn = container.querySelector('.yt-mute-btn');
    const volSlider = container.querySelector('.yt-volume-slider');
    const progressBar = container.querySelector('.yt-progress');
    const qualityBtns = container.querySelectorAll('.quality-btn');
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
            qualityBtns.forEach(b => { b.classList.remove('active'); b.style.background='rgba(255,255,255,0.1)'; b.style.boxShadow='none'; });
            btn.classList.add('active'); btn.style.background='#e50914'; btn.style.boxShadow='0 0 10px rgba(229, 9, 20, 0.6)';
        };
    });

    setInterval(() => {
        if (player.getPlayerState() === 1) {
            const cur = player.getCurrentTime(); const dur = player.getDuration();
            if (dur > 0) {
                if (progressBar) progressBar.value = (cur / dur) * 100;
                container.querySelector('.current-time').textContent = formatTime(cur);
                container.querySelector('.duration').textContent = formatTime(dur);
                
                // 10 Second Auto-Hide Logic
                if (infoMsg) {
                    if (cur > 10) infoMsg.style.opacity = '0';
                    else infoMsg.style.opacity = '1';
                }
            }
        }
    }, 1000);
}

function formatTime(s) {
    const m = Math.floor(s / 60); const rs = Math.floor(s % 60);
    return `${m}:${rs < 10 ? '0' : ''}${rs}`;
}

window.toggleRotate = function(btn, e) {
    e.stopPropagation();
    const container = btn.closest('.yt-container');
    const iframeWrap = container.querySelector('.yt-iframe-placeholder');
    if (!iframeWrap) return;
    const isFS = document.fullscreenElement || document.webkitFullscreenElement;
    if (iframeWrap.style.transform.includes('rotate(-90deg)')) {
        iframeWrap.style.transform = 'none'; iframeWrap.style.width = '100%'; iframeWrap.style.height = '110%'; iframeWrap.style.top = '-5%'; iframeWrap.style.left = '0';
    } else {
        if (isFS) {
            iframeWrap.style.transform = 'translate(-50%, -50%) rotate(-90deg)';
            iframeWrap.style.width = '100vh'; iframeWrap.style.height = '100vw';
            iframeWrap.style.top = '50%'; iframeWrap.style.left = '50%'; iframeWrap.style.position = 'fixed';
        } else {
            iframeWrap.style.transform = 'rotate(-90deg) scale(1.77)'; 
            iframeWrap.style.width = '100%'; iframeWrap.style.height = '100%'; iframeWrap.style.top = '0'; iframeWrap.style.left = '0';
        }
    }
};

window.playGalleryItem = function(card) {
    const container = card.querySelector('.yt-container');
    const frameId = container.dataset.frameId;
    const player = window.activePlayers[frameId];
    if (player) {
        player.unMute(); player.playVideo();
        const fullTarget = card.querySelector('.project-img');
        if (fullTarget.requestFullscreen) fullTarget.requestFullscreen();
        else if (fullTarget.webkitRequestFullscreen) fullTarget.webkitRequestFullscreen();
    }
};

document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement && !document.webkitFullscreenElement) {
        Object.values(window.activePlayers).forEach(p => {
            p.pauseVideo();
            const iframes = document.querySelectorAll('.yt-iframe-placeholder');
            iframes.forEach(f => { f.style.transform = 'none'; f.style.width='100%'; f.style.height='110%'; f.style.top='-5%'; f.style.left='0'; f.style.position='absolute'; });
        });
    }
});
