const Joi = require('joi');

exports.foodSchema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    description: Joi.string().max(500).optional(),
    portion: Joi.string().min(1).max(50).required(),
    calories: Joi.number().min(0).max(10000).required(),
    protein: Joi.number().min(0).max(1000).optional(),
    carbohydrates: Joi.number().min(0).max(1000).optional(),
    fat: Joi.number().min(0).max(1000).optional(),
    fiber: Joi.number().min(0).max(100).optional(),
    sugar: Joi.number().min(0).max(1000).optional(),
    sodium: Joi.number().min(0).max(10000).optional(),
    category: Joi.string().valid('breakfast', 'lunch', 'dinner', 'snack', 'supplement', 'beverage').optional(),
    isActive: Joi.boolean().optional(),
    tags: Joi.array().items(Joi.string().max(30)).optional(),
    image: Joi.string().uri().optional(),
    barcode: Joi.string().max(50).optional()
});

exports.updateFoodSchema = Joi.object({
    name: Joi.string().min(2).max(100).optional(),
    description: Joi.string().max(500).optional(),
    portion: Joi.string().min(1).max(50).optional(),
    calories: Joi.number().min(0).max(10000).optional(),
    protein: Joi.number().min(0).max(1000).optional(),
    carbohydrates: Joi.number().min(0).max(1000).optional(),
    fat: Joi.number().min(0).max(1000).optional(),
    fiber: Joi.number().min(0).max(100).optional(),
    sugar: Joi.number().min(0).max(1000).optional(),
    sodium: Joi.number().min(0).max(10000).optional(),
    category: Joi.string().valid('breakfast', 'lunch', 'dinner', 'snack', 'supplement', 'beverage').optional(),
    isActive: Joi.boolean().optional(),
    tags: Joi.array().items(Joi.string().max(30)).optional(),
    image: Joi.string().uri().optional(),
    barcode: Joi.string().max(50).optional()
});

exports.searchFoodSchema = Joi.object({
    q: Joi.string().min(1).required(),
    category: Joi.string().valid('breakfast', 'lunch', 'dinner', 'snack', 'supplement', 'beverage').optional(),
    minCalories: Joi.number().min(0).optional(),
    maxCalories: Joi.number().min(0).optional()
});
