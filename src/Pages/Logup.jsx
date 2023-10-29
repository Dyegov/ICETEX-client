import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Logup = () => {
  const { VITE_API } = import.meta.env;

  let navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");

  const signUp = async (e) => {
    e.preventDefault();
    await fetch(`${VITE_API}/users`, {
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

    navigate("/home");
  };

  return (
    <main className="form-signin">
      <form className="text-center" onSubmit={signUp}>
        <img
          className="mb-4"
          src="./favicon.png"
          alt=""
          width="72"
          height="57"
        />
        <h1 className="h3 mb-3 fw-normal">Registrarse</h1>

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
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="floatingPasswordConfirm"
            minLength="8"
            placeholder="Password Confirm"
            value={confirmationPassword}
            onChange={(e) => setConfirmationPassword(e.target.value)}
            required
          />
          <label htmlFor="floatingPassword">Confirmar Contraseña</label>
          {password !== confirmationPassword && (
            <div className="text-danger">Las contraseñas no coinciden.</div>
          )}
        </div>

        <button
          disabled={password !== confirmationPassword}
          className="w-100 btn btn-lg btn-primary mb-3"
          type="submit"
        >
          Registrarse
        </button>
        <span>
          Ya tienes cuenta? Haz Login <Link to="/login">aquí</Link>
        </span>
        <p className="mt-5 mb-3 text-muted">© 2023</p>
      </form>
    </main>
  );
};

export default Logup;
