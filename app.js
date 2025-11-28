// Business Data
const businessData = {
  name: "Pushti Milk Co.",
  tagline: "Premium Organic Dairy Products",
  description: "Delivering fresh, wholesome dairy products from our family farm to your table since generations",
  phone: "+91-98765-43210",
  email: "info@pushtimilk.co.in",
  address: "Near Dairy Farm, Banasthali, Rajasthan, India",
  hours: "6:00 AM - 8:00 PM Daily"
};

const socialLinks = {
  facebook: "https://facebook.com/pushtimilk",
  instagram: "https://instagram.com/pushtimilk",
  whatsapp: "https://wa.me/919876543210",
  twitter: "https://twitter.com/pushtimilk"
};

const products = [
  {
    id: 1,
    name: "Full Cream Milk",
    category: "Milk",
    price: 65,
    image: "🥛",
    description: "Rich, creamy milk with 6% fat content. Perfect for families",
    badge: "Best Seller"
  },
  {
    id: 2,
    name: "Toned Milk",
    category: "Milk",
    price: 50,
    image: "🥛",
    description: "Balanced nutrition with 3% fat. Ideal for health-conscious families",
    badge: ""
  },
  {
    id: 3,
    name: "Double Toned Milk",
    category: "Milk",
    price: 42,
    image: "🥛",
    description: "Low-fat milk with essential nutrients for wellness",
    badge: ""
  },
  {
    id: 4,
    name: "Fresh Curd/Yogurt",
    category: "Dairy Products",
    price: 45,
    image: "🍶",
    description: "Handmade fresh curd daily. Probiotic rich",
    badge: "Fresh Daily"
  },
  {
    id: 5,
    name: "Pure Ghee",
    category: "Dairy Products",
    price: 550,
    image: "🍯",
    description: "A2 Ghee made from cow milk. Authentic and pure",
    badge: "Premium"
  },
  {
    id: 6,
    name: "Fresh Paneer",
    category: "Dairy Products",
    price: 280,
    image: "🧀",
    description: "Soft, creamy paneer made fresh. Perfect for curries",
    badge: ""
  },
  {
    id: 7,
    name: "Butter",
    category: "Dairy Products",
    price: 380,
    image: "🧈",
    description: "Churned butter. Rich flavor, spreadable texture",
    badge: ""
  },
  {
    id: 8,
    name: "Flavored Milk",
    category: "Specialty",
    price: 80,
    image: "🥛",
    description: "Chocolate, strawberry, and vanilla flavors. Kids favorite",
    badge: ""
  }
];

const galleryItems = [
  { id: 1, category: 'farm', icon: '🐄', title: 'Happy Cows' },
  { id: 2, category: 'farm', icon: '🌾', title: 'Organic Farm' },
  { id: 3, category: 'farm', icon: '🏡', title: 'Farm House' },
  { id: 4, category: 'products', icon: '🥛', title: 'Fresh Milk' },
  { id: 5, category: 'products', icon: '🧀', title: 'Paneer Making' },
  { id: 6, category: 'products', icon: '🍯', title: 'Pure Ghee' },
  { id: 7, category: 'team', icon: '👨\u200d🌾', title: 'Farm Team' },
  { id: 8, category: 'team', icon: '🏆', title: 'Quality Check' },
  { id: 9, category: 'farm', icon: '🌅', title: 'Morning View' }
];

// Shopping Cart State
let cart = [];

// Initialize App
function initApp() {
  renderProducts();
  renderGallery();
  setupNavigation();
  setupMobileMenu();
  setupContactForm();
  updateCartUI();
}

// Navigation
function setupNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  
  // Smooth scroll and active state
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
      
      // Update active state
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      
      // Close mobile menu if open
      const navMenu = document.getElementById('navMenu');
      navMenu.classList.remove('active');
    });
  });

  // Update active link on scroll
  window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section, .header');
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.pageYOffset >= sectionTop - 100) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

// Mobile Menu
function setupMobileMenu() {
  const toggle = document.getElementById('mobileMenuToggle');
  const menu = document.getElementById('navMenu');
  
  toggle.addEventListener('click', () => {
    menu.classList.toggle('active');
  });
}

// Render Products
function renderProducts(filter = 'all') {
  const grid = document.getElementById('productsGrid');
  const filteredProducts = filter === 'all' 
    ? products 
    : products.filter(p => p.category === filter);
  
  grid.innerHTML = filteredProducts.map(product => `
    <div class="product-card" data-category="${product.category}">
      ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
      <div class="product-image">${product.image}</div>
      <h3 class="product-name">${product.name}</h3>
      <p class="product-category">${product.category}</p>
      <p class="product-description">${product.description}</p>
      <div class="product-footer">
        <span class="product-price">₹${product.price}</span>
        <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
          Add to Cart
        </button>
      </div>
    </div>
  `).join('');
}

