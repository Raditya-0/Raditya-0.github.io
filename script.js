// Viewport observer — for elements in normal (non-scrollable) sections
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show-element');
        } else {
            entry.target.classList.remove('show-element');
        }
    });
}, { threshold: 0.15 });

const viewportElements = document.querySelectorAll('.achievement-card, .project-card, .section-header');
viewportElements.forEach((el) => observer.observe(el));

let isLocked = false;
let currentIndex = 0;
let wheelAccumulator = 0;
const scrollThreshold = 150;
const touchThreshold = 80;

const sections = [
    document.querySelector('.hero'),
    document.querySelector('#education'),
    document.querySelector('#experience'),
    document.querySelector('#projects'),
    document.querySelector('#achievement'),
    document.querySelector('#contact')
];

const progressContainer = document.querySelector('.scroll-progress-container');
const progressBar = document.querySelector('.scroll-progress-bar');

function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function smoothScrollTo(targetPosition, duration) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = easeInOutCubic(progress);

        window.scrollTo(0, startPosition + distance * ease);

        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }

    requestAnimationFrame(animation);
}

function updateProgressBar(percentage) {
    progressContainer.classList.add('active');
    progressBar.style.width = `${percentage}%`;
}

function hideProgressBar() {
    progressContainer.classList.remove('active');
    setTimeout(() => {
        progressBar.style.transition = 'none';
        progressBar.style.width = '0%';
        setTimeout(() => {
            progressBar.style.transition = 'width 0.15s ease-out';
        }, 50);
    }, 400);
}

function handleScroll(direction) {
    if (direction > 0) {
        if (currentIndex === sections.length - 1) {
            hideProgressBar();
            return;
        }
        currentIndex++;
    } else {
        if (currentIndex === 0) {
            hideProgressBar();
            return;
        }
        currentIndex--;
    }

    isLocked = true;
    wheelAccumulator = 0;

    const targetPosition = sections[currentIndex].offsetTop;
    smoothScrollTo(targetPosition, 1200);
    sessionStorage.setItem('lastSection', currentIndex);

    progressBar.style.width = '100%';

    setTimeout(() => {
        hideProgressBar();
    }, 200);

    setTimeout(() => {
        isLocked = false;
        wheelAccumulator = 0;
    }, 1200);
}

let resetTimeout;
let wasScrollingInternally = false;

window.addEventListener('wheel', (e) => {
    if (isLocked) {
        e.preventDefault();
        return;
    }

    const currentSection = sections[currentIndex];
    const scrollingDown = e.deltaY > 0;
    const scrollingUp = e.deltaY < 0;

    const canScrollDown = currentSection.scrollTop + currentSection.clientHeight < currentSection.scrollHeight - 1;
    const canScrollUp = currentSection.scrollTop > 0;

    // If the section still has internal content, let it scroll naturally
    if ((scrollingDown && canScrollDown) || (scrollingUp && canScrollUp)) {
        wasScrollingInternally = true;
        wheelAccumulator = 0;
        hideProgressBar();
        return;
    }

    // Just hit the scroll boundary — discard this event entirely, start fresh next time
    if (wasScrollingInternally) {
        wasScrollingInternally = false;
        wheelAccumulator = 0;
        e.preventDefault();
        return;
    }

    // Section is fully scrolled — intercept and snap to next/prev section
    e.preventDefault();
    wheelAccumulator += e.deltaY;

    const percentage = Math.min((Math.abs(wheelAccumulator) / scrollThreshold) * 100, 100);
    updateProgressBar(percentage);

    clearTimeout(resetTimeout);

    if (Math.abs(wheelAccumulator) >= scrollThreshold) {
        handleScroll(wheelAccumulator);
    } else {
        resetTimeout = setTimeout(() => {
            wheelAccumulator = 0;
            hideProgressBar();
        }, 300);
    }
}, { passive: false });

let touchStartY = 0;
let currentTouchY = 0;

window.addEventListener('touchstart', (e) => {
    if (isLocked) return;
    touchStartY = e.touches[0].clientY;
    currentTouchY = touchStartY;
}, { passive: false });

window.addEventListener('touchmove', (e) => {
    if (isLocked) {
        e.preventDefault();
        return;
    }

    currentTouchY = e.touches[0].clientY;
    const deltaY = touchStartY - currentTouchY;

    const currentSection = sections[currentIndex];
    const scrollingDown = deltaY > 0;
    const scrollingUp = deltaY < 0;

    const canScrollDown = currentSection.scrollTop + currentSection.clientHeight < currentSection.scrollHeight - 1;
    const canScrollUp = currentSection.scrollTop > 0;

    if ((scrollingDown && canScrollDown) || (scrollingUp && canScrollUp)) {
        return; // let section scroll internally
    }

    e.preventDefault();

    const percentage = Math.min((Math.abs(deltaY) / touchThreshold) * 100, 100);
    updateProgressBar(percentage);

    if (Math.abs(deltaY) >= touchThreshold) {
        handleScroll(deltaY);
    }
}, { passive: false });

