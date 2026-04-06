// Navbar Background Change on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(5, 5, 8, 0.9)';
        navbar.style.padding = '1rem 6%';
        navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.05)';
    } else {
        navbar.style.background = 'linear-gradient(to bottom, var(--bg-dark) 0%, transparent 100%)';
        navbar.style.padding = '2rem 6%';
        navbar.style.borderBottom = 'none';
    }
});

// Simple Scroll Reveal Animation
const revealOnScroll = () => {
    const sections = document.querySelectorAll('.section');
    const windowHeight = window.innerHeight;
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const revealPoint = 150;
        
        if (sectionTop < windowHeight - revealPoint) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
};

// Initial state for sections
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
});

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Hover effect for Arsenal Items
document.querySelectorAll('.arsenal-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        const icon = item.querySelector('.icon-wrap');
        icon.style.transform = 'scale(1.1) rotate(5deg)';
        icon.style.transition = 'transform 0.3s ease';
    });
    item.addEventListener('mouseleave', () => {
        const icon = item.querySelector('.icon-wrap');
        icon.style.transform = 'scale(1) rotate(0deg)';
    });
});
