import PropTypes from "prop-types";
import ProductCard from "./ProductCard";
import "../styles/product.css";


export default function ProductGrid({ products }) {
  return (
    <div className="grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

ProductGrid.propTypes = {
  products: PropTypes.array.isRequired,
};
