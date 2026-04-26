const express = require('express');
const router = express.Router();

const { createBusiness, getMyBusinesses, getAllBusinesses, deleteBusiness } = require('../controllers/businessController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Crear Negocio
router.post(
  '/',
  authMiddleware,
  roleMiddleware(["SELLER", "ADMIN"]),
  createBusiness
);


// Obtener mis negocios
//router.get('/', authMiddleware, getMyBusinesses);
// 👇 cambiar esto
router.get('/my', authMiddleware, getMyBusinesses);
router.get('/all', authMiddleware, roleMiddleware(["ADMIN"]), getAllBusinesses);
router.delete('/:id', authMiddleware, deleteBusiness);

module.exports = router;