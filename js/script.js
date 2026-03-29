// ============================================
// LUCENT CAFE - PREMIUM COFFEE EXPERIENCE
// ============================================

// ========== 1. GLOBAL VARIABLES & DOM ELEMENTS ==========
const themeToggleCheckbox = document.getElementById('themeToggle');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');
const navLinksItems = document.querySelectorAll('.nav-link');
const heroImage = document.getElementById('heroImage');

// ========== 2. THEME MANAGEMENT ==========
function loadTheme() {
    const savedTheme = localStorage.getItem('lucentTheme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
        if (themeToggleCheckbox) themeToggleCheckbox.checked = true;
    } else {
        document.body.classList.remove('dark');
        if (themeToggleCheckbox) themeToggleCheckbox.checked = false;
    }
}

function toggleTheme() {
    if (themeToggleCheckbox && themeToggleCheckbox.checked) {
        document.body.classList.add('dark');
        localStorage.setItem('lucentTheme', 'dark');
    } else {
        document.body.classList.remove('dark');
        localStorage.setItem('lucentTheme', 'light');
    }
}

// ========== 3. MOBILE MENU ==========
function toggleMobileMenu() {
    if (navLinks) {
        navLinks.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) {
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    }
}

function closeMobileMenu() {
    if (navLinks) {
        navLinks.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }
}

// ========== 4. ACTIVE LINK HIGHLIGHTING ==========
function updateActiveLink() {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom && sectionId) {
            navLinksItems.forEach(link => {
                link.classList.remove('active');
                const href = link.getAttribute('href');
                if (href === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ========== 5. SMOOTH SCROLL ==========
function initSmoothScroll() {
    navLinksItems.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                closeMobileMenu();
            }
        });
    });
}

// ========== 6. HERO PARALLAX ==========
function handleParallax(e) {
    if (window.innerWidth > 768 && heroImage) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        const moveX = (mouseX - 0.5) * 15;
        const moveY = (mouseY - 0.5) * 15;
        heroImage.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
}

function resetParallax() {
    if (heroImage) {
        heroImage.style.transform = 'translate(0px, 0px)';
    }
}

// ========== 7. TOAST NOTIFICATION ==========
function showToast(message, icon = 'coffee') {
    const existingToast = document.querySelector('.custom-toast');
    if (existingToast) existingToast.remove();
    
    const toast = document.createElement('div');
    toast.className = 'custom-toast';
    toast.innerHTML = `<i class="fas fa-${icon}"></i> <span>${message}</span>`;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 2800);
}

// ========== 8. HERO BUTTONS ==========
function initHeroButtons() {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.classList.contains('btn-primary')) {
                showToast('Explore our full menu - Coming soon!', 'arrow-right');
            } else if (btn.classList.contains('btn-secondary')) {
                showToast('Order now feature - Coming soon!', 'coffee');
            }
            btn.style.transform = 'scale(0.98)';
            setTimeout(() => { btn.style.transform = ''; }, 150);
        });
    });
}

// ========== 9. COFFEE EXPERIENCE WHEEL ==========
const coffeeData = [
    { name: "Classic Espresso", bg: "ESPRESSO", img: "assets/espresso.png", color: "#3B2A22", desc: "Our signature espresso shot—crafted from the finest Arabica beans for a strong experience." },
    { name: "Velvet Latte", bg: "LATTE", img: "assets/latte.png", color: "#5C4033", desc: "Smooth, creamy, and perfectly balanced. Crafted for those who appreciate a mild flavor." },
    { name: "Ceremonial Matcha", bg: "MATCHA", img: "assets/matcha.png", color: "#2D4234", desc: "Premium stone-ground green tea whisked into creamy milk. A vibrant powerhouse." },
    { name: "Creamy Cappuccino", bg: "CAPPUCCINO", img: "assets/cappuccino.png", color: "#4B3621", desc: "A perfect harmony of rich espresso and thick milk foam. Dusted with cocoa." },
    { name: "Caramel Macchiato", bg: "MACCHIATO", img: "assets/macchiato.png", color: "#C08552", desc: "Freshly steamed milk with vanilla-flavored syrup marked with espresso." },
    { name: "Arctic Iced Coffee", bg: "ICED COFFEE", img: "assets/iced-coffee.png", color: "#895737", desc: "The ultimate refreshment to beat the heat. Chilled to perfection." }
];

let currentCoffeeIndex = 0;

