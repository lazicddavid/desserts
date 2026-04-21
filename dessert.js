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

  increaseCartItemQuantity(id) {
    const item = this.cart.find((item) => item.id === id);
    if (item) {
      item.quantity++;
    }
  },

  decreaseCartItemQuantity(id) {
    const item = this.cart.find((item) => item.id === id);
    if (item) {
      item.quantity--;
    }
  },

  addItemToCart(item) {
    this.cart.push(item);
  },

  getCart() {
    return this.cart;
  },

  getProducts() {
    return this.products;
  },

  setCart(value) {
    this.cart = value;
  },

  getTotalItems() {
    return this.totalItems;
  },

  getTotalPrice() {
    return this.totalPrice;
  },

  setTotalItems(value) {
    this.totalItems = value;
  },

  setTotalPrice(value) {
    this.totalPrice = value;
  },
};

function renderCart() {
  const cart = state.getCart();

  DOM.cartContainer.innerHTML = "";

  if (cart.length === 0) {
    DOM.cartContainer.innerHTML = "<p>Your added items will appear here</p>";
    DOM.cartTitle.textContent = "Your Cart (0)";
    state.setTotalItems(0);
    state.setTotalPrice(0);
    updateProductButtons();
    return;
  }

  let totalItems = 0;
  let totalPrice = 0;

  cart.forEach(function (item) {
    totalItems += item.quantity;
    totalPrice += item.price * item.quantity;

    const div = document.createElement("div");
    div.textContent =
      item.name + " x" + item.quantity + " - $" + item.price * item.quantity;

    DOM.cartContainer.appendChild(div);
  });

  state.setTotalItems(totalItems);
  state.setTotalPrice(totalPrice);

  DOM.cartTitle.textContent = "Your Cart (" + totalItems + ")";
  updateProductButtons();
}

function updateProductButtons() {
  const cart = state.getCart();

  DOM.productButtons.forEach(function (btn) {
    const id = Number(btn.dataset.id);

    let quantity = 0;

    cart.forEach(function (item) {
      if (item.id === id) {
        quantity = item.quantity;
      }
    });

    if (quantity === 0) {
      btn.classList.remove("active");
      btn.innerHTML = `<span>Add to Cart</span>`;
    } else {
      btn.classList.add("active");
      btn.innerHTML = `
        <span class="minus" data-id="${id}">-</span>
        <span>${quantity}</span>
        <span class="plus" data-id="${id}">+</span>
      `;
    }
  });
}

function addToCart(id) {
  const cart = state.getCart();

  const item = cart.find(function (item) {
    return item.id === id;
  });

  if (item) {
    item.quantity++;
  } else {
    const product = state.getProducts().find(function (product) {
      return Number(product.id) === id;
    });
    if (!product) return;
    cart.push({
      id: Number(product.id),
      name: product.name,
      price: product.price,
      quantity: 1,
    });
  }

  state.setCart(cart);
  renderCart();
}
//find f-ja
function decreaseQuantity(cart, id) {
  cart.forEach(function (item) {
    if (item.id === id) {
      item.quantity--;
    }
  });

  return cart;
}

function removeItems(cart) {
  return cart.filter(function (item) {
    return item.quantity > 0;
  });
}

function removeFromCart(id) {
  let cart = state.getCart();

  cart = decreaseQuantity(cart, id);
  cart = removeItems(cart);

  state.setCart(cart);
  renderCart();
}

function handleProductButtonClick(e) {
  const btn = e.currentTarget;
  const id = Number(btn.dataset.id);

  if (e.target.closest(".plus")) {
    addToCart(id);
    return;
  }

  if (e.target.closest(".minus")) {
    removeFromCart(id);
    return;
  }

  addToCart(id);
}

DOM.productButtons.forEach(function (btn) {
  btn.addEventListener("click", handleProductButtonClick);
});

renderCart();
