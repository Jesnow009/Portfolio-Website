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
        const stopBtn = container.querySelector('.stop-btn');
        const muteBtn = container.querySelector('.mute-btn');
        const volumeSlider = container.querySelector('.volume-slider');
        const progressBar = container.querySelector('.progress-bar');
        const currentTimeEl = container.querySelector('.current-time');
        const durationEl = container.querySelector('.duration');
        const fullscreenBtn = container.querySelector('.fullscreen-btn');
        
        // Ensure initial DOM visual sync for autoplay elements
        if (!video.paused) {
            container.classList.add('playing');
        } else {
            container.classList.add('paused');
        }

        // --- Professional Background Sync (Mute on Exit) ---
        const handleFullscreenChange = () => {
            const isFullscreen = document.fullscreenElement || 
                               document.webkitFullscreenElement || 
                               document.mozFullScreenElement || 
                               document.msFullscreenElement;
            
            // If we just exited fullscreen, mute the video for professional gallery browsing
            if (!isFullscreen) {
                video.muted = true;
                // If it's a showcase card, we also want to ensure the visual mute/unmute buttons sync
                video.dispatchEvent(new Event('volumechange'));
            }
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
        document.addEventListener('mozfullscreenchange', handleFullscreenChange);
        document.addEventListener('MSFullscreenChange', handleFullscreenChange);

        // --- One-Click Professional Viewing Experience ---
        let manuallyPaused = false;
        
        const togglePlay = (e) => {
            // Standard Behavior for non-showcase (Home/Reels)
            if (e && e.target.closest('.control-btn') !== playPauseBtn && e.target.closest('.center-play-btn') !== centerPlayBtn) {
                if (e.target.closest('.player-controls')) return; 
            }
            if (e) { e.preventDefault(); e.stopPropagation(); }
            
            if (video.paused) {
                video.muted = false;
                video.play().catch(err => console.log('Play failed:', err));
                manuallyPaused = false;
            } else {
                video.pause();
                manuallyPaused = true;
            }
        };

        const openViewer = async (e) => {
            // Prevent double-trigger if clicking specific control buttons
            if (e.target.closest('.control-btn')) return;
            
            e.preventDefault(); e.stopPropagation();
            
            const isFullscreen = document.fullscreenElement || 
                               document.webkitFullscreenElement || 
                               document.mozFullScreenElement || 
                               document.msFullscreenElement;

            // If already in fullscreen, clicking toggles playback (Play/Pause)
            if (isFullscreen) {
                togglePlay();
                return;
            }

            try {
                // 1. Enter Fullscreen
                if (container.requestFullscreen) await container.requestFullscreen();
                else if (container.webkitRequestFullscreen) await container.webkitRequestFullscreen();
                else if (container.mozRequestFullScreen) await container.mozRequestFullScreen();
                else if (container.msRequestFullscreen) await container.msRequestFullscreen();
                
                // 2. Immediate Unmute & Play for the professional 'Viewer' experience
                video.muted = false;
                if (video.paused) await video.play();
                manuallyPaused = false;
            } catch (err) {
                console.warn("Fullscreen/Play failed:", err);
            }
        };

        // Attach listeners
        if (container.dataset.behavior === 'hover' || container.classList.contains('showcase-hero')) {
            // Entire card becomes a one-click portal to the viewer
            const clickTarget = container.closest('.showcase-card') || container.closest('.project-card') || container;
            clickTarget.style.cursor = 'pointer';
            clickTarget.addEventListener('click', openViewer);
            
            // To ensure center-play-btn and video clicks within the card also trigger fullscreen,
            // we do NOT add togglePlay to them directly here. They will bubble up to clickTarget.
            if (playPauseBtn) playPauseBtn.addEventListener('click', togglePlay);
        } else {
            // Standard behavioral listeners for non-hover videos (e.g. Reels)
            if (centerPlayBtn) centerPlayBtn.addEventListener('click', togglePlay);
            if (playPauseBtn) playPauseBtn.addEventListener('click', togglePlay);
            video.addEventListener('click', togglePlay); // Video itself toggles play
        }

        // Hover to play mechanics - Enhanced for Showcase Cards
        if (container.dataset.behavior === 'hover') {
            const hoverTarget = container.closest('.showcase-card') || container;
            
            hoverTarget.addEventListener('mouseenter', () => {
                if (!manuallyPaused) video.play().catch(e => console.log('Autoplay prevented'));
            });
            hoverTarget.addEventListener('mouseleave', () => {
                if (!video.paused) {
                    video.pause();
                    manuallyPaused = false; // Reset so next hover triggers play
                }
            });
        }

        const iconPlay = playPauseBtn ? playPauseBtn.querySelector('.icon-play') : null;
        const iconPause = playPauseBtn ? playPauseBtn.querySelector('.icon-pause') : null;

        video.addEventListener('play', () => {
            container.classList.add('playing');
            container.classList.remove('paused');
            if (iconPlay && iconPause) {
                iconPlay.style.display = 'none';
                iconPause.style.display = 'block';
            }
        });
        
        video.addEventListener('pause', () => {
            container.classList.remove('playing');
            container.classList.add('paused');
            if (iconPlay && iconPause) {
                iconPlay.style.display = 'block';
                iconPause.style.display = 'none';
            }
        });

        // --- Stop Logic ---
        if (stopBtn) {
            stopBtn.addEventListener('click', (e) => {
                e.preventDefault(); e.stopPropagation();
                video.pause();
                video.currentTime = 0;
            });
        }

        // --- Time Tracking & Progress Bar ---
        video.addEventListener('loadedmetadata', () => {
            if (durationEl) durationEl.textContent = formatTime(video.duration);
            if (progressBar) progressBar.max = video.duration;
        });

        if (video.readyState >= 1) {
            if (durationEl) durationEl.textContent = formatTime(video.duration);
            if (progressBar) progressBar.max = video.duration;
        }

        video.addEventListener('timeupdate', () => {
            if (currentTimeEl) currentTimeEl.textContent = formatTime(video.currentTime);
            if (progressBar && !container.dataset.scrubbing) {
                progressBar.value = video.currentTime;
                const percentage = (video.currentTime / video.duration) * 100;
                progressBar.style.setProperty('--progress-value', `${percentage}%`);
            }
        });

        if (progressBar) {
            progressBar.addEventListener('input', () => {
                container.dataset.scrubbing = "true";
                const percentage = (progressBar.value / video.duration) * 100;
                progressBar.style.setProperty('--progress-value', `${percentage}%`);
                currentTimeEl.textContent = formatTime(progressBar.value);
            });

            progressBar.addEventListener('change', () => {
                video.currentTime = progressBar.value;
                delete container.dataset.scrubbing;
            });
        }

        // --- Volume & Mute ---
        if (volumeSlider) {
            volumeSlider.value = video.muted ? 0 : video.volume;
            volumeSlider.style.setProperty('--volume-value', `${volumeSlider.value * 100}%`);
            
            volumeSlider.addEventListener('input', () => {
                video.volume = volumeSlider.value;
                if (video.volume > 0) video.muted = false;
                else video.muted = true;
                const percentage = (volumeSlider.value / 1) * 100;
                volumeSlider.style.setProperty('--volume-value', `${percentage}%`);
            });
        }

        if (muteBtn) {
            const iconMuted = muteBtn.querySelector('.icon-muted');
            const iconUnmuted = muteBtn.querySelector('.icon-unmuted');

            muteBtn.addEventListener('click', (e) => {
                e.preventDefault(); e.stopPropagation();
                video.muted = !video.muted;
                if (!video.muted && video.volume === 0) {
                    video.volume = 1; 
                }
            });

            video.addEventListener('volumechange', () => {
                if (video.muted || video.volume === 0) {
                    iconMuted.style.display = 'block';
                    iconUnmuted.style.display = 'none';
                    if (volumeSlider) volumeSlider.value = 0;
                } else {
                    iconMuted.style.display = 'none';
                    iconUnmuted.style.display = 'block';
                    if (volumeSlider) volumeSlider.value = video.volume;
                }
                if (volumeSlider) {
                    const percentage = (volumeSlider.value / 1) * 100;
                    volumeSlider.style.setProperty('--volume-value', `${percentage}%`);
                }
            });
        }

        // --- Fullscreen ---
        if (fullscreenBtn) {
            fullscreenBtn.addEventListener('click', (e) => {
                e.preventDefault(); e.stopPropagation();
                
                const isFullscreen = document.fullscreenElement || 
                                   document.webkitFullscreenElement || 
                                   document.mozFullScreenElement || 
                                   document.msFullscreenElement;

                if (!isFullscreen) {
                    if (container.requestFullscreen) {
                        container.requestFullscreen();
                    } else if (container.webkitRequestFullscreen) {
                        container.webkitRequestFullscreen();
                    } else if (container.mozRequestFullScreen) {
                        container.mozRequestFullScreen();
                    } else if (container.msRequestFullscreen) {
                        container.msRequestFullscreen();
                    }
                } else {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.webkitExitFullscreen) {
                        document.webkitExitFullscreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    }
                }
            });
        }
    });

    // Auto-hide controls logic for custom video players
    videoContainers.forEach(container => {
        let hideControlsTimeout;
        container.addEventListener('mousemove', () => {
            container.dataset.state = "hover";
            clearTimeout(hideControlsTimeout);
            
            const video = container.querySelector('video');
            if (video && !video.paused) {
                hideControlsTimeout = setTimeout(() => {
                    container.dataset.state = "";
                }, 2500); 
            }
        });
        
        container.addEventListener('mouseleave', () => {
            container.dataset.state = "";
            clearTimeout(hideControlsTimeout);
        });
    });
};