function updateCoffeeExperience(index) {
    const wheel = document.getElementById('experienceWheel');
    const mainImg = document.getElementById('mainActiveImg');
    const title = document.getElementById('coffeeTitle');
    const description = document.getElementById('coffeeDescription');
    const bgText = document.getElementById('dynamicBgText');
    const section = document.querySelector('.coffee-experience');
    
    if (!wheel || !mainImg) return;
    
    // Rotate wheel
    wheel.style.transform = `rotate(${index * -60}deg)`;
    
    // Counter-rotate images to keep upright
    document.querySelectorAll('.wheel-item img').forEach(img => {
        img.style.transform = `rotate(${index * 60}deg)`;
    });
    
    // Update center image with animation
    mainImg.style.opacity = '0';
    mainImg.style.transform = 'translate(-50%, -50%) scale(0.5)';
    
    setTimeout(() => {
        mainImg.src = coffeeData[index].img;
        title.innerText = coffeeData[index].name;
        description.innerText = coffeeData[index].desc;
        bgText.innerText = coffeeData[index].bg;
        if (section) section.style.backgroundColor = coffeeData[index].color;
        
        mainImg.style.opacity = '1';
        mainImg.style.transform = 'translate(-50%, -50%) scale(1)';
    }, 400);
    
    // Update active class
    document.querySelectorAll('.wheel-item').forEach((item, i) => {
        item.classList.toggle('active', i === index);
    });
}

function initCoffeeWheel() {
    const nextBtn = document.getElementById('nextCoffeeBtn');
    const prevBtn = document.getElementById('prevCoffeeBtn');
    const wheelItems = document.querySelectorAll('.wheel-item');
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentCoffeeIndex = (currentCoffeeIndex + 1) % coffeeData.length;
            updateCoffeeExperience(currentCoffeeIndex);
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentCoffeeIndex = (currentCoffeeIndex - 1 + coffeeData.length) % coffeeData.length;
            updateCoffeeExperience(currentCoffeeIndex);
        });
    }
    
    wheelItems.forEach((item, idx) => {
        item.addEventListener('click', () => {
            currentCoffeeIndex = idx;
            updateCoffeeExperience(currentCoffeeIndex);
        });
    });
    
    updateCoffeeExperience(0);
}

// ========== 10. ORDER & CUSTOMIZATION SECTION ==========
const popularCoffees = [
    { id: 1, name: "Classic Espresso", price: 3.50, rating: 4.8, image: "/assets/espresso.png", category: "espresso" },
    { id: 2, name: "Velvet Latte", price: 4.80, rating: 4.9, image: "/assets/latte.png", category: "latte" },
    { id: 3, name: "Caramel Macchiato", price: 5.20, rating: 4.9, image: "/assets/macchiato.png", category: "macchiato" },
    { id: 4, name: "Creamy Cappuccino", price: 4.50, rating: 4.7, image: "/assets/cappuccino.png", category: "cappuccino" },
    { id: 5, name: "Mocha Delight", price: 5.00, rating: 4.8, image: "/assets/mocha.png", category: "mocha" },
    { id: 6, name: "Cold Brew Nitro", price: 5.50, rating: 4.9, image: "/assets/coldbrew.png", category: "cold" }
];

let customCoffeeState = {
    size: "medium",
    milk: "regular",
    sugar: "medium",
    extras: []
};

const priceConfig = {
    size: { small: 0, medium: 0.50, large: 1.00 },
    milk: { regular: 0, almond: 0.80, oat: 1.00 },
    sugar: { low: 0, medium: 0, high: 0 },
    extras: { chocolate: 0.60, caramel: 0.50, whipped: 0.70 }
};
const BASE_PRICE = 3.50;

function renderPopularCoffees(filterText = "") {
    const container = document.getElementById("coffeeHorizontalGrid");
    if (!container) return;

    let filteredCoffees = popularCoffees;
    if (filterText.trim() !== "") {
        const searchLower = filterText.toLowerCase();
        filteredCoffees = popularCoffees.filter(coffee =>
            coffee.name.toLowerCase().includes(searchLower) ||
            coffee.category.toLowerCase().includes(searchLower)
        );
    }

    if (filteredCoffees.length === 0) {
        container.innerHTML = `<div class="no-results"><i class="fas fa-search"></i><p>no coffee found</p><span>try a different blend</span></div>`;
        return;
    }

    container.innerHTML = filteredCoffees.map(coffee => `
        <div class="coffee-card-item" data-id="${coffee.id}" data-name="${coffee.name}" data-price="${coffee.price}">
            <div class="card-image"><img src="${coffee.image}" alt="${coffee.name}" onerror="this.src='/assets/coffee-placeholder.png'"></div>
            <h4 class="card-name">${coffee.name}</h4>
            <div class="card-rating"><i class="fas fa-star"></i><span>${coffee.rating}</span></div>
            <div class="card-price">$${coffee.price.toFixed(2)}</div>
            <button class="order-card-btn" data-name="${coffee.name}" data-price="${coffee.price}">
                <i class="fas fa-plus-circle"></i><span>order</span>
            </button>
        </div>
    `).join("");

    document.querySelectorAll(".order-card-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const name = btn.getAttribute("data-name");
            const price = btn.getAttribute("data-price");
            showToast(`✨ ${name} added to cart · $${price} ✨`, 'coffee');
            btn.style.transform = "scale(0.95)";
            setTimeout(() => { btn.style.transform = ""; }, 150);
        });
    });
}

