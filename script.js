// Modal Functions
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
    document.body.style.overflow = 'auto';
}

document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navCenter = document.querySelector('.nav-center-container');
    const ctaButton = document.querySelector('.cta-button');
    
    navToggle.addEventListener('click', function() {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !isExpanded);
        navCenter.classList.toggle('active');
        document.body.style.overflow = !isExpanded ? 'hidden' : '';
    });

    const navbar = document.getElementById('navbar');
    let lastScrollY = window.scrollY;

    // Add this to your existing JavaScript
    document.addEventListener('DOMContentLoaded', function() {
        // Create the mirror effect using CSS clip-path
        function updateMirrorPosition() {
            const hero = document.querySelector('.hero');
            const footer = document.querySelector('footer.site-footer');
            const mirror = document.querySelector('.video-mirror');
            
            if (!hero || !footer || !mirror) return;
            
            const heroRect = hero.getBoundingClientRect();
            const footerRect = footer.getBoundingClientRect();
            
            // Calculate visible portion of footer
            const viewportHeight = window.innerHeight;
            const footerVisibleHeight = Math.min(
                viewportHeight - footerRect.top,
                footerRect.height
            );
            
            // Create mirror effect
            mirror.style.clipPath = `polygon(
                0% ${100 - (footerVisibleHeight / footerRect.height * 100)}%,
                100% ${100 - (footerVisibleHeight / footerRect.height * 100)}%,
                100% 100%,
                0% 100%
            )`;
        }
        
        // Initialize and update on scroll/resize
        updateMirrorPosition();
        window.addEventListener('scroll', updateMirrorPosition);
        window.addEventListener('resize', updateMirrorPosition);
    });

    // Initialize navbar state
    updateNavbar();

    function updateNavbar() {
        const scrollY = window.scrollY;
        
        // Scrolled state toggle
        if (scrollY > 30) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Parallax effect (subtle)
        const parallaxOffset = Math.min(scrollY * 0.1, 10);
        navbar.style.transform = `translate3d(0, ${parallaxOffset}px, 0)`;
        
        lastScrollY = scrollY;
        requestAnimationFrame(updateNavbar);
    }

    // Event listeners for fail-safes
    window.addEventListener('scroll', () => {
        navbar.style.opacity = '1';
        navbar.style.visibility = 'visible';
    });

    // Start animation loop
    requestAnimationFrame(updateNavbar);

    // Close menu when clicking on links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navCenter.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('#navbar') && navCenter.classList.contains('active')) {
            navCenter.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 900) {
            navCenter.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });
});

// Book Now Modal Logic
document.getElementById('bookNowBtn').onclick = function() {
    openModal('bookNowModal');
}

document.getElementById('closeBookNowModal').onclick = function() {
    closeModal('bookNowModal');
}

window.onclick = function(event) {
    var modal = document.getElementById('bookNowModal');
    if (event.target == modal) {
        closeModal('bookNowModal');
    }
}

// Book Now Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('bookNowModal');
    const mobileBtn = document.getElementById('mobileBookNowBtn');
    const closeBtn = document.getElementById('modalCloseBtn');
    
    // Mobile button click handler
    mobileBtn.addEventListener('click', function() {
        // Open modal
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Force iframe reload (critical for mobile)
        const iframe = modal.querySelector('iframe');
        iframe.src = iframe.src + '?t=' + Date.now();
        
        // Close mobile menu if open
        const navContainer = document.querySelector('.nav-center-container');
        if (navContainer && navContainer.classList.contains('active')) {
            navContainer.classList.remove('active');
            document.querySelector('.nav-toggle').setAttribute('aria-expanded', 'false');
        }
    });
    
    // Close modal
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Close when clicking outside modal
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});

// Privacy Policy Modal
function openPrivacyModal() {
    openModal('privacyModal');
}

function closePrivacyModal() {
    closeModal('privacyModal');
}

// Terms of Service Modal
function openTermsModal() {
    openModal('termsModal');
}

function closeTermsModal() {
    closeModal('termsModal');
}

// Add this to your existing JS
function resizeVideoBackground() {
    const video = document.getElementById('heroVideo');
    const container = document.querySelector('.hero');
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    
    // Calculate aspect ratios
    const videoRatio = 16 / 9; // YouTube default
    const containerRatio = containerWidth / containerHeight;
    
    // Adjust sizing based on container
    if (containerRatio > videoRatio) {
        // Wider than 16:9
        video.style.width = '100%';
        video.style.height = 'auto';
    } else {
        // Taller than 16:9
        video.style.width = 'auto';
        video.style.height = '100%';
    }
}

// Run on load and resize
window.addEventListener('load', resizeVideoBackground);
window.addEventListener('resize', resizeVideoBackground);

// Also trigger after YouTube player loads
function onPlayerReady(event) {
    resizeVideoBackground();
    // ... rest of your existing onPlayerReady code
}

// Shared event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Click outside to close
    window.addEventListener('click', function(event) {
        if (event.target === document.getElementById('privacyModal')) {
            closePrivacyModal();
        }
        if (event.target === document.getElementById('termsModal')) {
            closeTermsModal();
        }
    });

    // ESC key to close
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            if (document.getElementById('privacyModal').style.display === 'flex') {
                closePrivacyModal();
            }
            if (document.getElementById('termsModal').style.display === 'flex') {
                closeTermsModal();
            }
        }
    });
});

