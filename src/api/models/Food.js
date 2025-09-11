const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        trim: true,
        maxlength: 100
    },
    description: { 
        type: String, 
        maxlength: 500,
        trim: true
    },
    portion: { 
        type: String, 
        required: true,
        trim: true,
        maxlength: 50
    },
    calories: { 
        type: Number, 
        required: true,
        min: 0,
        max: 10000
    },
    protein: { 
        type: Number, 
        min: 0,
        max: 1000
    },
    carbohydrates: { 
        type: Number, 
        min: 0,
        max: 1000
    },
    fat: { 
        type: Number, 
        min: 0,
        max: 1000
    },
    fiber: { 
        type: Number, 
        min: 0,
        max: 100
    },
    sugar: { 
        type: Number, 
        min: 0,
        max: 1000
    },
    sodium: { 
        type: Number, 
        min: 0,
        max: 10000
    },
    category: { 
        type: String, 
        enum: ['breakfast', 'lunch', 'dinner', 'snack', 'supplement', 'beverage'],
        default: 'snack'
    },
    isActive: { 
        type: Boolean, 
        default: true 
    },
    createdBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    tags: [{ 
        type: String, 
        trim: true,
        maxlength: 30
    }],
    image: { 
        type: String, 
        trim: true
    },
    barcode: { 
        type: String, 
        trim: true,
        unique: true,
        sparse: true
    }
}, { 
    timestamps: true 
});

// Índices para mejorar el rendimiento de búsquedas
foodSchema.index({ name: 'text', description: 'text' });
foodSchema.index({ category: 1 });
foodSchema.index({ calories: 1 });
foodSchema.index({ createdBy: 1 });

module.exports = mongoose.model('Food', foodSchema);