function initSearchFilter() {
    const searchInput = document.getElementById("coffeeSearch");
    const clearBtn = document.getElementById("searchClearBtn");
    if (!searchInput) return;
    
    function handleSearch() {
        const searchTerm = searchInput.value;
        renderPopularCoffees(searchTerm);
        if (clearBtn) clearBtn.style.display = searchTerm ? "block" : "none";
    }
    
    searchInput.addEventListener("input", handleSearch);
    if (clearBtn) {
        clearBtn.addEventListener("click", () => {
            searchInput.value = "";
            handleSearch();
            searchInput.focus();
        });
    }
}

function initCustomBuilder() {
    // Size buttons
    document.querySelectorAll("[data-size]").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll("[data-size]").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            customCoffeeState.size = btn.getAttribute("data-size");
            updatePreviewAndPrice();
        });
    });
    
    // Milk buttons
    document.querySelectorAll("[data-milk]").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll("[data-milk]").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            customCoffeeState.milk = btn.getAttribute("data-milk");
            updatePreviewAndPrice();
        });
    });
    
    // Sugar buttons
    document.querySelectorAll("[data-sugar]").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll("[data-sugar]").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            customCoffeeState.sugar = btn.getAttribute("data-sugar");
            updatePreviewAndPrice();
        });
    });
    
    // Extras
    document.querySelectorAll("[data-extra]").forEach(checkbox => {
        checkbox.addEventListener("change", (e) => {
            const extraValue = checkbox.getAttribute("data-extra");
            if (checkbox.checked) {
                if (!customCoffeeState.extras.includes(extraValue)) {
                    customCoffeeState.extras.push(extraValue);
                }
            } else {
                customCoffeeState.extras = customCoffeeState.extras.filter(e => e !== extraValue);
            }
            updatePreviewAndPrice();
        });
    });
}

function updatePreviewAndPrice() {
    const badgeEl = document.getElementById("dynamicBadge");
    if (badgeEl) {
        const sizeText = customCoffeeState.size === "small" ? "240ml" : customCoffeeState.size === "medium" ? "360ml" : "480ml";
        const milkText = customCoffeeState.milk === "regular" ? "regular" : customCoffeeState.milk === "almond" ? "almond" : "oat";
        const sugarText = customCoffeeState.sugar === "low" ? "low sweet" : customCoffeeState.sugar === "medium" ? "balanced" : "rich sweet";
        badgeEl.textContent = `${sizeText} · ${milkText} · ${sugarText}`;
    }
    
    const notesEl = document.getElementById("selectedNotes");
    if (notesEl) {
        let extrasText = "";
        if (customCoffeeState.extras.length > 0) {
            const extraNames = customCoffeeState.extras.map(e => {
                if (e === "chocolate") return "chocolate";
                if (e === "caramel") return "caramel";
                if (e === "whipped") return "whipped cream";
                return e;
            }).join(", ");
            extrasText = ` + ${extraNames}`;
        }
        notesEl.textContent = `size: ${customCoffeeState.size} | milk: ${customCoffeeState.milk} | sweetness: ${customCoffeeState.sugar}${extrasText}`;
    }
    
    let total = BASE_PRICE;
    total += priceConfig.size[customCoffeeState.size] || 0;
    total += priceConfig.milk[customCoffeeState.milk] || 0;
    customCoffeeState.extras.forEach(extra => { total += priceConfig.extras[extra] || 0; });
    
    const priceSpan = document.getElementById("dynamicPrice");
    if (priceSpan) priceSpan.textContent = total.toFixed(2);
    
    const previewImg = document.getElementById("previewImage");
    if (previewImg) {
        previewImg.style.transform = "scale(0.98)";
        setTimeout(() => { previewImg.style.transform = ""; }, 200);
    }
}

