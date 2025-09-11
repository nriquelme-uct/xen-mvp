const express = require('express');
const router = express.Router();
const {
    createCompany,
    getCompanies,
    getCompanyById,
    updateCompany,
    deleteCompany,
    getCompanyBands,
    getCompanyIdols,
    getCompanyStats,
    searchCompanies
} = require('../controllers/companyController');
const validate = require('../middleware/validate');
const auth = require('../middleware/auth');
const { companySchema, updateCompanySchema } = require('../validators/companyValidator');

// Todas las rutas protegidas con autenticación
router.use(auth);

// Rutas CRUD básicas
router.post('/', validate(companySchema), createCompany);
router.get('/', getCompanies);
router.get('/search', searchCompanies);
router.get('/:id', getCompanyById);
router.put('/:id', validate(updateCompanySchema), updateCompany);
router.delete('/:id', deleteCompany);

// Rutas para obtener información relacionada
router.get('/:id/bands', getCompanyBands);
router.get('/:id/idols', getCompanyIdols);
router.get('/:id/stats', getCompanyStats);

module.exports = router; 