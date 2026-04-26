import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

function Navbar() {

  const [user, setUser] = useState(null);

  useEffect(() => {
  const updateUser = () => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUser(payload);
      } catch {
        setUser(null);
      }
    } else {
      setUser(null);
    }
  };

  updateUser();

  window.addEventListener("storage", updateUser);

  return () => {
    window.removeEventListener("storage", updateUser);
  };
}, []);

  return (
  <nav style={styles.nav}>

    {/* 🔝 FILA SUPERIOR */}
    <div style={styles.topBar}>

      {/* LOGO */}
      <div style={styles.logo}>
        Envidriera
      </div>

      {/* BUSCADOR */}
      <input
        type="text"
        placeholder="Buscar productos..."
        style={styles.search}
      />

      {/* USUARIO */}
      <div style={styles.userSection}>
        {!user && (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </>
        )}

        {user && (
          <>
            <Link to="/profile" style={styles.userName}>
              {user.email}
            </Link>

            <button
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/";
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>

    {/* 🔽 FILA INFERIOR (MENÚ) */}
    <div style={styles.menuBar}>

      <Link to="/" style={styles.link}>Home</Link>
      <Link to="/feed" style={styles.link}>Feed</Link>

      {user && (user.role === "SELLER" || user.role === "ADMIN") && (
        <>
          <Link to="/create-business" style={styles.link}>Negocio</Link>
          <Link to="/create-product" style={styles.link}>Producto</Link>
        </>
      )}

    </div>

  </nav>
);
}

/*const styles = {
  nav: {
    position: "fixed", // 🔥 clave
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 1000, // 🔥 para que esté por encima
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#000",
    borderBottom: "1px solid #333"
  },
  logo: {
    color: "#00ff99"
  },
  links: {
    display: "flex",
    gap: "15px"
  },
  link: {
    color: "white",
    textDecoration: "none"
  }
};
*/

const styles = {
  nav: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    backgroundColor: "#000",
    borderBottom: "1px solid #333",
    zIndex: 1000
  },

  topBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 20px",
    gap: "20px"
  },

  logo: {
    color: "#00ff99",
    fontWeight: "bold",
    fontSize: "18px",
    minWidth: "120px"
  },

  search: {
    flex: 1,
    padding: "8px",
    borderRadius: "6px",
    border: "none",
    outline: "none"
  },

  userSection: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    minWidth: "150px",
    justifyContent: "flex-end"
  },

  userName: {
    color: "#00ff99",
    textDecoration: "none",
    fontSize: "14px"
  },

  menuBar: {
    display: "flex",
    gap: "20px",
    padding: "10px 20px",
    borderTop: "1px solid #222"
  },

  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "14px"
  }
};

export default Navbar;