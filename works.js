document.addEventListener('DOMContentLoaded', () => {
    
    // The Video Engine Data - Configured for Cinema-Quality Streaming
    const myVideos = [
        // Hero / Featured
        { 
          youtubeId: "RAO0_nqH4wc", 
          title: "MARCO", 
          subtitle: "Cut beyond the story—into the pulse", 
          category: "Featured", 
          type: "mashup", 
          isHero: true 
        },

        // Blockbuster Trailers / Mashups
        { youtubeId: "RAO0_nqH4wc", title: "MARCO", subtitle: "Where chaos meets precision", category: "Mashup Cuts", type: "mashup" },
        { youtubeId: "9FDrKlWOojs", title: "Extraction", subtitle: "“One mission. No escape. Only survival.”", category: "Mashup Cuts", type: "mashup" },
        { youtubeId: "84IrieuQCng", title: "Bullet train", subtitle: "Five killers. One train. No brakes.”", category: "Mashup Cuts", type: "mashup" },
        { youtubeId: "vNWqyKHpF-I", title: "Doctor Strange", subtitle: "Reality is just the beginning", category: "Mashup Cuts", type: "mashup" },
        { youtubeId: "sJ8Bt_0QaqE", title: "John Wick Mashup", subtitle: "“You don’t hunt him. He hunts you.”", category: "Mashup Cuts", type: "mashup" },
        { youtubeId: "El7yOj4H7lw", title: "Wheel of the Time", subtitle: "“Fate is not chosen… it is woven.”", category: "Mashup Cuts", type: "mashup" },
        { youtubeId: "e9fVDeoYKqI", title: "Avatar cut", subtitle: "“Not just a planet… a living soul.”", category: "Mashup Cuts", type: "mashup" },
        { youtubeId: "3RkFnMO1AkA", title: "Parava", subtitle: "“Not just birds… they carried our dreams.”", category: "Mashup Cuts", type: "mashup" },
        { youtubeId: "1fhLCzN3W9g", title: "What is Editing", subtitle: "“Stories aren’t filmed—they’re built in the edit.”", category: "Mashup Cuts", type: "mashup" },
        { youtubeId: "4sEgxSRhnGg", title: "Tamil Filmmakers", subtitle: "“They don’t follow trends—they create movements.”", category: "Mashup Cuts", type: "mashup" },

        // Viral Reels (Vertical)
        { cloudinaryId: "v1775554997/reel1_ofapqz", title: "Monologue", subtitle: "The pulse of dialogue: mastering the beat of performance and emotion.", category: "Viral Reels", type: "reel" },
        { cloudinaryId: "v1775554993/reel2_nra1td", title: "Client Video", subtitle: "High-velocity visual rhythm designed for maximum audience engagement.", category: "Viral Reels", type: "reel" },
        { cloudinaryId: "v1775555011/reel3_lux8bx", title: "Weekend Movies", subtitle: "Cinematic atmosphere captured in the fleeting moments of leisure.", category: "Viral Reels", type: "reel" },
        { cloudinaryId: "v1775504623/Reel4_sxipxz", title: "Client Video", subtitle: "A curated showcase of professional narrative and visual excellence.", category: "Viral Reels", type: "reel" },

        // Special Projects / Event Work
        { youtubeId: "y0QlnHrg3jE", title: "A day with Sneha Shetty Kohli", subtitle: "Honored to host Sneha Shetty Kohli at our campus.", category: "Special Projects", type: "mashup" },
        { youtubeId: "FmwkYXGVKVU", title: "Sneha Shetty Intro", subtitle: "“From screen to stage—stories that inspire.”", category: "Special Projects", type: "mashup" },
        { youtubeId: "B7kyZeNBV4g", title: "Vijay Raghavendra", subtitle: "“From passion to legacy—his journey continues.”", category: "Special Projects", type: "mashup" },
        { youtubeId: "nX49Q0PDnZg", title: "Love Birds", subtitle: "“Love, captured in its purest form.”", category: "Special Projects", type: "mashup" },
        { youtubeId: "iSYg39mT96I", title: "shooting stars", subtitle: "“From stage to soul—every moment mattered.”", category: "Special Projects", type: "mashup" },
        // Love Reels
        { youtubeId: "KBEsvHxO5Xs", title: "Sore: A Wife from the Future", subtitle: "Proof that some hearts are worth the ache.", category: "Love Reels", type: "mashup" },
        { youtubeId: "-DjlWTcy9WQ", title: "Palm Springs", subtitle: "If I’m stuck forever, I’m glad it’s with you.", category: "Love Reels", type: "mashup" },

        // Identity, Intros & Motion Graphics (Manually Ordered)
        { youtubeId: "0eC-R5cjrV4", title: "St. Aloysius College Name Intro", subtitle: "“Not just a college… a journey that defines us.”", category: "Identity & Intros", type: "mashup" },
        { youtubeId: "fF-eysi64SE", title: "Department of Media Studies", subtitle: "“We don’t just study media… we create it.”", category: "Identity & Intros", type: "mashup" },
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
    } else if (heroVideo.youtubeId) {
        heroMediaHTML = `
            <div class="hero-video-wrap" style="position: absolute; top:0; left:0; width:100%; height:100%; overflow: hidden; pointer-events: none; z-index: 0;">
                <iframe 
                    src="https://www.youtube.com/embed/${heroVideo.youtubeId}?enablejsapi=1&mute=1&loop=1&playlist=${heroVideo.youtubeId}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&vq=highres&hd=1" 
                    frameborder="0" 
                    style="width: 100vw; height: 56.25vw; min-height: 100vh; min-width: 177.77vh; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); opacity: 0.4; filter: blur(5px) scale(1.05);"
                    allow="autoplay; fullscreen">
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
        <div class="showcase-hero custom-player" data-behavior="autoplay" style="cursor: pointer;" id="hero-player-container" onclick="if(window.ytHeroPlayer) { window.ytHeroPlayer.unMute(); window.ytHeroPlayer.playVideo(); this.requestFullscreen(); }">
            ${heroMediaHTML}
            <div class="hero-vignette"></div>
            
            <div class="hero-content" style="bottom: clamp(10%, 15vw, 20%); left: 4%; width: clamp(300px, 60%, 800px);">
                <span class="hero-badge" style="font-size: clamp(0.7rem, 1vw, 0.8rem); padding: clamp(2px, 0.5vw, 4px) clamp(8px, 1vw, 12px);">Featured Cinematic Edit</span>
                <h1 class="hero-title" style="font-size: clamp(2.5rem, 8vw, 4.5rem); margin-bottom: clamp(10px, 2vw, 20px);">${heroVideo.title}</h1>
                <p class="hero-subtitle" style="font-size: clamp(1rem, 2vw, 1.4rem); margin-bottom: clamp(20px, 3vw, 30px);">${heroVideo.subtitle}</p>
                
                <div class="hero-actions" style="display: flex; align-items: center; gap: 15px; flex-wrap: nowrap;">
                    <button class="hero-play-btn" onclick="if(window.ytHeroPlayer) { window.ytHeroPlayer.unMute(); window.ytHeroPlayer.playVideo(); document.querySelector('#hero-player-container').requestFullscreen(); }" style="border-radius: 4px; padding: clamp(10px, 2vw, 12px) clamp(20px, 4vw, 35px); border: none; font-size: clamp(0.9rem, 1.5vw, 1.1rem); font-weight: 700; display: flex; align-items: center; gap: 10px; cursor: pointer; background: #fff; color: #000; white-space: nowrap; flex-shrink: 0;">
                        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                        Play Fullscreen
                    </button>
                    <button id="hero-mute-btn" class="mute-btn hero-mute-btn" aria-label="Toggle Mute" style="background: rgba(255,255,255,0.15); border: 2px solid rgba(255,255,255,0.4); border-radius: 50%; width: 44px; height: 44px; cursor: pointer; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(5px); flex-shrink: 0;">
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
        } else if (videoObj.youtubeId) {
            mediaHTML = `
                <div class="video-element-wrapper yt-container" style="width: 100%; height: 100%; overflow: hidden; position: relative;" data-yt-id="${videoObj.youtubeId}">
                    <div class="yt-iframe-placeholder" style="position: absolute; top:0; left:0; width:100%; height:100%; pointer-events: none; z-index: 1;">
                         <iframe src="https://www.youtube.com/embed/${videoObj.youtubeId}?enablejsapi=1&mute=1&loop=1&playlist=${videoObj.youtubeId}&controls=0&modestbranding=1&rel=0&vq=highres&hd=1" 
                            style="width:100%; height:100%;" frameborder="0" allow="autoplay; fullscreen"></iframe>
                    </div>
                    <div class="yt-click-mask" style="position: absolute; top:0; left:0; width:100%; height:100%; z-index: 2; cursor: pointer;"></div>
                    <div class="player-controls yt-controls" style="z-index: 5;">
                        <div class="progress-container"><input type="range" class="progress-bar yt-progress" min="0" max="100" value="0" step="0.1"></div>
                        <div class="controls-main">
                            <div class="controls-left">
                                <button class="control-btn yt-play-btn" aria-label="Play/Pause">
                                    <svg class="icon-pause" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="display: none;"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
                                    <svg class="icon-play" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="display: block;"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                                </button>
                                <div class="volume-container">
                                    <button class="control-btn yt-mute-btn" aria-label="Toggle Mute">
                                        <svg class="icon-muted" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display: none;"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>
                                        <svg class="icon-unmuted" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display: block;"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
                                    </button>
                                    <input type="range" class="volume-slider yt-volume-slider" min="0" max="100" step="1" value="100">
                                </div>
                                <div class="inline-quality-selector" style="display: flex; align-items: center; gap: 8px; margin-left: 15px;">
                                    <button class="quality-option active" data-vq="hd2160" style="background: none; border: none; color: white; opacity: 1; font-weight: 800; font-size: 11px; cursor: pointer; padding: 0; transition: opacity 0.3s; letter-spacing: 0.5px;">2160p</button>
                                    <button class="quality-option" data-vq="hd1080" style="background: none; border: none; color: white; opacity: 0.4; font-weight: 800; font-size: 11px; cursor: pointer; padding: 0; transition: opacity 0.3s; letter-spacing: 0.5px;">1080p</button>
                                    <button class="quality-option" data-vq="hd720" style="background: none; border: none; color: white; opacity: 0.4; font-weight: 800; font-size: 11px; cursor: pointer; padding: 0; transition: opacity 0.3s; letter-spacing: 0.5px;">720p</button>
                                </div>
                                <div class="time-display" style="margin-left: 15px;"><span class="current-time">0:00</span> / <span class="duration">0:00</span></div>
                            </div>
                            <div class="controls-right">
                                <button class="control-btn fullscreen-btn" aria-label="Fullscreen"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path></svg></button>
                            </div>
                        </div>
                    </div>
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
    const categories = ["Mashup Cuts", "Love Reels", "Special Projects", "Viral Reels", "Identity & Intros"];

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

    // Force an ID on the iframe for the API to target before init
    const heroIframe = document.querySelector('.hero-video-wrap iframe');
    if (heroIframe) heroIframe.id = "hero-yt-iframe";

    // Immediate Init call if API already loaded
    if (window.ytAPIReady && window.initHeroPlayer) {
        window.initHeroPlayer();
    }

    document.querySelectorAll('.slider-wrapper').forEach(wrapper => {
        const slider = wrapper.querySelector('.row-slider');
        wrapper.querySelector('.left-arrow').onclick = () => slider.scrollBy({ left: -(window.innerWidth * 0.7), behavior: 'smooth' });
        wrapper.querySelector('.right-arrow').onclick = () => slider.scrollBy({ left: (window.innerWidth * 0.7), behavior: 'smooth' });
    });
});

// --- YouTube IFrame API Support (Hardened Integration with Pro Controls) ---
window.initHeroPlayer = function() {
    const heroIframe = document.getElementById('hero-yt-iframe');
    if (!heroIframe || window.ytHeroPlayer) return;

    window.ytHeroPlayer = new YT.Player('hero-yt-iframe', {
        events: {
            'onReady': (event) => {
                const player = event.target;
                
                // --- HARD CHUNK LOAD: ORIGINAL QUALITY ---
                const src = event.target.getIframe().src;
                const vId = src.match(/embed\/([^?]+)/)[1];
                
                player.loadVideoById({
                    videoId: vId,
                    suggestedQuality: 'highres'
                });
                
                event.target.mute();
                event.target.playVideo();

                // Wired Sound Toggle
                const muteBtn = document.getElementById('hero-mute-btn');
                if (muteBtn) {
                    const iconMuted = muteBtn.querySelector('.icon-muted');
                    const iconUnmuted = muteBtn.querySelector('.icon-unmuted');
                    
                    const updateHeroMuteIcons = () => {
                        if (window.ytHeroPlayer.isMuted()) {
                            iconMuted.style.display = 'none';
                            iconUnmuted.style.display = 'block';
                        } else {
                            iconMuted.style.display = 'block';
                            iconUnmuted.style.display = 'none';
                        }
                    };

                    muteBtn.onclick = (e) => {
                        e.preventDefault(); e.stopPropagation();
                        if (window.ytHeroPlayer && window.ytHeroPlayer.mute) {
                            if (window.ytHeroPlayer.isMuted()) {
                                window.ytHeroPlayer.unMute();
                                window.ytHeroPlayer.setVolume(100);
                            } else {
                                window.ytHeroPlayer.mute();
                            }
                            updateHeroMuteIcons();
                        }
                    };
                    updateHeroMuteIcons();
                }
                
                // Wired Fullscreen Toggle
                const playBtn = document.querySelector('.hero-play-btn');
                if (playBtn) {
                    playBtn.onclick = (e) => {
                        e.preventDefault(); e.stopPropagation();
                        if (window.ytHeroPlayer) {
                            window.ytHeroPlayer.unMute();
                            window.ytHeroPlayer.playVideo();
                            const container = document.getElementById('hero-player-container');
                            if (container.requestFullscreen) container.requestFullscreen();
                            else if (container.webkitRequestFullscreen) container.webkitRequestFullscreen();
                        }
                    };
                }
            },
            'onStateChange': (event) => {
                // Secondary 4K enforcement on playback
                if (event.data === 1) { 
                    event.target.setPlaybackQuality('highres');
                }
            }
        }
    });

    // --- Start Card Player Sync ---
    initYTCards();
};

function initYTCards() {
    const ytContainers = document.querySelectorAll('.yt-container:not(.synced)');
    ytContainers.forEach(container => {
        container.classList.add('synced');
        const iframe = container.querySelector('iframe');
        const ytId = container.dataset.ytId;
        
        // Use a unique ID for each iframe
        const frameId = `yt-card-${Math.random().toString(36).substr(2, 9)}`;
        iframe.id = frameId;

        const player = new YT.Player(frameId, {
            events: {
                'onReady': (event) => {
                    const player = event.target;
                    
                    // --- HARD CHUNK LOAD: ORIGINAL QUALITY ---
                    player.loadVideoById({
                        videoId: ytId,
                        suggestedQuality: 'highres'
                    });
                    player.mute();
                    player.playVideo();
                    
                    const playBtn = container.querySelector('.yt-play-btn');
                    const muteBtn = container.querySelector('.yt-mute-btn');
                    const progressBar = container.querySelector('.yt-progress');
                    const timeEl = container.querySelector('.current-time');
                    const durEl = container.querySelector('.duration');
                    const fullscreenBtn = container.querySelector('.fullscreen-btn');
                    const iconPlay = playBtn.querySelector('.icon-play');
                    const iconPause = playBtn.querySelector('.icon-pause');
                    const iconMuted = muteBtn.querySelector('.icon-muted');
                    const iconUnmuted = muteBtn.querySelector('.icon-unmuted');

                    const initialDuration = player.getDuration() || 0;
                    durEl.textContent = formatTime(initialDuration);
                    progressBar.max = initialDuration || 100;

                    function formatTime(s) {
                        if (!s || isNaN(s)) return "0:00";
                        const m = Math.floor(s / 60);
                        const rs = Math.floor(s % 60);
                        return `${m}:${rs < 10 ? '0' : ''}${rs}`;
                    }

                    // --- ONE CLICK PORTAL LOGIC ---
                    const card = container.closest('.showcase-card');
                    const triggerFullscreen = (e) => {
                        if (e) { e.preventDefault(); e.stopPropagation(); }
                        
                        const isFullscreen = document.fullscreenElement || document.webkitFullscreenElement;
                        
                        if (isFullscreen) {
                            // If already in fullscreen, click toggles Play/Pause
                            const state = player.getPlayerState();
                            if (state === 1) {
                                player.pauseVideo();
                            } else {
                                player.playVideo();
                            }
                            return;
                        }

                        const parent = container.closest('.project-img');
                        if (parent.requestFullscreen) parent.requestFullscreen();
                        else if (parent.webkitRequestFullscreen) parent.webkitRequestFullscreen();
                        player.unMute();
                        player.playVideo();
                    };
                    
                    if (card) card.onclick = triggerFullscreen;
                    container.onclick = triggerFullscreen;

                    // Play/Pause sync
                    playBtn.onclick = (e) => {
                        e.stopPropagation();
                        const state = player.getPlayerState();
                        if (state === 1) { // playing
                            player.pauseVideo();
                        } else {
                            player.unMute();
                            player.playVideo();
                        }
                    };

                    // --- VOLUME & MUTE HARDENING (YOUTUBE STYLE) ---
                    const volumeSlider = container.querySelector('.yt-volume-slider');
                    container.dataset.lastVolume = "100"; // Default start

                    const updateMuteIcons = () => {
                        const isMuted = player.isMuted();
                        const currentVol = player.getVolume();
                        
                        if (isMuted || currentVol === 0) {
                            // SHOW CURRENT STATE: MUTED (X)
                            iconMuted.style.display = 'block';
                            iconUnmuted.style.display = 'none';
                            if (volumeSlider) {
                                volumeSlider.value = 0;
                                volumeSlider.style.setProperty('--volume-value', `0%`);
                            }
                        } else {
                            // SHOW CURRENT STATE: UNMUTED (WAVES)
                            iconMuted.style.display = 'none';
                            iconUnmuted.style.display = 'block';
                            if (volumeSlider) {
                                volumeSlider.value = currentVol;
                                volumeSlider.style.setProperty('--volume-value', `${currentVol}%`);
                            }
                        }
                    };

                    muteBtn.onclick = (e) => {
                        e.stopPropagation();
                        if (player.isMuted()) {
                            player.unMute();
                            const restoreVol = container.dataset.lastVolume || 100;
                            player.setVolume(restoreVol);
                        } else {
                            // Store current volume before muting
                            const currentVol = player.getVolume();
                            if (currentVol > 0) container.dataset.lastVolume = currentVol;
                            player.mute();
                        }
                        setTimeout(updateMuteIcons, 50);
                    };

                    if (volumeSlider) {
                        volumeSlider.oninput = (e) => {
                            e.stopPropagation();
                            const val = parseInt(e.target.value);
                            player.setVolume(val);
                            
                            if (val > 0) {
                                container.dataset.lastVolume = val;
                                if (player.isMuted()) player.unMute();
                            } else {
                                if (!player.isMuted()) player.mute();
                            }
                            
                            volumeSlider.style.setProperty('--volume-value', `${val}%`);
                            updateMuteIcons();
                        };
                    }

                    // Initial state sync
                    updateMuteIcons();

                    // Fullscreen
                    fullscreenBtn.onclick = triggerFullscreen;

                    // Progress Update
                    setInterval(() => {
                        const cur = player.getCurrentTime() || 0;
                        const dur = player.getDuration() || 0;
                        
                        timeEl.textContent = formatTime(cur);
                        
                        // Dynamically update duration once player metadata loads
                        if (dur > 0 && progressBar.max !== String(dur)) {
                            durEl.textContent = formatTime(dur);
                            progressBar.max = dur;
                        }
                        
                        if (!container.dataset.scrubbing && dur > 0) {
                            progressBar.value = cur;
                            const perc = (cur / dur) * 100;
                            progressBar.style.setProperty('--progress-value', `${perc}%`);
                        }
                    }, 500);

                    progressBar.oninput = () => {
                        container.dataset.scrubbing = "true";
                    };
                    progressBar.onchange = () => {
                        player.seekTo(progressBar.value);
                        delete container.dataset.scrubbing;
                    };

                    // --- Settings & Quality Logic ---
                    const qualityOptions = container.querySelectorAll('.quality-option');

                    if (qualityOptions.length > 0) {
                        qualityOptions.forEach(opt => {
                            opt.onclick = (e) => {
                                e.stopPropagation();
                                qualityOptions.forEach(o => {
                                    o.classList.remove('active');
                                    o.style.opacity = '0.4';
                                });
                                opt.classList.add('active');
                                opt.style.opacity = '1';
                                const vq = opt.dataset.vq;
                                
                                // --- PRO RESOLUTION SWAP ---
                                const currentTime = player.getCurrentTime();
                                const isPaused = player.getPlayerState() !== 1;
                                
                                player.loadVideoById({
                                    videoId: ytId,
                                    startSeconds: currentTime,
                                    suggestedQuality: vq
                                });
                                
                                if (isPaused) {
                                    setTimeout(() => player.pauseVideo(), 500);
                                }
                                console.log(`Inline Resolution swap triggered: ${vq} at ${currentTime}s`);
                            };
                        });
                    }
                },
                'onStateChange': (event) => {
                    const card = container.closest('.showcase-card');
                    const playerContainer = container.closest('.custom-player');
                    const playBtn = container.querySelector('.yt-play-btn');
                    if (!playBtn) return;
                    
                    const iconPlay = playBtn.querySelector('.icon-play');
                    const iconPause = playBtn.querySelector('.icon-pause');

                    if (event.data === 1) { // Playing
                        if (card) card.classList.add('playing');
                        if (playerContainer) playerContainer.classList.add('playing');
                        if (iconPlay) iconPlay.style.display = 'none';
                        if (iconPause) iconPause.style.display = 'block';
                    } else { // Paused or ended
                        if (card) card.classList.remove('playing');
                        if (playerContainer) playerContainer.classList.remove('playing');
                        if (iconPlay) iconPlay.style.display = 'block';
                        if (iconPause) iconPause.style.display = 'none';
                    }
                }
            }
        });

        // Store player for global control (like pause on exit)
        if (!window.activeYTPlayers) window.activeYTPlayers = [];
        window.activeYTPlayers.push(player);
    });
}

// --- Global Fullscreen Exit Handler (Pause on Exit) ---
const handleGlobalFullscreenExit = () => {
    const isFullscreen = document.fullscreenElement || document.webkitFullscreenElement;
    if (!isFullscreen) {
        // Pause any active YouTube players
        if (window.activeYTPlayers) {
            window.activeYTPlayers.forEach(p => {
                if (p && p.pauseVideo && p.getPlayerState() === 1) {
                    p.pauseVideo();
                }
            });
        }
        // Also pause the hero player if it exists
        if (window.ytHeroPlayer && window.ytHeroPlayer.pauseVideo) {
            window.ytHeroPlayer.pauseVideo();
        }
    }
};

document.addEventListener('fullscreenchange', handleGlobalFullscreenExit);
document.addEventListener('webkitfullscreenchange', handleGlobalFullscreenExit);

window.onYouTubeIframeAPIReady = function() {
    window.ytAPIReady = true;
    if (window.initHeroPlayer) window.initHeroPlayer();
};

// Start the API Load
(function() {
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
})();
