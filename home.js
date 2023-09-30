import { products } from "./products.js";
import { currency } from "./utils/currency.js";

// Cart
let storeItems = document.querySelector("#store-items");

let carrito = JSON.parse(localStorage.getItem("carrito")) ?? [];

let cartDescription = document.querySelector("#cart-description");
let buyButton = document.querySelector("#buy-button");

let total = carrito.reduce(
  (accum, current) => accum + current.amount * current.price,
  0
);

let cartContent = document.querySelector("#cart-content");

let cartTotal = document.createElement("div");
cartTotal.classList.add("mb-4");

let cartTotalTitle = document.createElement("span");
cartTotalTitle.innerHTML = "Total: ";
cartTotalTitle.classList.add("fw-bold");

let cartTotalAmount = document.createElement("span");
cartTotalAmount.innerHTML = currency.format(total);
cartTotalAmount.classList.add("text-success", "fw-bold");

cartTotal.appendChild(cartTotalTitle);
cartTotal.appendChild(cartTotalAmount);

cartContent.appendChild(cartTotal);

if (carrito.length < 1) {
  cartDescription.innerHTML = "No hay productos en el carrito.";
  buyButton.style.display = "none";
  cartTotal.style.display = "none";
}

products.forEach((product) => {
  let outerContainer = document.createElement("div");
  outerContainer.classList.add("col");

  let innerContainer = document.createElement("div");
  innerContainer.classList.add("col");

  let card = document.createElement("div");
  card.classList.add("card", "product");
  card.style.width = "18rem";

  let image = document.createElement("img");
  image.classList.add("card-img-top");
  image.src = product.image;

  let cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  let cardTitle = document.createElement("h5");
  cardTitle.classList.add("card-title");
  cardTitle.innerHTML = product.title;

  let cardCategory = document.createElement("p");
  cardCategory.classList.add("card-text");
  cardCategory.innerHTML = product.category;

  let cardPrice = document.createElement("p");
  cardPrice.classList.add("card-text", "fw-bold", "text-success");
  cardPrice.innerHTML = currency.format(product.price);

  let cardButton = document.createElement("button");
  cardButton.id = `card-button-${product.id}`;
  cardButton.classList.add("btn", "btn-primary");
  if (carrito.find((cartItem) => cartItem.id === product.id))
    cardButton.classList.add("btn-success");
  cardButton.innerHTML = "Añadir";

  cardButton.addEventListener("click", () => {
    if (carrito.some((cartItem) => cartItem.id === product.id)) {
      const index = carrito.findIndex((cartItem) => cartItem.id === product.id);
      const oldCarrito = [...carrito];
      oldCarrito[index].amount += 1;
      carrito = oldCarrito;
      const priceContainer = document.getElementById(`cart-${product.id}`);
      priceContainer.innerHTML = oldCarrito[index].amount;
      localStorage.setItem("carrito", JSON.stringify(carrito));
    } else {
      carrito?.push({
        ...product,
        amount: 1,
      });
      cardButton.classList.add("btn-success");
      addCartItem(product);
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));

    if (carrito.length === 1) {
      cartDescription.innerHTML =
        "Estos son los productos que has agregado a tu carrito.";
      buyButton.style.display = "block";
      cartTotal.style.display = "block";
    }

    total += product.price;
    cartTotalAmount.innerHTML = currency.format(total);
    carritoButton.innerHTML =
      carrito.length > 0
        ? `Carrito (${carrito.reduce(
            (accum, current) => accum + current.amount,
            0
          )})`
        : "Carrito";
  });

  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardCategory);
  cardBody.appendChild(cardPrice);
  cardBody.appendChild(cardButton);

  card.appendChild(image);
  card.appendChild(cardBody);

  innerContainer.appendChild(card);
  outerContainer.appendChild(innerContainer);

  storeItems.appendChild(outerContainer);
});

