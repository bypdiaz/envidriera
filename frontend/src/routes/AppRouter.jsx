import { BrowserRouter, Routes, Route } from "react-router-dom";

// Páginas
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import CreateBusiness from "../pages/CreateBusiness";
import CreateProduct from "../pages/CreateProduct";
import PrivateRoute from "../components/PrivateRoute";
import Profile from "../pages/Profile";


// Navbar
import Navbar from "../components/Navbar";

function AppRouter() {
  return (
    <BrowserRouter>
      <div style={styles.app}>
        <Navbar /> {/* 👈 SIEMPRE visible */}
        <div style={{ paddingTop: "60px" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/create-business"
              element={
                <PrivateRoute roles={["SELLER", "ADMIN"]}>
                  <CreateBusiness />
                </PrivateRoute>
              }
            />

            <Route
              path="/create-product"
              element={
                <PrivateRoute roles={["SELLER", "ADMIN"]}>
                  <CreateProduct />
                </PrivateRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <PrivateRoute roles={["USER", "SELLER", "ADMIN"]}>
                  <Profile />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

const styles = {
  app: {
    maxWidth: "500px",   // 📱 ancho tipo celular
    margin: "0 auto",    // centra la app
    backgroundColor: "#111",
    minHeight: "100vh"
  }
};

export default AppRouter;