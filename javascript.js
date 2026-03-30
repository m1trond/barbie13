// ===== PARTICLES =====
function createParticles() {
    const container = document.getElementById('particles');
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        container.appendChild(particle);
    }
}

// ===== NAVBAR SCROLL =====
function handleNavbarScroll() {
    const navbar = document.getElementById('navbar');
    const scrollY = window.scrollY;

    if (scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// ===== MOBILE NAV TOGGLE =====
function initMobileNav() {
    const toggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close nav on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// ===== SCROLL REVEAL =====
function initScrollReveal() {
    const elements = document.querySelectorAll(
        '.language-card, .pricing-card, .contact-card, .phonetics-content, .telegram-content, .section-header'
    );

    elements.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(el => observer.observe(el));
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== FORM SUBMIT =====
function initForm() {
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;

        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
        btn.disabled = true;

        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-check"></i> Отправлено!';
            btn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';

            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
                btn.disabled = false;
                form.reset();
            }, 2000);
        }, 1500);
    });
}

// ===== TILT EFFECT ON CARDS =====
function initTiltEffect() {
    const cards = document.querySelectorAll('.language-card, .pricing-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// ===== COUNTER ANIMATION =====
function animateCounters() {
    const counters = document.querySelectorAll('.amount');

    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/\s/g, ''));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current).toLocaleString('ru-RU');
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString('ru-RU');
            }
        };

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateCounter();
                observer.disconnect();
            }
        }, { threshold: 0.5 });

        observer.observe(counter);
    });
}

// ===== TYPING EFFECT FOR HERO =====
function initTypingEffect() {
    const subtitle = document.querySelector('.hero-subtitle');
    const languages = ['Английский', 'Французский', 'Испанский', 'Немецкий'];
    let langIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentLang = languages[langIndex];

        if (isDeleting) {
            subtitle.textContent = currentLang.substring(0, charIndex - 1);
            charIndex--;
        } else {
            subtitle.textContent = currentLang.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentLang.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            langIndex = (langIndex + 1) % languages.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    // Uncomment to enable typing effect (replaces static text)
    // setTimeout(type, 1000);
}

// ===== CURSOR GLOW EFFECT (DISABLED) =====
// function initCursorGlow() {
//     const glow = document.createElement('div');
//     glow.style.cssText = `
//         position: fixed;
//         width: 300px;
//         height: 300px;
//         background: radial-gradient(circle, rgba(255, 105, 180, 0.15) 0%, transparent 70%);
//         border-radius: 50%;
//         pointer-events: none;
//         z-index: 9999;
//         transform: translate(-50%, -50%);
//         transition: opacity 0.3s;
//     `;
//     document.body.appendChild(glow);
//
//     document.addEventListener('mousemove', (e) => {
//         glow.style.left = e.clientX + 'px';
//         glow.style.top = e.clientY + 'px';
//     });
//
//     document.addEventListener('mouseleave', () => {
//         glow.style.opacity = '0';
//     });
//
//     document.addEventListener('mouseenter', () => {
//         glow.style.opacity = '1';
//     });
// }

// ===== ACTIVE NAV LINK =====
function initActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// ===== PARALLAX EFFECT =====
function initParallax() {
    const heroVisual = document.querySelector('.hero-visual');
    const floatingCards = document.querySelectorAll('.floating-card');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        if (scrollY < window.innerHeight) {
            floatingCards.forEach((card, index) => {
                const speed = 0.1 + (index * 0.05);
                card.style.transform = `translateY(${scrollY * speed}px)`;
            });
        }
    });
}

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', () => {
    initMobileNav();
    initSmoothScroll();
    initScrollReveal();
    initForm();
    initTiltEffect();
    animateCounters();
    // initCursorGlow();
    initActiveNavLink();
    initParallax();

    window.addEventListener('scroll', handleNavbarScroll);
    handleNavbarScroll();
});
