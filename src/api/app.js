require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const idolRoutes = require('./routes/idolRoutes');
const bandRoutes = require('./routes/bandRoutes');
const companyRoutes = require('./routes/companyRoutes');
const foodRoutes = require('./routes/foodRoutes');
const trainingRoutes = require('./routes/trainingRoutes');
const clientRoutes = require('./routes/clientRoutes');
const errorHandler = require('./middleware/errorHandler');
const app = express();
connectDB();
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true
}));
app.use(helmet());
app.use(express.json());
console.log("Montando rutas...");
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/idols', idolRoutes);
app.use('/api/v1/bands', bandRoutes);
app.use('/api/v1/companies', companyRoutes);
app.use('/api/v1/foods', foodRoutes);
app.use('/api/v1/trainings', trainingRoutes);
app.use('/api/v1/clients', clientRoutes);
app.get('/', (req, res) => res.send('¡API funcionando!'));
app.use(errorHandler);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));