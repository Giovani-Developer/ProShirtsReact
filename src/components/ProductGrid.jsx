import PropTypes from "prop-types";
import ProductCard from "./ProductCard";
import "../styles/product.css";
import { motion } from "framer-motion";

export default function ProductGrid({ products }) {
  return (
    
    <div>

      <h2 className="product-h2">Nossos Produtos</h2>
    
    <div className="grid">
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: index * 0.05 }}
        >
          <ProductCard product={product} />
        </motion.div>
      ))}
    </div>
    </div>
  );
}

ProductGrid.propTypes = {
  products: PropTypes.array.isRequired,
};