// YouTube Volume Control Implementation
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animations
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ===== OPTIMIZED YOUTUBE HERO VIDEO SECTION =====
    const heroSection = document.querySelector('.hero');
    const heroHeight = heroSection?.offsetHeight || window.innerHeight;
    let ytPlayer;
    
    // Enhanced device detection
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isAndroid = /Android/.test(navigator.userAgent);
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    
    // State management
    let lastVolume = 100;
    let isMuted = true;
    let hasUserInteracted = false;
    let isPlayerReady = false;
    let audioEnabled = false;
    const smoothingFactor = 0.05;
    let interactionAttempts = 0;
    const MAX_INTERACTION_ATTEMPTS = 3;

   // Interaction detection setup (validates user intent before activation)
const interactionEvents = [
    'click',        // Primary mouse click
    'pointerdown',  // Unified touch/pen/mouse (modern standard)
    'keydown',      // Keyboard interaction
    'touchstart'    // Legacy touch support (optional)
];

    // ===== YOUTUBE API LOADING =====
    function initializeYouTubeAPI() {
        // Prevent multiple API loads
        if (window.YT || document.querySelector('script[src*="youtube.com/iframe_api"]')) {
            return;
        }

        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        tag.async = true;
        tag.defer = true;
        
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        // Fallback loader
        setTimeout(() => {
            if (!window.YT) {
                console.warn('YouTube API loading fallback triggered');
                const fallbackTag = document.createElement('script');
                fallbackTag.src = "https://www.youtube.com/iframe_api?v=" + Date.now();
                document.head.appendChild(fallbackTag);
            }
        }, 5000);
    }

    // ===== YOUTUBE PLAYER SETUP =====
    window.onYouTubeIframeAPIReady = function() {
        if (ytPlayer) return; // Prevent duplicate initialization

        const playerVars = {
            autoplay: 0, // FIXED: Changed from 1 to 0 for browser compliance
            mute: 1,
            loop: 1,
            playlist: document.getElementById('heroVideo')?.getAttribute('data-video-id') || '',
            playsinline: 1,
            controls: 0,
            showinfo: 0,
            rel: 0,
            modestbranding: 1,
            enablejsapi: 1,
            origin: window.location.origin,
            widget_referrer: window.location.href
        };

        // Enhanced mobile support
        if (isMobile) {
            playerVars.autoplay = 0; // FIXED: Mobile autoplay disabled for compliance
            playerVars.mute = 1;
            playerVars.playsinline = 1;
        }

        try {
            ytPlayer = new YT.Player('heroVideo', {
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange,
                    'onError': onPlayerError
                },
                playerVars: playerVars
            });
        } catch (error) {
            console.error('YouTube player initialization failed:', error);
            // Retry after delay
            setTimeout(() => {
                if (!ytPlayer && window.YT) {
                    window.onYouTubeIframeAPIReady();
                }
            }, 2000);
        }
    };
    
    // ===== PLAYER READY HANDLER =====
    function onPlayerReady(event) {
        isPlayerReady = true;
        console.log('YouTube player ready');

        try {
            // FIXED: Don't auto-play immediately - wait for user interaction
            event.target.mute();
            event.target.setVolume(100);
            // Removed automatic playVideo() call
            isMuted = true;
            
        } catch (error) {
            console.error('Player setup error:', error);
        }

        // Start volume smoothing
        requestAnimationFrame(smoothVolumeUpdate);
        
        // Setup interaction detection
        setupInteractionDetection();
        
        // FIXED: Don't auto-enable audio without user interaction
        // Removed auto-enable timeout
    }

    // ===== INTERACTION DETECTION =====
    function setupInteractionDetection() {
        const handleUserInteraction = (event) => {
            if (hasUserInteracted || !isPlayerReady) return;
            
            console.log('User interaction detected:', event.type);
            hasUserInteracted = true;
            audioEnabled = true;
            
            // FIXED: Only start video playback after user interaction
            enableVideoAndAudioOnInteraction();
            removeInteractionListeners();
        };

        const addInteractionListeners = () => {
            const options = { passive: true, capture: true, once: false };
            
            interactionEvents.forEach(eventType => {
                document.addEventListener(eventType, handleUserInteraction, options);
                window.addEventListener(eventType, handleUserInteraction, options);
            });

            // Special handling for mobile
            if (isMobile) {
                document.addEventListener('visibilitychange', handleUserInteraction, options);
                window.addEventListener('orientationchange', handleUserInteraction, options);
            }
        };

        const removeInteractionListeners = () => {
            const options = { passive: true, capture: true };
            
            interactionEvents.forEach(eventType => {
                document.removeEventListener(eventType, handleUserInteraction, options);
                window.removeEventListener(eventType, handleUserInteraction, options);
            });
        };

        addInteractionListeners();

        // Mobile-specific: Try to enable audio on page focus
        if (isMobile) {
            window.addEventListener('focus', () => {
                if (!hasUserInteracted) {
                    setTimeout(() => handleUserInteraction({ type: 'focus' }), 100);
                }
            }, { once: true });
        }
    }

    // ===== FIXED: VIDEO AND AUDIO ENABLEMENT =====
    function enableVideoAndAudioOnInteraction() {
        if (!ytPlayer || !isPlayerReady) return;

        const attemptVideoAndAudioEnable = () => {
            try {
                if (interactionAttempts >= MAX_INTERACTION_ATTEMPTS) {
                    console.warn('Max video/audio enable attempts reached');
                    return;
                }

                interactionAttempts++;
                console.log(`Video/Audio enable attempt ${interactionAttempts}`);

                // FIXED: Start video playback only after user interaction
                ytPlayer.playVideo();
                
                // Wait a moment, then unmute if video is playing
                setTimeout(() => {
                    if (ytPlayer.getPlayerState() === YT.PlayerState.PLAYING) {
                        ytPlayer.unMute();
                        ytPlayer.setVolume(Math.round(lastVolume));
                        isMuted = false;
                        audioEnabled = true;
                        console.log('Video and audio successfully enabled after user interaction');
                    }
                }, 500);

            } catch (error) {
                console.error('Video/Audio enable error:', error);
                if (interactionAttempts < MAX_INTERACTION_ATTEMPTS) {
                    setTimeout(attemptVideoAndAudioEnable, 1000 * interactionAttempts);
                }
            }
        };

        // Immediate attempt
        attemptVideoAndAudioEnable();
    }

    // Add this to your existing JavaScript
    document.addEventListener('DOMContentLoaded', function() {
        // Get hero section element
        const heroSection = document.querySelector('.hero');
        const servicesSection = document.querySelector('#services');
        
        // State variables
        let isHeroInView = true;
        let lastScrollPosition = window.scrollY;
        
        // Function to check if hero section is in view
        function checkHeroVisibility() {
            const heroRect = heroSection.getBoundingClientRect();
            const servicesRect = servicesSection.getBoundingClientRect();
            
            // Check if services section has entered view (meaning we've scrolled past hero)
            isHeroInView = servicesRect.top > window.innerHeight / 2;
            
            // If we're not in hero section and audio is playing, mute it
            if (!isHeroInView && ytPlayer && !ytPlayer.isMuted()) {
                ytPlayer.mute();
            }
        }
        
        // Enhanced scroll handler for audio control
        function handleScroll() {
            const currentScrollPosition = window.scrollY;
            const scrollDirection = currentScrollPosition > lastScrollPosition ? 'down' : 'up';
            
            // Only check visibility if we've scrolled a significant amount
            if (Math.abs(currentScrollPosition - lastScrollPosition) > 50) {
                checkHeroVisibility();
                
                // If scrolling back up to hero section and user has interacted, unmute
                if (scrollDirection === 'up' && 
                    currentScrollPosition < heroSection.offsetHeight && 
                    hasUserInteracted && 
                    ytPlayer) {
                    ytPlayer.unMute();
                }
            }
            
            lastScrollPosition = currentScrollPosition;
        }
        
        // Initialize and set up event listeners
        function initAudioControl() {
            if (!heroSection || !servicesSection) return;
            
            // Initial check
            checkHeroVisibility();
            
            // Set up scroll listener with debounce
            let scrollTimeout;
            window.addEventListener('scroll', function() {
                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(handleScroll, 50);
            });
            
            // Additional check when user interacts
            document.addEventListener('click', function() {
                if (hasUserInteracted) {
                    checkHeroVisibility();
                }
            });
        }
        
        // Initialize when YouTube player is ready
        function onPlayerReady(event) {
            // Your existing onPlayerReady code...
            
            // Add our audio control initialization
            initAudioControl();
        }
        
        // Make sure to call this if player is already ready
        if (typeof ytPlayer !== 'undefined' && ytPlayer && typeof ytPlayer.getPlayerState === 'function') {
            initAudioControl();
        }
    });

    // ===== VOLUME CALCULATION =====
    function calculateTargetVolume() {
        if (!heroSection) return 100;
        
        const heroRect = heroSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Calculate visible portion
        const visibleTop = Math.max(heroRect.top, 0);
        const visibleBottom = Math.min(heroRect.bottom, windowHeight);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);
        
        // Calculate visibility percentage
        const visibilityRatio = visibleHeight / heroHeight;
        
        // Apply easing curve for smooth transitions
        const easedRatio = Math.pow(Math.max(0, Math.min(1, visibilityRatio)), 2);
        
        return easedRatio * 100;
    }

    // ===== SMOOTH VOLUME UPDATES =====
    function smoothVolumeUpdate() {
        if (!ytPlayer || !isPlayerReady || typeof ytPlayer.setVolume !== 'function') {
            requestAnimationFrame(smoothVolumeUpdate);
            return;
        }

        const targetVolume = calculateTargetVolume();
        lastVolume = lastVolume * (1 - smoothingFactor) + targetVolume * smoothingFactor;
        const roundedVolume = Math.round(lastVolume);

        // Only apply volume changes if audio is enabled and user has interacted
        if (audioEnabled && hasUserInteracted && ytPlayer.getPlayerState() === YT.PlayerState.PLAYING) {
            try {
                ytPlayer.setVolume(roundedVolume);
                
                // Handle mute/unmute transitions
                if (roundedVolume < 5 && !isMuted) {
                    ytPlayer.mute();
                    isMuted = true;
                } else if (roundedVolume >= 5 && isMuted) {
                    ytPlayer.unMute();
                    isMuted = false;
                }
            } catch (error) {
                console.error('Volume update error:', error);
            }
        }

        requestAnimationFrame(smoothVolumeUpdate);
    }

    // ===== PLAYER STATE CHANGES =====
    function onPlayerStateChange(event) {
        const state = event.data;
        
        switch (state) {
            case YT.PlayerState.PLAYING:
                console.log('Video playing');
                if (hasUserInteracted && audioEnabled && isMuted) {
                    setTimeout(() => {
                        try {
                            ytPlayer.unMute();
                            isMuted = false;
                        } catch (e) {
                            console.error('Unmute error:', e);
                        }
                    }, 100);
                }
                break;
                
            case YT.PlayerState.PAUSED:
                console.log('Video paused');
                // Only auto-resume if user has explicitly interacted
                if (hasUserInteracted) {
                    setTimeout(() => {
                        try {
                            if (ytPlayer.getPlayerState() === YT.PlayerState.PAUSED) {
                                ytPlayer.playVideo();
                            }
                        } catch (e) {
                            console.error('Resume error:', e);
                        }
                    }, 500);
                }
                break;
                
            case YT.PlayerState.ENDED:
                // Loop the video only if user has interacted
                if (hasUserInteracted) {
                    setTimeout(() => {
                        try {
                            ytPlayer.playVideo();
                        } catch (e) {
                            console.error('Restart error:', e);
                        }
                    }, 100);
                }
                break;
        }
    }

    // ===== ERROR HANDLING =====
    function onPlayerError(event) {
        console.error('YouTube player error:', event.data);
        
        // Attempt recovery only if user has interacted
        if (hasUserInteracted) {
            setTimeout(() => {
                if (ytPlayer && isPlayerReady) {
                    try {
                        ytPlayer.playVideo();
                    } catch (e) {
                        console.error('Recovery attempt failed:', e);
                    }
                }
            }, 2000);
        }
    }

    // ===== INITIALIZATION =====
    // Start YouTube API loading
    initializeYouTubeAPI();
    
    // Start volume smoothing when page is ready
    if (document.readyState === 'complete') {
        requestAnimationFrame(smoothVolumeUpdate);
    } else {
        window.addEventListener('load', () => {
            requestAnimationFrame(smoothVolumeUpdate);
        });
    }

   // FIXED: Audio-Only Page Visibility Handler - Keep video playing, only control audio
