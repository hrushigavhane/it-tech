// HGc Tech Modern Enhancements JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for anchor links
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('hgc-animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const animateElements = document.querySelectorAll('.hgc-animate-on-scroll');
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // Add animation classes to existing elements
    const serviceCards = document.querySelectorAll('.serv-box, .serv-cont');
    serviceCards.forEach(card => {
        card.classList.add('hgc-animate-on-scroll');
        observer.observe(card);
    });
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar, header');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
    
    // Enhanced contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    // Progress bar animations
    animateProgressBars();
    
    // Counter animations
    animateCounters();
    
    // Particle background
    createParticleBackground();
    
    // Enhanced button interactions
    enhanceButtons();
    
    // Mobile menu enhancements
    enhanceMobileMenu();
});

// Contact form handler
function handleContactForm(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const submitBtn = form.querySelector('[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<span class="hgc-loading"></span> Sending...';
    submitBtn.disabled = true;
    
    // Clear previous errors
    clearFormErrors(form);
    
    // Convert FormData to object
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });
    
    // Send form data
    fetch('php/contact-form.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            showSuccessMessage(result.message);
            form.reset();
        } else {
            showFormErrors(form, result.errors);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showFormErrors(form, ['Network error. Please try again.']);
    })
    .finally(() => {
        // Restore button
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
    });
}

// Show success message
function showSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'alert alert-success hgc-success-message';
    successDiv.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    
    // Insert at top of form
    const form = document.getElementById('contactForm');
    form.insertBefore(successDiv, form.firstChild);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
    
    // Scroll to success message
    successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Show form errors
function showFormErrors(form, errors) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-danger hgc-error-message';
    errorDiv.innerHTML = `
        <i class="fas fa-exclamation-triangle"></i>
        <ul>
            ${errors.map(error => `<li>${error}</li>`).join('')}
        </ul>
    `;
    
    form.insertBefore(errorDiv, form.firstChild);
    errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Clear form errors
function clearFormErrors(form) {
    const existingErrors = form.querySelectorAll('.hgc-error-message, .hgc-success-message');
    existingErrors.forEach(error => error.remove());
}

// Animate progress bars
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.liq-load');
    
    const progressObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const targetWidth = progressBar.getAttribute('data-progress') || '90%';
                
                setTimeout(() => {
                    progressBar.style.width = targetWidth;
                }, 500);
                
                progressObserver.unobserve(progressBar);
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => {
        // Set initial width to 0
        bar.style.width = '0%';
        bar.style.transition = 'width 2s ease-in-out';
        progressObserver.observe(bar);
    });
}

// Animate counters
function animateCounters() {
    const counters = document.querySelectorAll('.counter-number, .number');
    
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.textContent) || 100;
                animateCounter(counter, target);
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Counter animation function
function animateCounter(element, target) {
    const duration = 2000;
    const start = 0;
    const range = target - start;
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const value = Math.floor(start + (range * easeOutCubic(progress)));
        
        element.textContent = value + (element.textContent.includes('+') ? '+' : '');
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Easing function
function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
}

// Create particle background
function createParticleBackground() {
    const hero = document.querySelector('.home1');
    if (!hero) return;
    
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'hgc-particles';
    
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.className = 'hgc-particle';
        particlesContainer.appendChild(particle);
    }
    
    hero.appendChild(particlesContainer);
}

// Enhance buttons
function enhanceButtons() {
    const buttons = document.querySelectorAll('button, .btn, .main-btn-1, .main-btn-2, .main-btn-3, .main-btn-4');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Enhance mobile menu
function enhanceMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle-button');
    const mobileMenu = document.querySelector('.navbar-responsive ul');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileMenu.classList.toggle('show');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!menuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
                menuToggle.classList.remove('active');
                mobileMenu.classList.remove('show');
            }
        });
    }
}

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .alert {
        padding: 1rem;
        margin-bottom: 1rem;
        border-radius: 10px;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .alert-success {
        background: linear-gradient(135deg, #10B981, #059669);
        color: white;
        border: none;
    }
    
    .alert-danger {
        background: linear-gradient(135deg, #EF4444, #DC2626);
        color: white;
        border: none;
    }
    
    .alert ul {
        margin: 0;
        padding-left: 1rem;
    }
    
    .alert li {
        margin-bottom: 0.25rem;
    }
    
    .navbar.scrolled {
        backdrop-filter: blur(20px);
        background: rgba(255, 255, 255, 0.98) !important;
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    }
    
    .menu-toggle-button.active .header-nav-icon:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .menu-toggle-button.active .header-nav-icon:nth-child(2) {
        opacity: 0;
    }
    
    .menu-toggle-button.active .header-nav-icon:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    .header-nav-icon {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(style);

// Form validation enhancements
document.addEventListener('input', function(e) {
    if (e.target.matches('.hgc-form-control')) {
        validateField(e.target);
    }
});

function validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    const required = field.hasAttribute('required');
    
    // Remove existing validation classes
    field.classList.remove('valid', 'invalid');
    
    // Check if field is empty and required
    if (required && !value) {
        field.classList.add('invalid');
        return false;
    }
    
    // Email validation
    if (type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            field.classList.add('invalid');
            return false;
        }
    }
    
    // If we get here, field is valid
    if (value) {
        field.classList.add('valid');
    }
    
    return true;
}

// Add field validation styles
const validationStyles = document.createElement('style');
validationStyles.textContent = `
    .hgc-form-control.valid {
        border-color: #10B981;
        box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
    }
    
    .hgc-form-control.invalid {
        border-color: #EF4444;
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }
    
    .hgc-form-control.valid + .field-icon {
        color: #10B981;
    }
    
    .hgc-form-control.invalid + .field-icon {
        color: #EF4444;
    }
`;
document.head.appendChild(validationStyles);