// // Auto-initialize when new content is added
const playerObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.addedNodes.length > 0) {
            // 🏹 Slider Navigation Logic
            const initSliders = () => {
                const wrappers = document.querySelectorAll('.slider-wrapper');
                wrappers.forEach(wrapper => {
                    const slider = wrapper.querySelector('.row-slider');
                    const leftArrow = wrapper.querySelector('.left-arrow');
                    const rightArrow = wrapper.querySelector('.right-arrow');
                    
                    if (!slider || !leftArrow || !rightArrow) return;
                    
                    // Fixed Scroll Amount
                    leftArrow.onclick = (e) => { e.stopPropagation(); slider.scrollBy({ left: -400, behavior: 'smooth' }); };
                    rightArrow.onclick = (e) => { e.stopPropagation(); slider.scrollBy({ left: 400, behavior: 'smooth' }); };
                });
            };

            initSliders();
            window.initCustomVideoPlayers();
            
            // 🔥 REVEAL OBSERVER FIX: Handle dynamic elements
            if (window.revealOnScroll) {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === 1) {
                        const reveals = node.querySelectorAll('.reveal');
                        if (node.classList.contains('reveal')) window.revealOnScroll.observe(node);
                        reveals.forEach(el => window.revealOnScroll.observe(el));
                    }
                });
            }
        }
    });
});