document.addEventListener('visibilitychange', () => {
    if (!ytPlayer || !isPlayerReady) return;
    
    if (document.hidden) {
        // Page is hidden - ONLY mute audio, keep video playing
        try {
            ytPlayer.mute();
            isMuted = true;
            console.log('Audio muted due to page visibility change');
        } catch (e) {
            console.error('Visibility mute error:', e);
        }
    } else {
        // Page is visible - unmute audio only if user has interacted and audio was enabled
        if (hasUserInteracted && audioEnabled) {
            setTimeout(() => {
                try {
                    // Ensure video is still playing first
                    if (ytPlayer.getPlayerState() !== YT.PlayerState.PLAYING) {
                        ytPlayer.playVideo();
                    }
                    
                    // Then unmute with a slight delay
                    setTimeout(() => {
                        if (ytPlayer.getPlayerState() === YT.PlayerState.PLAYING) {
                            ytPlayer.unMute();
                            isMuted = false;
                            console.log('Audio unmuted due to page visibility change');
                        }
                    }, 200);
                } catch (e) {
                    console.error('Visibility unmute error:', e);
                }
            }, 100);
        }
    }
});

// Universal Visibility Controller (Mobile + Desktop)
let isPageVisible = !document.hidden;
let wasManuallyMuted = false;

