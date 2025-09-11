const express = require('express');
const router = express.Router();
const {
    createFood,
    getFoods,
    getFoodById,
    updateFood,
    deleteFood,
    searchFoods,
    getFoodStats,
    getFoodsByCategory
} = require('../controllers/foodController');
const validate = require('../middleware/validate');
const auth = require('../middleware/auth');
const { foodSchema, updateFoodSchema, searchFoodSchema } = require('../validators/foodValidator');

// Todas las rutas protegidas con autenticación
router.use(auth);

// Rutas CRUD básicas
router.post('/', validate(foodSchema), createFood);
router.get('/', getFoods);
router.get('/stats', getFoodStats);
router.get('/search', validate(searchFoodSchema, 'query'), searchFoods);
router.get('/category/:category', getFoodsByCategory);
router.get('/:id', getFoodById);
router.put('/:id', validate(updateFoodSchema), updateFood);
router.delete('/:id', deleteFood);

module.exports = router;
