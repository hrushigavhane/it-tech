/**
 * NexaFlow Technologies - Advanced JavaScript Enhancements
 * Modern interactive features and animations
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // GLOBAL VARIABLES & UTILITIES
    // ==========================================
    
    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth <= 1024 && window.innerWidth > 768;
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // ==========================================
    // SMOOTH SCROLLING & NAVIGATION
    // ==========================================
    
    // Enhanced smooth scrolling for all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ==========================================
    // ADVANCED HEADER EFFECTS
    // ==========================================
    
    const header = document.querySelector('.nexaflow-header');
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    function updateHeader() {
        const scrollY = window.scrollY;
        
        if (scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.backdropFilter = 'blur(20px)';
            header.style.boxShadow = '0 10px 40px rgba(99, 102, 241, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
        
        // Hide/show header on scroll
        if (scrollY > lastScrollY && scrollY > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = scrollY;
        ticking = false;
    }
    
    function requestHeaderUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestHeaderUpdate);
    
    // ==========================================
    // PARTICLE SYSTEM ENHANCEMENTS
    // ==========================================
    
    function createAdvancedParticles(container, particleCount = 50) {
        if (!container || isReduced) return;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'floating-particle';
            
            // Random properties
            const size = Math.random() * 6 + 2;
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const delay = Math.random() * 10;
            const duration = Math.random() * 20 + 15;
            
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: rgba(99, 102, 241, ${Math.random() * 0.3 + 0.1});
                border-radius: 50%;
                left: ${x}%;
                top: ${y}%;
                animation: nexaflow-float ${duration}s ease-in-out infinite;
                animation-delay: ${delay}s;
                pointer-events: none;
                z-index: 0;
            `;
            
            container.appendChild(particle);
        }
    }
    
    // Add particles to hero section
    const heroParticlesContainer = document.querySelector('.hero-particles');
    if (heroParticlesContainer) {
        createAdvancedParticles(heroParticlesContainer, 30);
    }
    
    // ==========================================
    // INTERACTIVE FLOATING ICONS
    // ==========================================
    
    function enhanceFloatingIcons() {
        const floatingIcons = document.querySelectorAll('.floating-icon');
        
        floatingIcons.forEach((icon, index) => {
            // Add mouse interaction
            icon.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.2)';
                this.style.boxShadow = '0 10px 30px rgba(99, 102, 241, 0.3)';
            });
            
            icon.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
                this.style.boxShadow = 'none';
            });
            
            // Add staggered animations
            icon.style.animationDelay = `${index * 0.5}s`;
        });
    }
    
    enhanceFloatingIcons();
    
    // ==========================================
    // TECH ORBIT ANIMATION CONTROLLER
    // ==========================================
    
    function initTechOrbit() {
        const techOrbit = document.querySelector('.tech-orbit');
        if (!techOrbit || isReduced) return;
        
        let isPaused = false;
        
        techOrbit.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
            this.querySelectorAll('.orbit-item').forEach(item => {
                item.style.animationPlayState = 'paused';
            });
            isPaused = true;
        });
        
        techOrbit.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
            this.querySelectorAll('.orbit-item').forEach(item => {
                item.style.animationPlayState = 'running';
            });
            isPaused = false;
        });
        
        // Add click interaction
        techOrbit.addEventListener('click', function() {
            const center = this.querySelector('.orbit-center');
            center.style.transform = 'translate(-50%, -50%) scale(1.2)';
            center.style.boxShadow = '0 0 50px rgba(99, 102, 241, 0.6)';
            
            setTimeout(() => {
                center.style.transform = 'translate(-50%, -50%) scale(1)';
                center.style.boxShadow = '0 0 30px rgba(99, 102, 241, 0.3)';
            }, 300);
        });
    }
    
    initTechOrbit();
    
    // ==========================================
    // HOLOGRAM EFFECT ENHANCEMENTS
    // ==========================================
    
    function enhanceHologramEffect() {
        const hologramCore = document.querySelector('.hologram-core');
        if (!hologramCore) return;
        
        hologramCore.addEventListener('click', function() {
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                width: 0;
                height: 0;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.5);
                transform: translate(-50%, -50%);
                animation: nexaflow-ripple 1s ease-out forwards;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 1000);
        });
    }
    
    enhanceHologramEffect();
    
    // ==========================================
    // SERVICE CARD INTERACTIONS
    // ==========================================
    
    function enhanceServiceCards() {
        const serviceCards = document.querySelectorAll('.nexaflow-service-card');
        
        serviceCards.forEach((card, index) => {
            // Add entrance animation delay
            card.style.animationDelay = `${index * 0.1}s`;
            
            // Enhanced hover effect
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-15px) scale(1.02)';
                
                // Animate icon
                const icon = this.querySelector('.icon-bg');
                if (icon) {
                    icon.style.transform = 'scale(1.1) rotate(10deg)';
                }
                
                // Animate feature tags
                const tags = this.querySelectorAll('.feature-tag');
                tags.forEach((tag, i) => {
                    setTimeout(() => {
                        tag.style.transform = 'translateY(-2px)';
                        tag.style.background = 'rgba(99, 102, 241, 0.2)';
                    }, i * 50);
                });
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                
                const icon = this.querySelector('.icon-bg');
                if (icon) {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                }
                
                const tags = this.querySelectorAll('.feature-tag');
                tags.forEach(tag => {
                    tag.style.transform = 'translateY(0)';
                    tag.style.background = 'rgba(99, 102, 241, 0.1)';
                });
            });
        });
    }
    
    enhanceServiceCards();
    
    // ==========================================
    // PROJECT CARD ENHANCEMENTS
    // ==========================================
    
    function enhanceProjectCards() {
        const projectCards = document.querySelectorAll('.nexaflow-project-card');
        
        projectCards.forEach(card => {
            const overlay = card.querySelector('.project-overlay');
            const image = card.querySelector('.image img');
            
            card.addEventListener('mouseenter', function() {
                if (overlay) {
                    overlay.style.opacity = '1';
                }
                if (image) {
                    image.style.transform = 'scale(1.1)';
                }
                
                // Animate tech tags
                const techTags = this.querySelectorAll('.tech-tag');
                techTags.forEach((tag, i) => {
                    setTimeout(() => {
                        tag.style.transform = 'translateY(-5px) scale(1.05)';
                    }, i * 100);
                });
            });
            
            card.addEventListener('mouseleave', function() {
                if (overlay) {
                    overlay.style.opacity = '0';
                }
                if (image) {
                    image.style.transform = 'scale(1)';
                }
                
                const techTags = this.querySelectorAll('.tech-tag');
                techTags.forEach(tag => {
                    tag.style.transform = 'translateY(0) scale(1)';
                });
            });
        });
    }
    
    enhanceProjectCards();
    
    // ==========================================
    // METRICS COUNTER ANIMATION
    // ==========================================
    
    function animateCounters() {
        const counters = document.querySelectorAll('.odometer');
        const options = {
            threshold: 0.5
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-count'));
                    const duration = 2000;
                    const increment = target / (duration / 16);
                    let current = 0;
                    
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            current = target;
                            clearInterval(timer);
                        }
                        counter.textContent = Math.floor(current);
                    }, 16);
                    
                    observer.unobserve(counter);
                }
            });
        }, options);
        
        counters.forEach(counter => {
            observer.observe(counter);
        });
    }
    
    animateCounters();
    
    // ==========================================
    // PARALLAX SCROLLING EFFECTS
    // ==========================================
    
    function initParallaxEffects() {
        if (isMobile || isReduced) return;
        
        const parallaxElements = document.querySelectorAll('.floating-icon, .particle, .hologram-layer');
        
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            
            parallaxElements.forEach((element, index) => {
                const speed = (index % 3 + 1) * 0.1;
                const yPos = -(scrollY * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }
    
    initParallaxEffects();
    
    // ==========================================
    // TYPING ANIMATION EFFECT
    // ==========================================
    
    function initTypingEffect() {
        const typingElements = document.querySelectorAll('.typing-effect');
        
        typingElements.forEach(element => {
            const text = element.textContent;
            element.textContent = '';
            element.style.borderRight = '2px solid #6366f1';
            
            let i = 0;
            const typeInterval = setInterval(() => {
                element.textContent += text.charAt(i);
                i++;
                
                if (i > text.length) {
                    clearInterval(typeInterval);
                    setTimeout(() => {
                        element.style.borderRight = 'none';
                    }, 1000);
                }
            }, 100);
        });
    }
    
    // ==========================================
    // NEWSLETTER FORM ENHANCEMENTS
    // ==========================================
    
    function enhanceNewsletterForm() {
        const form = document.querySelector('.newsletter-form');
        if (!form) return;
        
        const input = form.querySelector('input[type="email"]');
        const button = form.querySelector('button');
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!input.value || !input.value.includes('@')) {
                // Show error animation
                input.style.borderColor = '#ef4444';
                input.style.animation = 'shake 0.5s ease-in-out';
                
                setTimeout(() => {
                    input.style.borderColor = '';
                    input.style.animation = '';
                }, 500);
                return;
            }
            
            // Success animation
            button.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
            button.style.background = '#10b981';
            
            setTimeout(() => {
                button.innerHTML = 'Subscribe <i class="fas fa-rocket"></i>';
                button.style.background = '';
                input.value = '';
            }, 2000);
        });
    }
    
    enhanceNewsletterForm();
    
    // ==========================================
    // INTERSECTION OBSERVER ANIMATIONS
    // ==========================================
    
    function initScrollAnimations() {
        const animateElements = document.querySelectorAll('.section-title, .section-description, .feature-item, .category-item');
        
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        animateElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
            observer.observe(element);
        });
    }
    
    initScrollAnimations();
    
    // ==========================================
    // THEME SWITCHER (if needed)
    // ==========================================
    
    function initThemeSwitcher() {
        const themeSwitcher = document.querySelector('.theme-switcher');
        if (!themeSwitcher) return;
        
        themeSwitcher.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            localStorage.setItem('nexaflow-theme', 
                document.body.classList.contains('dark-theme') ? 'dark' : 'light'
            );
        });
        
        // Load saved theme
        const savedTheme = localStorage.getItem('nexaflow-theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
        }
    }
    
    initThemeSwitcher();
    
    // ==========================================
    // PERFORMANCE OPTIMIZATIONS
    // ==========================================
    
    // Debounce function for scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Lazy loading for images
    function initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    initLazyLoading();
    
    // ==========================================
    // MOUSE CURSOR ENHANCEMENTS
    // ==========================================
    
    function initCustomCursor() {
        if (isMobile) return;
        
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: rgba(99, 102, 241, 0.3);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            mix-blend-mode: difference;
            transition: transform 0.1s ease;
        `;
        document.body.appendChild(cursor);
        
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX - 10 + 'px';
            cursor.style.top = e.clientY - 10 + 'px';
        });
        
        // Enhance cursor for interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .nexaflow-service-card, .nexaflow-project-card');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(2)';
                cursor.style.background = 'rgba(99, 102, 241, 0.5)';
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursor.style.background = 'rgba(99, 102, 241, 0.3)';
            });
        });
    }
    
    initCustomCursor();
    
    // ==========================================
    // KEYBOARD NAVIGATION ENHANCEMENTS
    // ==========================================
    
    function enhanceKeyboardNavigation() {
        const focusableElements = document.querySelectorAll('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])');
        
        focusableElements.forEach(element => {
            element.addEventListener('focus', function() {
                this.style.outline = '2px solid #6366f1';
                this.style.outlineOffset = '2px';
            });
            
            element.addEventListener('blur', function() {
                this.style.outline = '';
                this.style.outlineOffset = '';
            });
        });
        
        // ESC key handler
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                // Close any open modals or overlays
                const overlays = document.querySelectorAll('.modal, .overlay');
                overlays.forEach(overlay => {
                    overlay.style.display = 'none';
                });
            }
        });
    }
    
    enhanceKeyboardNavigation();
    
    // ==========================================
    // CONSOLE WELCOME MESSAGE
    // ==========================================
    
    console.log(`
    🚀 Welcome to NexaFlow Technologies
    ====================================
    
    Pioneering the Future of AI & Cloud Technologies
    
    Built with cutting-edge web technologies:
    ✨ Modern CSS animations
    🎯 Advanced JavaScript interactions
    📱 Responsive design
    ♿ Accessibility focused
    🚀 Performance optimized
    
    Connect with us: hello@nexaflow.tech
    `);
    
});

// ==========================================
// CSS ANIMATIONS (to be added via JavaScript)
// ==========================================

const additionalStyles = `
    @keyframes nexaflow-float {
        0%, 100% { transform: translateY(0) rotate(0deg); }
        25% { transform: translateY(-10px) rotate(90deg); }
        50% { transform: translateY(-20px) rotate(180deg); }
        75% { transform: translateY(-10px) rotate(270deg); }
    }
    
    @keyframes nexaflow-ripple {
        0% { width: 0; height: 0; opacity: 1; }
        100% { width: 200px; height: 200px; opacity: 0; }
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    .custom-cursor {
        transition: all 0.1s ease !important;
    }
    
    .floating-particle {
        will-change: transform;
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);