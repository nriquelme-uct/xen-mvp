const mongoose = require('mongoose');

const bandSchema = new mongoose.Schema({
    name: { type: String, required: true },
    koreanName: { type: String },
    englishName: { type: String },
    japaneseName: { type: String },
    debutDate: { type: Date },
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
    fandomName: { type: String }, // nombre del fandom
    concept: { type: String }, // concepto de la banda
    genre: { type: String }, // género musical principal
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Idol' }],
    totalMembers: { type: Number },
    isActive: { type: Boolean, default: true },
    disbandDate: { type: Date },
    socialMedia: {
        instagram: { type: String },
        twitter: { type: String },
        youtube: { type: String },
        tiktok: { type: String }
    },
    description: { type: String },
    logo: { type: String }, // URL del logo
    color: { type: String } // color representativo de la banda
}, { timestamps: true });

module.exports = mongoose.model('Band', bandSchema); 