function initOrderButton() {
    const orderBtn = document.getElementById("createOrderBtn");
    if (!orderBtn) return;
    
    orderBtn.addEventListener("click", () => {
        const sizeText = customCoffeeState.size === "small" ? "Small" : customCoffeeState.size === "medium" ? "Medium" : "Large";
        const milkText = customCoffeeState.milk === "regular" ? "Regular Milk" : customCoffeeState.milk === "almond" ? "Almond Milk" : "Oat Milk";
        const sugarText = customCoffeeState.sugar === "low" ? "Low Sweetness" : customCoffeeState.sugar === "medium" ? "Medium Sweetness" : "High Sweetness";
        
        let extrasText = "";
        if (customCoffeeState.extras.length > 0) {
            const extraNames = customCoffeeState.extras.map(e => {
                if (e === "chocolate") return "Chocolate Topping";
                if (e === "caramel") return "Caramel Drizzle";
                if (e === "whipped") return "Whipped Cream";
                return e;
            }).join(", ");
            extrasText = ` with ${extraNames}`;
        }
        
        const totalPrice = document.getElementById("dynamicPrice")?.textContent || "0";
        showToast(`Custom coffee added: ${sizeText} · ${milkText} · ${sugarText}${extrasText} · $${totalPrice}`, 'coffee');
        
        orderBtn.style.transform = "scale(0.98)";
        setTimeout(() => { orderBtn.style.transform = ""; }, 150);
    });
}

function initHorizontalScroll() {
    const scrollWrapper = document.querySelector(".coffee-scroll-wrapper");
    if (!scrollWrapper) return;
    
    let isDragging = false;
    let startX, scrollLeft;
    
    scrollWrapper.addEventListener("mousedown", (e) => {
        isDragging = true;
        startX = e.pageX - scrollWrapper.offsetLeft;
        scrollLeft = scrollWrapper.scrollLeft;
        scrollWrapper.style.cursor = "grabbing";
        e.preventDefault();
    });
    
    window.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        const x = e.pageX - scrollWrapper.offsetLeft;
        const walk = (x - startX) * 1.5;
        scrollWrapper.scrollLeft = scrollLeft - walk;
    });
    
    window.addEventListener("mouseup", () => {
        isDragging = false;
        scrollWrapper.style.cursor = "grab";
    });
    
    scrollWrapper.addEventListener("touchstart", (e) => {
        isDragging = true;
        startX = e.touches[0].pageX - scrollWrapper.offsetLeft;
        scrollLeft = scrollWrapper.scrollLeft;
    });
    
    window.addEventListener("touchmove", (e) => {
        if (!isDragging) return;
        const x = e.touches[0].pageX - scrollWrapper.offsetLeft;
        const walk = (x - startX) * 1.5;
        scrollWrapper.scrollLeft = scrollLeft - walk;
    });
    
    window.addEventListener("touchend", () => {
        isDragging = false;
    });
}

function initOrderSection() {
    renderPopularCoffees();
    initSearchFilter();
    initCustomBuilder();
    initOrderButton();
    initHorizontalScroll();
    updatePreviewAndPrice();
}

