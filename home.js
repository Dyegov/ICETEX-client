let carrito = JSON.parse(localStorage.getItem("carrito")) ?? [];

const producto1 = document
  .querySelector("#producto1")
  .addEventListener("click", () => {
    carrito?.push("producto1");
    localStorage.setItem("carrito", JSON.stringify(carrito));
    location.reload();
  });

const info = document.querySelector("#info");
info.innerHTML = carrito;
