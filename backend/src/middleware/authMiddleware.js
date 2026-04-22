// =======================================
// MIDDLEWARE DE AUTENTICACIÓN
// =======================================

const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    // Obtener token del header
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        message: 'Token no proporcionado'
      });
    }

    // Formato: "Bearer TOKEN"
    const tokenClean = token.split(' ')[1];

    // Verificar token
    const decoded = jwt.verify(
      tokenClean,
      process.env.JWT_SECRET || 'secret123'
    );

    // Guardar datos del usuario en request
    req.user = decoded;

    // Continuar
    next();

  } catch (error) {
    return res.status(401).json({
      message: 'Token inválido'
    });
  }
};

module.exports = authMiddleware;