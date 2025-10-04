// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
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

// Animated Counter for Stats Section
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200; // The lower the slower

    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(() => animateCounters(), 1);
        } else {
            counter.innerText = target + '+';
        }
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Trigger counter animation when stats section is visible
            if (entry.target.classList.contains('stats')) {
                animateCounters();
            }
            
            // Trigger skill bar animations when about section is visible
            if (entry.target.classList.contains('about')) {
                animateSkillBars();
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    // Add animation classes to elements
    const animatedElements = document.querySelectorAll('.service-card, .stat-item, .timeline-item, .skill-item, .project-card, .article-card, .testimonial-content');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Add slide animations to hero content
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    if (heroContent) {
        heroContent.classList.add('slide-in-left');
        observer.observe(heroContent);
    }
    if (heroImage) {
        heroImage.classList.add('slide-in-right');
        observer.observe(heroImage);
    }
});

// Animate Skill Bars
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width;
    });
}

// Project Filter Functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        projectCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s ease-in-out';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Testimonials Slider
let currentSlide = 0;
const slides = document.querySelectorAll('.testimonial-slide');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    // Hide all slides
    slides.forEach(slide => slide.classList.remove('active'));
    // Show current slide
    if (slides[index]) {
        slides[index].classList.add('active');
    }

    // Update dots
    dots.forEach(dot => dot.classList.remove('active'));
    if (dots[index]) {
        dots[index].classList.add('active');
    }
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

// Add click event listeners to dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
    });
});

// Auto-advance testimonials every 5 seconds
setInterval(nextSlide, 5000);

// Initialize slider
showSlide(0);

// Newsletter Form Submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        if (email) {
            // Show success message (you can customize this)
            alert('Thank you for subscribing to our newsletter!');
            newsletterForm.querySelector('input[type="email"]').value = '';
        }
    });
}

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 14, 26, 0.98)';
    } else {
        navbar.style.background = 'rgba(10, 14, 26, 0.95)';
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add CSS animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes pulse {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
        100% {
            transform: scale(1);
        }
    }

    .btn-primary:hover {
        animation: pulse 0.6s ease-in-out;
    }

    .service-card:hover .service-icon {
        animation: pulse 0.6s ease-in-out;
    }
`;
document.head.appendChild(style);

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Contact button functionality
const contactButtons = document.querySelectorAll('.contact-btn, .btn-primary');
contactButtons.forEach(button => {
    button.addEventListener('click', () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animated text switching for hero section
const animatedTexts = [
    'CSE Student',
    'Problem Solver', 
    'Aspiring Data Scientist'
];

let currentTextIndex = 0;
let isDeleting = false;
let currentCharIndex = 0;
let typeSpeed = 100;
let deleteSpeed = 50;
let pauseTime = 2000;

function typeText() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) return;

    const currentText = animatedTexts[currentTextIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, currentCharIndex - 1);
        currentCharIndex--;
        typeSpeed = deleteSpeed;
    } else {
        typingElement.textContent = currentText.substring(0, currentCharIndex + 1);
        currentCharIndex++;
        typeSpeed = 100;
    }

    if (!isDeleting && currentCharIndex === currentText.length) {
        typeSpeed = pauseTime;
        isDeleting = true;
    } else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentTextIndex = (currentTextIndex + 1) % animatedTexts.length;
        typeSpeed = 500;
    }

    setTimeout(typeText, typeSpeed);
}

// Resume download functionality
function downloadResume() {
    const resumeBtn = document.getElementById('resume-btn');
    if (resumeBtn) {
        resumeBtn.addEventListener('click', () => {
            // Create a temporary link element to trigger download
            const link = document.createElement('a');
            link.href = 'Soham Resume.pdf';
            link.download = 'Soham Resume.pdf';
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }
}

// Profile photo zoom functionality
function initProfilePhotoZoom() {
    const profilePhoto = document.getElementById('profile-photo');
    const body = document.body;
    
    if (profilePhoto) {
        profilePhoto.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // Create overlay
            const overlay = document.createElement('div');
            overlay.className = 'photo-overlay active';
            body.appendChild(overlay);
            
            // Prevent body scroll
            body.style.overflow = 'hidden';
            
            // Add zoomed class to photo
            profilePhoto.classList.add('zoomed');
            
            // Close function
            const closeZoom = () => {
                profilePhoto.classList.remove('zoomed');
                overlay.classList.remove('active');
                body.style.overflow = 'auto';
                setTimeout(() => {
                    if (body.contains(overlay)) {
                        body.removeChild(overlay);
                    }
                }, 300);
                document.removeEventListener('keydown', handleEscape);
            };
            
            // Close on overlay click
            overlay.addEventListener('click', closeZoom);
            
            // Close on escape key
            const handleEscape = (e) => {
                if (e.key === 'Escape') {
                    closeZoom();
                }
            };
            document.addEventListener('keydown', handleEscape);
        });
    }
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const phone = formData.get('phone');
            const message = formData.get('message');
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Create mailto link
            const mailtoLink = `mailto:sohampatil200616@email.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
                `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\n\nMessage:\n${message}`
            )}`;
            
            // Open email client
            window.location.href = mailtoLink;
            
            // Show success message
            alert('Thank you for your message! Your email client should open now.');
            
            // Reset form
            contactForm.reset();
        });
    }
}

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Start the animated text typing effect
    setTimeout(typeText, 1000);
    
    // Initialize resume download
    downloadResume();
    
    // Initialize profile photo zoom
    initProfilePhotoZoom();
    
    // Initialize contact form
    initContactForm();
});

// Add smooth reveal animation for sections
const revealElements = document.querySelectorAll('.services, .stats, .about, .projects, .articles, .testimonials');
revealElements.forEach(element => {
    observer.observe(element);
});

// Add hover effects for interactive elements
document.addEventListener('DOMContentLoaded', () => {
    // Add hover effect to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add hover effect to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Add scroll progress indicator
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(135deg, #00d4ff, #0099cc);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Initialize scroll progress
createScrollProgress();
