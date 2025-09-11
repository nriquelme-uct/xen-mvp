const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        trim: true,
        maxlength: 100
    },
    email: { 
        type: String, 
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        maxlength: 255
    },
    phone: { 
        type: String, 
        trim: true,
        maxlength: 20
    },
    age: { 
        type: Number, 
        min: 13,
        max: 120
    },
    gender: { 
        type: String, 
        enum: ['male', 'female', 'other', 'prefer_not_to_say']
    },
    height: { 
        type: Number, 
        min: 100,
        max: 250 // en cm
    },
    weight: { 
        type: Number, 
        min: 30,
        max: 300 // en kg
    },
    fitnessLevel: { 
        type: String, 
        enum: ['beginner', 'intermediate', 'advanced', 'expert'],
        default: 'beginner'
    },
    goals: [{ 
        type: String, 
        enum: ['weight_loss', 'muscle_gain', 'endurance', 'strength', 'flexibility', 'general_fitness'],
        trim: true
    }],
    medicalConditions: [{ 
        type: String, 
        trim: true,
        maxlength: 200
    }],
    allergies: [{ 
        type: String, 
        trim: true,
        maxlength: 100
    }],
    emergencyContact: {
        name: { 
            type: String, 
            trim: true,
            maxlength: 100
        },
        phone: { 
            type: String, 
            trim: true,
            maxlength: 20
        },
        relationship: { 
            type: String, 
            trim: true,
            maxlength: 50
        }
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
    notes: { 
        type: String, 
        maxlength: 2000,
        trim: true
    },
    joinDate: { 
        type: Date, 
        default: Date.now
    },
    lastVisit: { 
        type: Date 
    },
    totalSessions: { 
        type: Number, 
        default: 0,
        min: 0
    }
}, { 
    timestamps: true 
});

// Índices para mejorar el rendimiento de búsquedas
clientSchema.index({ name: 'text', email: 'text' });
clientSchema.index({ createdBy: 1 });
clientSchema.index({ isActive: 1 });
clientSchema.index({ fitnessLevel: 1 });

module.exports = mongoose.model('Client', clientSchema);
