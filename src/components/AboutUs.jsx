const AboutUs = () => {
  return (
    <div className="px-4 py-5 my-5 text-center" id="about-us">
      <img
        className="mx-auto mb-4 d-block"
        src="./public/aboutus.jpeg"
        alt="multiples dispositivos"
        loading="lazy"
      />
      <h1 className="display-5 fw-bold">Sobre Nosotros</h1>
      <div className="mx-auto col-lg-6">
        <p className="mb-4 lead">
          En nuestra tienda, somos fanáticos de la tecnología y nos dedicamos a
          proporcionarte los dispositivos más avanzados y emocionantes. Nuestra
          misión es simplificar tu búsqueda de la última tecnología y ofrecerte
          asesoramiento experto. Desde smartphones de última generación hasta
          accesorios innovadores, tenemos todo lo que necesitas para mantenerte
          a la vanguardia.
        </p>
        <p className="mb-4 lead">
          Nos enorgullece servirte y compartir nuestra pasión por la tecnología
          contigo. En nuestra tienda no solo vendemos productos, creamos
          conexiones y experiencias únicas. Únete a nosotros en este emocionante
          viaje tecnológico y descubre un mundo de posibilidades. ¡Bienvenido a
          la revolución tecnológica!
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
