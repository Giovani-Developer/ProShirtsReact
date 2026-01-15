import PropTypes from "prop-types";
import { useEffect, useState } from "react";

export default function AdminForm({
  onSubmit,
  initialData = null,
  onCancel,
}) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  // Preenche o formulário quando estiver em modo edição
  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setPrice(initialData.price);
      setImage(initialData.image);
    }
  }, [initialData]);

  function handleSubmit(e) {
    e.preventDefault();

    const product = {
      id: initialData?.id || Date.now().toString(),
      name,
      price: Number(price),
      image,
      sizes: ["P", "M", "G", "GG"],
    };

    onSubmit(product);

    // Limpa somente se estiver criando
    if (!initialData) {
      setName("");
      setPrice("");
      setImage("");
    }
  }

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nome do produto"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        type="number"
        placeholder="Preço"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="URL da imagem"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        required
      />

      <div className="admin-form-buttons">
        <button type="submit">
          {initialData ? "Salvar alterações" : "Adicionar produto"}
        </button>

        {initialData && (
          <button
            type="button"
            className="cancel"
            onClick={onCancel}
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

AdminForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  initialData: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    image: PropTypes.string,
  }),
};
