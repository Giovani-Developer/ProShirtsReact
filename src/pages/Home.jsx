import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductGrid from "../components/ProductGrid";
import Banner from "../components/Banner";
import productsData from "../data/products.json";

export default function Home() {
  const location = useLocation();
  const [products, setProducts] = useState([]);


  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoria = params.get("categoria");
    const query = params.get("q");

    let filtered = [...productsData];

    if (categoria) {
      filtered = filtered.filter(
        (p) => p.category === categoria
      );
    }

    if (query) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    setProducts(filtered);
  }, [location.search]);

  return (
    <>
      <Banner />
      <ProductGrid products={products} />
    </>
  );
}
