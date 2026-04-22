// =======================================
// CONTROLADOR DE PRODUCTOS
// =======================================

const Product = require('../models/Product');
const Business = require('../models/Business');

const createProduct = async (req, res) => {
  try {

    console.log('BODY:', req.body);
    console.log('FILE:', req.file);

    const { name, price, description, businessId } = req.body;

    // Validación básica
    if (!name || !price || !businessId) {
      return res.status(400).json({
        message: 'Nombre, precio y businessId son obligatorios'
      });
    }

    // 🔐 Validar que el negocio pertenece al usuario
    const business = await Business.findOne({
      where: {
        id: businessId,
        userId: req.user.id
      }
    });

    if (!business) {
      return res.status(403).json({
        message: 'No tienes permiso sobre este negocio'
      });
    }

    // Crear producto

    const imageUrl = req.file
  ? `http://localhost:3000/uploads/${req.file.filename}`
  : null;

    const product = await Product.create({
      name,
      price,
      description,
      businessId,
      image: imageUrl,
    });

    res.status(201).json({
      message: 'Producto creado',
      product
    });

  } catch (error) {
    console.error('ERROR PRODUCT:', error);

    res.status(500).json({
      message: 'Error al crear producto',
      error: error.message
    });
  }
};

// =======================================
// OBTENER PRODUCTOS POR NEGOCIO
// =======================================

const getProductsByBusiness = async (req, res) => {
  try {
    const { businessId } = req.params;

    // Validar que el negocio pertenece al usuario
    const business = await Business.findOne({
      where: {
        id: businessId,
        userId: req.user.id
      }
    });

    if (!business) {
      return res.status(403).json({
        message: 'No tienes acceso a este negocio'
      });
    }

    // Obtener productos
    const products = await Product.findAll({
      where: { businessId }
    });

    res.json({
      products
    });

  } catch (error) {
    console.error('ERROR GET PRODUCTS:', error);

    res.status(500).json({
      message: 'Error al obtener productos',
      error: error.message
    });
  }
};

// =======================================
// EDITAR PRODUCTO
// =======================================

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description } = req.body;

    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({
        message: 'Producto no encontrado'
      });
    }

    // Validar que el negocio pertenece al usuario
    const business = await Business.findOne({
      where: {
        id: product.businessId,
        userId: req.user.id
      }
    });

    if (!business) {
      return res.status(403).json({
        message: 'No tienes permiso para editar este producto'
      });
    }

    // Actualizar
    await product.update({
      name,
      price,
      description
    });

    res.json({
      message: 'Producto actualizado',
      product
    });

  } catch (error) {
    console.error('ERROR UPDATE PRODUCT:', error);

    res.status(500).json({
      message: 'Error al actualizar producto',
      error: error.message
    });
  }
};

// =======================================
// ELIMINAR PRODUCTO
// =======================================

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({
        message: 'Producto no encontrado'
      });
    }

    // Validar propiedad
    const business = await Business.findOne({
      where: {
        id: product.businessId,
        userId: req.user.id
      }
    });

    if (!business) {
      return res.status(403).json({
        message: 'No tienes permiso para eliminar este producto'
      });
    }

    await product.destroy();

    res.json({
      message: 'Producto eliminado'
    });

  } catch (error) {
    console.error('ERROR DELETE PRODUCT:', error);

    res.status(500).json({
      message: 'Error al eliminar producto',
      error: error.message
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();

    return res.status(200).json(products);

  } catch (error) {
    return res.status(500).json({
      message: 'Error al obtener productos',
      error: error.message
    });
  }
};

module.exports = {
  createProduct,
  getProductsByBusiness,
  updateProduct,
  deleteProduct,
  getAllProducts
};