// Core Functionality (Unchanged from original)
function handleVisibilityChange() {
    isPageVisible = !document.hidden;
    
    if (!ytPlayer || !isPlayerReady) return;
    
    if (document.hidden) {
        // MUTE ONLY (No pause - keeps video playing silently)
        try {
            if (ytPlayer.getPlayerState() === YT.PlayerState.PLAYING) {
                ytPlayer.mute();
                isMuted = true;
                wasManuallyMuted = true;
                console.log('Visibility: Audio muted (background)');
            }
        } catch (e) {
            console.error('Mute failed:', e);
        }
    } else {
        // UNMUTE IF ALLOWED (Original logic preserved)
        if (hasUserInteracted && audioEnabled && wasManuallyMuted) {
            setTimeout(() => {
                try {
                    if (ytPlayer.getPlayerState() !== YT.PlayerState.PLAYING) {
                        ytPlayer.playVideo();
                    }
                    
                    setTimeout(() => {
                        if (isPageVisible && ytPlayer.getPlayerState() === YT.PlayerState.PLAYING) {
                            ytPlayer.unMute();
                            isMuted = false;
                            wasManuallyMuted = false;
                            console.log('Visibility: Audio restored');
                        }
                    }, 300);
                } catch (e) {
                    console.error('Unmute failed:', e);
                }
            }, 100);
        }
    }
}

// Mobile Safeguard (Invisible to functionality)
function onPlayerStateChange(event) {
    if (!isPageVisible && event.data === YT.PlayerState.PLAYING) {
        setTimeout(() => {
            try {
                ytPlayer.mute();
                isMuted = true;
                wasManuallyMuted = true;
            } catch (e) {
                console.error('Loop mute failed:', e);
            }
        }, 50);
    }
}

// Mobile Compatibility Layer (Does NOT affect desktop)
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    // 1. Ensure visibilitychange fires consistently
    window.addEventListener('pagehide', handleVisibilityChange);
    window.addEventListener('pageshow', handleVisibilityChange);
    
    // 2. Tap-to-unmute safety (Only activates if automatic unmute fails)
    const mobileUnmuteFallback = () => {
        if (isPageVisible && hasUserInteracted && isMuted && audioEnabled) {
            ytPlayer.unMute();
            isMuted = false;
            document.removeEventListener('touchend', mobileUnmuteFallback);
        }
    };
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) setTimeout(() => {
            document.addEventListener('touchend', mobileUnmuteFallback, { once: true });
        }, 1000);
    });
}

