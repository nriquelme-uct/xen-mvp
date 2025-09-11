const Joi = require('joi');

exports.companySchema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    koreanName: Joi.string().min(2).max(100).optional(),
    englishName: Joi.string().min(2).max(100).optional(),
    foundedDate: Joi.date().optional(),
    ceo: Joi.string().min(2).max(100).optional(),
    headquarters: Joi.string().min(2).max(200).optional(),
    address: Joi.string().min(5).max(500).optional(),
    phone: Joi.string().min(10).max(20).optional(),
    email: Joi.string().email().optional(),
    website: Joi.string().uri().optional(),
    description: Joi.string().max(2000).optional(),
    logo: Joi.string().uri().optional(),
    isActive: Joi.boolean().optional(),
    socialMedia: Joi.object({
        instagram: Joi.string().uri().optional(),
        twitter: Joi.string().uri().optional(),
        youtube: Joi.string().uri().optional(),
        facebook: Joi.string().uri().optional()
    }).optional(),
    subsidiaries: Joi.array().items(Joi.string().min(2).max(100)).optional(),
    businessType: Joi.string().min(2).max(100).optional(),
    employeeCount: Joi.number().min(1).max(100000).optional(),
    revenue: Joi.number().min(0).optional(),
    country: Joi.string().min(2).max(50).optional()
});

exports.updateCompanySchema = Joi.object({
    name: Joi.string().min(2).max(100).optional(),
    koreanName: Joi.string().min(2).max(100).optional(),
    englishName: Joi.string().min(2).max(100).optional(),
    foundedDate: Joi.date().optional(),
    ceo: Joi.string().min(2).max(100).optional(),
    headquarters: Joi.string().min(2).max(200).optional(),
    address: Joi.string().min(5).max(500).optional(),
    phone: Joi.string().min(10).max(20).optional(),
    email: Joi.string().email().optional(),
    website: Joi.string().uri().optional(),
    description: Joi.string().max(2000).optional(),
    logo: Joi.string().uri().optional(),
    isActive: Joi.boolean().optional(),
    socialMedia: Joi.object({
        instagram: Joi.string().uri().optional(),
        twitter: Joi.string().uri().optional(),
        youtube: Joi.string().uri().optional(),
        facebook: Joi.string().uri().optional()
    }).optional(),
    subsidiaries: Joi.array().items(Joi.string().min(2).max(100)).optional(),
    businessType: Joi.string().min(2).max(100).optional(),
    employeeCount: Joi.number().min(1).max(100000).optional(),
    revenue: Joi.number().min(0).optional(),
    country: Joi.string().min(2).max(50).optional()
}); 