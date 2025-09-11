const express = require('express');
const router = express.Router();
const {
    createIdol,
    getIdols,
    getIdolById,
    updateIdol,
    deleteIdol,
    searchIdols
} = require('../controllers/idolController');
const validate = require('../middleware/validate');
const auth = require('../middleware/auth');
const { idolSchema, updateIdolSchema } = require('../validators/idolValidator');

// Todas las rutas protegidas con autenticación
router.use(auth);

// Rutas CRUD básicas
router.post('/', validate(idolSchema), createIdol);
router.get('/', getIdols);
router.get('/search', searchIdols);
router.get('/:id', getIdolById);
router.put('/:id', validate(updateIdolSchema), updateIdol);
router.delete('/:id', deleteIdol);

module.exports = router; 