import { useEffect, useState } from "react";
import { products } from "../products";
import { currency } from "../utils/currency";

const Home = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart")) ?? []);
  }, []);

  const addToCart = (product) => {
    if (cart.some((existingProduct) => existingProduct.id === product.id)) {
      const oldCart = [...cart];
      const index = cart.findIndex(
        (existingProduct) => existingProduct.id === product.id
      );
      oldCart[index].count += 1;
      setCart(oldCart);
      localStorage.setItem("cart", JSON.stringify(oldCart));
    } else {
      setCart([...cart, { ...product, count: 1 }]);
      localStorage.setItem(
        "cart",
        JSON.stringify([...cart, { ...product, count: 1 }])
      );
    }
  };

  return (
    <div className="container mt-5 text-center">
      <div className="gap-3 row">
        {products.map((product) => (
          <div key={product.id} className="col">
            <div className="col">
              <div className="card product" style={{ width: "18rem" }}>
                <img className="card-img-top" src={product.image} />
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">{product.category}</p>
                  <p className="card-text fw-bold text-success">
                    {currency.format(product.price)}
                  </p>
                  <button
                    id={`card-button-${product.id}`}
                    className="btn btn-primary"
                    onClick={() => addToCart(product)}
                  >
                    Añadir
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
