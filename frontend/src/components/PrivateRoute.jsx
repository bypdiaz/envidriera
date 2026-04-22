import { Navigate } from "react-router-dom";

function PrivateRoute({ children, roles }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    const user = JSON.parse(atob(token.split(".")[1]));

    // 🔥 validar roles
    if (roles && !roles.includes(user.role)) {
      return <Navigate to="/" />;
    }

    return children;

  } catch (error) {
    return <Navigate to="/login" />;
  }
}

export default PrivateRoute;