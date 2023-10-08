import { useEffect, useState } from "react";
import { currency } from "../utils/currency";
import Modal from "../components/Modal";

const Home = () => {
  const { VITE_API } = import.meta.env;

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState([]);

  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [amount, setAmount] = useState(0);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart")) ?? []);

    const getCategories = async () => {
      const response = await fetch(`${VITE_API}/categories`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      setCategories(result);

      const getProducts = async () => {
        const response = await fetch(`${VITE_API}/products`, {
          headers: {
            Accept: "Application/json",
            "Content-Type": "application/json",
          },
        });
        const result = await response.json();
        setProducts(result);
      };
      getProducts();
    };
    getCategories();
  }, [VITE_API]);

  const addCategory = async (e) => {
    e.preventDefault();
    const product = { title, image, categoryId, amount, price };
    if (!id) {
      const response = await fetch(`${VITE_API}/products`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...product }),
      });
      const result = await response.json();
      setProducts([...products, { ...result }]);
    } else {
      const response = await fetch(`${VITE_API}/products/${id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...product }),
      });
      const result = await response.json();
      const oldProducts = [...products];
      const index = products.findIndex((product) => product.id === id);
      oldProducts[index] = result;
      setProducts(oldProducts);
    }
    setId("");
    setTitle("");
    setImage("");
    setCategoryId("");
    setAmount(0);
    setPrice(0);
  };

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

  const editProduct = async (product) => {
    setId(product.id);
    setTitle(product.title);
    setImage(product.image);
    setCategoryId(product.categoryId);
    setAmount(product.amount);
    setPrice(product.price);
  };

  const deleteProduct = async (productId) => {
    await fetch(`${VITE_API}/products/${productId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    setProducts(products.filter((product) => product.id !== productId));
  };

  return (
    <div className="container mt-5">
      <div className="d-flex gap-2">
        <h1>Productos</h1>
        <Modal triggerText="Añadir" title="Nueva Categoría">
          <p className="text-secondary fst-italic">
            Ingrese todos los datos del nuevo producto a agregar.
          </p>
          <form onSubmit={addCategory}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Nombre
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="image" className="form-label">
                URL Imagen
              </label>
              <input
                type="text"
                className="form-control"
                id="image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="categoryId" className="form-label">
                Categoría
              </label>
              <select
                className="form-select"
                id="categoryId"
                aria-label="Category"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                required
              >
                <option value=""></option>
                {categories
                  .sort((a, b) =>
                    a.name > b.name ? 1 : a.name < b.name ? -1 : 0
                  )
                  .map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="amount" className="form-label">
                En Inventario
              </label>
              <input
                type="number"
                className="form-control"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                Precio
              </label>
              <input
                type="number"
                className="form-control"
                id="price"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              data-bs-dismiss="modal"
            >
              Añadir
            </button>
          </form>
        </Modal>
      </div>
      <div className="gap-3 row mt-5">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="col">
              <div className="col">
                <div className="card product" style={{ width: "18rem" }}>
                  <img className="card-img-top" src={product.image} />
                  <div className="card-body">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text">{product.category?.name}</p>
                    <p className="card-text fw-bold text-success">
                      {currency.format(product.price)}
                    </p>
                    <div className="d-flex justify-content-between">
                      <button
                        id={`card-button-${product.id}`}
                        className="btn btn-success"
                        onClick={() => addToCart(product)}
                      >
                        Añadir
                      </button>
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-primary"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                          onClick={() => editProduct(product)}
                        >
                          E
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteProduct(product.id)}
                        >
                          D
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-secondary fst-italic mt-5">
            No hay productos para mostrar.
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
