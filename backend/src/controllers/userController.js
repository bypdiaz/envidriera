// =======================================
// CONTROLADOR DE USUARIOS (con seguridad)
// =======================================

const User = require('../models/User');
const bcrypt = require('bcrypt');

// =======================================
// REGISTRO DE USUARIO
// =======================================
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;



    // Validación
    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'Todos los campos son obligatorios'
      });
    }


    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({
        message: 'El email ya está registrado'
      });
    }

    // =======================================
    // ENCRIPTAR PASSWORD
    // =======================================
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "USER",
      plan: "FREE"
    });

    return res.status(201).json({
      message: 'Usuario creado correctamente',
      user: newUser
    });

  } catch (error) {
    console.error('ERROR REGISTER:', error); // 👈 muestra el error real en consola

    return res.status(500).json({
      message: 'Error al crear usuario',
      error: error.message // 👈 muestra error en Postman
    });
  }
};

// =======================================
// LOGIN DE USUARIO
// =======================================

const jwt = require('jsonwebtoken');

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validación
    if (!email || !password) {
      return res.status(400).json({
        message: 'Email y password son obligatorios'
      });
    }

    // Buscar usuario
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({
        message: 'Usuario no encontrado'
      });
    }

    // Comparar contraseña
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: 'Contraseña incorrecta'
      });
    }

    // =======================================
    // GENERAR TOKEN
    // =======================================
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
        plan: user.plan || "FREE"
      },
      process.env.JWT_SECRET || 'secret123',
      {
        expiresIn: '1h'
      }
    );

    return res.status(200).json({
      message: 'Login exitoso',
      token
    });

  } catch (error) {
    return res.status(500).json({
      message: 'Error en login',
      error: error.message
    });
  }
};

module.exports = {
  registerUser,
  loginUser
};