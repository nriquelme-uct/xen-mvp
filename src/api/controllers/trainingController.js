const Training = require('../models/Training');
const Client = require('../models/Client');
const mongoose = require('mongoose');

// Crear un nuevo entrenamiento
exports.createTraining = async (req, res, next) => {
    try {
        const trainingData = {
            ...req.body,
            createdBy: req.user.id
        };
        const training = new Training(trainingData);
        await training.save();
        
        // Actualizar estadísticas del cliente si existe
        if (training.clientName) {
            await Client.findOneAndUpdate(
                { name: training.clientName, createdBy: req.user.id },
                { 
                    $inc: { totalSessions: 1 },
                    lastVisit: training.date
                }
            );
        }
        
        res.status(201).json(training);
    } catch (err) {
        next(err);
    }
};

// Obtener todos los entrenamientos
exports.getTrainings = async (req, res, next) => {
    try {
        const { 
            page = 1, 
            limit = 10, 
            clientName,
            type,
            isCompleted,
            dateFrom,
            dateTo,
            sortBy = 'date',
            sortOrder = 'desc'
        } = req.query;
        
        let query = { createdBy: req.user.id };
        
        if (clientName) query.clientName = { $regex: clientName, $options: 'i' };
        if (type) query.type = type;
        if (isCompleted !== undefined) query.isCompleted = isCompleted === 'true';
        
        if (dateFrom || dateTo) {
            query.date = {};
            if (dateFrom) query.date.$gte = new Date(dateFrom);
            if (dateTo) query.date.$lte = new Date(dateTo);
        }
        
        const sortOptions = {};
        sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;
        
        const trainings = await Training.find(query)
            .sort(sortOptions)
            .limit(limit * 1)
            .skip((page - 1) * limit);
            
        const total = await Training.countDocuments(query);
        
        res.json({
            trainings,
            totalPages: Math.ceil(total / limit),
            currentPage: parseInt(page),
            total
        });
    } catch (err) {
        next(err);
    }
};

// Obtener un entrenamiento por ID
exports.getTrainingById = async (req, res, next) => {
    try {
        const training = await Training.findOne({ 
            _id: req.params.id, 
            createdBy: req.user.id 
        });
        
        if (!training) return res.status(404).json({ error: 'Entrenamiento no encontrado' });
        res.json(training);
    } catch (err) {
        next(err);
    }
};

// Actualizar un entrenamiento
exports.updateTraining = async (req, res, next) => {
    try {
        const training = await Training.findOneAndUpdate(
            { _id: req.params.id, createdBy: req.user.id },
            req.body,
            { new: true, runValidators: true }
        );
        
        if (!training) return res.status(404).json({ error: 'Entrenamiento no encontrado' });
        res.json(training);
    } catch (err) {
        next(err);
    }
};

// Eliminar un entrenamiento
exports.deleteTraining = async (req, res, next) => {
    try {
        const training = await Training.findOneAndDelete({ 
            _id: req.params.id, 
            createdBy: req.user.id 
        });
        
        if (!training) return res.status(404).json({ error: 'Entrenamiento no encontrado' });
        res.json({ message: 'Entrenamiento eliminado exitosamente' });
    } catch (err) {
        next(err);
    }
};

// Marcar entrenamiento como completado
exports.completeTraining = async (req, res, next) => {
    try {
        const training = await Training.findOneAndUpdate(
            { _id: req.params.id, createdBy: req.user.id },
            { isCompleted: true, completedAt: new Date() },
            { new: true }
        );
        
        if (!training) return res.status(404).json({ error: 'Entrenamiento no encontrado' });
        res.json(training);
    } catch (err) {
        next(err);
    }
};

// Buscar entrenamientos
exports.searchTrainings = async (req, res, next) => {
    try {
        const { q, type, dateFrom, dateTo } = req.query;
        
        if (!q) return res.status(400).json({ error: 'Término de búsqueda requerido' });
        
        let query = { 
            createdBy: req.user.id,
            $or: [
                { name: { $regex: q, $options: 'i' } },
                { clientName: { $regex: q, $options: 'i' } },
                { workout: { $regex: q, $options: 'i' } },
                { description: { $regex: q, $options: 'i' } }
            ]
        };
        
        if (type) query.type = type;
        if (dateFrom || dateTo) {
            query.date = {};
            if (dateFrom) query.date.$gte = new Date(dateFrom);
            if (dateTo) query.date.$lte = new Date(dateTo);
        }
        
        const trainings = await Training.find(query).limit(20);
        res.json(trainings);
    } catch (err) {
        next(err);
    }
};

// Obtener estadísticas de entrenamientos
exports.getTrainingStats = async (req, res, next) => {
    try {
        const userId = req.user.id;
        
        const [
            totalTrainings,
            completedTrainings,
            totalCalories,
            typeStats,
            avgDuration
        ] = await Promise.all([
            Training.countDocuments({ createdBy: userId }),
            Training.countDocuments({ createdBy: userId, isCompleted: true }),
            Training.aggregate([
                { $match: { createdBy: mongoose.Types.ObjectId(userId) } },
                { $group: { _id: null, total: { $sum: '$calories' } } }
            ]),
            Training.aggregate([
                { $match: { createdBy: mongoose.Types.ObjectId(userId) } },
                { $group: { _id: '$type', count: { $sum: 1 } } }
            ]),
            Training.aggregate([
                { $match: { createdBy: mongoose.Types.ObjectId(userId) } },
                { $group: { _id: null, avg: { $avg: '$duration' } } }
            ])
        ]);
        
        res.json({
            totalTrainings,
            completedTrainings,
            pendingTrainings: totalTrainings - completedTrainings,
            totalCalories: totalCalories[0]?.total || 0,
            avgDuration: Math.round(avgDuration[0]?.avg || 0),
            typeStats
        });
    } catch (err) {
        next(err);
    }
};

// Obtener entrenamientos por cliente
exports.getTrainingsByClient = async (req, res, next) => {
    try {
        const { clientName } = req.params;
        const trainings = await Training.find({ 
            clientName: { $regex: clientName, $options: 'i' },
            createdBy: req.user.id
        }).sort({ date: -1 });
        
        res.json(trainings);
    } catch (err) {
        next(err);
    }
};
