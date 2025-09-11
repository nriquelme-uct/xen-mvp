const Joi = require('joi');

exports.idolSchema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    stageName: Joi.string().min(2).max(100).required(),
    realName: Joi.string().min(2).max(100).optional(),
    birthDate: Joi.date().optional(),
    nationality: Joi.string().min(2).max(50).optional(),
    position: Joi.string().min(2).max(50).optional(),
    specialty: Joi.string().min(2).max(100).optional(),
    height: Joi.number().min(100).max(250).optional(),
    weight: Joi.number().min(30).max(200).optional(),
    bloodType: Joi.string().valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-').optional(),
    zodiacSign: Joi.string().min(2).max(20).optional(),
    socialMedia: Joi.object({
        instagram: Joi.string().uri().optional(),
        twitter: Joi.string().uri().optional(),
        youtube: Joi.string().uri().optional()
    }).optional(),
    biography: Joi.string().max(2000).optional(),
    isActive: Joi.boolean().optional(),
    bandId: Joi.string().hex().length(24).optional(),
    companyId: Joi.string().hex().length(24).optional()
});

exports.updateIdolSchema = Joi.object({
    name: Joi.string().min(2).max(100).optional(),
    stageName: Joi.string().min(2).max(100).optional(),
    realName: Joi.string().min(2).max(100).optional(),
    birthDate: Joi.date().optional(),
    nationality: Joi.string().min(2).max(50).optional(),
    position: Joi.string().min(2).max(50).optional(),
    specialty: Joi.string().min(2).max(100).optional(),
    height: Joi.number().min(100).max(250).optional(),
    weight: Joi.number().min(30).max(200).optional(),
    bloodType: Joi.string().valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-').optional(),
    zodiacSign: Joi.string().min(2).max(20).optional(),
    socialMedia: Joi.object({
        instagram: Joi.string().uri().optional(),
        twitter: Joi.string().uri().optional(),
        youtube: Joi.string().uri().optional()
    }).optional(),
    biography: Joi.string().max(2000).optional(),
    isActive: Joi.boolean().optional(),
    bandId: Joi.string().hex().length(24).optional(),
    companyId: Joi.string().hex().length(24).optional()
}); 