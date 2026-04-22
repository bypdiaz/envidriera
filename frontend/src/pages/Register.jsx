import { useState } from "react";
import API from "../services/api";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Registro
      await API.post("/users/register", {
        name,
        email,
        password
      });

      // Login automático
      const loginResponse = await API.post("/users/login", {
        email,
        password
      });

      localStorage.setItem("token", loginResponse.data.token);

      window.dispatchEvent(new Event("storage"));

      window.location.href = "/";

      alert("Registro exitoso 🎉");

      window.location.href = "/";

    } catch (error) {
      console.error(error);

      // 🔥 mensaje inteligente
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Error de conexión con el servidor");
      }
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Registro</h1>

      <form onSubmit={handleSubmit}>
        <input
          style={styles.input}
          type="text"
          placeholder="Nombre"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          style={styles.input}
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Registrarse</button>
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

export default Register;