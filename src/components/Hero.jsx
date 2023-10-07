const Hero = () => {
  return (
    <div className="container px-4 py-5 col-xxl-8">
      <div className="py-5 row flex-lg-row-reverse align-items-center justify-content-center g-5">
        <div className="col-10 col-sm-8 col-lg-6">
          <img
            src="./hero.png"
            className="d-block mx-lg-auto img-fluid"
            alt="header"
            width="700"
            height="500"
            loading="lazy"
          />
        </div>
        <div className="col-lg-6">
          <h1 className="mb-3 display-5 fw-bold lh-1">
            Tu tienda de los dispositivos más económicos!
          </h1>
          <p className="lead">
            ¡Bienvenido a nuestra tienda en línea de dispositivos innovadores!
            Explora la vanguardia tecnológica con una selección incomparable de
            productos de última generación que mejorarán tu vida. Desde
            smartphones de última generación hasta gadgets inteligentes y
            accesorios de alta calidad, tenemos todo lo que necesitas para
            mantenerte conectado, productivo y entretenido. ¡Descubre el futuro
            de la tecnología hoy mismo y encuentra el dispositivo perfecto para
            ti!
          </p>
          <div className="gap-2 d-grid d-md-flex justify-content-md-start">
            <a href="/home.html">
              <button
                type="button"
                className="px-4 btn btn-primary btn-lg me-md-2"
              >
                Comprar
              </button>
            </a>
            <a href="#about">
              <button
                type="button"
                className="px-4 btn btn-outline-secondary btn-lg"
              >
                Nosotros
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
