const roleMiddleware = (rolesPermitidos) => {
  return (req, res, next) => {
    const user = req.user;

    if (!rolesPermitidos.includes(user.role)) {
      return res.status(403).json({
        message: "No tenés permisos para esta acción"
      });
    }

    next();
  };
};

module.exports = roleMiddleware;