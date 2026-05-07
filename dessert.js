import products from "./products.js";

const DOM = {
  cartContainer: document.querySelector(".empty-cart"),
  cartTitle: document.querySelector(".cart-title"),
  cartOrderBtn: document.querySelector(".order-btn"),
  productButtons: document.querySelectorAll(".add-btn"),
};

const state = {
  products: products,
  cart: [],

  getProducts() {
    return this.products;
  },

  getCart() {
    return this.cart;
  },

  getCartItem(id) {
    return this.cart.find((item) => item.id === id);
  },

  getProduct(id) {
    return this.products.find((product) => product.id === id);
  },

  getTotalItems() {
    return this.cart.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
  },

  getTotalPrice() {
    return this.cart.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  },

  addToCart(item) {
    this.cart.push(item);
  },

  increaseQuantity(id) {
    const item = this.getCartItem(id);
    if (item) item.quantity++;
  },

  decreaseQuantity(id) {
    const item = this.getCartItem(id);
    if (item) item.quantity--;
    this.cart = this.cart.filter((item) => item.quantity > 0);
  },

  removeFromCart(id) {
    this.cart = this.cart.filter((item) => item.id !== id);
  },

  showOrderBtn() {
    DOM.cartOrderBtn.style.display = this.cart.length > 0 ? "block" : "none";
  },

  updateProductButtons() {
    DOM.productButtons.forEach((btn) => {
      const id = Number(btn.dataset.id);
      const item = this.getCartItem(id);

      if (item) {
        btn.innerHTML = `
          <span class="minus-btn">-</span>
          <span>${item.quantity}</span>
          <span class="plus-btn">+</span>
        `;
      } else {
        btn.innerHTML = "Add to Cart";
      }
    });
  },

  clearCartContainer() {
    DOM.cartContainer.innerHTML = "";
  },

  renderEmptyCart() {
    DOM.cartContainer.innerHTML = "<p>Your added items will appear here</p>";
    DOM.cartTitle.textContent = "Your Cart (0)";
  },

  renderCartItem(item) {
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <span>${item.name} x${item.quantity} - $${item.price * item.quantity}</span>
      <button class="remove-cart-item" data-id="${item.id}">x</button>
    `;
    DOM.cartContainer.appendChild(div);
  },

  renderCartItems() {
    this.cart.forEach((item) => {
      this.renderCartItem(item);
    });
  },

  renderCartTitle() {
    DOM.cartTitle.textContent = `Your Cart (${this.getTotalItems()})`;
  },

  renderCart() {
    this.clearCartContainer();

    if (this.cart.length === 0) {
      this.renderEmptyCart();
      this.updateProductButtons();
      return;
    }

    this.renderCartItems();
    this.renderCartTitle();
    this.updateProductButtons();
  },
};

DOM.productButtons.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    const button = e.target.closest(".add-btn");
    if (!button) return;

    const id = Number(button.dataset.id);

    if (e.target.closest(".plus-btn")) {
      state.increaseQuantity(id);
      state.renderCart();
      return;
    }

    if (e.target.closest(".minus-btn")) {
      state.decreaseQuantity(id);
      state.renderCart();
      return;
    }

    const cartItem = state.getCartItem(id);

    if (cartItem) {
      state.increaseQuantity(id);
    } else {
      const product = state.getProduct(id);
      state.addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
      });
    }

    state.renderCart();
  });
});

DOM.cartContainer.addEventListener("click", function (e) {
  const button = e.target.closest(".remove-cart-item");
  if (!button) return;
  const id = Number(button.dataset.id);
  state.removeFromCart(id);
  state.renderCart();
});
