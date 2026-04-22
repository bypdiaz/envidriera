import { useState } from "react";
import { createBusiness } from "../services/businessService";

function CreateBusiness() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createBusiness({ name, description });
      alert("Negocio creado");

      setName("");
      setDescription("");

    } catch (error) {
  const message = error.response?.data?.message || "Error al crear negocio";
  alert(message);
}
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Crear Negocio</h1>

      <form onSubmit={handleSubmit}>
        <input
          style={styles.input}
          type="text"
          placeholder="Nombre del negocio"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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

export default CreateBusiness;