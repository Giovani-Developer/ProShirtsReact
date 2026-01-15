import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import productsData from "../data/products.json";
import "../styles/product.css";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [size, setSize] = useState("");

  useEffect(() => {
    const foundProduct = productsData.find((p) => p.id === id);
    setProduct(foundProduct);
  }, [id]);

  function handleAddToCart() {
    if (!size) {
      alert("Selecione um tamanho");
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingIndex = cart.findIndex(
      (item) => item.id === product.id && item.selectedSize === size
    );

    if (existingIndex !== -1) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push({
        ...product,
        selectedSize: size,
        quantity: 1
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Produto adicionado ao carrinho");
  }

  if (!product) {
    return <p style={{ padding: "40px" }}>Produto não encontrado.</p>;
  }

  return (
    <div className="product-details">
      <img src={product.image} alt={product.name} />

      <div className="details-info">
        <h1>{product.name}</h1>
        <p className="price">R$ {product.price.toFixed(2)}</p>

        <div className="sizes">
          <span>Tamanho:</span>

          <div className="size-options">
            {product.sizes.map((s) => (
              <button
                key={s}
                className={size === s ? "active" : ""}
                onClick={() => setSize(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <button className="add-to-cart" onClick={handleAddToCart}>
          Adicionar ao carrinho
        </button>
      </div>
    </div>
  );
}
