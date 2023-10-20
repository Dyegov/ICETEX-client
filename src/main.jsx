import React from "react";
import ReactDOM from "react-dom/client";
import Index from "./Pages/Index.jsx";
import "./styles.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Root from "./layouts/root.jsx";
import Admin from "./Pages/Admin.jsx";
import Inventario from "./Pages/Inventario.jsx";
import Contact from "./Pages/Contact.jsx";
import Login from "./Pages/Login.jsx";
import Logup from "./Pages/Logup.jsx";
import Home from "./Pages/Home.jsx";
import Cart from "./Pages/Cart.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Index />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/inventario" element={<Inventario />} />
      <Route path="/contactanos" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logup" element={<Logup />} />
      <Route path="/home" element={<Home />} />
      <Route path="/carrito" element={<Cart />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
