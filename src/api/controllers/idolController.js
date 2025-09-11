const Idol = require('../models/Idol');
const Band = require('../models/Band');
const Company = require('../models/Company');

// Crear un nuevo ídolo
exports.createIdol = async (req, res, next) => {
    try {
        const idol = new Idol(req.body);
        await idol.save();
        
        // Populate band y company info
        await idol.populate(['bandId', 'companyId']);
        
        res.status(201).json(idol);
    } catch (err) {
        next(err);
    }
};

// Obtener todos los ídolos
exports.getIdols = async (req, res, next) => {
    try {
        const { page = 1, limit = 10, bandId, companyId, isActive } = req.query;
        
        let query = {};
        if (bandId) query.bandId = bandId;
        if (companyId) query.companyId = companyId;
        if (isActive !== undefined) query.isActive = isActive === 'true';
        
        const idols = await Idol.find(query)
            .populate('bandId', 'name koreanName')
            .populate('companyId', 'name koreanName')
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 });
            
        const total = await Idol.countDocuments(query);
        
        res.json({
            idols,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            total
        });
    } catch (err) {
        next(err);
    }
};

// Obtener un ídolo por ID
exports.getIdolById = async (req, res, next) => {
    try {
        const idol = await Idol.findById(req.params.id)
            .populate('bandId')
            .populate('companyId');
            
        if (!idol) return res.status(404).json({ error: 'Ídolo no encontrado' });
        res.json(idol);
    } catch (err) {
        next(err);
    }
};

// Actualizar un ídolo
exports.updateIdol = async (req, res, next) => {
    try {
        const idol = await Idol.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true }
        ).populate(['bandId', 'companyId']);
        
        if (!idol) return res.status(404).json({ error: 'Ídolo no encontrado' });
        res.json(idol);
    } catch (err) {
        next(err);
    }
};

// Eliminar un ídolo
exports.deleteIdol = async (req, res, next) => {
    try {
        const idol = await Idol.findByIdAndDelete(req.params.id);
        if (!idol) return res.status(404).json({ error: 'Ídolo no encontrado' });
        res.json({ message: 'Ídolo eliminado exitosamente' });
    } catch (err) {
        next(err);
    }
};

// Buscar ídolos por nombre
exports.searchIdols = async (req, res, next) => {
    try {
        const { q } = req.query;
        if (!q) return res.status(400).json({ error: 'Término de búsqueda requerido' });
        
        const idols = await Idol.find({
            $or: [
                { name: { $regex: q, $options: 'i' } },
                { stageName: { $regex: q, $options: 'i' } },
                { realName: { $regex: q, $options: 'i' } }
            ]
        }).populate(['bandId', 'companyId']);
        
        res.json(idols);
    } catch (err) {
        next(err);
    }
}; 