/* ========================================
   VELVET & BLOOM - Intimate Luxury Store
   JavaScript
======================================== */

// Product Data
const products = [
    {
        id: 1,
        name: "Aurora Wand",
        category: "vibrators",
        price: 89.00,
        description: "Experience waves of pleasure with our bestselling Aurora Wand. Crafted from ultra-soft, body-safe silicone with 7 customizable vibration patterns and a whisper-quiet motor.",
        features: ["Medical-grade silicone", "7 vibration patterns", "USB rechargeable", "Waterproof (IPX7)", "2-hour battery life"],
        badge: "bestseller",
        hue: 340
    },
    {
        id: 2,
        name: "Silk Curve",
        category: "dildos",
        price: 68.00,
        description: "The Silk Curve features an ergonomic design that moves with your body. Made from premium medical-grade silicone for ultimate comfort and safety.",
        features: ["Medical-grade silicone", "Ergonomic curve", "Suction cup base", "Harness compatible", "Easy to clean"],
        badge: null,
        hue: 280
    },
    {
        id: 3,
        name: "Petal Touch",
        category: "vibrators",
        price: 129.00,
        description: "Revolutionary air pulse technology creates gentle suction waves for touchless stimulation. Whisper-quiet motor and elegant design.",
        features: ["Air pulse technology", "11 intensity levels", "Whisper quiet", "Waterproof", "Magnetic charging"],
        badge: "new",
        hue: 20
    },
    {
        id: 4,
        name: "Ocean Wave",
        category: "dildos",
        price: 95.00,
        description: "Artisan-crafted from premium borosilicate glass, the Ocean Wave offers unique temperature play possibilities. Each piece is individually made.",
        features: ["Borosilicate glass", "Temperature play", "Artisan crafted", "Hypoallergenic", "Lifetime warranty"],
        badge: null,
        hue: 200
    },
    {
        id: 5,
        name: "Duo Bliss",
        category: "couples",
        price: 149.00,
        description: "Designed for couples, the Duo Bliss offers synchronized pleasure with app control. Perfect for intimate moments together, near or far.",
        features: ["Dual motors", "App controlled", "Long-distance play", "10 patterns", "Couples mode"],
        badge: "bestseller",
        hue: 320
    },
    {
        id: 6,
        name: "Velvet Care Kit",
        category: "accessories",
        price: 45.00,
        description: "Everything you need to care for your intimate collection. Includes specialized cleanser, storage pouch, and renewal powder.",
        features: ["Gentle cleanser", "Storage pouch", "Renewal powder", "Care guide", "Travel-friendly"],
        badge: null,
        hue: 45
    }
];

// Cart State
let cart = [];

// DOM Elements
const cursorGlow = document.querySelector('.cursor-glow');
const ageModal = document.getElementById('age-modal');
const ageConfirm = document.getElementById('age-confirm');
const ageDeny = document.getElementById('age-deny');
const quickViewModal = document.getElementById('quick-view-modal');
const cartSidebar = document.getElementById('cart-sidebar');
const cartOverlay = document.getElementById('cart-overlay');
const cartItems = document.getElementById('cart-items');
const cartCount = document.querySelector('.cart-count');
const subtotalAmount = document.querySelector('.subtotal-amount');
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');
const newsletterForm = document.getElementById('newsletter-form');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initAgeVerification();
    initCursorGlow();
    initCategoryFilters();
    initQuickView();
    initAddToCart();
    initCartSidebar();
    initNewsletter();
    initSmoothScroll();
    initScrollAnimations();
});

// Age Verification
function initAgeVerification() {
    const verified = sessionStorage.getItem('ageVerified');
    
    if (verified) {
        ageModal.classList.add('hidden');
        return;
    }
    
    ageConfirm.addEventListener('click', () => {
        sessionStorage.setItem('ageVerified', 'true');
        ageModal.classList.add('hidden');
    });
    
    ageDeny.addEventListener('click', () => {
        window.location.href = 'https://www.google.com';
    });
}

// Cursor Glow Effect
function initCursorGlow() {
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });
}

