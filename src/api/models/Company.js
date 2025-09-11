const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    name: { type: String, required: true },
    koreanName: { type: String },
    englishName: { type: String },
    foundedDate: { type: Date },
    ceo: { type: String },
    headquarters: { type: String },
    address: { type: String },
    phone: { type: String },
    email: { type: String },
    website: { type: String },
    description: { type: String },
    logo: { type: String }, // URL del logo
    isActive: { type: Boolean, default: true },
    socialMedia: {
        instagram: { type: String },
        twitter: { type: String },
        youtube: { type: String },
        facebook: { type: String }
    },
    subsidiaries: [{ type: String }], // empresas subsidiarias
    businessType: { type: String }, // tipo de negocio (entretenimiento, música, etc.)
    employeeCount: { type: Number },
    revenue: { type: Number }, // ingresos anuales
    country: { type: String, default: 'South Korea' }
}, { timestamps: true });

module.exports = mongoose.model('Company', companySchema); 