// Standard Setup (Same for all platforms)
document.addEventListener('visibilitychange', handleVisibilityChange);
if (ytPlayer) ytPlayer.addEventListener('onStateChange', onPlayerStateChange);

    // Portfolio filter functionality
    const filterButtons = document.querySelectorAll('.filter-button');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // ===== FORM SUBMISSION HANDLER =====
    document.getElementById('contactForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const form = e.target;
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        
        // Validate form
        if (!validateForm()) return;
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        
        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: { 'Accept': 'application/json' }
            });
            
            if (response.ok) {
                form.reset();
                showSuccessModal();
            } else {
                throw new Error('Submission failed');
            }
        } catch (error) {
            console.error('Error:', error);
            showErrorModal();
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        }
    });

    // ===== MODAL FUNCTIONS =====
    function showSuccessModal() {
        const modal = document.getElementById('formSuccessModal');
        document.body.classList.add('modal-open');
        
        modal.style.display = 'flex';
        setTimeout(() => modal.classList.add('active'), 10);
        
        // Auto-close after 10 seconds
        const timer = setTimeout(hideSuccessModal, 10000);
        
        // Click handler
        modal.addEventListener('click', function handleClick() {
            clearTimeout(timer);
            hideSuccessModal();
            modal.removeEventListener('click', handleClick);
        });
    }

    function hideSuccessModal() {
        const modal = document.getElementById('formSuccessModal');
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.classList.remove('modal-open');
        }, 300);
    }

    function showErrorModal() {
        const modal = document.createElement('div');
        modal.className = 'error-modal';
        modal.innerHTML = `
            <div class="error-modal-content">
                <div class="error-icon"><i class="fas fa-exclamation-circle"></i></div>
                <h3>Submission Error</h3>
                <p>There was an issue sending your message. Please try again.</p>
                <button class="cta-button error-close-btn">Try Again</button>
            </div>
        `;
        
        document.body.appendChild(modal);
        document.body.classList.add('modal-open');
        
        setTimeout(() => modal.classList.add('active'), 10);
        
        // Close handlers
        modal.querySelector('.error-close-btn').addEventListener('click', () => hideErrorModal(modal));
        modal.addEventListener('click', (e) => e.target === modal && hideErrorModal(modal));
    }

    function hideErrorModal(modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            document.body.removeChild(modal);
            document.body.classList.remove('modal-open');
        }, 300);
    }

    // Add this to your existing JS
    document.querySelectorAll('.faa-certification a').forEach(link => {
        link.addEventListener('click', smoothScroll);
    });

    // ===== FORM VALIDATION =====
    function validateForm() {
        let isValid = true;
        
        const validateField = (fieldId, errorId) => {
            const field = document.getElementById(fieldId);
            const error = document.getElementById(errorId);
            
            if (!field.value.trim()) {
                error.style.display = 'block';
                isValid = false;
            } else {
                error.style.display = 'none';
            }
        };
        
        validateField('name', 'name-error');
        validateField('email', 'email-error');
        validateField('message', 'message-error');
    
    // Email format validation
    const email = document.getElementById('email');
    const emailError = document.getElementById('email-error');
    if (email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        emailError.textContent = 'Please enter a valid email';
        emailError.style.display = 'block';
        isValid = false;
    }
    
    return isValid;
}
const navbar = document.getElementById('navbar');
let lastScrollY = window.scrollY;

// === Parallax + Dynamic Effects ===
function updateNavbar() {
    const scrollY = window.scrollY;
    const scrollDirection = scrollY > lastScrollY ? 'down' : 'up';

    // Scrolled State Toggle
    if (scrollY > 30) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Ultra-Smooth Parallax Effect
    const parallaxOffset = scrollY * 0.1;
    navbar.style.transform = `translate3d(0, ${Math.min(parallaxOffset, 10)}px, 0)`;

    lastScrollY = scrollY;
    requestAnimationFrame(updateNavbar);
}

// === Initialize ===
updateNavbar();

// === Scroll Resilience (Never Disappears) ===
window.addEventListener('scroll', () => {
    navbar.style.opacity = '1';
    navbar.style.visibility = 'visible';
});

// === Mouse-Tilt Effect (Advanced 3D) ===
navbar.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth - 0.5;
    const y = e.clientY / window.innerHeight - 0.5;
    navbar.style.transform = `translate3d(0, ${Math.min(lastScrollY * 0.1, 10)}px, 0) rotateX(${y * 2}deg) rotateY(${x * 2}deg)`;
});

navbar.addEventListener('mouseleave', () => {
    navbar.style.transform = `translate3d(0, ${Math.min(lastScrollY * 0.1, 10)}px, 0)`;
});
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });

                if (history.pushState) {
                    history.pushState(null, null, targetId);
                } else {
                    location.hash = targetId;
                }
            }
        });
    });
});
// Simple detection for when cards enter viewport
document.addEventListener('DOMContentLoaded', function() {
  const cards = document.querySelectorAll('.service-card');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(card => {
    card.style.animationPlayState = 'paused';
    observer.observe(card);
  });
});
// Cinematic scroll trigger
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.services-grid');
  
  // Create intersection observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        grid.classList.add('activated');
        
        // Add ambient light effect to cards
        document.querySelectorAll('.service-card').forEach(card => {
          card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--mouse-x', `${(e.clientX - rect.left)/rect.width*100}%`);
            card.style.setProperty('--mouse-y', `${(e.clientY - rect.top)/rect.height*100}%`);
          });
        });
        
        observer.unobserve(entry.target);
      }
    });
  }, { 
    threshold: 0.3,
    rootMargin: '0px 0px -100px 0px'
  });

  // Start observing
  if (grid) observer.observe(grid);
});

