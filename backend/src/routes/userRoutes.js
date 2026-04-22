// =======================================
// RUTAS DE USUARIOS
// =======================================

const express = require('express');
const router = express.Router();

const { registerUser, loginUser } = require('../controllers/userController');

// Endpoint de registro
router.post('/register', registerUser);

router.post('/login', loginUser);

const authMiddleware = require('../middleware/authMiddleware');

// Ruta protegida
router.get('/profile', authMiddleware, (req, res) => {
  res.json({
    message: 'Acceso permitido',
    user: req.user
  });
});


module.exports = router;