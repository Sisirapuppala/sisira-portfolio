// ===== NAVIGATION ===== 
const nav = document.getElementById('nav');
const navToggle = document.getElementById('nav-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link, .mobile-cta');

// Scroll effect for navigation
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking links
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// ===== EXPERIENCE TABS ===== 
const tabBtns = document.querySelectorAll('.tab-btn');
const experiencePanels = document.querySelectorAll('.experience-panel');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetTab = btn.dataset.tab;
        
        // Remove active from all
        tabBtns.forEach(b => b.classList.remove('active'));
        experiencePanels.forEach(p => p.classList.remove('active'));
        
        // Add active to clicked
        btn.classList.add('active');
        document.getElementById(targetTab).classList.add('active');
    });
});

// ===== SMOOTH SCROLL ===== 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// ===== SCROLL ANIMATIONS ===== 
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    section.classList.add('fade-in-section');
    observer.observe(section);
});

// Add CSS for fade-in animation
const style = document.createElement('style');
style.textContent = `
    .fade-in-section {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    .fade-in-section.visible {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// ===== ACTIVE NAV LINK ON SCROLL ===== 
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===== TYPING EFFECT FOR HERO ===== 
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const originalText = heroTitle.textContent;
    heroTitle.style.opacity = '1';
}

// ===== PARALLAX EFFECT FOR HERO GRID ===== 
const heroGrid = document.querySelector('.hero-grid');
if (heroGrid) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        heroGrid.style.transform = `translateY(${scrolled * 0.3}px)`;
    });
}

// ===== MAGNETIC BUTTONS ===== 
const magneticBtns = document.querySelectorAll('.btn-primary, .btn-secondary');

magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
    });
});

// ===== SKILL CARDS STAGGER ===== 
const skillCards = document.querySelectorAll('.skill-category');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, { threshold: 0.2 });

skillCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    skillObserver.observe(card);
});

// ===== PROJECT CARDS STAGGER ===== 
const projectCards = document.querySelectorAll('.project-card');
const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 150);
        }
    });
}, { threshold: 0.1 });

projectCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    projectObserver.observe(card);
});

// ===== STATS COUNTER ANIMATION ===== 
const statNumbers = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const text = target.textContent;
            const num = parseFloat(text);
            
            if (!isNaN(num)) {
                animateValue(target, 0, num, 2000, text.includes('%') || text.includes('+'));
            }
            statsObserver.unobserve(target);
        }
    });
}, { threshold: 0.5 });

function animateValue(element, start, end, duration, hasSymbol) {
    const startTime = performance.now();
    const symbol = hasSymbol ? element.textContent.replace(/[\d.]/g, '') : '';
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = start + (end - start) * easeOut;
        
        if (end % 1 === 0) {
            element.textContent = Math.floor(current) + symbol;
        } else {
            element.textContent = current.toFixed(1) + symbol;
        }
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = end + symbol;
        }
    }
    
    requestAnimationFrame(update);
}

statNumbers.forEach(stat => {
    statsObserver.observe(stat);
});

// ===== CURSOR GLOW EFFECT ===== 
const cursorGlow = document.createElement('div');
cursorGlow.classList.add('cursor-glow');
document.body.appendChild(cursorGlow);

const glowStyle = document.createElement('style');
glowStyle.textContent = `
    .cursor-glow {
        position: fixed;
        width: 400px;
        height: 400px;
        background: radial-gradient(circle, rgba(45, 90, 240, 0.08) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: -1;
        transform: translate(-50%, -50%);
        transition: opacity 0.3s ease;
        opacity: 0;
    }
    .cursor-glow.visible {
        opacity: 1;
    }
`;
document.head.appendChild(glowStyle);

let mouseX = 0, mouseY = 0;
let glowX = 0, glowY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorGlow.classList.add('visible');
});

document.addEventListener('mouseleave', () => {
    cursorGlow.classList.remove('visible');
});

function animateGlow() {
    glowX += (mouseX - glowX) * 0.1;
    glowY += (mouseY - glowY) * 0.1;
    
    cursorGlow.style.left = glowX + 'px';
    cursorGlow.style.top = glowY + 'px';
    
    requestAnimationFrame(animateGlow);
}

animateGlow();

// ===== KEYBOARD NAVIGATION ===== 
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ===== CONSOLE EASTER EGG ===== 
console.log('%c👋 Hey there, curious developer!', 'font-size: 24px; font-weight: bold; color: #2d5af0;');
console.log('%cInterested in how this site was built? Let\'s connect!', 'font-size: 14px; color: #4a4a68;');
console.log('%c📧 puppalas18@gmail.com', 'font-size: 12px; color: #6b6b8a;');
