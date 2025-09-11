const Client = require('../models/Client');
const Training = require('../models/Training');

// Crear un nuevo cliente
exports.createClient = async (req, res, next) => {
    try {
        const clientData = {
            ...req.body,
            createdBy: req.user.id
        };
        const client = new Client(clientData);
        await client.save();
        res.status(201).json(client);
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ error: 'El email ya está registrado' });
        }
        next(err);
    }
};

// Obtener todos los clientes
exports.getClients = async (req, res, next) => {
    try {
        const { 
            page = 1, 
            limit = 10, 
            isActive,
            fitnessLevel,
            search,
            sortBy = 'createdAt',
            sortOrder = 'desc'
        } = req.query;
        
        let query = { createdBy: req.user.id };
        
        if (isActive !== undefined) query.isActive = isActive === 'true';
        if (fitnessLevel) query.fitnessLevel = fitnessLevel;
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } }
            ];
        }
        
        const sortOptions = {};
        sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;
        
        const clients = await Client.find(query)
            .sort(sortOptions)
            .limit(limit * 1)
            .skip((page - 1) * limit);
            
        const total = await Client.countDocuments(query);
        
        res.json({
            clients,
            totalPages: Math.ceil(total / limit),
            currentPage: parseInt(page),
            total
        });
    } catch (err) {
        next(err);
    }
};

// Obtener un cliente por ID
exports.getClientById = async (req, res, next) => {
    try {
        const client = await Client.findOne({ 
            _id: req.params.id, 
            createdBy: req.user.id 
        });
        
        if (!client) return res.status(404).json({ error: 'Cliente no encontrado' });
        res.json(client);
    } catch (err) {
        next(err);
    }
};

// Actualizar un cliente
exports.updateClient = async (req, res, next) => {
    try {
        const client = await Client.findOneAndUpdate(
            { _id: req.params.id, createdBy: req.user.id },
            req.body,
            { new: true, runValidators: true }
        );
        
        if (!client) return res.status(404).json({ error: 'Cliente no encontrado' });
        res.json(client);
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ error: 'El email ya está registrado' });
        }
        next(err);
    }
};

// Eliminar un cliente
exports.deleteClient = async (req, res, next) => {
    try {
        const client = await Client.findOneAndDelete({ 
            _id: req.params.id, 
            createdBy: req.user.id 
        });
        
        if (!client) return res.status(404).json({ error: 'Cliente no encontrado' });
        res.json({ message: 'Cliente eliminado exitosamente' });
    } catch (err) {
        next(err);
    }
};

// Buscar clientes
exports.searchClients = async (req, res, next) => {
    try {
        const { q, fitnessLevel } = req.query;
        
        if (!q) return res.status(400).json({ error: 'Término de búsqueda requerido' });
        
        let query = { 
            createdBy: req.user.id,
            $or: [
                { name: { $regex: q, $options: 'i' } },
                { email: { $regex: q, $options: 'i' } }
            ]
        };
        
        if (fitnessLevel) query.fitnessLevel = fitnessLevel;
        
        const clients = await Client.find(query).limit(20);
        res.json(clients);
    } catch (err) {
        next(err);
    }
};

// Obtener estadísticas de clientes
exports.getClientStats = async (req, res, next) => {
    try {
        const userId = req.user.id;
        
        const [
            totalClients,
            activeClients,
            fitnessLevelStats,
            avgAge,
            avgSessions
        ] = await Promise.all([
            Client.countDocuments({ createdBy: userId }),
            Client.countDocuments({ createdBy: userId, isActive: true }),
            Client.aggregate([
                { $match: { createdBy: mongoose.Types.ObjectId(userId) } },
                { $group: { _id: '$fitnessLevel', count: { $sum: 1 } } }
            ]),
            Client.aggregate([
                { $match: { createdBy: mongoose.Types.ObjectId(userId) } },
                { $group: { _id: null, avg: { $avg: '$age' } } }
            ]),
            Client.aggregate([
                { $match: { createdBy: mongoose.Types.ObjectId(userId) } },
                { $group: { _id: null, avg: { $avg: '$totalSessions' } } }
            ])
        ]);
        
        res.json({
            totalClients,
            activeClients,
            inactiveClients: totalClients - activeClients,
            avgAge: Math.round(avgAge[0]?.avg || 0),
            avgSessions: Math.round(avgSessions[0]?.avg || 0),
            fitnessLevelStats
        });
    } catch (err) {
        next(err);
    }
};

// Obtener historial de entrenamientos de un cliente
exports.getClientTrainingHistory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const client = await Client.findOne({ 
            _id: id, 
            createdBy: req.user.id 
        });
        
        if (!client) return res.status(404).json({ error: 'Cliente no encontrado' });
        
        const trainings = await Training.find({ 
            clientName: client.name,
            createdBy: req.user.id
        }).sort({ date: -1 });
        
        res.json({
            client,
            trainings
        });
    } catch (err) {
        next(err);
    }
};
