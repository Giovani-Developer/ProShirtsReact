import "../styles/banner.css";

export default function Banner() {
  return (
    <section className="banner">
      <picture>
        <source
          media="(max-width: 768px)"
          srcSet="/images/banner.png"
        />
        <img
          src="/images/banner-principal.JPG"
          alt="Banner principal"
          className="banner-image"
        />
      </picture>
    </section>
  );
}
