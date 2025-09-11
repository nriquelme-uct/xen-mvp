const mongoose = require('mongoose');

const trainingSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        trim: true,
        maxlength: 100
    },
    clientName: { 
        type: String, 
        required: true,
        trim: true,
        maxlength: 100
    },
    workout: { 
        type: String, 
        required: true,
        trim: true,
        maxlength: 100
    },
    description: { 
        type: String, 
        maxlength: 1000,
        trim: true
    },
    calories: { 
        type: Number, 
        required: true,
        min: 0,
        max: 10000
    },
    duration: { 
        type: Number, 
        required: true,
        min: 1,
        max: 480 // máximo 8 horas
    },
    intensity: { 
        type: String, 
        enum: ['low', 'medium', 'high', 'extreme'],
        default: 'medium'
    },
    type: { 
        type: String, 
        enum: ['cardio', 'strength', 'flexibility', 'endurance', 'sports', 'mixed'],
        required: true
    },
    exercises: [{
        name: { 
            type: String, 
            required: true,
            trim: true,
            maxlength: 100
        },
        sets: { 
            type: Number, 
            min: 1,
            max: 50
        },
        reps: { 
            type: Number, 
            min: 1,
            max: 1000
        },
        weight: { 
            type: Number, 
            min: 0,
            max: 1000
        },
        duration: { 
            type: Number, 
            min: 1,
            max: 3600 // en segundos
        },
        rest: { 
            type: Number, 
            min: 0,
            max: 600 // en segundos
        }
    }],
    date: { 
        type: Date, 
        required: true,
        default: Date.now
    },
    isCompleted: { 
        type: Boolean, 
        default: false 
    },
    notes: { 
        type: String, 
        maxlength: 2000,
        trim: true
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
    location: { 
        type: String, 
        trim: true,
        maxlength: 200
    },
    equipment: [{ 
        type: String, 
        trim: true,
        maxlength: 50
    }]
}, { 
    timestamps: true 
});

// Índices para mejorar el rendimiento de búsquedas
trainingSchema.index({ clientName: 'text', workout: 'text' });
trainingSchema.index({ type: 1 });
trainingSchema.index({ date: -1 });
trainingSchema.index({ createdBy: 1 });
trainingSchema.index({ isCompleted: 1 });

module.exports = mongoose.model('Training', trainingSchema);
