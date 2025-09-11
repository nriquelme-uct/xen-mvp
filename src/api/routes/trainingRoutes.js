const express = require('express');
const router = express.Router();
const {
    createTraining,
    getTrainings,
    getTrainingById,
    updateTraining,
    deleteTraining,
    completeTraining,
    searchTrainings,
    getTrainingStats,
    getTrainingsByClient
} = require('../controllers/trainingController');
const validate = require('../middleware/validate');
const auth = require('../middleware/auth');
const { trainingSchema, updateTrainingSchema, searchTrainingSchema } = require('../validators/trainingValidator');

// Todas las rutas protegidas con autenticación
router.use(auth);

// Rutas CRUD básicas
router.post('/', validate(trainingSchema), createTraining);
router.get('/', getTrainings);
router.get('/stats', getTrainingStats);
router.get('/search', validate(searchTrainingSchema, 'query'), searchTrainings);
router.get('/client/:clientName', getTrainingsByClient);
router.get('/:id', getTrainingById);
router.put('/:id', validate(updateTrainingSchema), updateTraining);
router.put('/:id/complete', completeTraining);
router.delete('/:id', deleteTraining);

module.exports = router;
