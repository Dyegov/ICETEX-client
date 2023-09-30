import { products } from "./products.js";

// Inventario
const inventoryTable = document.querySelector("#table-body");

products.forEach((product) => {
  const tr = document.createElement("tr");
  tr.id = `inventory-amount-${product.id}`;

  const title = document.createElement("td");
  title.innerHTML = product.title;

  const amount = document.createElement("td");
  let carrito = JSON.parse(localStorage.getItem("carrito")) ?? [];

  let cartAmount =
    carrito.find((cartItem) => cartItem.id === product.id)?.amount ?? 0;

  amount.innerHTML = product.amount - cartAmount;

  tr.appendChild(title);
  tr.appendChild(amount);
  inventoryTable.appendChild(tr);
});
