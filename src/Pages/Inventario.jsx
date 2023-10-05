import { products } from "../products";

const Inventario = () => {
  const cart = JSON.parse(localStorage.getItem("carrito")) ?? [];
  const cartAmount = (itemId) => {
    return cart.find((cartItem) => cartItem.id === itemId)?.amount ?? 0;
  };

  return (
    <div className="container mt-5 text-center">
      <h1 className="mb-4">Inventario</h1>
      <table className="mx-auto">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} id={`inventory-amount-${product.id}`}>
              <td>{product.title}</td>
              <td>{product.amount - cartAmount(product.id)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Inventario;
