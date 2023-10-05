const ContactUs = () => {
  return (
    <div className="gap-2 d-grid d-sm-flex justify-content-sm-center">
      <div className="mb-3 col-md-5 offset-md-1">
        <form>
          <h5>Subscríbete!</h5>
          <p>
            Al subscribirte a nuestra lista de email serás notificado de las
            mejores ofertas en tiempo real!
          </p>
          <div className="gap-2 d-flex flex-column flex-sm-row w-100">
            <label htmlFor="email" className="visually-hidden">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="form-control"
              placeholder="Email"
            />
            <button className="btn btn-primary" type="button">
              Subscribirse
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
