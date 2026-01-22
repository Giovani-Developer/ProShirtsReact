import "../styles/footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-col">
          <h4>INSTITUCIONAL</h4>
          <a href="#">Sobre a ProShirts</a>
          <a href="#">Fale Conosco</a>
          <a href="#">Política de Privacidade</a>
        </div>

        <div className="footer-col">
          <h4>SUA CONTA</h4>
          <a href="#">Minha conta</a>
          <a href="#">Meus pedidos</a>
          <a href="#">Meu carrinho</a>
        </div>

        <div className="footer-col">
          <h4>AJUDA</h4>
          <a href="#">Trocas e devoluções</a>
          <a href="#">Rastrear pedido</a>
        </div>

        <div className="footer-col">
          <h4>ATENDIMENTO</h4>
          <p>Seg a Sex - 9h às 18h</p>
          <p>WhatsApp: (19) 99814-5648</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 ProShirts   - Todos os direitos reservados</p>
      </div>
    </footer>
  );
}
