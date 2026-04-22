import { useState, useEffect } from "react";
import { getMyBusinesses } from "../services/businessService";
import { createProduct } from "../services/productService";

function CreateProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [businesses, setBusinesses] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState("");

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const data = await getMyBusinesses();
        setBusinesses(data.businesses || data);
      } catch (error) {
        console.error("Error cargando negocios", error);
      }
    };

    fetchBusinesses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedBusiness) {
      alert("Seleccioná un negocio");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("businessId", selectedBusiness);
      formData.append("image", image);

      await createProduct(formData);

      alert("Producto creado");

    } catch (error) {
      alert("Error al crear producto");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Crear Producto</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          onChange={(e) => setName(e.target.value)}
        />

        <select
          value={selectedBusiness}
          onChange={(e) => setSelectedBusiness(e.target.value)}
        >
          <option value="">Seleccionar negocio</option>

          {businesses.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Precio"
          onChange={(e) => setPrice(e.target.value)}
        />

        <textarea
          placeholder="Descripción"
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          style={styles.input}
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button type="submit">Crear</button>
      </form>
    </div>
  );
}

const styles = {
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "10px",
    borderRadius: "8px",
    border: "none"
  }
};

export default CreateProduct;