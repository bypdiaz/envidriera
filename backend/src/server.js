require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});

const sequelize = require('./config/database');

sequelize.authenticate()
  .then(() => console.log('Conectado a MySQL ✅'))
  .catch(err => console.error('Error de conexión ❌', err));

const User = require('./models/User');

// =======================================
// SINCRONIZACIÓN DE MODELOS CON LA DB
// =======================================

sequelize.sync({ alter: true })
  .then(() => console.log('Tablas sincronizadas ✅'))
  .catch(err => console.error('Error al sincronizar ❌', err));