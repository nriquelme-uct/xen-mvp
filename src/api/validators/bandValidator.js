const Joi = require('joi');

exports.bandSchema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    koreanName: Joi.string().min(2).max(100).optional(),
    englishName: Joi.string().min(2).max(100).optional(),
    japaneseName: Joi.string().min(2).max(100).optional(),
    debutDate: Joi.date().optional(),
    companyId: Joi.string().hex().length(24).required(),
    fandomName: Joi.string().min(2).max(100).optional(),
    concept: Joi.string().min(2).max(200).optional(),
    genre: Joi.string().min(2).max(100).optional(),
    members: Joi.array().items(Joi.string().hex().length(24)).optional(),
    totalMembers: Joi.number().min(1).max(50).optional(),
    isActive: Joi.boolean().optional(),
    disbandDate: Joi.date().optional(),
    socialMedia: Joi.object({
        instagram: Joi.string().uri().optional(),
        twitter: Joi.string().uri().optional(),
        youtube: Joi.string().uri().optional(),
        tiktok: Joi.string().uri().optional()
    }).optional(),
    description: Joi.string().max(2000).optional(),
    logo: Joi.string().uri().optional(),
    color: Joi.string().min(3).max(20).optional()
});

exports.updateBandSchema = Joi.object({
    name: Joi.string().min(2).max(100).optional(),
    koreanName: Joi.string().min(2).max(100).optional(),
    englishName: Joi.string().min(2).max(100).optional(),
    japaneseName: Joi.string().min(2).max(100).optional(),
    debutDate: Joi.date().optional(),
    companyId: Joi.string().hex().length(24).optional(),
    fandomName: Joi.string().min(2).max(100).optional(),
    concept: Joi.string().min(2).max(200).optional(),
    genre: Joi.string().min(2).max(100).optional(),
    members: Joi.array().items(Joi.string().hex().length(24)).optional(),
    totalMembers: Joi.number().min(1).max(50).optional(),
    isActive: Joi.boolean().optional(),
    disbandDate: Joi.date().optional(),
    socialMedia: Joi.object({
        instagram: Joi.string().uri().optional(),
        twitter: Joi.string().uri().optional(),
        youtube: Joi.string().uri().optional(),
        tiktok: Joi.string().uri().optional()
    }).optional(),
    description: Joi.string().max(2000).optional(),
    logo: Joi.string().uri().optional(),
    color: Joi.string().min(3).max(20).optional()
});

exports.addMemberSchema = Joi.object({
    idolId: Joi.string().hex().length(24).required()
}); 