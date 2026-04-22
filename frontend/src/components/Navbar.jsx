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
    <h2 style={styles.logo}>Envidriera</h2>

    <div style={styles.links}>
      <Link to="/" style={styles.link}>Home</Link>

      {!user && (
        <>
          <Link to="/login" style={styles.link}>Login</Link>
          <Link to="/register" style={styles.link}>Register</Link>
        </>
      )}

      {user && (user.role === "SELLER" || user.role === "ADMIN") && (
        <>
          <Link to="/create-business" style={styles.link}>Negocio</Link>
          <Link to="/create-product" style={styles.link}>Producto</Link>
          
        </>
      )}

      {user && (
        <>
    <Link to="/profile" style={styles.link}>Perfil</Link>

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

    {user && (
      <div style={styles.userInfo}>
        <div>{user.email}</div>
        <div>({user.role})</div>
      </div>
    )}
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
    top: 0,                // 👈 volvemos arriba
    left: "50%",
    transform: "translateX(-50%)", // 👈 centrado tipo app
    width: "100%",
    maxWidth: "500px",
    backgroundColor: "#000",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 15px",
    borderBottom: "1px solid #333",
    zIndex: 1000,
    height: "60px"
    
  },
  logo: {
    color: "#00ff99",
    fontSize: "16px"
  },
  links: {
    display: "flex",
    gap: "10px",
    alignItems: "center"
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "13px"
  },
  userInfo: {
    color: "#aaa",
    fontSize: "11px",
    textAlign: "right"
  }
};

export default Navbar;