// Add item to cart from card button
let addCartItem = (item) => {
  let itemDetails = document.createElement("div");
  itemDetails.id = item.id;
  itemDetails.classList.add(
    "d-flex",
    "gap-2",
    "justify-content-between",
    "mb-4"
  );

  let itemTitle = document.createElement("h5");
  itemTitle.innerHTML = item.title;
  itemTitle.classList.add("col-4", "text-truncate", "my-auto");

  let amountContainer = document.createElement("div");
  amountContainer.classList.add("d-flex");

  let decreaseButton = document.createElement("button");
  decreaseButton.innerHTML = "-";
  decreaseButton.classList.add("btn");
  decreaseButton.addEventListener("click", () => {
    const index = carrito.findIndex((cartItem) => cartItem.id === item.id);
    const oldCarrito = [...carrito];
    oldCarrito[index].amount -= 1;
    total -= oldCarrito[index].price;
    cartTotalAmount.innerHTML = currency.format(total);
    carrito = oldCarrito;
    carritoButton.innerHTML =
      carrito.length > 0
        ? `Carrito (${carrito.reduce(
            (accum, current) => accum + current.amount,
            0
          )})`
        : "Carrito";
    const amount = (itemAmount.innerHTML = carrito.find(
      (cartItem) => cartItem.id === item.id
    ).amount);
    if (amount <= 0) {
      deleteCartItem(item);
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
  });

  let increaseButton = document.createElement("button");
  increaseButton.innerHTML = "+";
  increaseButton.classList.add("btn");
  increaseButton.addEventListener("click", () => {
    const index = carrito.findIndex((cartItem) => cartItem.id === item.id);
    const oldCarrito = [...carrito];
    oldCarrito[index].amount += 1;
    total += oldCarrito[index].price;
    cartTotalAmount.innerHTML = currency.format(total);
    carrito = oldCarrito;
    carritoButton.innerHTML =
      carrito.length > 0
        ? `Carrito (${carrito.reduce(
            (accum, current) => accum + current.amount,
            0
          )})`
        : "Carrito";
    itemAmount.innerHTML = carrito.find(
      (cartItem) => cartItem.id === item.id
    ).amount;
    localStorage.setItem("carrito", JSON.stringify(carrito));
  });

  let itemAmount = document.createElement("span");
  itemAmount.id = `cart-${item.id}`;
  itemAmount.classList.add("my-auto");
  itemAmount.innerHTML = carrito.find(
    (cartItem) => cartItem.id === item.id
  ).amount;

  amountContainer.appendChild(decreaseButton);
  amountContainer.appendChild(itemAmount);
  amountContainer.appendChild(increaseButton);

  let itemPriceDelete = document.createElement("div");

  let itemPrice = document.createElement("span");
  itemPrice.innerHTML = currency.format(item.price);
  itemPrice.classList.add("align-middle");

  let itemDelete = document.createElement("button");
  itemDelete.innerHTML = "x";
  itemDelete.classList.add("btn", "btn-danger");
  itemDelete.addEventListener("click", () => {
    deleteCartItem(item);
  });

  itemPriceDelete.appendChild(itemPrice);
  itemPriceDelete.appendChild(itemDelete);

  itemDetails.appendChild(itemTitle);
  itemDetails.appendChild(amountContainer);
  itemDetails.appendChild(itemPriceDelete);

  cartContent.appendChild(itemDetails);
};

// Initialize cart
carrito.forEach((item) => {
  addCartItem(item);
});

// Delete item from cart along with all amount
const deleteCartItem = (item) => {
  const amount = carrito.find((cartItem) => cartItem.id === item.id).amount;
  const index = carrito.findIndex((cartItem) => cartItem.id === item.id);
  carrito.splice(index, 1);
  carrito = carrito.filter((cartItem) => cartItem.id !== item.id);
  localStorage.setItem("carrito", JSON.stringify(carrito));

  let itemToDelete = document.getElementById(item.id);
  itemToDelete.remove();

  total -= item.price * amount;
  cartTotalAmount.innerHTML = currency.format(total);
  carritoButton.innerHTML =
    carrito.length > 0
      ? `Carrito (${carrito.reduce(
          (accum, current) => accum + current.amount,
          0
        )})`
      : "Carrito";

  let cardButton = document.getElementById(`card-button-${item.id}`);
  cardButton.classList.remove("btn-success");

  if (carrito.length < 1) {
    cartDescription.innerHTML = "No hay productos en el carrito.";
    buyButton.style.display = "none";
    cartTotal.style.display = "none";
  }
};

let carritoButton = document.querySelector("#carrito-button");
carritoButton.innerHTML =
  carrito.length > 0
    ? `Carrito (${carrito.reduce(
        (accum, current) => accum + current.amount,
        0
      )})`
    : "Carrito";
