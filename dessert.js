import products from "./products.js";

const DOM = {
  cartContainer: document.querySelector(".empty-cart"),
  cartTitle: document.querySelector(".cart-title"),
  productButtons: document.querySelectorAll(".add-btn"),
};

const state = {
  products: products,
  cart: [],
  totalItems: 0,
  totalPrice: 0,

  getProducts() {
    return this.products;
  },

  getCart() {
    return this.cart;
  },

  setCart(value) {
    this.cart = value;
  },

  getTotalItems() {
    return this.totalItems;
  },

  setTotalItems(value) {
    this.totalItems = value;
  },

  getTotalPrice() {
    return this.totalPrice;
  },

  setTotalPrice(value) {
    this.totalPrice = value;
  },

  //proverava  da li proizvod postoji u korpi, ako postoji, povecava quant, ako ne postoji, pronalazi proizvod u products i dodaje ga u korpu sa quantity 1. na kraju renderuje cart.

  addToCart(id) {
    const item = this.getCart().find((item) => item.id === id);

    if (item) {
      item.quantity++;
    } else {
      const product = this.getProducts().find((product) => product.id === id);

      this.getCart().push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
      });
    }

    this.getCart().push({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
    });
  }gi t
    this.renderCart();
  },

  updateProductButtons() {
    DOM.productButtons.forEach((btn) => {
      const id = Number(btn.dataset.id);

      const item = this.cart.find((item) => item.id === id);

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

  increaseCartItemQuantity(id) {
    const item = this.cart.find((item) => item.id === id);

    if (item) {
      item.quantity++;
    }

    this.renderCart();
  },

  decreaseCartItemQuantity(id) {
    const item = this.cart.find((item) => item.id === id);

    if (item) {
      item.quantity--;
    }

    this.cart = this.cart.filter((item) => item.quantity > 0);

    this.renderCart();
  },

  removeFromCart(id) {
    this.cart = this.cart.filter((item) => item.id !== id);
    this.renderCart();
  },

  calculateCartTotals() {
    const totalPrice = this.getCart().reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);

    const totalItems = this.getCart().reduce((total, item) => {
      return total + item.quantity;
    }, 0);

    this.setTotalPrice(totalPrice);
    this.setTotalItems(totalItems);
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
    div.textContent = `${item.name} x${item.quantity} - $${item.price * item.quantity}`;

    DOM.cartContainer.appendChild(div);
  },

  renderCartItems() {
    this.getCart().forEach((item) => {
      this.renderCartItem(item);
    });
  },

  renderCartTitle() {
    DOM.cartTitle.textContent = `Your Cart (${this.getTotalItems()})`;
  },

  renderCart() {
    this.calculateCartTotals();
    this.clearCartContainer();

    if (this.getCart().length === 0) {
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
      state.increaseCartItemQuantity(id);
      return;
    }

    if (e.target.closest(".minus-btn")) {
      state.decreaseCartItemQuantity(id);
      return;
    }

    state.addToCart(id);
  });
});
