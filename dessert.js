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

  addToCart(id) {
    const item = this.cart.find((item) => item.id === id);

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
    let totalItems = 0;
    let totalPrice = 0;

    this.cart.forEach((item) => {
      totalItems += item.quantity;
      totalPrice += item.price * item.quantity;
    });

    this.totalItems = totalItems;
    this.totalPrice = totalPrice;
  },

    clearCartContainer() {

    DOM.cartContainer.innerHTML = "";
    }


    renderEmptyCart() 
    {
      DOM.cartContainer.innerHTML = "<p>Your added items will appear here</p>";
      DOM.cartTitle.textContent = "Your Cart (0)";
    }




   renderCartItems(item) {
      const div = document.createElement("div");
      div.textContent =
        item.name + " x" + item.quantity + " - $" + item.price * item.quantity;

      DOM.cartContainer.appendChild(div);
    },

 
renderCartItems() {
  this.cart.forEach((item) => {
    this.renderCartItem(item);
  });
},


renderCartTitle() {
    DOM.cartTitle.textContent = "Your Cart (" + this.totalItems + ")";
  
  },
};


rebderCart()


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
