/* ========================================
   INTERACTIVE JAVASCRIPT FOR ANIMATIONS
   ======================================== */

// Scroll animation for fade-in elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = `${entry.target.dataset.animation || 'fadeInUp'} 0.8s ease-out forwards`;
            entry.target.style.opacity = '1';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in, .fade-in-card, .pro-card, .con-card, .cost-card').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Smooth scroll to sections
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Hamburger menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        hamburger.classList.toggle('active');
    });
}

// CTA Button Click Animation
const ctaButtons = document.querySelectorAll('.hero-btn, .cta-button');
ctaButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 100);
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.1)';
    }
});

// Counter animation for costs
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Add hover effects to cards
document.querySelectorAll('.pro-card, .con-card, .cost-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    });
});

// Parallax effect on scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroOverlay = document.querySelector('.hero-overlay');
    if (heroOverlay) {
        heroOverlay.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add active state to nav links based on scroll position
function highlightNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 60) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === currentSection) {
                link.style.color = 'var(--accent)';
            } else {
                link.style.color = 'var(--white)';
            }
        });
    });
}

highlightNavLink();

// Mobile menu close on link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navMenu.style.display = 'none';
        }
    });
});

// Animate on page load
window.addEventListener('load', () => {
    document.querySelectorAll('.hero-title, .hero-subtitle, .hero-description, .hero-btn').forEach((el, index) => {
        el.style.opacity = '0';
        el.style.animation = `slideInLeft 0.8s ease-out ${index * 0.2}s forwards`;
    });
});

// Add ripple effect to buttons
document.querySelectorAll('button, .resource-link').forEach(element => {
    element.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Scroll to top button functionality
const createScrollToTopBtn = () => {
    const btn = document.createElement('button');
    btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    btn.id = 'scrollToTopBtn';
    btn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #d32f2f, #ff6b6b);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        display: none;
        z-index: 999;
        box-shadow: 0 8px 20px rgba(211, 47, 47, 0.3);
        transition: all 0.3s ease;
    `;

    document.body.appendChild(btn);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            btn.style.display = 'flex';
            btn.style.alignItems = 'center';
            btn.style.justifyContent = 'center';
        } else {
            btn.style.display = 'none';
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    btn.addEventListener('hover', () => {
        btn.style.transform = 'translateY(-5px)';
    });
};

createScrollToTopBtn();

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (navMenu && navMenu.style.display === 'flex') {
            navMenu.style.display = 'none';
        }
    }
});

// Performance optimization: Throttle scroll events
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
            // Perform scroll-based updates
            scrollTimeout = null;
        }, 100);
    }
});

console.log('🏍️ RideWise Website Loaded Successfully!');
