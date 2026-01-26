// Initialize GSAP and ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Particles Canvas Animation
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.2;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }

    draw() {
        ctx.fillStyle = `rgba(99, 102, 241, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

const particles = [];
for (let i = 0; i < 100; i++) {
    particles.push(new Particle());
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    // Draw connections
    particles.forEach((a, i) => {
        particles.slice(i + 1).forEach(b => {
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
                ctx.strokeStyle = `rgba(99, 102, 241, ${0.2 * (1 - distance / 150)})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(a.x, a.y);
                ctx.lineTo(b.x, b.y);
                ctx.stroke();
            }
        });
    });

    requestAnimationFrame(animateParticles);
}

animateParticles();

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.8)';
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Hero Title Animation
gsap.from('.hero-title .line', {
    y: 100,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: 'power4.out'
});

// Hero Description Animation
gsap.from('.hero-description', {
    opacity: 0,
    y: 30,
    duration: 1,
    delay: 0.6,
    ease: 'power3.out'
});

// Hero Buttons Animation
gsap.from('.hero-buttons .btn', {
    opacity: 0,
    y: 30,
    duration: 0.8,
    stagger: 0.2,
    delay: 0.8,
    ease: 'power3.out'
});

// Stats Counter Animation
const statNumbers = document.querySelectorAll('.stat-number');

const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };

    updateCounter();
};

gsap.from('.stat-item', {
    scrollTrigger: {
        trigger: '.hero-stats',
        start: 'top 80%',
        onEnter: () => {
            statNumbers.forEach(stat => animateCounter(stat));
        },
        once: true
    },
    opacity: 0,
    y: 30,
    duration: 0.8,
    stagger: 0.2
});

// Floating Cards Animation
gsap.to('.floating-card.card-1', {
    y: -20,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: 'power1.inOut'
});

gsap.to('.floating-card.card-2', {
    y: -30,
    duration: 2.5,
    repeat: -1,
    yoyo: true,
    ease: 'power1.inOut',
    delay: 0.5
});

gsap.to('.floating-card.card-3', {
    y: -25,
    duration: 2.2,
    repeat: -1,
    yoyo: true,
    ease: 'power1.inOut',
    delay: 1
});

// Rotate cards slightly on hover
document.querySelectorAll('.floating-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        gsap.to(card, {
            scale: 1.1,
            rotation: 5,
            duration: 0.3,
            ease: 'power2.out'
        });
    });

    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            scale: 1,
            rotation: 0,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

// Section Headers Animation
gsap.utils.toArray('.section-header').forEach(header => {
    gsap.from(header.children, {
        scrollTrigger: {
            trigger: header,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
    });
});

// Service Cards Animation
gsap.utils.toArray('.service-card').forEach((card, index) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 80,
        rotation: 5,
        duration: 0.8,
        delay: index * 0.1,
        ease: 'power3.out'
    });

    // Hover effect with GSAP
    card.addEventListener('mouseenter', () => {
        gsap.to(card.querySelector('.service-icon'), {
            scale: 1.2,
            rotation: 360,
            duration: 0.5,
            ease: 'back.out(1.7)'
        });
    });

    card.addEventListener('mouseleave', () => {
        gsap.to(card.querySelector('.service-icon'), {
            scale: 1,
            rotation: 0,
            duration: 0.5,
            ease: 'back.out(1.7)'
        });
    });
});

// Portfolio Items Animation
gsap.utils.toArray('.portfolio-item').forEach((item, index) => {
    gsap.from(item, {
        scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
        delay: index * 0.1,
        ease: 'power3.out'
    });

    // Parallax effect on scroll
    gsap.to(item.querySelector('.portfolio-image'), {
        scrollTrigger: {
            trigger: item,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
        },
        y: -50
    });
});

// Testimonials Animation
gsap.utils.toArray('.testimonial-card').forEach((card, index) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        x: index % 2 === 0 ? -80 : 80,
        duration: 0.8,
        delay: index * 0.15,
        ease: 'power3.out'
    });
});

// CTA Shapes Animation
gsap.to('.shape-1', {
    x: 100,
    y: 100,
    duration: 8,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
});

gsap.to('.shape-2', {
    x: -100,
    y: -100,
    duration: 10,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
});

gsap.to('.shape-3', {
    scale: 1.5,
    duration: 6,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
});

// CTA Section Animation
gsap.from('.cta-content', {
    scrollTrigger: {
        trigger: '.cta',
        start: 'top 70%',
        toggleActions: 'play none none reverse'
    },
    opacity: 0,
    scale: 0.9,
    duration: 1,
    ease: 'power3.out'
});

// Contact Form Animation
gsap.from('.contact-info', {
    scrollTrigger: {
        trigger: '.contact-wrapper',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
    },
    opacity: 0,
    x: -80,
    duration: 0.8,
    ease: 'power3.out'
});

gsap.from('.contact-form', {
    scrollTrigger: {
        trigger: '.contact-wrapper',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
    },
    opacity: 0,
    x: 80,
    duration: 0.8,
    ease: 'power3.out'
});

// Form inputs animation on focus
document.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(input => {
    input.addEventListener('focus', () => {
        gsap.to(input, {
            scale: 1.02,
            duration: 0.3,
            ease: 'power2.out'
        });
    });

    input.addEventListener('blur', () => {
        gsap.to(input, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

// Smooth Scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            gsap.to(window, {
                duration: 1,
                scrollTo: {
                    y: target,
                    offsetY: 80
                },
                ease: 'power3.inOut'
            });
        }
    });
});

// Scroll Indicator Animation
gsap.to('.scroll-indicator', {
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1
    },
    opacity: 0,
    y: -20
});

// Form Submit Handler (prevent default for demo)
document.querySelector('.contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const button = e.target.querySelector('.btn');
    const originalText = button.textContent;
    
    // Animate button on submit
    gsap.to(button, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        onComplete: () => {
            button.textContent = 'Mensagem Enviada! ✓';
            button.style.background = '#10b981';
            
            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = '';
                e.target.reset();
            }, 3000);
        }
    });
});

// Parallax effect for hero section
gsap.to('.hero-content', {
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1
    },
    y: 100,
    opacity: 0.5
});

// Cursor trail effect (optional - adds extra visual flair)
const cursor = document.createElement('div');
cursor.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: rgba(99, 102, 241, 0.5);
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    transition: width 0.3s, height 0.3s;
    display: none;
`;
document.body.appendChild(cursor);

// Only show cursor effect on desktop
if (window.innerWidth > 968) {
    cursor.style.display = 'block';
    
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.5,
            ease: 'power2.out'
        });
    });

    // Enlarge cursor on hover over interactive elements
    document.querySelectorAll('a, button, .service-card, .portfolio-item').forEach(el => {
        el.addEventListener('mouseenter', () => {
            gsap.to(cursor, {
                width: 40,
                height: 40,
                duration: 0.3
            });
        });

        el.addEventListener('mouseleave', () => {
            gsap.to(cursor, {
                width: 20,
                height: 20,
                duration: 0.3
            });
        });
    });
}

// Loading animation
window.addEventListener('load', () => {
    gsap.to('body', {
        opacity: 1,
        duration: 0.5
    });
});

// Initial body opacity
document.body.style.opacity = 0;
