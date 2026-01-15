import { useState, useEffect } from "react";

export default function Admin() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(saved);
  }, []);

  function addProduct(e) {
    e.preventDefault();
    const form = e.target;
    const newProduct = {
      id: Date.now().toString(),
      name: form.name.value,
      price: Number(form.price.value),
      image: form.image.value,
      sizes: ["P", "M", "G", "GG"]
    };

    const updated = [...products, newProduct];
    setProducts(updated);
    localStorage.setItem("products", JSON.stringify(updated));
    form.reset();
  }

  function remove(id) {
    const updated = products.filter(p => p.id !== id);
    setProducts(updated);
    localStorage.setItem("products", JSON.stringify(updated));
  }

  return (
    <div className="admin">
      <h1>Painel Administrativo</h1>

      <form onSubmit={addProduct}>
        <input name="name" placeholder="Nome" required />
        <input name="price" placeholder="Preço" required />
        <input name="image" placeholder="URL da imagem" required />
        <button>Adicionar</button>
      </form>

      {products.map(p => (
        <div key={p.id}>
          {p.name}
          <button onClick={() => remove(p.id)}>Excluir</button>
        </div>
      ))}
    </div>
  );
}