window.addEventListener('touchend', () => {
    if (isLocked) return;
    let deltaY = touchStartY - currentTouchY;
    if (Math.abs(deltaY) < touchThreshold) {
        hideProgressBar();
    }
});

// Navbar click — intercept and sync currentIndex
document.querySelectorAll('.nav-links a').forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').replace('#', '');
        const targetSection = document.getElementById(targetId) ||
            (targetId === ''
                ? document.querySelector('.hero')
                : null);
        if (!targetSection) return;

        const idx = sections.indexOf(targetSection);
        if (idx === -1) return;

        // Reset internal scroll of experience sections before jumping
        sections.forEach(s => { s.scrollTop = 0; });

        currentIndex = idx;
        isLocked = true;
        wheelAccumulator = 0;

        smoothScrollTo(targetSection.offsetTop, 1000);
        sessionStorage.setItem('lastSection', currentIndex);

        setTimeout(() => { isLocked = false; }, 1000);
    });
});

const typingData = [
    {
        text: "Raditya Akmal",
        subtitle: "✨ Welcome to my portfolio",
        tags: ["Problem Solver", "Tech Enthusiast", "Fast Learner"]
    },
    {
        text: "an AI Engineer",
        subtitle: "🧠 Building intelligent models and LLM",
        tags: ["Python", "Transformer", "Hugging Face", "Kaggle", "LLM", "Machine Learning", "Deep Learning", "Computer Vision"]
    },
    {
        text: "a Robot Programmer",
        subtitle: "🤖 Developing advanced control and navigation",
        tags: ["ROS 2", "STM32", "C++", "Computer Vision", "FAST-LIVO2"]
    },
    {
        text: "a Game Developer",
        subtitle: "🎮 Crafting interactive mechanics and experiences",
        tags: ["Unity", "Godot", "Game Design", "2D Games", "3D Games", "C#", "GDScript"]
    }

];

const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");
const dynamicSubtitle = document.querySelector(".dynamic-subtitle");
const dynamicTags = document.querySelector(".dynamic-tags");

function updateDynamicContent() {
    const currentData = typingData[textArrayIndex];
    dynamicSubtitle.textContent = currentData.subtitle;

    dynamicTags.innerHTML = '';
    currentData.tags.forEach((tag, index) => {
        const span = document.createElement('span');
        span.className = 'dynamic-tag';
        span.textContent = tag;
        span.style.animationDelay = `${index * 0.1}s`;
        dynamicTags.appendChild(span);

        // Force new row after every 4 tags
        if ((index + 1) % 4 === 0 && index + 1 < currentData.tags.length) {
            const br = document.createElement('div');
            br.className = 'tags-row-break';
            dynamicTags.appendChild(br);
        }
    });
}

function type() {
    if (charIndex === 0) {
        updateDynamicContent();
    }
    if (charIndex < typingData[textArrayIndex].text.length) {
        if (!cursorSpan.classList.contains("typing")) {
            cursorSpan.classList.add("typing");
        }
        typedTextSpan.textContent += typingData[textArrayIndex].text.charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        cursorSpan.classList.remove("typing");
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        if (!cursorSpan.classList.contains("typing")) {
            cursorSpan.classList.add("typing");
        }
        typedTextSpan.textContent = typingData[textArrayIndex].text.substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        cursorSpan.classList.remove("typing");
        textArrayIndex++;
        if (textArrayIndex >= typingData.length) {
            textArrayIndex = 0;
        }
        setTimeout(type, typingDelay + 500);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    // Restore last visited section after refresh
    const savedIndex = parseInt(sessionStorage.getItem('lastSection'));
    if (!isNaN(savedIndex) && savedIndex > 0 && savedIndex < sections.length) {
        currentIndex = savedIndex;
        window.scrollTo(0, sections[savedIndex].offsetTop);
    }

    updateDynamicContent();
    setTimeout(type, newTextDelay);

    // Portrait photo slideshow
    const slides = document.querySelectorAll('.portrait-slide');
    if (slides.length > 1) {
        let slideIndex = 0;
        setInterval(() => {
            slides[slideIndex].classList.remove('active');
            slideIndex = (slideIndex + 1) % slides.length;
            slides[slideIndex].classList.add('active');
        }, 4000); // ganti foto setiap 4 detik
    }
});