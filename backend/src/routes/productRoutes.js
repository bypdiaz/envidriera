const express = require('express');
const router = express.Router();

const {
  createProduct,
  getProductsByBusiness,
  updateProduct,
  deleteProduct,
  getAllProducts
} = require('../controllers/productController');

const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');


// =======================================
// 🔥 RUTA PÚBLICA (FEED)
// =======================================
router.get('/', getAllProducts);


// =======================================
// CREAR PRODUCTO
// =======================================
router.post('/', authMiddleware, upload.single('image'), createProduct);


// =======================================
// OBTENER PRODUCTOS POR NEGOCIO
// =======================================
router.get('/business/:businessId', authMiddleware, getProductsByBusiness);


// =======================================
// EDITAR PRODUCTO
// =======================================
router.put('/:id', authMiddleware, updateProduct);


// =======================================
// ELIMINAR PRODUCTO
// =======================================
router.delete('/:id', authMiddleware, deleteProduct);


module.exports = router;