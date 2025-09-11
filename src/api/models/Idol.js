const mongoose = require('mongoose');

const idolSchema = new mongoose.Schema({
    name: { type: String, required: true },
    stageName: { type: String, required: true },
    realName: { type: String },
    birthDate: { type: Date },
    nationality: { type: String },
    position: { type: String }, // posición en la banda (vocalista, bailarín, etc.)
    specialty: { type: String }, // especialidad (canto, baile, rap, etc.)
    height: { type: Number }, // altura en cm
    weight: { type: Number }, // peso en kg
    bloodType: { type: String },
    zodiacSign: { type: String },
    socialMedia: {
        instagram: { type: String },
        twitter: { type: String },
        youtube: { type: String }
    },
    biography: { type: String },
    isActive: { type: Boolean, default: true },
    bandId: { type: mongoose.Schema.Types.ObjectId, ref: 'Band' },
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' }
}, { timestamps: true });

module.exports = mongoose.model('Idol', idolSchema); 