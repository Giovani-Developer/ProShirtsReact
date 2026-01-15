import { useEffect, useState } from "react";
import "../styles/cart.css";
import { Link } from "react-router-dom";



export default function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  function updateCart(updatedCart) {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  }

  function increaseQuantity(index) {
    const updatedCart = [...cart];
    updatedCart[index].quantity += 1;
    updateCart(updatedCart);
  }

  function decreaseQuantity(index) {
    const updatedCart = [...cart];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
      updateCart(updatedCart);
    }
  }

  function removeItem(index) {
    const updatedCart = cart.filter((_, i) => i !== index);
    updateCart(updatedCart);
  }

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-container">
      <h1>Carrinho</h1>

      {cart.length === 0 && <p>Seu carrinho está vazio.</p>}

      {cart.map((item, index) => (
        <div key={index} className="cart-item">
          <img src={item.image} alt={item.name} />

          <div className="cart-info">
            <h3>{item.name}</h3>
            <span>Tamanho: {item.selectedSize}</span>
            <p>R$ {item.price.toFixed(2)}</p>

            <div className="quantity-controls">
              <button onClick={() => decreaseQuantity(index)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => increaseQuantity(index)}>+</button>
            </div>
          </div>

          <button onClick={() => removeItem(index)}>Remover</button>
        </div>
      ))}
        
      {cart.length > 0 && (
        <div className="cart-total">
          <h2>Total: R$ {total.toFixed(2)}</h2>
        </div>
      )}
      <Link to="/checkout">
  <button className="checkout-button">
    Ir para o checkout
  </button>
</Link>

    </div>
    
  );
}

