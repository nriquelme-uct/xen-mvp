const Joi = require('joi');

const emergencyContactSchema = Joi.object({
    name: Joi.string().min(2).max(100).optional(),
    phone: Joi.string().min(10).max(20).optional(),
    relationship: Joi.string().min(2).max(50).optional()
});

exports.clientSchema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().max(255).required(),
    phone: Joi.string().min(10).max(20).optional(),
    age: Joi.number().min(13).max(120).optional(),
    gender: Joi.string().valid('male', 'female', 'other', 'prefer_not_to_say').optional(),
    height: Joi.number().min(100).max(250).optional(),
    weight: Joi.number().min(30).max(300).optional(),
    fitnessLevel: Joi.string().valid('beginner', 'intermediate', 'advanced', 'expert').optional(),
    goals: Joi.array().items(Joi.string().valid('weight_loss', 'muscle_gain', 'endurance', 'strength', 'flexibility', 'general_fitness')).optional(),
    medicalConditions: Joi.array().items(Joi.string().max(200)).optional(),
    allergies: Joi.array().items(Joi.string().max(100)).optional(),
    emergencyContact: emergencyContactSchema.optional(),
    isActive: Joi.boolean().optional(),
    notes: Joi.string().max(2000).optional()
});

exports.updateClientSchema = Joi.object({
    name: Joi.string().min(2).max(100).optional(),
    email: Joi.string().email().max(255).optional(),
    phone: Joi.string().min(10).max(20).optional(),
    age: Joi.number().min(13).max(120).optional(),
    gender: Joi.string().valid('male', 'female', 'other', 'prefer_not_to_say').optional(),
    height: Joi.number().min(100).max(250).optional(),
    weight: Joi.number().min(30).max(300).optional(),
    fitnessLevel: Joi.string().valid('beginner', 'intermediate', 'advanced', 'expert').optional(),
    goals: Joi.array().items(Joi.string().valid('weight_loss', 'muscle_gain', 'endurance', 'strength', 'flexibility', 'general_fitness')).optional(),
    medicalConditions: Joi.array().items(Joi.string().max(200)).optional(),
    allergies: Joi.array().items(Joi.string().max(100)).optional(),
    emergencyContact: emergencyContactSchema.optional(),
    isActive: Joi.boolean().optional(),
    notes: Joi.string().max(2000).optional()
});

exports.searchClientSchema = Joi.object({
    q: Joi.string().min(1).required(),
    fitnessLevel: Joi.string().valid('beginner', 'intermediate', 'advanced', 'expert').optional()
});
