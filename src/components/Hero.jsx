import './Hero.css';

function Hero() {
  const publicUrl = process.env.PUBLIC_URL || '';

  return (
    <section className="hero">
      <div className="hero-image">
        <img
          src={`${publicUrl}/images/hero-trees.jpg`}
          alt="Штучні ялинки для вашого свята"
          className="hero-photo"
        />
      </div>

      <div className="hero-content">
        <h1 className="hero-title">Штучні ялинки для вашого свята</h1>
        <p className="hero-text">
          Добірка штучних ялинок різної висоти та з різних матеріалів. Оберіть ту, що
          прикрасить ваш дім і прослужить не один сезон: без осипання хвої, зі зручним
          зберіганням і швидкою збіркою.
        </p>
      </div>
    </section>
  );
}

export default Hero;