// Category Filters
function initCategoryFilters() {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.dataset.category;
            
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter products
            productCards.forEach(card => {
                const cardCategory = card.dataset.category;
                
                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Quick View Modal
function initQuickView() {
    const quickViewBtns = document.querySelectorAll('.quick-view');
    const modalClose = quickViewModal.querySelector('.modal-close');
    const qtyMinus = quickViewModal.querySelector('.qty-btn.minus');
    const qtyPlus = quickViewModal.querySelector('.qty-btn.plus');
    const qtyValue = quickViewModal.querySelector('.qty-value');
    const modalAddCart = quickViewModal.querySelector('.modal-add-cart');
    
    let currentProduct = null;
    let quantity = 1;
    
    quickViewBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const productId = parseInt(btn.dataset.product);
            currentProduct = products.find(p => p.id === productId);
            
            if (currentProduct) {
                updateModalContent(currentProduct);
                quantity = 1;
                qtyValue.textContent = quantity;
                updateModalPrice();
                quickViewModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    function updateModalContent(product) {
        const modalTitle = quickViewModal.querySelector('.modal-title');
        const modalPrice = quickViewModal.querySelector('.modal-price');
        const modalDescription = quickViewModal.querySelector('.modal-description');
        const modalFeatures = quickViewModal.querySelector('.modal-features');
        const modalPlaceholder = quickViewModal.querySelector('.modal-placeholder');
        
        modalTitle.textContent = product.name;
        modalPrice.textContent = `$${product.price.toFixed(2)}`;
        modalDescription.textContent = product.description;
        modalPlaceholder.style.setProperty('--hue', product.hue);
        
        modalFeatures.innerHTML = product.features
            .map(f => `<li>${f}</li>`)
            .join('');
    }
    
    function updateModalPrice() {
        const total = currentProduct.price * quantity;
        modalAddCart.textContent = `Add to Cart — $${total.toFixed(2)}`;
    }
    
    qtyMinus.addEventListener('click', () => {
        if (quantity > 1) {
            quantity--;
            qtyValue.textContent = quantity;
            updateModalPrice();
        }
    });
    
    qtyPlus.addEventListener('click', () => {
        quantity++;
        qtyValue.textContent = quantity;
        updateModalPrice();
    });
    
    modalAddCart.addEventListener('click', () => {
        if (currentProduct) {
            addToCart(currentProduct, quantity);
            closeQuickView();
            openCart();
        }
    });
    
    modalClose.addEventListener('click', closeQuickView);
    quickViewModal.addEventListener('click', (e) => {
        if (e.target === quickViewModal) {
            closeQuickView();
        }
    });
    
    function closeQuickView() {
        quickViewModal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Add to Cart from Product Grid
function initAddToCart() {
    const addToCartBtns = document.querySelectorAll('.product-card .add-to-cart');
    
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const productId = parseInt(btn.dataset.product);
            const product = products.find(p => p.id === productId);
            
            if (product) {
                addToCart(product, 1);
                
                // Button feedback
                const originalText = btn.textContent;
                btn.textContent = 'Added!';
                btn.style.background = '#4CAF50';
                
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.background = '';
                }, 1500);
            }
        });
    });
}

// Cart Functions
function addToCart(product, quantity) {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            ...product,
            quantity
        });
    }
    
    updateCart();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

function updateCartItemQty(productId, change) {
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCart();
        }
    }
}

function updateCart() {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart items display
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="cart-empty">Your cart is empty</p>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-item-image">
                    <div class="product-placeholder" style="--hue: ${item.hue};">
                        <div class="placeholder-shape"></div>
                    </div>
                </div>
                <div class="cart-item-details">
                    <h4 class="cart-item-name">${item.name}</h4>
                    <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                    <div class="cart-item-qty">
                        <button class="cart-qty-minus" data-id="${item.id}">−</button>
                        <span>${item.quantity}</span>
                        <button class="cart-qty-plus" data-id="${item.id}">+</button>
                    </div>
                    <button class="cart-item-remove" data-id="${item.id}">Remove</button>
                </div>
            </div>
        `).join('');
        
        // Add event listeners to cart item buttons
        cartItems.querySelectorAll('.cart-qty-minus').forEach(btn => {
            btn.addEventListener('click', () => {
                updateCartItemQty(parseInt(btn.dataset.id), -1);
            });
        });
        
        cartItems.querySelectorAll('.cart-qty-plus').forEach(btn => {
            btn.addEventListener('click', () => {
                updateCartItemQty(parseInt(btn.dataset.id), 1);
            });
        });
        
        cartItems.querySelectorAll('.cart-item-remove').forEach(btn => {
            btn.addEventListener('click', () => {
                removeFromCart(parseInt(btn.dataset.id));
            });
        });
    }
    
    // Update subtotal
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    subtotalAmount.textContent = `$${subtotal.toFixed(2)}`;
    
    // Save to session storage
    sessionStorage.setItem('cart', JSON.stringify(cart));
}

// Cart Sidebar
function initCartSidebar() {
    const cartLink = document.querySelector('.cart-link');
    const cartClose = document.querySelector('.cart-close');
    
    // Load cart from session storage
    const savedCart = sessionStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
    }
    
    cartLink.addEventListener('click', (e) => {
        e.preventDefault();
        openCart();
    });
    
    cartClose.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);
}

function openCart() {
    cartSidebar.classList.add('active');
    cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCart() {
    cartSidebar.classList.remove('active');
    cartOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Newsletter
function initNewsletter() {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input').value;
        
        // Simulate subscription
        const btn = newsletterForm.querySelector('button');
        const originalHTML = btn.innerHTML;
        btn.innerHTML = '<span>Subscribed!</span>';
        btn.style.background = '#4CAF50';
        
        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.style.background = '';
            newsletterForm.reset();
        }, 2000);
        
        console.log('Newsletter subscription:', email);
    });
}

// Smooth Scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe product cards
    productCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.animationDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Observe section headers
    document.querySelectorAll('.section-header, .editorial-content, .newsletter-content').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (quickViewModal.classList.contains('active')) {
            quickViewModal.classList.remove('active');
            document.body.style.overflow = '';
        }
        if (cartSidebar.classList.contains('active')) {
            closeCart();
        }
    }
});

// Checkout Button (placeholder)
document.querySelector('.checkout-btn').addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    alert('Checkout functionality would be implemented here.\n\nCart Total: ' + subtotalAmount.textContent);
});
