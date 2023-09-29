const products = [
  {
    id: 1,
    image:
      "https://d34vmoxq6ylzee.cloudfront.net/catalog/product/cache/b3b166914d87ce343d4dc5ec5117b502/6/1/612B6LA-1_T1679070655.png",
    title: "Portatil HP",
    category: "Computadores Portátiles",
    price: 3500000,
  },
  {
    id: 2,
    image:
      "https://tiendasishop.com/media/catalog/product/i/p/ipad_10th_generation_wi-fi_silver_pdp_image_position-1b_coes.jpg?optimize=high&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700",
    title: "iPad 7ma Generación",
    category: "Tablets",
    price: 2100000,
  },
  {
    id: 3,
    image: "https://m.media-amazon.com/images/I/512ob63RWdL.jpg",
    title: "iPad Pencil",
    category: "Accesorios",
    price: 729000,
  },
  {
    id: 4,
    image:
      "https://smartjoys.co/wp-content/uploads/2022/12/Airpods3-10.jpg.webp",
    title: "Airpods 3",
    category: "Accesorios",
    price: 1185000,
  },
  {
    id: 5,
    image: "https://www.lg.com/co/images/monitores/md07570237/gallery/dz1.jpg",
    title: 'Monitor 27" LG',
    category: "Monitores",
    price: 2400000,
  },
  {
    id: 6,
    image:
      "https://m.media-amazon.com/images/I/8196nDEwHnL._AC_UF1000,1000_QL80_.jpg",
    title: "Teclado Mecánico Gamer",
    category: "Accesorios",
    price: 269000,
  },
  {
    id: 7,
    image: "https://m.media-amazon.com/images/I/61lCLrCtuhL.jpg",
    title: "Ratón Gamer",
    category: "Accesorios",
    price: 130000,
  },
  {
    id: 8,
    image:
      "https://jaltechsas.com/wp-content/uploads/2019/05/CABLE%20HDMI%201.8M_10045_HDMI-1.8M_1-600x600.png",
    title: "Cable HDMI",
    category: "Accesorios",
    price: 19000,
  },
];

let currency = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
});

let storeItems = document.querySelector("#store-items");

let carrito = JSON.parse(localStorage.getItem("carrito")) ?? [];

let cartDescription = document.querySelector("#cart-description");
let buyButton = document.querySelector("#buy-button");

let total = carrito.reduce((accum, current) => accum + current.price, 0);

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
  cardButton.classList.add("btn", "btn-primary");
  cardButton.innerHTML = "Añadir";

  cardButton.addEventListener("click", () => {
    carrito?.push({ ...product, id: Math.floor(Math.random() * 100) });
    localStorage.setItem("carrito", JSON.stringify(carrito));
    cartItem(product);

    if (carrito.length === 1) {
      cartDescription.innerHTML =
        "Estos son los productos que has agregado a tu carrito.";
      buyButton.style.display = "block";
      cartTotal.style.display = "block";
    }

    total += product.price;
    cartTotalAmount.innerHTML = currency.format(total);
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

let cartItem = (item) => {
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

  let itemPriceDelete = document.createElement("div");

  let itemPrice = document.createElement("span");
  itemPrice.innerHTML = currency.format(item.price);
  itemPrice.classList.add("align-middle");

  let itemDelete = document.createElement("button");
  itemDelete.innerHTML = "X";
  itemDelete.classList.add("btn", "btn-danger");
  itemDelete.addEventListener("click", () => {
    deleteCartItem(item);
  });

  itemPriceDelete.appendChild(itemPrice);
  itemPriceDelete.appendChild(itemDelete);

  itemDetails.appendChild(itemTitle);
  itemDetails.appendChild(itemPriceDelete);

  cartContent.appendChild(itemDetails);
};

carrito.forEach((item) => {
  cartItem(item);
});

const deleteCartItem = (item) => {
  carrito = carrito.filter((cartItem) => cartItem.id !== item.id);
  localStorage.setItem("carrito", JSON.stringify(carrito));

  let itemToDelete = document.getElementById(item.id);
  itemToDelete.remove();

  total -= item.price;
  cartTotalAmount.innerHTML = currency.format(total);

  if (carrito.length < 1) {
    cartDescription.innerHTML = "No hay productos en el carrito.";
    buyButton.style.display = "none";
    cartTotal.style.display = "none";
  }
};
