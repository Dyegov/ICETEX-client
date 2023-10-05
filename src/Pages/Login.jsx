import { Link } from "react-router-dom";

const Login = () => {
  return (
    <main className="form-signin">
      <form className="text-center">
        <img
          className="mb-4"
          src="./public/favicon.png"
          alt=""
          width="72"
          height="57"
        />
        <h1 className="h3 mb-3 fw-normal">Login</h1>

        <div className="form-floating">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            required
          />
          <label htmlFor="floatingInput">Email</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            minLength="8"
            placeholder="Password"
            required
          />
          <label htmlFor="floatingPassword">Contraseña</label>
        </div>

        <div className="checkbox my-3">
          <label>
            <input type="checkbox" value="remember-me" /> Recuérdame
          </label>
        </div>
        <button className="w-100 btn btn-lg btn-primary mb-3" type="submit">
          Login
        </button>
        <a href="#">Recuperar contraseña</a>
        <br />
        <span>
          Aún no tienes una? Regístrate <Link to="/logup">aquí</Link>
        </span>
        <a href="/">Regresa al inicio</a>
        <p className="mt-5 mb-3 text-muted">© 2023</p>
      </form>
    </main>
  );
};

export default Login;