// Fallback for older browsers
if (!('IntersectionObserver' in window)) {
  document.querySelectorAll('.service-card').forEach((card, i) => {
    card.style.animation = `cardOrbitIn 1.2s cubic-bezier(0.25, 0.1, 0.25, 1) ${i*0.1 + 0.1}s forwards`;
  });
}
// Add this before your existing code
function checkGapsInView() {
  // Empty function to prevent the error
}

document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section.services, section.portfolio, section.contact");
  // Call on scroll and load
  window.addEventListener("scroll", checkGapsInView);
  window.addEventListener("resize", checkGapsInView);
  checkGapsInView();
  
  console.log("Inverse scroll-based gap effects initialized!");
});
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section.services, section.portfolio, section.contact");
  // Call on scroll and load
  window.addEventListener("scroll", checkGapsInView);
  window.addEventListener("resize", checkGapsInView);
  checkGapsInView();
  
  console.log("Inverse scroll-based gap effects initialized!");
});
// ONLY MODIFY THIS PART OF YOUR EXISTING CODE
function checkSectionsInView() {
  const viewportMiddle = window.innerHeight / 1.5;
  
  document.querySelectorAll('section.services, section.portfolio, section.contact').forEach(section => {
    const rect = section.getBoundingClientRect();
    const sectionBottom = rect.bottom; // Changed from middle to bottom
    const distanceFromCenter = Math.abs(viewportMiddle - sectionBottom);
    
    // New center-focused calculation (only this formula changed)
    const centerRatio = 1 - Math.min(1, distanceFromCenter / (viewportMiddle * 0.8));
    section.style.setProperty('--center-ratio', centerRatio);
    
    // Keep your existing activation threshold logic
    const activationThreshold = 200;
    section.classList.toggle('section-active', distanceFromCenter > activationThreshold);
  });
}

// Initialize with proper event listeners
let isScrolling;
window.addEventListener('scroll', () => {
  window.clearTimeout(isScrolling);
  isScrolling = setTimeout(checkSectionsInView, 16); // 60fps
}, { passive: true });

// Run immediately
checkSectionsInView();
document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    
    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            showSuccessModal();
            form.reset();
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        showErrorModal();
    }
});

// No libraries needed! Works in modern browsers
const laTime = new Date().toLocaleString("en-US", {
  timeZone: "America/Los_Angeles",
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  timeZoneName: "short"
});
// Enhanced Video Modal with Next Video Auto-Scroll (Desktop Only)
// Device detection utility
function isMobileDevice() {
    const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
           (navigator.maxTouchPoints && navigator.maxTouchPoints > 2 && /MacIntel/.test(navigator.platform));
    console.log('🔍 Device detection:', mobile ? 'Mobile' : 'Desktop');
    return mobile;
}

// User interaction tracker for autoplay compliance
let userHasInteracted = false;
let currentVideoId = null;
let currentVideoIndex = null;
let isNavigating = false;
let scrollY = 0; // For scroll position management

function registerUserInteraction() {
    if (!userHasInteracted) {
        userHasInteracted = true;
        console.log('✅ User interaction registered - autoplay with audio now allowed');
        try {
            if (window.AudioContext || window.webkitAudioContext) {
                const AudioContextClass = window.AudioContext || window.webkitAudioContext;
                const audioContext = new AudioContextClass();
                if (audioContext.state === 'suspended') {
                    audioContext.resume().then(() => {
                        console.log('🔊 Audio context resumed after user interaction');
                    });
                }
            }
        } catch (e) {
            console.log('🔊 Audio context handling skipped:', e.message);
        }
    }
}

// Scroll management functions (Desktop Only)
function disableScroll() {
    if (isMobileDevice()) return; // Skip on mobile
    
    scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
}

function enableScroll() {
    if (isMobileDevice()) return; // Skip on mobile
    
    document.body.style.position = '';
    document.body.style.top = '';
    window.scrollTo(0, scrollY);
}



