const DOM = {
  cartContainer: document.querySelector(".empty-cart"),
  cartTitle: document.querySelector(".cart-title"),
};

const state = {
  products: [
    {
      category: "cake",
      image: "image1.jpg",
      price: 10,
      name: "Chocolate Cake",
      id: 1,
    },
    {
      category: "pie",
      image: "image2.jpg",
      price: 15,
      name: "Apple Pie",
      id: 2,
    },
  ],
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
    return;
  }

  let totalItems = 0;

  cart.forEach(function (item) {
    totalItems += item.quantity;

    const div = document.createElement("div");
    div.textContent = item.name + " x" + item.quantity + " - $" + item.price;

    DOM.cartContainer.appendChild(div);
  });

  DOM.cartTitle.textContent = "Your Cart (" + totalItems + ")";
}

function addToCart(id) {
  const cart = getCart();

  const existing = cart.find(function (item) {
    return item.id === id;
  });

  if (existing) {
    existing.quantity += 1;
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

const addButtons = document.querySelectorAll(".add-btn");

addButtons.forEach(function (btn) {
  btn.addEventListener("click", function (e) {
    const id = Number(e.target.dataset.id);
    addToCart(id);
  });
});
