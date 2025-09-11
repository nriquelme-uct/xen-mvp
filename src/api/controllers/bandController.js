const Band = require('../models/Band');
const Idol = require('../models/Idol');
const Company = require('../models/Company');

// Crear una nueva banda
exports.createBand = async (req, res, next) => {
    try {
        const band = new Band(req.body);
        await band.save();
        
        // Populate company info
        await band.populate('companyId');
        
        res.status(201).json(band);
    } catch (err) {
        next(err);
    }
};

// Obtener todas las bandas
exports.getBands = async (req, res, next) => {
    try {
        const { page = 1, limit = 10, companyId, isActive, genre } = req.query;
        
        let query = {};
        if (companyId) query.companyId = companyId;
        if (isActive !== undefined) query.isActive = isActive === 'true';
        if (genre) query.genre = { $regex: genre, $options: 'i' };
        
        const bands = await Band.find(query)
            .populate('companyId', 'name koreanName')
            .populate('members', 'name stageName position')
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 });
            
        const total = await Band.countDocuments(query);
        
        res.json({
            bands,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            total
        });
    } catch (err) {
        next(err);
    }
};

// Obtener una banda por ID
exports.getBandById = async (req, res, next) => {
    try {
        const band = await Band.findById(req.params.id)
            .populate('companyId')
            .populate('members');
            
        if (!band) return res.status(404).json({ error: 'Banda no encontrada' });
        res.json(band);
    } catch (err) {
        next(err);
    }
};

// Actualizar una banda
exports.updateBand = async (req, res, next) => {
    try {
        const band = await Band.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true }
        ).populate(['companyId', 'members']);
        
        if (!band) return res.status(404).json({ error: 'Banda no encontrada' });
        res.json(band);
    } catch (err) {
        next(err);
    }
};

// Eliminar una banda
exports.deleteBand = async (req, res, next) => {
    try {
        const band = await Band.findByIdAndDelete(req.params.id);
        if (!band) return res.status(404).json({ error: 'Banda no encontrada' });
        res.json({ message: 'Banda eliminada exitosamente' });
    } catch (err) {
        next(err);
    }
};

// Agregar miembro a una banda
exports.addMember = async (req, res, next) => {
    try {
        const { idolId } = req.body;
        const band = await Band.findById(req.params.id);
        
        if (!band) return res.status(404).json({ error: 'Banda no encontrada' });
        
        // Verificar que el ídolo existe
        const idol = await Idol.findById(idolId);
        if (!idol) return res.status(404).json({ error: 'Ídolo no encontrado' });
        
        // Agregar a la lista de miembros si no está ya
        if (!band.members.includes(idolId)) {
            band.members.push(idolId);
            band.totalMembers = band.members.length;
            await band.save();
        }
        
        await band.populate(['companyId', 'members']);
        res.json(band);
    } catch (err) {
        next(err);
    }
};

// Remover miembro de una banda
exports.removeMember = async (req, res, next) => {
    try {
        const { idolId } = req.params;
        const band = await Band.findById(req.params.id);
        
        if (!band) return res.status(404).json({ error: 'Banda no encontrada' });
        
        band.members = band.members.filter(member => member.toString() !== idolId);
        band.totalMembers = band.members.length;
        await band.save();
        
        await band.populate(['companyId', 'members']);
        res.json(band);
    } catch (err) {
        next(err);
    }
};

// Buscar bandas por nombre
exports.searchBands = async (req, res, next) => {
    try {
        const { q } = req.query;
        if (!q) return res.status(400).json({ error: 'Término de búsqueda requerido' });
        
        const bands = await Band.find({
            $or: [
                { name: { $regex: q, $options: 'i' } },
                { koreanName: { $regex: q, $options: 'i' } },
                { englishName: { $regex: q, $options: 'i' } },
                { fandomName: { $regex: q, $options: 'i' } }
            ]
        }).populate(['companyId', 'members']);
        
        res.json(bands);
    } catch (err) {
        next(err);
    }
}; 