// Enhanced video modal function
function openVideoModal(videoId, title) {
    console.log('🎬 Opening video modal:', { videoId, title, userHasInteracted });
    
    const videoModal = document.getElementById('video-modal');
    if (!videoModal) {
        console.error('❌ Video modal element not found! Looking for #video-modal');
        return;
    }
    
    const playerDiv = document.getElementById('youtube-player');
    if (!playerDiv) {
        console.error('❌ YouTube player div not found! Looking for #youtube-player');
        return;
    }
    
    registerUserInteraction();
    muteAllBackgroundVideos();
    
    // Only disable scroll for desktop
    if (!isMobileDevice()) {
        disableScroll();
    }
    
    videoModal.classList.add('active');
    currentVideoId = videoId;
    
    // Store current video index (Desktop Only - for auto-scroll to next)
    if (!isMobileDevice()) {
        const allVideos = document.querySelectorAll('.video-container[data-youtube-id], [data-youtube-id]');
        currentVideoIndex = Array.from(allVideos).findIndex(video => 
            video.getAttribute('data-youtube-id') === videoId
        );
    }
    
    const isMobile = isMobileDevice();
    const embedParams = new URLSearchParams({
        autoplay: '1',
        mute: userHasInteracted ? '0' : '1',
        loop: '1',
        playlist: videoId,
        modestbranding: '1',
        rel: '0',
        controls: '0',
        showinfo: '0',
        iv_load_policy: '3',
        fs: '0',
        cc_load_policy: '0',
        vq: 'hd2160',
        disablekb: '1',
        enablejsapi: '1',
        origin: window.location.origin
    });
    
    playerDiv.innerHTML = `
        <iframe
            src="https://www.youtube.com/embed/${videoId}?${embedParams.toString()}"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            title="${title}"
            id="modal-youtube-iframe"
            style="width: 100%; height: 100%; pointer-events: none;"
        ></iframe>
    `;
    
    setTimeout(() => {
        const iframe = playerDiv.querySelector('#modal-youtube-iframe');
        if (iframe && iframe.contentWindow && userHasInteracted) {
            const commands = [
                '{"event":"command","func":"unMute","args":""}',
                '{"event":"command","func":"setVolume","args":[100]}',
                '{"event":"command","func":"playVideo","args":""}'
            ];
            
            commands.forEach((command, index) => {
                setTimeout(() => {
                    iframe.contentWindow.postMessage(command, '*');
                }, index * 200);
            });
            
            setTimeout(() => {
                iframe.contentWindow.postMessage('{"event":"command","func":"unMute","args":""}', '*');
                iframe.contentWindow.postMessage('{"event":"command","func":"setVolume","args":[100]}', '*');
            }, 1000);
        }
    }, 500);
}

// Enhanced close modal function with Desktop-only scrolling
function closeVideoModal() {
    console.log('🔒 Closing video modal');
    const videoModal = document.getElementById('video-modal');
    const playerDiv = document.getElementById('youtube-player');
    const isMobile = isMobileDevice();
    
    // Pre-calculate next video position ONLY for desktop
    let nextVideo = null;
    let targetScrollPos = scrollY;
    
    if (!isMobile && currentVideoId !== null && currentVideoIndex !== null) {
        const allVideos = document.querySelectorAll('.video-container[data-youtube-id]');
        if (allVideos.length > 0) {
            const nextIndex = (currentVideoIndex + 1) % allVideos.length;
            nextVideo = allVideos[nextIndex];
            if (nextVideo) {
                // Calculate exact center position for desktop only
                const rect = nextVideo.getBoundingClientRect();
                const absoluteTop = rect.top + window.scrollY;
                targetScrollPos = absoluteTop - (window.innerHeight / 2) + (nextVideo.offsetHeight / 2);
                console.log('🎯 Next video calculated for desktop:', {
                    nextIndex: nextIndex + 1,
                    total: allVideos.length,
                    targetPos: targetScrollPos,
                    videoTop: absoluteTop
                });
            }
        }
    }
    
    // Stop all video/audio with multiple methods for reliability
    if (playerDiv) {
        const iframe = playerDiv.querySelector('iframe');
        if (iframe) {
            // Multiple stop commands for instant silence
            try {
                const stopCommands = [
                    '{"event":"command","func":"pauseVideo","args":""}',
                    '{"event":"command","func":"stopVideo","args":""}',
                    '{"event":"command","func":"mute","args":""}',
                    '{"event":"command","func":"setVolume","args":[0]}'
                ];
                stopCommands.forEach(command => {
                    iframe.contentWindow.postMessage(command, '*');
                });
            } catch (e) {}
            // Remove iframe source to force stop
            iframe.src = 'about:blank';
        }
        playerDiv.innerHTML = ''; // Clear immediately
    }
    
    
    // Close modal instantly
    if (videoModal) {
        videoModal.classList.remove('active');
        videoModal.style.display = 'none'; // Force immediate hide
        setTimeout(() => videoModal.style.display = '', 50); // Restore after transition
    }
    
    // Handle scroll restoration based on device type
    if (isMobile) {
        // Mobile: Just close modal, no scrolling effects, no auto-next
        console.log('📱 Mobile device - modal closed, no additional actions');
        // Don't touch scroll position at all for mobile
    } else {
        // Desktop: Restore scroll position and navigate to next video
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        
        // Navigate directly to next video with zero delay
        if (nextVideo) {
            // Force instant scroll for desktop
            window.scrollTo(0, targetScrollPos);
            
            // Immediate backup method
            nextVideo.scrollIntoView({ 
                behavior: 'instant',
                block: 'center',
                inline: 'nearest'
            });
            
            // Instant visual feedback
            nextVideo.classList.add('next-video-highlight');
            setTimeout(() => nextVideo.classList.remove('next-video-highlight'), 800);
            
            console.log('🖥️ Desktop - navigated to next video');
        } else {
            // Fallback: restore original position
            window.scrollTo(0, scrollY);
        }
    }
    
    // Final cleanup - keep everything muted
    setTimeout(() => {
        const backgroundVideos = document.querySelectorAll('video, iframe[src*="youtube"], iframe[src*="vimeo"]');
        backgroundVideos.forEach(video => {
            try {
                if (video.tagName === 'VIDEO') {
                    video.muted = true;
                    video.volume = 0;
                }
            } catch (e) {}
        });
    }, 10);
}

// Background video management
function muteAllBackgroundVideos() {
    console.log('🔇 Muting all background videos');
    const backgroundVideos = document.querySelectorAll('video, iframe[src*="youtube"], iframe[src*="vimeo"]');
    backgroundVideos.forEach((video, index) => {
        try {
            if (video.tagName === 'VIDEO') {
                video.dataset.originalVolume = video.volume;
                video.dataset.originalMuted = video.muted;
                video.muted = true;
                video.volume = 0;
            } else if (video.tagName === 'IFRAME' && video.contentWindow) {
                video.contentWindow.postMessage('{"event":"command","func":"mute","args":""}', '*');
                video.contentWindow.postMessage('{"event":"command","func":"setVolume","args":[0]}', '*');
            }
        } catch (error) {
            console.log(`⚠️ Could not mute background video ${index + 1}:`, error.message);
        }
    });
}

