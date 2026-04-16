import products from "./products.js";

const DOM = {
  cartContainer: document.querySelector(".empty-cart"),
  cartTitle: document.querySelector(".cart-title"),
  productButtons: document.querySelectorAll(".add-btn"),
};

const state = {
  products: products,
  cart: [],
};

function getCart() {
  return state.cart;
}

function renderCart() {
  const cart = getCart();

  DOM.cartContainer.innerHTML = "";

  if (cart.length === 0) {
    DOM.cartContainer.innerHTML = "<p>Your added items will appear here</p>";
    DOM.cartTitle.textContent = "Your Cart (0)";
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

  DOM.cartTitle.textContent = "Your Cart (" + totalItems + ")";
  updateProductButtons();
}

function addToCart(id) {
  const cart = getCart();

  let productIndex = -1;

  cart.forEach(function (item, index) {
    if (item.id === id) {
      productIndex = index;
    }
  });

  if (productIndex !== -1) {
    cart[productIndex].quantity += 1;
  } else {
    const product = state.products.find(function (p) {
      return p.id === id;
    });

    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
    });
  }

  renderCart();
}

function removeFromCart(id) {
  const cart = getCart();

  cart.forEach(function (item) {
    if (item.id === id) {
      item.quantity--;
    }
  });

  state.cart = cart.filter(function (item) {
    return item.quantity > 0;
  });

  renderCart();
}
function updateProductButtons() {
  DOM.productButtons.forEach(function (btn) {
    const id = Number(btn.dataset.id);
    const cart = getCart();

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

  addButtonListeners();
}

function addButtonListeners() {
  const plusBtns = document.querySelectorAll(".plus");
  const minusBtns = document.querySelectorAll(".minus");

  plusBtns.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      const id = Number(e.target.dataset.id);
      addToCart(id);
    });
  });

  minusBtns.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      const id = Number(e.target.dataset.id);
      removeFromCart(id);
    });
  });
}

DOM.productButtons.forEach(function (btn) {
  btn.addEventListener("click", function () {
    const id = Number(btn.dataset.id);
    addToCart(id);
  });
});

renderCart();
