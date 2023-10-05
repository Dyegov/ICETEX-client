const Contact = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col">
          <div className="card">
            <div className="text-white card-header bg-primary">
              <i className="fa fa-envelope"></i> Contactanos
            </div>
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label htmlFor="name">Nombre</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    aria-describedby="emailHelp"
                    placeholder="Nombre"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    aria-describedby="emailHelp"
                    placeholder="Email"
                    required
                  />
                  <small
                    id="emailHelp"
                    className="form-text text-muted fst-italic"
                  >
                    Nunca compartiremos tu email con nadie más.
                  </small>
                </div>
                <div className="form-group">
                  <label htmlFor="message">Mensaje</label>
                  <textarea
                    className="form-control"
                    id="message"
                    rows="6"
                    required
                  ></textarea>
                </div>
                <div className="mx-auto">
                  <button
                    type="submit"
                    className="mt-3 text-right btn btn-primary"
                  >
                    Enviar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-4">
          <div className="mb-3 card bg-light">
            <div className="text-white card-header bg-success text-uppercase">
              <i className="fa fa-home"></i> Nuestra Empresa
            </div>
            <div className="card-body">
              <p>Calle 100 # 72 - 29</p>
              <p>Bello</p>
              <p>Antiquia, Colombia</p>
              <p>Email : store@icetext.com</p>
              <p>Tel. +33 12 56 11 51 84</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