// ========== 11. REVIEWS SECTION ==========
function initReviewsSection() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const writeReviewBtn = document.getElementById('writeReviewBtn');
    const scrollWrapper = document.querySelector('.reviews-scroll-wrapper');
    let currentFilter = 'all';
    
    // DIRECT SELECTION - প্রতিবার ফিল্টার করার সময় নতুন করে কার্ড সিলেক্ট করবো
    function filterReviews() {
        // প্রতিবার নতুন করে কার্ড সিলেক্ট করা
        const allCards = document.querySelectorAll('.review-card');
        let visibleCount = 0;
        
        console.log('Total review cards found:', allCards.length);
        
        allCards.forEach(card => {
            const rating = card.getAttribute('data-rating');
            if (currentFilter === 'all' || currentFilter === rating) {
                card.style.display = 'block';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });
        
        // Remove any existing "no reviews" message
        const existingMsg = document.querySelector('.no-reviews-message');
        if (existingMsg) existingMsg.remove();
        
        // If no visible cards, show message (optional)
        if (visibleCount === 0) {
            const track = document.getElementById('reviewsTrack');
            if (track && !document.querySelector('.no-reviews-message')) {
                const msg = document.createElement('div');
                msg.className = 'no-reviews-message';
                msg.innerHTML = '<i class="fas fa-coffee"></i><p>no reviews yet</p><span>be the first to share</span>';
                msg.style.cssText = 'text-align: center; padding: 2rem; min-width: 300px;';
                track.appendChild(msg);
            }
        }
    }
    
    // Filter button click handler
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.getAttribute('data-filter');
            filterReviews();
        });
    });
    
    // Write review button
    if (writeReviewBtn) {
        writeReviewBtn.addEventListener('click', () => {
            showToast('Thank you! Review feature coming soon', 'heart');
            writeReviewBtn.style.transform = 'scale(0.98)';
            setTimeout(() => { writeReviewBtn.style.transform = ''; }, 150);
        });
    }
    
    // Horizontal scroll with drag for reviews
    if (scrollWrapper) {
        let isDragging = false;
        let startX, scrollLeft;
        
        scrollWrapper.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.pageX - scrollWrapper.offsetLeft;
            scrollLeft = scrollWrapper.scrollLeft;
            scrollWrapper.style.cursor = 'grabbing';
            e.preventDefault();
        });
        
        window.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            const x = e.pageX - scrollWrapper.offsetLeft;
            const walk = (x - startX) * 1.5;
            scrollWrapper.scrollLeft = scrollLeft - walk;
        });
        
        window.addEventListener('mouseup', () => {
            isDragging = false;
            scrollWrapper.style.cursor = 'grab';
        });
        
        scrollWrapper.addEventListener('touchstart', (e) => {
            isDragging = true;
            startX = e.touches[0].pageX - scrollWrapper.offsetLeft;
            scrollLeft = scrollWrapper.scrollLeft;
        });
        
        window.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            const x = e.touches[0].pageX - scrollWrapper.offsetLeft;
            const walk = (x - startX) * 1.5;
            scrollWrapper.scrollLeft = scrollLeft - walk;
        });
        
        window.addEventListener('touchend', () => {
            isDragging = false;
        });
    }
    
    // Initial filter to show all
    filterReviews();
    console.log('✨ Reviews section initialized ✨');
}

// ========== 12. FOOTER SECTION ==========
function initFooter() {
    const backToTopBtn = document.getElementById('backToTopBtn');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = document.getElementById('newsletterEmail');
            const email = emailInput.value.trim();
            if (email) {
                showToast(`Subscribed with ${email} · welcome to the lucent family`, 'envelope');
                emailInput.value = '';
            } else {
                showToast('Please enter a valid email address', 'exclamation-circle');
            }
        });
    }
    
    const footerLinks = document.querySelectorAll('.footer-links a, .legal-links a');
    footerLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            link.addEventListener('click', (e) => {
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        }
    });
}

// ========== 13. ADD ANIMATION STYLES ==========
function addAnimationStyles() {
    if (!document.querySelector('#custom-animations')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'custom-animations';
        styleSheet.textContent = `
            @keyframes slideInRight { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
            @keyframes slideOutRight { from { transform: translateX(0); opacity: 1; } to { transform: translateX(100%); opacity: 0; } }
            @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
            .no-results { text-align: center; padding: 2rem; color: var(--text-muted); min-width: 300px; }
            .no-results i { font-size: 2rem; margin-bottom: 0.5rem; opacity: 0.5; }
            .no-results p { font-size: 0.9rem; font-weight: 500; }
            .no-results span { font-size: 0.75rem; }
        `;
        document.head.appendChild(styleSheet);
    }
}

// ========== 14. EVENT LISTENERS ==========
if (themeToggleCheckbox) {
    themeToggleCheckbox.addEventListener('change', toggleTheme);
}

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
}

window.addEventListener('scroll', updateActiveLink);
window.addEventListener('mousemove', handleParallax);
window.addEventListener('mouseleave', resetParallax);

window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navLinks && navLinks.classList.contains('active')) {
        closeMobileMenu();
    }
});

// ========== 15. INITIALIZE EVERYTHING ==========
document.addEventListener('DOMContentLoaded', () => {
    loadTheme();
    initSmoothScroll();
    updateActiveLink();
    initHeroButtons();
    initCoffeeWheel();
    initOrderSection();
    initReviewsSection();
    initFooter();
    addAnimationStyles();
    
    // Add fade-in animation to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    if (featureCards.length > 0) {
        featureCards.forEach((card, index) => {
            card.style.animation = `fadeInUp 0.6s ease forwards ${index * 0.2}s`;
            card.style.opacity = '0';
        });
    }
    
    console.log('✨ Lucent Cafe fully loaded! ✨');
});
