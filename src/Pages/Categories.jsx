import { useEffect, useState } from "react";
import Modal from "../components/Modal";

const Categories = () => {
  const { VITE_API } = import.meta.env;

  const [categories, setCategories] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const getCategories = async () => {
      const response = await fetch(`${VITE_API}/categories`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      setCategories(result);
    };
    getCategories();
  }, [VITE_API]);

  const addCategory = async (e) => {
    e.preventDefault();
    if (!id) {
      const response = await fetch(`${VITE_API}/categories`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });
      const result = await response.json();
      setCategories([...categories, { ...result }]);
    } else {
      const response = await fetch(`${VITE_API}/categories/${id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });
      const result = await response.json();
      const oldCategories = [...categories];
      const index = categories.findIndex((category) => category.id === id);
      oldCategories[index] = result;
      setCategories(oldCategories);
      setId("");
      setName("");
    }
  };

  const editCategory = async (category) => {
    setId(category.id);
    setName(category.name);
  };

  const deleteCategory = async (categoryId) => {
    await fetch(`${VITE_API}/categories/${categoryId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    setCategories(categories.filter((category) => category.id !== categoryId));
  };

  return (
    <div className="container mt-5">
      <div className="d-flex gap-2">
        <h1>Categorias</h1>
        <Modal triggerText="Añadir" title="Nueva Categoría">
          <p className="text-secondary fst-italic">
            Ingrese los datos de la nueva categoría a agregar.
          </p>
          <form onSubmit={addCategory}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Nombre
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
      <table className="table w-50 mt-5">
        <thead>
          <tr>
            <th>Categoría</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.name}</td>
              <td className="d-flex gap-4">
                <button
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={() => editCategory(category)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteCategory(category.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Categories;
