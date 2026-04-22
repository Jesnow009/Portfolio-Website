document.addEventListener('DOMContentLoaded', () => {
    initShowcase();
});

if (document.readyState === 'complete' || document.readyState === 'interactive') {
    initShowcase();
}

function initShowcase() {
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
        { youtubeId: "1nM34AdYkIY", title: "dott.fx Thunder", subtitle: "Thunder effect reveal", category: "Identity & Intros", type: "mashup" },
        { youtubeId: "8j_sVKgPXNw", title: "youth", subtitle: "“Capturing the pulse of the next generation.”", category: "Instagram Reels", type: "reel" }
    ];

    const heroVid = myVideos.find(v => v.isHero) || myVideos[0];
    
    // 2. Render Interface (Clean Static Image Backdrop - No YouTube Links)
    let html = `
        <div class="showcase-hero" style="background: #000; height: 75vh; min-height: 500px; position: relative; overflow: hidden; display: flex; align-items: center;">
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
            <div class="showcase-row reveal" style="padding: 2rem 0;">
                <h2 class="row-title" style="margin-left: 4%; font-size: 1.8rem; border-left: 4px solid #e50914; padding-left: 15px; margin-bottom: 1rem;">${cat}</h2>
                <div class="slider-wrapper">
                    <button class="slider-arrow left-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="15 18 9 12 15 6"></polyline></svg></button>
                    <div class="row-slider" style="display:flex; overflow-x:auto; scrollbar-width:none; padding: 10px 4%;">
                        <div class="slider-track" style="display:flex; gap:15px;">
                            ${vids.map(v => `
                                <div class="${v.type === 'reel' ? 'showcase-card vertical' : 'showcase-card horizontal'}" onclick="window.playGalleryItem(this)" style="flex:0 0 auto;">
                                    <div class="project-img custom-player" data-behavior="hover">
                                        <div class="yt-container" data-yt-id="${v.youtubeId}">
                                            <div class="yt-iframe-placeholder">
                                                <iframe src="https://www.youtube.com/embed/${v.youtubeId}?enablejsapi=1&mute=1&loop=1&playlist=${v.youtubeId}&controls=0&modestbranding=1&rel=0&vq=hd720" style="width:100%; height:110%; top:-5%; border:none; position:absolute;"></iframe>
                                            </div>
                                            <div class="yt-cover-image" style="background: url('https://img.youtube.com/vi/${v.youtubeId}/maxresdefault.jpg') center/cover; position:absolute; top:0; left:0; width:100%; height:100%; z-index:2;"></div>
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

// VIDEO LOGIC
window.activePlayers = {};
window.onYouTubeIframeAPIReady = function() {
    document.querySelectorAll('.yt-container').forEach((el, idx) => {
        const iframe = el.querySelector('iframe');
        if (!iframe || iframe.id) return;
        const frameId = `yt-gal-${idx}-${Math.random().toString(36).substr(2, 4)}`;
        iframe.id = frameId;
        const player = new YT.Player(frameId, {
            events: {
                'onStateChange': (e) => {
                    const card = el.closest('.showcase-card');
                    if (e.data === 1) {
                        card.classList.add('playing');
                        el.querySelector('.yt-cover-image').style.opacity = '0';
                    } else { card.classList.remove('playing'); }
                }
            }
        });
        window.activePlayers[frameId] = player;
        el.dataset.frameId = frameId;
        const card = el.closest('.showcase-card');
        card.onmouseenter = () => player.playVideo();
        card.onmouseleave = () => { if (!document.fullscreenElement) player.pauseVideo(); };
    });
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
    if (!document.fullscreenElement) Object.values(window.activePlayers).forEach(p => p.pauseVideo());
});
