// Initialize GSAP with ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Typewriter effect
const typewriterElement = document.getElementById('typewriter');
const roles = ["Frontend Developer", "Web Designer", "WordPress Developer", "HTML Developer", "Freelance Developer" ];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 150;

function typeWriter() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
        // Deleting characters
        typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 100;
    } else {
        // Typing characters
        typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 150;
    }

    // Determine what to do next
    if (!isDeleting && charIndex === currentRole.length) {
        // Pause at end of word
        typingSpeed = 1500;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        // Move to next word
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 500;
    }

    setTimeout(typeWriter, typingSpeed);
}

// Create background particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        // Random size and position
        const size = Math.random() * 10 + 5;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100 + 100;
        const duration = Math.random() * 15 + 10;
        const delay = Math.random() * 5;

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.opacity = Math.random() * 0.4 + 0.1;

        // Random color
        const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#10b981', '#0ea5e9'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.background = color;

        particlesContainer.appendChild(particle);
    }
}

// Animate on scroll
const animateItems = document.querySelectorAll('.animate-item');

animateItems.forEach(item => {
    gsap.fromTo(item,
        { opacity: 0, y: 50 },
        {
            opacity: 1,
            y: 0,
            duration: 0.8,
            scrollTrigger: {
                trigger: item,
                start: 'top 90%',
                toggleActions: 'play none none none'
            }
        }
    );
});


// Sticky header functionality
let lastScroll = 0;

window.addEventListener('scroll', function () {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 100) {
        document.querySelector('header').classList.remove('scrolled');
        document.querySelector('header').classList.remove('inactive');
        return;
    }

    if (currentScroll > lastScroll && currentScroll > 100) {
        // Scrolling down
        document.querySelector('header').classList.add('scrolled');
        // document.querySelector('header').classList.add('inactive');
    } else {
        // Scrolling up
        document.querySelector('header').classList.add('scrolled');
    }

    lastScroll = currentScroll;
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', function () {
    navLinks.classList.toggle('active');
    hamburger.innerHTML = navLinks.classList.contains('active') ?
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            navLinks.classList.remove('active');
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
});

// Initialize particles and slider on load
document.addEventListener('DOMContentLoaded', function () {
    createParticles();
    showTestimonial(0);
});
// Initialize on load
document.addEventListener('DOMContentLoaded', function () {
    createParticles();
    showTestimonial(0);
    typeWriter();
});