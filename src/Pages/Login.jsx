import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const { VITE_API } = import.meta.env;

  let navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e) => {
    e.preventDefault();
    const response = await fetch(`${VITE_API}/users/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    if (response.ok) {
      setEmail("");
      setPassword("");

      const result = await response.json();
      localStorage.setItem("token", result.token);

      navigate("/home");
    } else {
      setEmail("");
      setPassword("");

      alert("Credenciales no válidas.");
    }
  };

  return (
    <main className="form-signin">
      <form className="text-center" onSubmit={login}>
        <img
          className="mb-4"
          src="./favicon.png"
          alt=""
          width="72"
          height="57"
        />
        <h1 className="h3 mb-3 fw-normal">Login</h1>

        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="floatingInput">Email</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            minLength="8"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label htmlFor="floatingPassword">Contraseña</label>
        </div>

        <button className="w-100 btn btn-lg btn-primary mb-3" type="submit">
          Login
        </button>
        <a href="#">Recuperar contraseña</a>
        <br />
        <span className="text-nowrap">
          Aún no tienes una? Regístrate <Link to="/logup">aquí</Link>
        </span>
        <br />
        <a href="/">Regresa al inicio</a>
        <p className="mt-5 mb-3 text-muted">© 2023</p>
      </form>
    </main>
  );
};

export default Login;