function restoreBackgroundVideos() {
    console.log('🔊 Restoring background videos');
    const backgroundVideos = document.querySelectorAll('video, iframe[src*="youtube"], iframe[src*="vimeo"]');
    backgroundVideos.forEach((video, index) => {
        try {
            if (video.tagName === 'VIDEO') {
                const originalVolume = video.dataset.originalVolume;
                const originalMuted = video.dataset.originalMuted;
                if (originalVolume !== undefined) video.volume = parseFloat(originalVolume);
                if (originalMuted !== undefined) video.muted = originalMuted === 'true';
            } else if (video.tagName === 'IFRAME' && video.contentWindow) {
                video.contentWindow.postMessage('{"event":"command","func":"unMute","args":""}', '*');
                video.contentWindow.postMessage('{"event":"command","func":"setVolume","args":[30]}', '*');
            }
        } catch (error) {
            console.log(`⚠️ Could not restore background video ${index + 1}:`, error.message);
        }
    });
}

// Play button handler
function handlePlayButtonClick(e) {
    e.preventDefault();
    e.stopPropagation();
    muteAllBackgroundVideos();
    registerUserInteraction();
    
    const videoContainer = this.closest('.video-container');
    if (!videoContainer) return;
    
    const videoId = videoContainer.getAttribute('data-youtube-id');
    if (!videoId) return;
    
    currentVideoId = videoId;
    const portfolioItem = videoContainer.closest('.portfolio-item');
    const title = portfolioItem?.querySelector('h3')?.textContent || 'Video';
    
    setTimeout(() => openVideoModal(videoId, title), 50);
}

// Container click handler
function handleContainerClick(e) {
    muteAllBackgroundVideos();
    registerUserInteraction();
    
    const videoId = this.getAttribute('data-youtube-id');
    currentVideoId = videoId;
    
    const portfolioItem = this.closest('.portfolio-item');
    const title = portfolioItem?.querySelector('h3')?.textContent || 'Video';
    
    setTimeout(() => openVideoModal(videoId, title), 50);
}

// Initialization
function initializeVideoModal() {
    // Setup global interaction listeners
    const events = ['click', 'touchstart', 'touchend', 'keydown'];
    events.forEach(event => {
        document.addEventListener(event, registerUserInteraction, { once: true, passive: true });
    });
    
    // Play button handlers
    document.querySelectorAll('.play-button').forEach(button => {
        button.addEventListener('click', handlePlayButtonClick);
        button.addEventListener('touchend', (e) => {
            e.preventDefault();
            handlePlayButtonClick.call(button, e);
        });
    });
    
    // Video container handlers
    document.querySelectorAll('.video-container').forEach(container => {
        container.addEventListener('click', function(e) {
            if (!e.target.closest('.play-button')) handleContainerClick.call(this, e);
        });
        container.addEventListener('touchend', function(e) {
            if (!e.target.closest('.play-button')) {
                e.preventDefault();
                handleContainerClick.call(this, e);
            }
        });
    });
    
    // Modal close setup
    const videoModal = document.getElementById('video-modal');
    if (videoModal) {
        // Close button
        const closeButton = videoModal.querySelector('.close-modal, .close, [data-close]');
        if (closeButton) {
            closeButton.addEventListener('click', closeVideoModal);
            closeButton.addEventListener('touchend', (e) => {
                e.preventDefault();
                closeVideoModal();
            });
        }
        
        // Click outside to close
        videoModal.addEventListener('click', function(e) {
            if (e.target === this) closeVideoModal();
        });
        
        videoModal.addEventListener('touchend', function(e) {
            if (e.target === this) {
                e.preventDefault();
                closeVideoModal();
            }
        });
    }
    
    // Escape key to close
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && videoModal?.classList.contains('active')) {
            closeVideoModal();
        }
    });
    
    // Debug logging for play buttons
    document.querySelectorAll('.play-button').forEach(button => {
        const videoContainer = button.closest('.video-container');
        const youtubeId = videoContainer ? videoContainer.getAttribute('data-youtube-id') : 'unknown';
        const portfolioItem = button.closest('.portfolio-item');
        const videoTitle = portfolioItem ? portfolioItem.querySelector('h3').textContent : 'Unknown Video';
        
        button.addEventListener('click', function() {
            console.log(`🎬 Play button clicked for ${videoTitle} (ID: ${youtubeId})`);
        });
    });
}

// Start initialization
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeVideoModal);
} else {
    initializeVideoModal();
}

// CSS for visual feedback (add to your stylesheet) - Desktop only
const highlightCSS = `
    .next-video-highlight {
        transform: scale(1.02);
        box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
        transition: all 0.3s ease;
        border: 2px solid rgba(255, 255, 255, 0.5);
    }
`;

// Inject CSS if not already present
if (!document.getElementById('video-autoscroll-css')) {
    const style = document.createElement('style');
    style.id = 'video-autoscroll-css';
    style.textContent = highlightCSS;
    document.head.appendChild(style);
}
console.log("Current LA Time:", laTime); // e.g., "Thursday, June 5, 2025, 02:30 PM PDT"