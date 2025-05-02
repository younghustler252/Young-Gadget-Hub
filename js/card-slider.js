// Sample product data
const products = {
  smartphones: [
    { id: "iphone14", name: "iPhone 14 Pro", price: 1000, image: "https://m.media-amazon.com/images/I/61nzPMNY8zL._AC_SL1500_.jpg" },
    { id: "iphone11", name: "Iphone 11", price: 230, image: "assets/iphone-11.jpg" },
    { id: "iphonexr", name: "iphone XR", price: 120, image: "assets/iphone-xr.jpg" },
    { id: "SamsungGalaxyFlip4", name: "Samsung Galaxy Flip 4", price: 999, image: "assets/samsung-galaxy-flip4.jpg" },
    { id: "Iphone11ProMax", name: "Iphone 11 Pro Max", price: 500, image: "assets/iphone-11-promax.jpg" },
    { id: "motorolaedge", name: "Iphone 14", price: 999, image: "assets/iphone 14.jpg" },
  ],
  laptops: [
    { id: "macbook", name: "MacBook Pro", price: 999, image: "https://m.media-amazon.com/images/I/61L5QgPvgqL._AC_SL1500_.jpg" },
    { id: "dellxps", name: "Dell XPS 13", price: 999, image: "assets/young-hero-image.png" },
    { id: "hpspectre", name: "HP Spectre x360", price: 999, image: "https://m.media-amazon.com/images/I/71w3k4x5uQL._AC_SL1500_.jpg" },
    { id: "asuszenbook", name: "Macbook Pro", price: 999, image: "assets/macbook-pro.jpg" },
    { id: "msimodern", name: "MSI Modern", price: 999, image: "https://m.media-amazon.com/images/I/71eXNIDUGjL._AC_SL1500_.jpg" },
  ],
  headphones: [
    { id: "sonyheadphones", name: "Sony WH-1000XM4", price: 399, image: "https://m.media-amazon.com/images/I/61D4Z3yKPAL._AC_SL1500_.jpg" },
    { id: "boseqc", name: "Bose QC 45", price: 329, image: "https://m.media-amazon.com/images/I/81+jNVOUsJL._AC_SL1500_.jpg" },
    { id: "appleairpods", name: "Apple AirPods Max", price: 549, image: "https://m.media-amazon.com/images/I/81jqUPkIVRL._AC_SL1500_.jpg" },
    { id: "beatsstudio", name: "JBL EXTREME 3", price: 349, image: "assets/jbl-extreme3.jpg" },
    { id: "sennheiser", name: "Air Pod Max", price: 379, image: "assets/airpod-max.jpg" },
  ]
};

// Render product cards
function renderProducts(category, containerId) {
  const container = document.getElementById(containerId);
  products[category].forEach(p => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}" />
      <h4>${p.name}</h4>
      <div class="price">$${p.price}</div>
      <button class="add-to-cart-btn"
        data-id="${p.id}"
        data-name="${p.name}"
        data-price="${p.price}"
        data-image="${p.image}"
      >Add to Cart</button>
    `;
    container.appendChild(card);
  });
}

renderProducts('smartphones', 'smartphone-slider');
renderProducts('laptops', 'laptop-slider');
renderProducts('headphones', 'headphone-slider');

// Slider functionality
document.querySelectorAll('.slider-container').forEach(container => {
  const slider = container.querySelector('.card-slider');
  const leftBtn = container.querySelector('.left');
  const rightBtn = container.querySelector('.right');
  const cardWidth = 266; // 200px card + 16px gap

  leftBtn.addEventListener('click', () => {
    slider.scrollBy({ left: -cardWidth, behavior: 'smooth' });
  });

  rightBtn.addEventListener('click', () => {
    slider.scrollBy({ left: cardWidth, behavior: 'smooth' });
  });
});

// === Cart Logic ===
const cartSidebar = document.getElementById('cart-sidebar');
const cartIcon = document.getElementById('cart-icon');
const cartClose = document.getElementById('cart-close');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');
const cartCount = document.getElementById('cart-count');

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function openCart() {
  cartSidebar.classList.add('active');
}

function closeCart() {
  cartSidebar.classList.remove('active');
}

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCart() {
  cartItems.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.qty;
    cartItems.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}">
        <div>
          <h4>${item.name}</h4>
          <p>$${item.price} x ${item.qty}</p>
          <button onclick="changeQty('${item.id}', 1)">+</button>
          <button onclick="changeQty('${item.id}', -1)">-</button>
        </div>
      </div>
    `;
  });
  cartTotal.innerText = `$${total.toFixed(2)}`;
  cartCount.innerText = cart.reduce((acc, item) => acc + item.qty, 0);
  saveCart();
}

function changeQty(id, change) {
  const index = cart.findIndex(item => item.id === id);
  if (index !== -1) {
    cart[index].qty += change;
    if (cart[index].qty <= 0) {
      cart.splice(index, 1);
    }
  }
  updateCart();
}

function addToCart(product) {
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  updateCart();
  showToast(`${product.name} added!`);
}

function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerText = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// Add to Cart button event
document.body.addEventListener('click', e => {
  if (e.target.classList.contains('add-to-cart-btn')) {
    const { id, name, price, image } = e.target.dataset;
    addToCart({ id, name, price: parseFloat(price), image });
    openCart();
  }
});

// Sidebar open/close
cartIcon.onclick = openCart;
cartClose.onclick = closeCart;

// Checkout
checkoutBtn.onclick = () => {
  alert("Checkout successful! 🎉");
  cart = [];
  updateCart();
  closeCart();
};

// Load on start
updateCart();
