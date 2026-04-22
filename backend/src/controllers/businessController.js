// =======================================
// CONTROLADOR DE NEGOCIOS
// =======================================

const Business = require('../models/Business');

// Crear negocio

const createBusiness = async (req, res) => {

  try {
    const userId = req.user.id;
    const userPlan = req.user.plan;

    // contar negocios actuales
    const businessCount = await Business.count({
      where: { userId }
    });

    // reglas
    const limits = {
      FREE: 0,
      BASIC: 1,
      PRO: 3
    };

    console.log("USER:", req.user);
    console.log("PLAN:", userPlan);
    console.log("COUNT:", businessCount);
    console.log("LIMIT:", limits[userPlan]);

    const limit = limits[userPlan] ?? 0;

    if (businessCount >= limit) {
      return res.status(403).json({
        message: "Has alcanzado el límite de negocios para tu plan"
      });
    }

    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({
        message: 'El nombre es obligatorio'
      });
    }

    // user viene del middleware 🔥
    const business = await Business.create({
      name,
      description,
      userId: req.user.id
    });

    res.status(201).json({
      message: 'Negocio creado',
      business
    });

  } catch (error) {
    console.error('ERROR BUSINESS:', error);

    res.status(500).json({
      message: 'Error al crear negocio',
      error: error.message
    });
  }
};

// =======================================
// OBTENER NEGOCIOS DEL USUARIO
// =======================================

const getMyBusinesses = async (req, res) => {
  try {
    const businesses = await Business.findAll({
      where: { userId: req.user.id }
    });

    res.json({
      businesses
    });

  } catch (error) {
    console.error('ERROR GET BUSINESSES:', error);

    res.status(500).json({
      message: 'Error al obtener negocios',
      error: error.message
    });
  }
};

const getAllBusinesses = async (req, res) => {
  try {
    const businesses = await Business.findAll();

    res.json({ businesses });

  } catch (error) {
    res.status(500).json({
      message: "Error al obtener negocios",
      error: error.message
    });
  }
};

const deleteBusiness = async (req, res) => {
  try {
    const { id } = req.params;

    const business = await Business.findByPk(id);

    if (!business) {
      return res.status(404).json({
        message: "Negocio no encontrado"
      });
    }

    // 🔥 seguridad
    if (
      business.userId !== req.user.id &&
      req.user.role !== "ADMIN"
    ) {
      return res.status(403).json({
        message: "No autorizado"
      });
    }

    await business.destroy();

    res.json({
      message: "Negocio eliminado"
    });

  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar negocio",
      error: error.message
    });
  }
};

module.exports = {
  createBusiness,
  getMyBusinesses,
  getAllBusinesses,
  deleteBusiness
};