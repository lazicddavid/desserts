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


 getCart() {
  return this.cart;
}

getProducts() {
  return this.products;
}
 setCart(value) {
  this.cart = value;
 }
 

getTotalItems() {
  return this.totalItems;
}


 getTotalPrice() {
 
 return this.totalPrice = value;
 }

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

  cart.forEach(function (item) {
    totalItems += item.quantity;
    totalPrice += item.price * item.quantity;

    DOM.cartcontainer.innerHTML = `${item.name} x${item.quantity} - $${item.price * item.quantity}`;

    DOM.cartContainer.appendChild(div);
  });

  DOM.cartTitle.textContent = "Your Cart (" + totalItems + ")";
  updateProductButtons();
}

function addToCart(id) {
  const cart = getCart();

  const item = cart.find(function (item) {
    return item.id === id;
  });

  if (item) {
    item.quantity++;
  } else {
    const product = getProducts().find(function (product) {
      return product.id === id;
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
//odvojiti funkcije 
/*
function removeFromCart(id) {
  const cart = getCart();

  cart.forEach(function (item) {
    if (item.id === id) {
      item.quantity--;
    }
  });

  setCart(
    cart.filter(function (item) {
      return item.quantity > 0;
    }),
  );

  renderCart();
}*/

function decreaseQuantity(cart. id) {
   cart.forEach(function (item) {
    if (item.id === id) {
      item.quantity--''
    }
     });

 return cart;
    }

 funtion removeItems(cart) {
  return cart.filter(function (item){
    return item.quantity > 0;
  });
}


function  removeFromcart(id) {
  let cart = getCart();

  cart = decreaseQuantity(cart, id);
  cart = removeItems(cart);
  
  setCart(cart)
  renderCart()
}



function updateProductButtons() {
  DOM.productButtons.forEach(function (btn) {
    const id = Number(btn.dataset.id);
    const cart = getCart();

    let quantity = 0;

    /* cart.forEach(function (item) {
      if (item.id === id) {
        quantity = item.quantity;
      }
    });
*/
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
      const id = Number(e.target.dataset.id);
      addToCart(id);
    });
  });

  minusBtns.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      const id = Number(e.target.dataset.id);
      removeFromCart(id);
    });
  });
}

DOM.productButtons.forEach(function (btn) {
  btn.addEventListener("click", function (e) {
    if (e.target.classList.contains("plus")) return;
    if (e.target.classList.contains("minus")) return;

    const id = Number(btn.dataset.id);
    addToCart(id);
  });
});

renderCart();
