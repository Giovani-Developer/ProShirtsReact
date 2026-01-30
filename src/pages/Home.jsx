import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductGrid from "../components/ProductGrid";
import Banner from "../components/Banner";
import Benefits from "../components/Benefits";
import productsData from "../data/products.json";
import "../styles/pagination.css";

const ITEMS_PER_PAGE = 45;



export default function Home() {
  const location = useLocation();

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoria = params.get("categoria");
    const query = params.get("q");

    let filtered = [...productsData];

    if (categoria) {
      filtered = filtered.filter(
        (p) => p.category.toLowerCase() === categoria.toLowerCase()
      );
    }

    if (query) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    setProducts(filtered);
    setPage(1); // 🔥 volta pra página 1 ao filtrar
  }, [location.search]);

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const currentProducts = products.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

  return (
    <>
      <Banner />
      <Benefits />

      <ProductGrid products={currentProducts} />

      {/* PAGINAÇÃO */}
      {products.length > 0 && (
  <div className="pagination">
    <button
      disabled={page === 1}
      onClick={() => {
        setPage((prev) => prev - 1);
        scrollToTop();
      }}
    >
      ◀ Página anterior
    </button>

    <select
      value={page}
      onChange={(e) => {
        setPage(Number(e.target.value));
        scrollToTop();
      }}
    >
      {Array.from({ length: totalPages }).map((_, i) => (
        <option key={i} value={i + 1}>
          {i + 1}
        </option>
      ))}
    </select>

    <button
      disabled={page === totalPages}
      onClick={() => {
        setPage((prev) => prev + 1);
        scrollToTop();
      }}
    >
      Próxima página ▶
    </button>
  </div>
)}


    </>
  );
}
