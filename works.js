document.addEventListener('DOMContentLoaded', () => {
    // 1. Unified Configuration & Data
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

    const app = document.getElementById('showcase-app');
    if (!app) return;

    const heroVid = myVideos.find(v => v.isHero) || myVideos[0];
    
    // 2. Render Page Content
    let html = `
        <div class="showcase-hero custom-player" id="hero-player-container" onclick="window.playHeroFS()">
            <div class="hero-video-wrap" style="position: absolute; top:0; left:0; width:100%; height:100%; overflow: hidden; pointer-events: none; z-index: 0;">
                <iframe id="hero-yt-iframe"
                    src="https://www.youtube.com/embed/${heroVid.youtubeId}?enablejsapi=1&autoplay=1&mute=1&loop=1&playlist=${heroVid.youtubeId}&controls=0&modestbranding=1&rel=0&vq=hd1080" 
                    frameborder="0" 
                    style="width: 100vw; height: 56.25vw; min-height: 100vh; min-width: 177.77vh; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); opacity: 1; border: none;" 
                    allow="autoplay; fullscreen">
                </iframe>
                <div class="yt-cover-image" style="background: url('https://img.youtube.com/vi/${heroVid.youtubeId}/maxresdefault.jpg') center/cover; position: absolute; top:0; left:0; width:100%; height:100%; z-index:1; pointer-events:none;"></div>
            </div>
            <div class="hero-vignette"></div>
            <div class="hero-content">
                <span class="hero-badge">Featured Cinematic Edit</span>
                <h1 class="hero-title">${heroVid.title}</h1>
                <p class="hero-subtitle">${heroVid.subtitle}</p>
                <div class="hero-actions">
                    <button class="hero-play-btn" onclick="window.playHeroFS()">
                        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                        Play Fullscreen
                    </button>
                </div>
            </div>
            <div class="hero-fade-bottom"></div>
        </div>
        <div class="showcase-rows-container">
    `;

    const cats = ["Love Reels", "Beyond the Cut", "Special Projects", "Viral Reels", "Identity & Intros"];
    cats.forEach(cat => {
        const vids = myVideos.filter(v => v.category === cat && !v.isHero);
        if (vids.length === 0) return;

        html += `
            <div class="showcase-row reveal">
                <h2 class="row-title">${cat}</h2>
                <div class="slider-wrapper">
                    <button class="slider-arrow left-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="15 18 9 12 15 6"></polyline></svg></button>
                    <div class="row-slider">
                        <div class="slider-track">
                            ${vids.map(v => `
                                <div class="${v.type === 'reel' ? 'showcase-card vertical' : 'showcase-card horizontal'}" onclick="window.playGalleryItem(this)">
                                    <div class="project-img custom-player" data-behavior="hover">
                                        <div class="yt-container" data-yt-id="${v.youtubeId}">
                                            <div class="yt-iframe-placeholder">
                                                <iframe src="https://www.youtube.com/embed/${v.youtubeId}?enablejsapi=1&mute=1&loop=1&playlist=${v.youtubeId}&controls=0&modestbranding=1&rel=0&vq=hd720" style="width:100%; height:115%; top:-7.5%; border:none; position:absolute;"></iframe>
                                            </div>
                                            <div class="yt-cover-image" style="background: url('https://img.youtube.com/vi/${v.youtubeId}/maxresdefault.jpg') center/cover; position:absolute; top:0; left:0; width:100%; height:100%; z-index:2; pointer-events:none;"></div>
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

    // 3. Scroll Reveal Fix
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // 4. Slider Nav
    document.querySelectorAll('.slider-wrapper').forEach(wrapper => {
        const slider = wrapper.querySelector('.row-slider');
        wrapper.querySelector('.left-arrow').onclick = (e) => { e.stopPropagation(); slider.scrollBy({ left: -window.innerWidth * 0.7, behavior: 'smooth' }); };
        wrapper.querySelector('.right-arrow').onclick = (e) => { e.stopPropagation(); slider.scrollBy({ left: window.innerWidth * 0.7, behavior: 'smooth' }); };
    });

    // 5. Trigger YT API Load
    if (!window.YT) {
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(tag);
    } else {
        window.onYouTubeIframeAPIReady();
    }
});

// --- GLOBAL SHOWCASE ENGINE ---
window.ytPlayers = {};
window.onYouTubeIframeAPIReady = function() {
    // Hero Player
    if (document.getElementById('hero-yt-iframe')) {
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

    // Gallery Players
    document.querySelectorAll('.yt-container').forEach((el, idx) => {
        const iframe = el.querySelector('iframe');
        const frameId = `yt-gallery-${idx}`;
        iframe.id = frameId;
        const player = new YT.Player(frameId, {
            events: {
                'onStateChange': (e) => {
                    const card = el.closest('.showcase-card');
                    if (e.data === 1) {
                        card.classList.add('playing');
                        const cover = el.querySelector('.yt-cover-image');
                        if (cover) cover.style.opacity = '0';
                    } else {
                        card.classList.remove('playing');
                    }
                }
            }
        });
        window.ytPlayers[frameId] = player;
        el.dataset.frameId = frameId;
        
        const card = el.closest('.showcase-card');
        card.onmouseenter = () => player.playVideo();
        card.onmouseleave = () => { if (!document.fullscreenElement) player.pauseVideo(); };
    });
};

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
    const player = window.ytPlayers[frameId];
    if (player) {
        player.unMute();
        player.playVideo();
        const fullTarget = card.querySelector('.project-img');
        if (fullTarget.requestFullscreen) fullTarget.requestFullscreen();
        else if (fullTarget.webkitRequestFullscreen) fullTarget.webkitRequestFullscreen();
    }
};

const handleFSExit = () => {
    if (!document.fullscreenElement && !document.webkitFullscreenElement) {
        if (window.ytHeroPlayer) window.ytHeroPlayer.pauseVideo();
        Object.values(window.ytPlayers).forEach(p => p.pauseVideo());
    }
};
document.addEventListener('fullscreenchange', handleFSExit);
document.addEventListener('webkitfullscreenchange', handleFSExit);
