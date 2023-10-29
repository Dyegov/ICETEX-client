import { useEffect, useState } from "react";
import { currency } from "../utils/currency";
import { useLoggedUser } from "../hooks/useLoggedUser";

const Cart = () => {
  const { VITE_API } = import.meta.env;
  const { loggedUser } = useLoggedUser();

  const [cart, setCart] = useState([]);

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart")) ?? []);
  }, []);

  const modifyCount = (type, productId) => {
    if (type === "decrease") {
      const oldCart = [...cart];
      const index = cart.findIndex(
        (existingProduct) => existingProduct.id === productId
      );
      if (oldCart[index].count === 1) {
        oldCart.splice(index, 1);
      } else {
        oldCart[index].count -= 1;
      }
      setCart(oldCart);
      localStorage.setItem("cart", JSON.stringify(oldCart));
    } else {
      const oldCart = [...cart];
      const index = cart.findIndex(
        (existingProduct) => existingProduct.id === productId
      );
      oldCart[index].count += 1;
      setCart(oldCart);
      localStorage.setItem("cart", JSON.stringify(oldCart));
    }
  };

  const completePurchase = async () => {
    const purchase = {
      userId: loggedUser.data.id,
      products: cart.map((product) => product.id),
      total: cart.reduce(
        (acc, current) => acc + current.count * current.price,
        0
      ),
    };

    await fetch(`${VITE_API}/purchases`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(purchase),
    });

    setCart([]);
    localStorage.removeItem("cart");
    alert("Compra realizada con éxito.");
  };

  return (
    <div className="container mt-5 text-center">
      <h1>Carrito</h1>
      <p className="text-secondary fst-italic">
        {cart.length > 0
          ? "Estos son los items en su carrito"
          : "No hay productos en el carrito"}
      </p>
      {cart.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((product) => (
              <tr key={product.id}>
                <td>{product.title}</td>
                <td className="d-flex gap-4 align-items-center justify-content-center">
                  <button
                    className="btn btn-danger"
                    onClick={() => modifyCount("decrease", product.id)}
                  >
                    -
                  </button>
                  {product.count}
                  <button
                    className="btn btn-success"
                    onClick={() => modifyCount("increase", product.id)}
                  >
                    +
                  </button>
                </td>
                <td>{currency.format(product.price * product.count)} </td>
              </tr>
            ))}
            <tr>
              <td className="fw-bold">Total</td>
              <td>
                {currency.format(
                  cart.reduce((acc, curr) => acc + curr.price * curr.count, 0)
                )}
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
      )}
      {cart.length > 0 && (
        <button className="btn btn-success" onClick={completePurchase}>
          Comprar
        </button>
      )}
    </div>
  );
};

export default Cart;