// Filter Products
function filterProducts(category) {
  renderProducts(category);
  
  // Update active filter button
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
}

// Shopping Cart Functions
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const existingItem = cart.find(item => item.id === productId);
  
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  
  updateCartUI();
  showCartNotification(product.name);
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCartUI();
  renderCartItems();
}

function updateQuantity(productId, delta) {
  const item = cart.find(item => item.id === productId);
  if (item) {
    item.quantity += delta;
    if (item.quantity <= 0) {
      removeFromCart(productId);
    } else {
      updateCartUI();
      renderCartItems();
    }
  }
}

function updateCartUI() {
  const cartCount = document.getElementById('cartCount');
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;
}

function calculateTotal() {
  return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

function toggleCart() {
  const modal = document.getElementById('cartModal');
  modal.classList.toggle('active');
  if (modal.classList.contains('active')) {
    renderCartItems();
  }
}

function renderCartItems() {
  const cartItems = document.getElementById('cartItems');
  const cartTotal = document.getElementById('cartTotal');
  
  if (cart.length === 0) {
    cartItems.innerHTML = '<div class="cart-empty">Your cart is empty</div>';
  } else {
    cartItems.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div class="cart-item-image">${item.image}</div>
        <div class="cart-item-details">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">₹${item.price}</div>
          <div class="cart-item-quantity">
            <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
            <span>${item.quantity}</span>
            <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
          </div>
        </div>
        <button class="remove-item-btn" onclick="removeFromCart(${item.id})">🗑️</button>
      </div>
    `).join('');
  }
  
  cartTotal.textContent = `₹${calculateTotal()}`;
}

function showCartNotification(productName) {
  // Simple notification - could be enhanced with a toast library
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: var(--color-primary);
    color: white;
    padding: 16px 24px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    z-index: 9999;
    animation: slideInRight 0.3s ease;
  `;
  notification.textContent = `${productName} added to cart!`;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 2000);
}

function checkout() {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }
  
  const total = calculateTotal();
  const itemsList = cart.map(item => `${item.name} (x${item.quantity})`).join(', ');
  
  alert(`Thank you for your order!\n\nItems: ${itemsList}\nTotal: ₹${total}\n\nWe'll contact you shortly to confirm your order.`);
  
  // Reset cart
  cart = [];
  updateCartUI();
  toggleCart();
}

// Gallery
function renderGallery(filter = 'all') {
  const grid = document.getElementById('galleryGrid');
  const filteredItems = filter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === filter);
  
  grid.innerHTML = filteredItems.map(item => `
    <div class="gallery-item" onclick="openLightbox(${item.id})">
      <div class="gallery-placeholder">
        <div class="gallery-placeholder-icon">${item.icon}</div>
        <div class="gallery-placeholder-text">${item.title}</div>
      </div>
    </div>
  `).join('');
}

function filterGallery(category) {
  renderGallery(category);
  
  // Update active filter button
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  filterBtns.forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
}

function openLightbox(itemId) {
  const item = galleryItems.find(i => i.id === itemId);
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  
  lightboxImage.innerHTML = `
    <div style="text-align: center;">
      <div style="font-size: 10rem; margin-bottom: 20px;">${item.icon}</div>
      <h3 style="font-size: 2rem; color: var(--color-text);">${item.title}</h3>
    </div>
  `;
  
  lightbox.classList.add('active');
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  lightbox.classList.remove('active');
}

// Contact Form
function setupContactForm() {
  const form = document.getElementById('contactForm');
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const phone = document.getElementById('contactPhone').value;
    const subject = document.getElementById('contactSubject').value;
    const message = document.getElementById('contactMessage').value;
    
    // Validation
    if (!name || !email || !phone || !subject || !message) {
      alert('Please fill in all fields');
      return;
    }
    
    // Success message
    alert(`Thank you for contacting us, ${name}!\n\nWe've received your message and will get back to you shortly at ${email}.`);
    
    // Reset form
    form.reset();
  });
}

// Newsletter Subscription
function subscribeNewsletter(e) {
  e.preventDefault();
  const email = e.target.querySelector('input[type="email"]').value;
  
  if (email) {
    alert(`Thank you for subscribing to our newsletter!\n\nWe'll send updates to ${email}.`);
    e.target.reset();
  }
}

// Add smooth scrolling CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(100px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes slideOutRight {
    from {
      opacity: 1;
      transform: translateX(0);
    }
    to {
      opacity: 0;
      transform: translateX(100px);
    }
  }
`;
document.head.appendChild(style);

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}