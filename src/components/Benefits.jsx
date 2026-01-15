import "../styles/benefits.css";

export default function Benefits() {
  return (
    <section className="benefits">
      <div className="benefits-container">
        <div className="benefit-card">
          <span className="benefit-icon">🚚</span>
          <h3>Frete Rápido</h3>
          <p>Entrega ágil para todo o Brasil</p>
        </div>

        <div className="benefit-card">
          <span className="benefit-icon">💳</span>
          <h3>Pagamento Seguro</h3>
          <p>Pix, cartão ou boleto</p>
        </div>

        <div className="benefit-card">
          <span className="benefit-icon">👕</span>
          <h3>Qualidade Premium</h3>
          <p>Tecido confortável e durável</p>
        </div>

        <div className="benefit-card">
          <span className="benefit-icon">🔒</span>
          <h3>Compra Protegida</h3>
          <p>Seus dados estão seguros</p>
        </div>
      </div>
    </section>
  );
}
    