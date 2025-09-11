const express = require('express');
const router = express.Router();
const {
    createBand,
    getBands,
    getBandById,
    updateBand,
    deleteBand,
    addMember,
    removeMember,
    searchBands
} = require('../controllers/bandController');
const validate = require('../middleware/validate');
const auth = require('../middleware/auth');
const { bandSchema, updateBandSchema, addMemberSchema } = require('../validators/bandValidator');

// Todas las rutas protegidas con autenticación
router.use(auth);

// Rutas CRUD básicas
router.post('/', validate(bandSchema), createBand);
router.get('/', getBands);
router.get('/search', searchBands);
router.get('/:id', getBandById);
router.put('/:id', validate(updateBandSchema), updateBand);
router.delete('/:id', deleteBand);

// Rutas para gestión de miembros
router.post('/:id/members', validate(addMemberSchema), addMember);
router.delete('/:id/members/:idolId', removeMember);

module.exports = router; 