playerObserver.observe(document.body, { childList: true, subtree: true });

document.addEventListener('DOMContentLoaded', () => {
    
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when link is clicked
        document.querySelectorAll('.nav-links a').forEach(n => n.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }));
    }

    // Sticky Navigation on Scroll
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Scroll Reveal Animation (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.1, // Sooner trigger
        rootMargin: "0px 0px -50px 0px"
    };

    window.revealOnScroll = new IntersectionObserver(function(
        entries,
        revealOnScroll
    ) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealOnScroll.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        window.revealOnScroll.observe(el);
    });

    // Run immediately to bind initial videos
    window.initCustomVideoPlayers();

    // --- Interactive Letter Hover Effects & Letter Pop Up ---
    const wrapLetters = (heading, applyPopAnim = false, baseDelay = 0) => {
        let letterCounter = 0;
        
        const processNode = (node) => {
            if (node.nodeType === 3) { // Text node
                const text = node.textContent;
                if (!text.trim()) return;
                const fragment = document.createDocumentFragment();
                for (let i = 0; i < text.length; i++) {
                    if (text[i] === ' ') {
                        fragment.appendChild(document.createTextNode(' '));
                    } else {
                        const span = document.createElement('span');
                        span.textContent = text[i];
                        span.className = 'letter';
                        if (applyPopAnim) {
                            span.classList.add('pop-anim');
                            span.style.animationDelay = `${baseDelay + (letterCounter * 0.08)}s`;
                            letterCounter++;
                        }
                        fragment.appendChild(span);
                    }
                }
                node.replaceWith(fragment);
            } else if (node.nodeType === 1) { // Element node
                Array.from(node.childNodes).forEach(processNode);
            }
        };
        
        Array.from(heading.childNodes).forEach(processNode);
    };

    // Apply the letter splitting to targeted visual headers (no pop up)
    document.querySelectorAll('.hero h2, .logo').forEach(heading => {
        wrapLetters(heading);
    });
    
    // Apply pop up animation entrance to main name
    document.querySelectorAll('.hero-name-popup').forEach(heading => {
        wrapLetters(heading, true, 0.4); 
    });
    // YouTube Card Support (Sync for MARCO etc on Home)
    window.onYouTubeIframeAPIReady = function() {
        document.querySelectorAll('.yt-container').forEach(container => {
            const iframe = container.querySelector('iframe');
            if (iframe) {
                const ytId = container.dataset.ytId;
                const frameId = `yt-home-${Math.random().toString(36).substr(2, 9)}`;
                iframe.id = frameId;
                
                new YT.Player(frameId, {
                    events: {
                        'onStateChange': (event) => {
                            if (event.data === YT.PlayerState.PLAYING) {
                                const cover = container.querySelector('.yt-cover-image');
                                if (cover) cover.style.opacity = '0';
                                
                                // Enforce quality if possible
                                try { event.target.setPlaybackQuality('hd720'); } catch(e) {}
                            }
                        }
                    }
                });
            }
        });
    };

    // Load YT API if not already present
    if (!window.YT) {
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
});
