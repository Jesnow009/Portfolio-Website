document.addEventListener('DOMContentLoaded', () => {
    
    // The Video Engine Data - Configured for Cinema-Quality Streaming
    const myVideos = [
        // Hero / Featured (STREAMING FROM GOOGLE DRIVE 4K)
        { 
          src: "https://lh3.googleusercontent.com/u/0/d/1X2exYXr1nYb6zUkInOlnSZXHokkDaT-s", 
          title: "Marco 4K Mashup", 
          subtitle: "Cut beyond the story—into the pulse", 
          category: "Featured", 
          type: "mashup", 
          isHero: true 
        },

        // Blockbuster Trailers / Mashups
        { src: "video2.mp4", title: "Monkey man", subtitle: "A broken man. A brutal awakening.", category: "Mashups and Cuts", type: "mashup" },
        { src: "video3.mp4", title: "Extraction", subtitle: "One mission. No escape.", category: "Mashups and Cuts", type: "mashup" },
        { src: "Cinephile dott.fx 4k.mp4", title: "Cinephile Edit", subtitle: "4K Cinematic cut.", category: "Mashups and Cuts", type: "mashup" },
        { src: "bullet train dott.fx.mp4", title: "Bullet Train", subtitle: "High-octane action.", category: "Mashups and Cuts", type: "mashup" },
        { src: "doctor strange 4k dott.fx.mp4", title: "Doctor Strange", subtitle: "Multiverse mix.", category: "Mashups and Cuts", type: "mashup" },
        { src: "John Wick Mashup Dott.fx.mp4", title: "John Wick Mashup", subtitle: "Action compilation.", category: "Mashups and Cuts", type: "mashup" },
        { src: "sneha day 4k.mp4", title: "A Day with Sneha Shetty Kohli in Collage", subtitle: "Capturing the vibrant essence of emotion through high-fidelity 4K storytelling.", category: "Special Projects", type: "mashup" },
        { src: "avatar cut.mp4", title: "Avatar Edit", subtitle: "Visual Storytelling.", category: "Mashups and Cuts", type: "mashup" },
        { src: "wheel of the time cut.mp4", title: "Wheel of the Time", subtitle: "Epic fantasy storytelling through masterful cinematic pacing.", category: "Mashups and Cuts", type: "mashup" },
        { src: "parava cut.mp4", title: "Parava", subtitle: "High-energy rhythm meeting the soul of the street.", category: "Mashups and Cuts", type: "mashup" },
        { src: "shootings stars cut.mp4", title: "Shooting Stars", subtitle: "Stylized aesthetic cut.", category: "Special Projects", type: "mashup" },
        { src: "5_1.mp4", title: "What is Editing", subtitle: "An exploration of narrative structure and technical precision.", category: "Mashups and Cuts", type: "mashup" },

        // Viral Reels (Vertical)
        { src: "reel1.mp4", title: "Monologue", subtitle: "The pulse of dialogue: mastering the beat of performance and emotion.", category: "Viral Reels", type: "reel" },
        { src: "reel2.mp4", title: "Client Video", subtitle: "High-velocity visual rhythm designed for maximum audience engagement.", category: "Viral Reels", type: "reel" },
        { src: "reel3.mp4", title: "Weekend Movies", subtitle: "Cinematic atmosphere captured in the fleeting moments of leisure.", category: "Viral Reels", type: "reel" },
        { src: "reels/reel4.mp4", title: "Client Video", subtitle: "A curated showcase of professional narrative and visual excellence.", category: "Viral Reels", type: "reel" },

        // Special Projects / Event Work
        { src: "Tamil Filmmakers.mp4", title: "Tamil Filmmakers", subtitle: "A cinematic tribute to legends.", category: "Mashups and Cuts", type: "mashup" },
        { src: "Vijay Raghavendra inaugural video1.mp4", title: "Vijay Raghavendra", subtitle: "Official Guest Intro Video", category: "Special Projects", type: "mashup" },
        { src: "Sneha Shetty kohli.mp4", title: "Sneha Shetty Kohli", subtitle: "A cinematic portrait of poise and personality.", category: "Special Projects", type: "mashup" },
        { src: "kumbla 5.mp4", title: "Love Birds", subtitle: "A heart-warming celebration of union, distilled into a soulful cinematic edit.", category: "Special Projects", type: "mashup" },

        // Identity, Intros & Motion Graphics (Manually Ordered)
        { src: "intros/Render Comp mm.mp4", title: "Motion Comp", subtitle: "Complex motion graphics intro.", category: "Identity & Intros", type: "mashup" },
        { src: "intros/Dott.fx Intro.mp4", title: "Dott.fx Identity", subtitle: "Brand opening sequence.", category: "Identity & Intros", type: "mashup" },
        { src: "intros/Signature Logo .mp4", title: "Signature Logo", subtitle: "Floating logo animation.", category: "Identity & Intros", type: "mashup" },
        { src: "intros/St.Aloysius Text Logo Intro.mp4", title: "SAU Text Intro", subtitle: "Clean typography reveal.", category: "Identity & Intros", type: "mashup" },
        { src: "intros/logo animation.mp4", title: "Premium Logo Animation", subtitle: "Advanced motion design.", category: "Identity & Intros", type: "mashup" },
        { src: "intros/3.mp4", title: "Flash Intro 3", subtitle: "Quick 3ms visual sting.", category: "Identity & Intros", type: "mashup" },
        { src: "intros/Department Of Media Studies Intro.mp4", title: "Media Studies", subtitle: "Departmental Introduction.", category: "Identity & Intros", type: "mashup" },
        { src: "intros/samudra logo intro.mp4", title: "Samudra Logo", subtitle: "Dynamic Logo Reveal.", category: "Identity & Intros", type: "mashup" },
        { src: "intros/St.Aloysius Logo Intro.mp4", title: "St. Aloysius University", subtitle: "Academic identity intro.", category: "Identity & Intros", type: "mashup" },
        { src: "Sneha Intro.mp4", title: "Shadow Intro", subtitle: "Alternative intro variation.", category: "Identity & Intros", type: "mashup" }
    ];

    const app = document.getElementById('showcase-app');
    const heroVideo = myVideos.find(v => v.isHero) || myVideos[0];
    
    // 1. Render Hero Section
    let html = `
        <div class="showcase-hero custom-player" data-behavior="autoplay" style="cursor: pointer;">
            <video src="${heroVideo.src}" autoplay loop muted playsinline class="video-element hero-video-bg"></video>
            <div class="hero-vignette"></div>
            
            <div class="hero-content">
                <span class="hero-badge">Featured Cinematic Edit</span>
                <h1 class="hero-title">${heroVideo.title}</h1>
                <p class="hero-subtitle">${heroVideo.subtitle}</p>
                
                <div class="hero-actions" style="display: flex; align-items: center; gap: 15px;">
                    <button class="hero-play-btn center-play-btn" style="border-radius: 4px; padding: 12px 35px; border: none; font-size: 1.1rem; font-weight: 700; display: flex; align-items: center; gap: 10px; cursor: pointer; background: #fff; color: #000;">
                        <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                        Play Showcase
                    </button>
                    <button class="mute-btn hero-mute-btn" aria-label="Toggle Mute" style="background: rgba(255,255,255,0.15); border: 2px solid rgba(255,255,255,0.4); border-radius: 50%; width: 48px; height: 48px; cursor: pointer; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(5px);">
                        <svg class="icon-muted" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" style="display: block;"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>
                        <svg class="icon-unmuted" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" style="display: none;"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
                    </button>
                    <button class="fullscreen-btn hero-fullscreen-btn" aria-label="Fullscreen" style="background: rgba(255,255,255,0.15); border: 2px solid rgba(255,255,255,0.4); border-radius: 50%; width: 48px; height: 48px; cursor: pointer; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(5px);">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path></svg>
                    </button>
                    <div style="display:none;" class="player-controls"><button class="play-pause-btn"></button><input type="range" class="volume-slider"></div>
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
        
        return `
            <div class="${cardClass}">
                <div class="project-img custom-player" data-behavior="hover">
                     <video src="${encodeURI(videoObj.src)}" loop muted playsinline class="video-element"></video>
                     <button class="center-play-btn" aria-label="Play"><svg viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg></button>
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
                                     <input type="range" class="volume-slider" min="0" max="1" step="0.05" value="0">
                                 </div>
                                 <div class="time-display"><span class="current-time">0:00</span> / <span class="duration">0:00</span></div>
                             </div>
                             <div class="controls-right">
                                 <button class="control-btn fullscreen-btn" aria-label="Fullscreen"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path></svg></button>
                             </div>
                         </div>
                     </div>
                </div>
                <div class="card-metadata"><h3>${videoObj.title}</h3><p>${videoObj.subtitle}</p></div>
            </div>
        `;
    }

    // 3. Build Category Rows
    const rowVideos = myVideos.filter(v => !v.isHero);
    const categories = ["Mashups and Cuts", "Special Projects", "Viral Reels", "Identity & Intros"];

    categories.forEach(cat => {
        const matchingVideos = rowVideos.filter(v => v.category === cat);
        if (matchingVideos.length === 0) return;

        html += `
            <div class="showcase-row">
                <h2 class="row-title">${cat}</h2>
                <div class="slider-wrapper">
                    <button class="slider-arrow left-arrow"><svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" fill="none"><path d="M15 18l-6-6 6-6"/></svg></button>
                    <div class="row-slider" id="row-${cat.replace(/\s+/g, '-').toLowerCase()}">
                        <div class="slider-track">${matchingVideos.map(v => renderCard(v)).join('')}</div>
                    </div>
                    <button class="slider-arrow right-arrow"><svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" fill="none"><path d="M9 18l6-6-6-6"/></svg></button>
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
