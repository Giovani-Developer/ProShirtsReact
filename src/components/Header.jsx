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
        <div className="top-bar">OFERTAS COM DESCONTO NAS DATAS DUPLAS</div>

        <div className="main-header">
          <div className="left">
            <button className="menu-btn" onClick={() => setMenuOpen(true)}>
              ☰
            </button>
            <img className="logo" src="/images/logo.jpeg" alt="" />
          </div>

        
          <div className="icons">
            <span>👤</span>
            <span>❤️</span>

            <motion.div
              animate={{ scale: [1, 2.3, 1] }}
              transition={{ duration: 1.3 }}
            >

            <Link to="/cart" className="cart-icon">
              🛒
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </Link>
            </motion.div>
          </div> 
        </div>
        

        <nav className="menu desktop-menu">
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
                  {/* SEARCH */}
        <input
          className="search-desktop"
          type="text"
          placeholder="O que você está procurando?"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleSearch}
        />
          
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
              onKeyDown={handleSearch}
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
