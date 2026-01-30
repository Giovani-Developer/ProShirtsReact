import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import "../styles/product.css";
import { formatPrice } from "../utils/formatPrice";

export default function ProductCard({ product }) {
  return (
    <motion.div
      className="product-card"
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
    >
      <div className="image-wrapper">
        <img src={product.image} alt={product.name} />

        <div className="overlay">
          <Link to={`/produto/${product.id}`} className="details-btn">
            Ver detalhes
          </Link>
        </div>
      </div>

      <h3>{product.name}</h3>
      <span className="price">{formatPrice(product.price)}</span>
    </motion.div>
  );
}


ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};
