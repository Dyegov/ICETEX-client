import { useEffect, useState } from "react";
import { currency } from "../utils/currency";

const Purchases = () => {
  const { VITE_API } = import.meta.env;
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    const getPurchases = async () => {
      const response = await fetch(`${VITE_API}/purchases`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      setPurchases(result);
    };
    getPurchases();
  }, [VITE_API]);

  return (
    <div className="container mt-5">
      <h1 className="mb-5">Compras</h1>
      <table>
        <thead>
          <tr>
            <th>ID Usuario</th>
            <th>Productos</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {purchases.map((purchase) => (
            <tr key={purchase.id}>
              <td>{purchase.userId}</td>
              <td className="text-center">{purchase.products.length}</td>
              <td>{currency.format(purchase.total)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Purchases;
