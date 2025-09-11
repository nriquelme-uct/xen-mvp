const Joi = require('joi');

const exerciseSchema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    sets: Joi.number().min(1).max(50).optional(),
    reps: Joi.number().min(1).max(1000).optional(),
    weight: Joi.number().min(0).max(1000).optional(),
    duration: Joi.number().min(1).max(3600).optional(),
    rest: Joi.number().min(0).max(600).optional()
});

exports.trainingSchema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    clientName: Joi.string().min(2).max(100).required(),
    workout: Joi.string().min(2).max(100).required(),
    description: Joi.string().max(1000).optional(),
    calories: Joi.number().min(0).max(10000).required(),
    duration: Joi.number().min(1).max(480).required(),
    intensity: Joi.string().valid('low', 'medium', 'high', 'extreme').optional(),
    type: Joi.string().valid('cardio', 'strength', 'flexibility', 'endurance', 'sports', 'mixed').required(),
    exercises: Joi.array().items(exerciseSchema).optional(),
    date: Joi.date().optional(),
    isCompleted: Joi.boolean().optional(),
    notes: Joi.string().max(2000).optional(),
    tags: Joi.array().items(Joi.string().max(30)).optional(),
    location: Joi.string().max(200).optional(),
    equipment: Joi.array().items(Joi.string().max(50)).optional()
});

exports.updateTrainingSchema = Joi.object({
    name: Joi.string().min(2).max(100).optional(),
    clientName: Joi.string().min(2).max(100).optional(),
    workout: Joi.string().min(2).max(100).optional(),
    description: Joi.string().max(1000).optional(),
    calories: Joi.number().min(0).max(10000).optional(),
    duration: Joi.number().min(1).max(480).optional(),
    intensity: Joi.string().valid('low', 'medium', 'high', 'extreme').optional(),
    type: Joi.string().valid('cardio', 'strength', 'flexibility', 'endurance', 'sports', 'mixed').optional(),
    exercises: Joi.array().items(exerciseSchema).optional(),
    date: Joi.date().optional(),
    isCompleted: Joi.boolean().optional(),
    notes: Joi.string().max(2000).optional(),
    tags: Joi.array().items(Joi.string().max(30)).optional(),
    location: Joi.string().max(200).optional(),
    equipment: Joi.array().items(Joi.string().max(50)).optional()
});

exports.searchTrainingSchema = Joi.object({
    q: Joi.string().min(1).required(),
    type: Joi.string().valid('cardio', 'strength', 'flexibility', 'endurance', 'sports', 'mixed').optional(),
    dateFrom: Joi.date().optional(),
    dateTo: Joi.date().optional()
});
