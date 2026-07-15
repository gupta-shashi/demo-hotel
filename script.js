document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. LOADING SCREEN SYSTEM
       ========================================================================== */
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 600);
        }, 400);
    });

    /* ==========================================================================
       2. SCROLL PROGRESS BAR & STICKY NAVBAR BACKGROUND
       ========================================================================== */
    const progressBar = document.getElementById('scroll-progress');
    const navbar = document.querySelector('.navbar');
    const backToTopBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
        if (totalScroll > 0) {
            const progress = (window.pageYOffset / totalScroll) * 100;
            progressBar.style.width = `${progress}%`;
        }

        // Sticky Navbar Toggle
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Back To Top Visibility Toggle
        if (window.scrollY > 600) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });

    // Back to top scroll execution
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    /* ==========================================================================
       3. DARK / LIGHT THEME TOGGLE MECHANISM
       ========================================================================== */
    const themeToggle = document.getElementById('theme-toggle');
    const bodyElement = document.body;
    
    // Check local storage configuration state
    if(localStorage.getItem('hotel-theme') === 'dark') {
        bodyElement.classList.remove('light-theme');
        bodyElement.classList.add('dark-theme');
        themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }

    themeToggle.addEventListener('click', () => {
        if(bodyElement.classList.contains('light-theme')) {
            bodyElement.classList.remove('light-theme');
            bodyElement.classList.add('dark-theme');
            themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
            localStorage.setItem('hotel-theme', 'dark');
        } else {
            bodyElement.classList.remove('dark-theme');
            bodyElement.classList.add('light-theme');
            themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
            localStorage.setItem('hotel-theme', 'light');
        }
    });

    /* ==========================================================================
       4. MOBILE NAVIGATION DRAWER
       ========================================================================== */
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    const toggleMobileMenu = () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    };

    hamburger.addEventListener('click', toggleMobileMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if(navMenu.classList.contains('active')) toggleMobileMenu();
        });
    });

    // Active Section Tracking on Scroll Layouts
    const sections = document.querySelectorAll('section[id], header, div[id="enquiry"]');
    window.addEventListener('scroll', () => {
        let currentSectionId = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 140;
            if(window.scrollY >= sectionTop) {
                currentSectionId = section.getAttribute('id') || "";
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if(link.getAttribute('href') === `#${currentSectionId}` || (currentSectionId === "" && link.getAttribute('href') === "#")) {
                link.classList.add('active');
            }
        });
    });

    /* ==========================================================================
       5. PREMIUM INTERSECTION OBSERVER FOR SCROLL REVEAL & COUNTERS
       ========================================================================== */
    const revealElements = document.querySelectorAll('.reveal-fade, .reveal-slide-up, .reveal-left, .reveal-right');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                observer.unobserve(entry.target); // Trigger animation once
            }
        });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });

    revealElements.forEach(element => revealObserver.observe(element));

    // Numerical Statistics Counter Engine
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const countUp = (element) => {
        const target = parseFloat(element.getAttribute('data-target'));
        const duration = 2000; // 2 seconds total running animation duration
        const startStep = 0;
        const stepTime = Math.max(Math.floor(duration / target), 15);
        let currentNum = startStep;

        const timer = setInterval(() => {
            currentNum += target / (duration / stepTime);
            if(currentNum >= target) {
                element.textContent = target === 4 ? "4.8" : Math.floor(target).toLocaleString();
                clearInterval(timer);
            } else {
                element.textContent = target === 4 ? currentNum.toFixed(1) : Math.floor(currentNum).toLocaleString();
            }
        }, stepTime);
    };

    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                countUp(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(num => statsObserver.observe(num));

    /* ==========================================================================
       6. ROOM BUTTON BINDING LOGIC
       ========================================================================== */
    const roomBookingButtons = document.querySelectorAll('.room-btn-book');
    const roomSelectionDropdown = document.getElementById('roomType');

    roomBookingButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const designatedRoom = e.target.getAttribute('data-room');
            if(designatedRoom && roomSelectionDropdown) {
                roomSelectionDropdown.value = designatedRoom;
            }
        });
    });

    /* ==========================================================================
       7. INTERACTIVE GALLERY LIGHTBOX SYSTEM
       ========================================================================== */
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetImgSrc = item.querySelector('img').getAttribute('src');
            const descriptiveText = item.querySelector('.gallery-overlay-text').textContent;
            
            lightboxImg.setAttribute('src', targetImgSrc);
            lightboxCaption.textContent = descriptiveText;
            lightbox.style.display = 'flex';
            setTimeout(() => lightbox.classList.add('active'), 10);
        });
    });

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        setTimeout(() => lightbox.style.display = 'none', 300);
    };

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if(e.target === lightbox) closeLightbox();
    });

    /* ==========================================================================
       8. TESTIMONIAL CAROUSEL ENGINE
       ========================================================================== */
    const track = document.getElementById('testimonial-track');
    const reviewCards = document.querySelectorAll('.testimonial-card');
    const nextBtn = document.getElementById('next-review');
    const prevBtn = document.getElementById('prev-review');
    const dotsContainer = document.getElementById('slider-dots');
    
    let currentIndex = 0;
    const totalReviews = reviewCards.length;

    // Create Navigation Dot Elements
    reviewCards.forEach((_, idx) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if(idx === 0) dot.classList.add('active');
        dot.addEventListener('click', () => navigateToReview(idx));
        dotsContainer.appendChild(dot);
    });

    const updateSliderUI = () => {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        const allDots = document.querySelectorAll('.dot');
        allDots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === currentIndex);
        });
    };

    const navigateToReview = (index) => {
        currentIndex = index;
        updateSliderUI();
    };

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalReviews;
        updateSliderUI();
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalReviews) % totalReviews;
        updateSliderUI();
    });

    // Auto slide review cards every 7 seconds
    let autoReviewSlide = setInterval(() => {
        currentIndex = (currentIndex + 1) % totalReviews;
        updateSliderUI();
    }, 7000);

    // Reset slider interval on user interaction bounds
    const resetSliderTimer = () => {
        clearInterval(autoReviewSlide);
        autoReviewSlide = setInterval(() => {
            currentIndex = (currentIndex + 1) % totalReviews;
            updateSliderUI();
        }, 7000);
    };

    [nextBtn, prevBtn].forEach(b => b.addEventListener('click', resetSliderTimer));

    /* ==========================================================================
       9. FAQ ACCORDION INTERACTION LOGIC
       ========================================================================== */
    const accordionQuestions = document.querySelectorAll('.faq-question');

    accordionQuestions.forEach(btn => {
        btn.addEventListener('click', () => {
            const parentItem = btn.parentElement;
            const answersPanel = parentItem.querySelector('.faq-answer');
            
            if(parentItem.classList.contains('active')) {
                answersPanel.style.maxHeight = null;
                parentItem.classList.remove('active');
            } else {
                // Collapse alternative open panels (exclusive behavior)
                document.querySelectorAll('.faq-item').forEach(item => {
                    item.classList.remove('active');
                    item.querySelector('.faq-answer').style.maxHeight = null;
                });
                
                parentItem.classList.add('active');
                answersPanel.style.maxHeight = `${answersPanel.scrollHeight}px`;
            }
        });
    });

    /* ==========================================================================
       10. FORM PROCESSING & ACCELERATED GLASS VALIDATION MECHANICS
       ========================================================================== */
    const form = document.getElementById('enquiryForm');
    const successPopup = document.getElementById('successPopup');
    const closePopupBtn = document.getElementById('closePopupBtn');

    // Establish input default dates (Today and Tomorrow)
    const checkInInput = document.getElementById('checkInDate');
    const checkOutInput = document.getElementById('checkOutDate');
    
    if(checkInInput && checkOutInput) {
        const today = new Date().toISOString().split('T')[0];
        checkInInput.setAttribute('min', today);
        
        checkInInput.addEventListener('change', () => {
            checkOutInput.setAttribute('min', checkInInput.value);
        });
    }

    const validateField = (groupElement, condition) => {
        if(condition) {
            groupElement.classList.remove('invalid');
            return true;
        } else {
            groupElement.classList.add('invalid');
            return false;
        }
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nameGroup = document.getElementById('fullName').parentElement;
        const phoneGroup = document.getElementById('phoneNumber').parentElement;
        const emailGroup = document.getElementById('emailAddress').parentElement;
        const roomGroup = document.getElementById('roomType').parentElement;
        const inGroup = document.getElementById('checkInDate').parentElement;
        const outGroup = document.getElementById('checkOutDate').parentElement;
        const guestGroup = document.getElementById('guestCount').parentElement;

        const isNameValid = validateField(nameGroup, document.getElementById('fullName').value.trim().length > 1);
        const isPhoneValid = validateField(phoneGroup, /^[6-9]\d{9}$/.test(document.getElementById('phoneNumber').value.trim()));
        const isEmailValid = validateField(emailGroup, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(document.getElementById('emailAddress').value.trim()));
        const isRoomValid = validateField(roomGroup, roomSelectionDropdown.value !== "");
        const isInValid = validateField(inGroup, checkInInput.value !== "");
        const isOutValid = validateField(outGroup, checkOutInput.value !== "" && checkOutInput.value >= checkInInput.value);
        const isGuestValid = validateField(guestGroup, parseInt(document.getElementById('guestCount').value) >= 1);

        if(isNameValid && isPhoneValid && isEmailValid && isRoomValid && isInValid && isOutValid && isGuestValid) {
            // Trigger modern feedback interface display
            successPopup.classList.add('active');
            form.reset();
        }
    });

    closePopupBtn.addEventListener('click', () => {
        successPopup.classList.remove('active');
    });

    /* ==========================================================================
       11. RIPPLE HOVER BUTTON DECORATOR EXTENSION
       ========================================================================== */
    const rippleButtons = document.querySelectorAll('.btn');
    rippleButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            let x_coord = e.clientX - e.target.getBoundingClientRect().left;
            let y_coord = e.clientY - e.target.getBoundingClientRect().top;
            
            let rippleElement = document.createElement('span');
            rippleElement.classList.add('ripple');
            rippleElement.style.left = `${x_coord}px`;
            rippleElement.style.top = `${y_coord}px`;
            
            this.appendChild(rippleElement);
            setTimeout(() => rippleElement.remove(), 600);
        });
    });
});