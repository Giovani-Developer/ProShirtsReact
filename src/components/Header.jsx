import "../styles/header.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Header() {
  const [cartCount, setCartCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get("q") || "";
    setSearch(q);
  }, [location.search]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(cart.length);
  }, [location]);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      const params = new URLSearchParams(location.search);

      if (search.trim()) {
        params.set("", search.trim());
      } else {
        params.delete("q");
      }

      navigate(`/?${params.toString()}`);
      setMenuOpen(false);
    }
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="header">
        <div className="top-bar">SITE APENAS PARA ATACADO (MÍNIMO 15 PEÇAS)</div>

        <div className="main-header">
          {/* ESQUERDA */}
          <div className="header-left">
            <button className="menu-btn" onClick={() => setMenuOpen(true)}>
              ☰
            </button>

            <Link to="/">
              <img className="logo" src="/images/logo.jpeg" alt="Logo" />
            </Link>
          </div>

          {/* BUSCA DESKTOP */}
          <input
            className="search-desktop"
            type="text"
            placeholder="Buscar produto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                navigate(`/?q=${encodeURIComponent(search)}`);
                setMenuOpen(false); // se tiver menu mobile
              }
            }}
          />

          {/* DIREITA */}
          <div className="header-right">
            <span className="account-icon">
              <img
                src="/icons/account.webp"
                alt="Conta"
                style={{ width: 22 }}
              />
            </span>

            <Link to="/cart" className="cart-icon">
              <img src="/icons/cart.jpg" alt="Carrinho" style={{ width: 22 }} />

              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </Link>
          </div>
        </div>

        {/* MENU DESKTOP */}
        <nav className="desktop-menu">
          <Link to="/" onClick={closeMenu}>
            Toda a loja
          </Link>
          <Link to="/?categoria=torcedor" onClick={closeMenu}>
            Torcedor 25/26
          </Link>
          <Link to="/?categoria=jogador" onClick={closeMenu}>
            Jogador
          </Link>
          <Link to="/?categoria=retro" onClick={closeMenu}>
            Retro
          </Link>
        </nav>
      </header>

      {/* OVERLAY MOBILE */}
      {menuOpen && (
        <div className="mobile-overlay" onClick={closeMenu}>
          <aside className="mobile-menu" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeMenu}>
              ✕
            </button>

            <input
              className="search-mobile"
              type="text"
              placeholder="Buscar produto..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  navigate(`/?q=${encodeURIComponent(search)}`);
                  setMenuOpen(false); // se tiver menu mobile
                }
              }}
            />

            <motion.nav
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 260 }}
            >
              <nav>
                <Link to="/" onClick={closeMenu}>
                  Toda a loja
                </Link>
                <Link to="/?categoria=torcedor" onClick={closeMenu}>
                  Torcedor 25/26
                </Link>
                <Link to="/?categoria=jogador" onClick={closeMenu}>
                  Jogador
                </Link>
                <Link to="/?categoria=retro" onClick={closeMenu}>
                  Retro
                </Link>
              </nav>
            </motion.nav>
          </aside>
        </div>
      )}
    </>
  );
}
