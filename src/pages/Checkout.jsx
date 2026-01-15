import { useEffect, useState } from "react";
import "../styles/checkout.css";

export default function Checkout() {
  const [cart, setCart] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  function handleFinishOrder() {
    if (cart.length === 0) {
      alert("Seu carrinho está vazio.");
      return;
    }

    const itemsMessage = cart
      .map(
        (item) =>
          `- ${item.name}%0A  Tamanho: ${item.selectedSize}%0A  Quantidade: ${item.quantity}%0A  Preço: R$ ${item.price.toFixed(
            2
          )}%0A`
      )
      .join("%0A");

    const message = `
Olá! Quero finalizar meu pedido.%0A
Nome: ${name || "Não informado"}%0A%0A
${itemsMessage}%0A
Total: R$ ${total.toFixed(2)}
    `;

    const phone = "5519999295741"; // <-- COLOQUE SEU NÚMERO AQUI
    const url = `https://wa.me/${phone}?text=${message}`;

    window.open(url, "_blank");
  }

  return (
    <div className="checkout-container">
      <h1>Finalizar pedido</h1>

      <input
        type="text"
        placeholder="Seu nome (opcional)"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {cart.map((item, index) => (
        <div key={index} className="checkout-item">
          <div>
            <strong>{item.name}</strong>
            <p>Tamanho: {item.selectedSize}</p>
            <p>Quantidade: {item.quantity}</p>
          </div>

          <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
        </div>
      ))}

      <div className="checkout-total">
        <h2>Total: R$ {total.toFixed(2)}</h2>
      </div>

      <button className="finish-button" onClick={handleFinishOrder}>
        Finalizar pedido no WhatsApp
      </button>
    </div>
  );
}
