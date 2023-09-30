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
