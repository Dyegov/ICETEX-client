import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

const Navbar = () => {
  let location = useLocation();

  const [currentRoute, setCurrentRoute] = useState();

  useEffect(() => {
    setCurrentRoute(location.pathname);
  }, [location]);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src="./public/favicon.png" width="30" height="30" alt="" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-between"
          id="navbarSupportedContent"
        >
          <ul className="mr-auto navbar-nav">
            <li className="nav-item active">
              <Link className="nav-link" to="/">
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <HashLink smooth to="/#about-us" className="nav-link">
                Nosotros
              </HashLink>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/home">
                Tienda
              </Link>
            </li>
            {currentRoute !== "/admin" ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Iniciar Sesión
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Usuario
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="#">
                        Perfil
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Carrito
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Historial
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Configuración
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Cerrar Sesión
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin">
                    Admin
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Admin
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/inventario">
                      Inventario
                    </Link>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Historial Compras
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Generar Venta
                    </a>
                  </li>
                </ul>
              </li>
            )}
          </ul>
          <div className="d-flex gap-2">
            <form className="gap-2 my-2 form-inline my-lg-0 d-flex align-items-center">
              <Link className="nav-link text-primary" to="/contactanos">
                Contáctanos
              </Link>
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                className="my-2 btn btn-outline-success my-sm-0"
                type="submit"
              >
                Search
              </button>
            </form>
            <button
              id="carrito-button"
              className="btn btn-primary"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasExample"
              aria-controls="offcanvasExample"
            >
              Carrito
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
