/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useLoggedUser } from "../utils/useLoggedUser";

const ProtectedRoute = ({ children }) => {
  const { loggedUser } = useLoggedUser();

  if (!loggedUser)
    return (
      <div className="text-center">
        <div className="container mt-5 mb-3 text-danger">
          No está autorizado
        </div>
        <Link to="/login">
          <button className="btn btn-secondary">Inicie sesión</button>
        </Link>
      </div>
    );

  return <div>{children}</div>;
};

export default ProtectedRoute;
