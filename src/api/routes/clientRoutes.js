const express = require('express');
const router = express.Router();
const {
    createClient,
    getClients,
    getClientById,
    updateClient,
    deleteClient,
    searchClients,
    getClientStats,
    getClientTrainingHistory
} = require('../controllers/clientController');
const validate = require('../middleware/validate');
const auth = require('../middleware/auth');
const { clientSchema, updateClientSchema, searchClientSchema } = require('../validators/clientValidator');

// Todas las rutas protegidas con autenticación
router.use(auth);

// Rutas CRUD básicas
router.post('/', validate(clientSchema), createClient);
router.get('/', getClients);
router.get('/stats', getClientStats);
router.get('/search', validate(searchClientSchema, 'query'), searchClients);
router.get('/:id', getClientById);
router.get('/:id/training-history', getClientTrainingHistory);
router.put('/:id', validate(updateClientSchema), updateClient);
router.delete('/:id', deleteClient);

module.exports = router;
