document.addEventListener('DOMContentLoaded', () => {
    
    // The Video Engine Data - Configured for Cinema-Quality Streaming
    const myVideos = [
        // Hero / Featured
        { 
          cloudinaryId: "Video1_xwrkki", 
          title: "Marco 4K Mashup", 
          subtitle: "Cut beyond the story—into the pulse", 
          category: "Featured", 
          type: "mashup", 
          isHero: true 
        },

        // Blockbuster Trailers / Mashups
        { cloudinaryId: "v1775504630/Video3_o0gyis", title: "Extraction", subtitle: "“One mission. No escape. Only survival.”", category: "Mashup Cuts", type: "mashup" },
        { cloudinaryId: "Bullet_Train_Dott.Fx_xkhdca", title: "Bullet train", subtitle: "Five killers. One train. No brakes.”", category: "Mashup Cuts", type: "mashup" },
        { cloudinaryId: "Video1_xwrkki", title: "Marco", subtitle: "Where chaos meets precision", category: "Mashup Cuts", type: "mashup" },
        { cloudinaryId: "Doctor_Strange_4K_Dott.Fx_x2ghxa", title: "Doctor Strange", subtitle: "Reality is just the beginning", category: "Mashup Cuts", type: "mashup" },
        { cloudinaryId: "v1775504591/John_Wick_Mashup_Dott.Fx_pdxdeb", title: "John Wick Mashup", subtitle: "“You don’t hunt him. He hunts you.”", category: "Mashup Cuts", type: "mashup" },
        { cloudinaryId: "v1775550710/wheel_of_the_time_cut_tmq9wn", title: "Wheel of the Time", subtitle: "“Fate is not chosen… it is woven.”", category: "Mashup Cuts", type: "mashup" },
        { cloudinaryId: "v1775550708/avatar_cut_msnk59", title: "Avatar cut", subtitle: "“Not just a planet… a living soul.”", category: "Mashup Cuts", type: "mashup" },
        { cloudinaryId: "v1775550709/parava_cut_w5ogsa", title: "Parava", subtitle: "“Not just birds… they carried our dreams.”", category: "Mashup Cuts", type: "mashup" },
        { cloudinaryId: "v1775550705/5_1_xbtumo", title: "What is Editing", subtitle: "“Stories aren’t filmed—they’re built in the edit.”", category: "Mashup Cuts", type: "mashup" },
        { cloudinaryId: "v1775550744/Tamil_Filmmakers_tigdbk", title: "Tamil Filmmakers", subtitle: "“They don’t follow trends—they create movements.”", category: "Mashup Cuts", type: "mashup" },

        // Viral Reels (Vertical)
        { cloudinaryId: "v1775554997/reel1_ofapqz", title: "Monologue", subtitle: "The pulse of dialogue: mastering the beat of performance and emotion.", category: "Viral Reels", type: "reel" },
        { cloudinaryId: "v1775554993/reel2_nra1td", title: "Client Video", subtitle: "High-velocity visual rhythm designed for maximum audience engagement.", category: "Viral Reels", type: "reel" },
        { cloudinaryId: "v1775555011/reel3_lux8bx", title: "Weekend Movies", subtitle: "Cinematic atmosphere captured in the fleeting moments of leisure.", category: "Viral Reels", type: "reel" },
        { cloudinaryId: "v1775504623/Reel4_sxipxz", title: "Client Video", subtitle: "A curated showcase of professional narrative and visual excellence.", category: "Viral Reels", type: "reel" },

        // Special Projects / Event Work
        { cloudinaryId: "v1775504612/Sneha_Day_4K_jiglzv", title: "A day with Sneha Shetty Kohli", subtitle: "Honored to host Sneha Shetty Kohli at our campus.", category: "Special Projects", type: "mashup" },
        { cloudinaryId: "v1775504682/Sneha_Shetty_Kohli_y1cwvh", title: "Sneha Shetty Intro", subtitle: "“From screen to stage—stories that inspire.”", category: "Special Projects", type: "mashup" },
        { cloudinaryId: "v1775504609/Vijay_Raghavendra_Inaugural_Video1_g7ai0e", title: "Vijay Raghavendra", subtitle: "“From passion to legacy—his journey continues.”", category: "Special Projects", type: "mashup" },
        { cloudinaryId: "v1775504612/Kumbla_5_m6kkoi", title: "Love Birds", subtitle: "“Love, captured in its purest form.”", category: "Special Projects", type: "mashup" },
        { cloudinaryId: "v1775550718/shootings_stars_cut_mbz4xg", title: "shooting stars", subtitle: "“From stage to soul—every moment mattered.”", category: "Special Projects", type: "mashup" },

        // Identity, Intros & Motion Graphics (Manually Ordered)
        { cloudinaryId: "v1775504660/St.Aloysius_Text_Logo_Intro_wukcqg", title: "St. Aloysius College Name Intro", subtitle: "“Not just a college… a journey that defines us.”", category: "Identity & Intros", type: "mashup" },
        { cloudinaryId: "v1775504650/Department_Of_Media_Studies_Intro_sccd6n", title: "Department of Media Studies", subtitle: "“We don’t just study media… we create it.”", category: "Identity & Intros", type: "mashup" },
        { cloudinaryId: "v1775504664/St.Aloysius_Logo_Intro_nymic4", title: "St. Aloysius College Logo Intro", subtitle: "“Where Stories Begin”", category: "Identity & Intros", type: "mashup" },
        { cloudinaryId: "v1775504667/logo_animation_vwqry7", title: "shooting stars", subtitle: "“Written in the Stars”", category: "Identity & Intros", type: "mashup" },
        { cloudinaryId: "v1775504673/3_sxdkbf", title: "shooting stars", subtitle: "“Destined to Shine”", category: "Identity & Intros", type: "mashup" },
        { cloudinaryId: "v1775504646/Signature_Logo_shgqzv", title: "dott.fx Signature", subtitle: "Signature type intro", category: "Identity & Intros", type: "mashup" },
        { cloudinaryId: "v1775504640/Dott.fx_Intro_qmtghq", title: "dott.fx Thunder", subtitle: "Thunder effect reveal", category: "Identity & Intros", type: "mashup" }
    ];


    const app = document.getElementById('showcase-app');
    const heroVideo = myVideos.find(v => v.isHero) || myVideos[0];
    
    // 1. Render Hero Section
    let heroMediaHTML = '';
    if (heroVideo.vimeoId) {
        heroMediaHTML = `
            <div class="hero-video-wrap" style="position: absolute; top:0; left:0; width:100%; height:100%; overflow: hidden; pointer-events: none; z-index: 0;">
                <iframe 
                    src="https://player.vimeo.com/video/${heroVideo.vimeoId}?autoplay=1&muted=1&loop=1&background=1" 
                    frameborder="0" 
                    style="width: 100vw; height: 56.25vw; min-height: 100vh; min-width: 177.77vh; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); opacity: 0.4; filter: blur(5px) scale(1.05);"
                    allow="autoplay; fullscreen; picture-in-picture" allowfullscreen>
                </iframe>
            </div>`;
    } else if (heroVideo.cloudinaryId) {
        const clUrl = heroVideo.cloudinaryId.includes('/') 
            ? `https://res.cloudinary.com/dtnmadjdd/video/upload/${heroVideo.cloudinaryId}.mp4`
            : `https://res.cloudinary.com/dtnmadjdd/video/upload/f_auto,q_auto/${heroVideo.cloudinaryId}.mp4`;
        heroMediaHTML = `
            <div class="hero-video-wrap" style="position: absolute; top:0; left:0; width:100%; height:100%; overflow: hidden; pointer-events: none; z-index: 0;">
                <video src="${clUrl}" autoplay loop muted playsinline class="video-element hero-video-bg" style="width: 100vw; height: 56.25vw; min-height: 100vh; min-width: 177.77vh; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); opacity: 0.4; filter: blur(5px) scale(1.05);"></video>
            </div>`;
    } else {
        heroMediaHTML = `<video src="${heroVideo.src || '5_1.mp4'}" autoplay loop muted playsinline class="video-element hero-video-bg"></video>`;
    }

    let html = `
        <div class="showcase-hero custom-player" data-behavior="autoplay" style="cursor: pointer;">
            ${heroMediaHTML}
            <div class="hero-vignette"></div>
            
            <div class="hero-content" style="bottom: clamp(10%, 15vw, 20%); left: 4%; width: clamp(300px, 60%, 800px);">
                <span class="hero-badge" style="font-size: clamp(0.7rem, 1vw, 0.8rem); padding: clamp(2px, 0.5vw, 4px) clamp(8px, 1vw, 12px);">Featured Cinematic Edit</span>
                <h1 class="hero-title" style="font-size: clamp(2.5rem, 8vw, 4.5rem); margin-bottom: clamp(10px, 2vw, 20px);">${heroVideo.title}</h1>
                <p class="hero-subtitle" style="font-size: clamp(1rem, 2vw, 1.4rem); margin-bottom: clamp(20px, 3vw, 30px);">${heroVideo.subtitle}</p>
                
                <div class="hero-actions" style="display: flex; align-items: center; gap: 15px; flex-wrap: nowrap;">
                    <button class="hero-play-btn" onclick="this.closest('.showcase-hero').querySelector('iframe')?.requestFullscreen() || this.closest('.showcase-hero').querySelector('video')?.requestFullscreen()" style="border-radius: 4px; padding: clamp(10px, 2vw, 12px) clamp(20px, 4vw, 35px); border: none; font-size: clamp(0.9rem, 1.5vw, 1.1rem); font-weight: 700; display: flex; align-items: center; gap: 10px; cursor: pointer; background: #fff; color: #000; white-space: nowrap; flex-shrink: 0;">
                        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                        Play Fullscreen
                    </button>
                    <button class="mute-btn hero-mute-btn" aria-label="Toggle Mute" style="background: rgba(255,255,255,0.15); border: 2px solid rgba(255,255,255,0.4); border-radius: 50%; width: 44px; height: 44px; cursor: pointer; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(5px); flex-shrink: 0;">
                        <svg class="icon-muted" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" style="display: block;"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>
                        <svg class="icon-unmuted" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" style="display: none;"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
                    </button>
                </div>
            </div>
            <div class="hero-fade-bottom"></div>
        </div>
        <div class="showcase-rows-container">
    `;

    // 2. Helper for cards
    function renderCard(videoObj) {
        const isReel = videoObj.type === 'reel';
        const cardClass = isReel ? "showcase-card vertical" : "showcase-card horizontal";
        
        let mediaHTML = '';
        if (videoObj.vimeoId) {
            mediaHTML = `
                <div class="video-element-wrapper" style="width: 100%; height: 100%; overflow: hidden; position: relative;">
                    <iframe src="https://player.vimeo.com/video/${videoObj.vimeoId}?autoplay=1&muted=1&loop=1&background=1" 
                        style="position: absolute; top:0; left:0; width:100%; height:100%; pointer-events: none;" 
                        frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
                    <div style="position: absolute; top:0; left:0; width:100%; height:100%; z-index: 2; cursor: pointer;" 
                         onclick="this.closest('.project-img').requestFullscreen()"></div>
                </div>`;
        } else if (videoObj.cloudinaryId) {
            // High-Performance Cloudinary Video Delivery
            const clUrl = videoObj.cloudinaryId.includes('/')
                ? `https://res.cloudinary.com/dtnmadjdd/video/upload/${videoObj.cloudinaryId}.mp4`
                : `https://res.cloudinary.com/dtnmadjdd/video/upload/f_auto,q_auto/${videoObj.cloudinaryId}.mp4`;
            mediaHTML = `
                <video src="${clUrl}" loop muted playsinline class="video-element" style="object-fit: contain; width: 100%; height: 100%; background: #000;"></video>
                <div class="player-controls">
                    <div class="progress-container"><input type="range" class="progress-bar" min="0" max="100" value="0" step="0.1"></div>
                    <div class="controls-main">
                        <div class="controls-left">
                            <button class="control-btn play-pause-btn" aria-label="Play/Pause">
                                <svg class="icon-pause" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="display: none;"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
                                <svg class="icon-play" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="display: block;"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                            </button>
                            <div class="volume-container">
                                <button class="control-btn mute-btn" aria-label="Toggle Mute">
                                    <svg class="icon-muted" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display: block;"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>
                                    <svg class="icon-unmuted" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display: none;"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
                                </button>
                                <input type="range" class="volume-slider" min="0" max="1" step="0.05" value="1">
                            </div>
                            <div class="time-display"><span class="current-time">0:00</span> / <span class="duration">0:00</span></div>
                        </div>
                        <div class="controls-right">
                            <button class="control-btn fullscreen-btn" aria-label="Fullscreen"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path></svg></button>
                        </div>
                    </div>
                </div>`;
        } else {
            mediaHTML = `
                <video src="${videoObj.src || '5_1.mp4'}" loop muted playsinline class="video-element" style="object-fit: contain; width: 100%; height: 100%; background: #000;"></video>
                <div class="player-controls">
                    <div class="progress-container"><input type="range" class="progress-bar" min="0" max="100" value="0" step="0.1"></div>
                    <div class="controls-main">
                        <div class="controls-left">
                            <button class="control-btn play-pause-btn" aria-label="Play/Pause">
                                <svg class="icon-pause" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="display: none;"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
                                <svg class="icon-play" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="display: block;"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                            </button>
                            <div class="volume-container">
                                <button class="control-btn mute-btn" aria-label="Toggle Mute">
                                    <svg class="icon-muted" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display: block;"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>
                                    <svg class="icon-unmuted" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display: none;"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
                                </button>
                                <input type="range" class="volume-slider" min="0" max="1" step="0.05" value="1">
                            </div>
                            <div class="time-display"><span class="current-time">0:00</span> / <span class="duration">0:00</span></div>
                        </div>
                        <div class="controls-right">
                            <button class="control-btn fullscreen-btn" aria-label="Fullscreen"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path></svg></button>
                        </div>
                    </div>
                </div>`;
        }

        return `
            <div class="${cardClass}">
                <div class="project-img custom-player" data-behavior="hover">
                     ${mediaHTML}
                     <button class="center-play-btn" aria-label="Play"><svg viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg></button>
                </div>
                <div class="card-metadata"><h3>${videoObj.title}</h3><p>${videoObj.subtitle}</p></div>
            </div>
        `;
    }


    // 3. Build Category Rows
    const rowVideos = myVideos.filter(v => !v.isHero);
    const categories = ["Mashup Cuts", "Special Projects", "Viral Reels", "Identity & Intros"];

    categories.forEach(cat => {
        const matchingVideos = rowVideos.filter(v => v.category === cat);
        if (matchingVideos.length === 0) return;

        html += `
            <div class="showcase-row reveal">
                <h2 class="row-title" style="margin-left: 4%; font-size: clamp(1.5rem, 3.5vw, 2.2rem); font-weight: 800; letter-spacing: -0.5px; border-left: 4px solid #e50914; padding-left: 15px; margin-bottom: 15px;">${cat}</h2>
                <div class="slider-wrapper">
                    <button class="slider-arrow left-arrow" aria-label="Scroll Left">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                    </button>
                    <div class="row-slider" id="row-${cat.replace(/\s+/g, '-').toLowerCase()}">
                        <div class="slider-track" style="display: flex; gap: 20px; padding: 10px 20px;">
                            ${matchingVideos.map(v => renderCard(v)).join('')}
                        </div>
                    </div>
                    <button class="slider-arrow right-arrow" aria-label="Scroll Right">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                    </button>
                </div>
            </div>
        `;
    });

    html += `</div>`;
    app.innerHTML = html;

    // 4. Professional Scrolling Logic
    document.querySelectorAll('.slider-wrapper').forEach(wrapper => {
        const slider = wrapper.querySelector('.row-slider');
        wrapper.querySelector('.left-arrow').onclick = () => slider.scrollBy({ left: -(window.innerWidth * 0.7), behavior: 'smooth' });
        wrapper.querySelector('.right-arrow').onclick = () => slider.scrollBy({ left: (window.innerWidth * 0.7), behavior: 'smooth' });
    });
});
