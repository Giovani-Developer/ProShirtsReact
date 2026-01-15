import "../styles/header.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Header() {
  const [cartCount, setCartCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(cart.length);
  }, [location]);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      navigate(`/?q=${encodeURIComponent(search)}`);
      setMenuOpen(false);
    }
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="header">
        <div className="top-bar">
          OFERTAS COM DESCONTO NAS DATAS DUPLAS
        </div>

        <div className="main-header">
  <div className="left">
    <button
      className="menu-btn"
      onClick={() => setMenuOpen(true)}
    >
      ☰
    </button>
  </div>

  <h1 className="logo">PRO SHIRTS FC</h1>

  <div className="icons">
    <span>👤</span>
    <span>❤️</span>

    <Link to="/cart" className="cart-icon">
      🛒
      {cartCount > 0 && (
        <span className="cart-count">{cartCount}</span>
      )}
    </Link>
  </div>
</div>


        <nav className="menu desktop-menu">
          <Link to="/" onClick={closeMenu}>Toda a loja</Link>
          <Link to="/?categoria=beisebol" onClick={closeMenu}>Beisebol 25/26</Link>
          <Link to="/?categoria=copa" onClick={closeMenu}>Copa do mundo 26/27</Link>
          <Link to="/?categoria=drifit" onClick={closeMenu}>Dri Fit</Link>
          <Link to="/?categoria=feminino" onClick={closeMenu}>Feminino</Link>
          <Link to="/?categoria=retro" onClick={closeMenu}>Retro</Link>
        </nav>
      </header>

      {/* OVERLAY MOBILE */}
      {menuOpen && (
        <div className="mobile-overlay" onClick={closeMenu}>
          <aside
            className="mobile-menu"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-btn" onClick={closeMenu}>
              ✕
            </button>

            <input
              className="search-mobile"
              type="text"
              placeholder="Buscar produto..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearch}
            />

            <nav>
              <Link to="/" onClick={closeMenu}>Toda a loja</Link>
              <Link to="/?categoria=beisebol" onClick={closeMenu}>Beisebol</Link>
              <Link to="/?categoria=copa" onClick={closeMenu}>Copa do mundo</Link>
              <Link to="/?categoria=drifit" onClick={closeMenu}>Dri Fit</Link>
              <Link to="/?categoria=feminino" onClick={closeMenu}>Feminino</Link>
              <Link to="/?categoria=retro" onClick={closeMenu}>Retro</Link>
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}
