import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "../styles/product.css";

export default function ProductCard({ product }) {
  return (
    <Link to={`/produto/${product.id}`} className="product-card">
      <img src={product.image} alt={product.name} />

      <div className="product-info">
        <h3>{product.name}</h3>
        <span>R$ {product.price.toFixed(2)}</span>
      </div>
    </Link>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired
  }).isRequired
};
