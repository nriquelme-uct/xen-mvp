const Company = require('../models/Company');
const Band = require('../models/Band');
const Idol = require('../models/Idol');

// Crear una nueva empresa
exports.createCompany = async (req, res, next) => {
    try {
        const company = new Company(req.body);
        await company.save();
        res.status(201).json(company);
    } catch (err) {
        next(err);
    }
};

// Obtener todas las empresas
exports.getCompanies = async (req, res, next) => {
    try {
        const { page = 1, limit = 10, isActive, country } = req.query;
        
        let query = {};
        if (isActive !== undefined) query.isActive = isActive === 'true';
        if (country) query.country = { $regex: country, $options: 'i' };
        
        const companies = await Company.find(query)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 });
            
        const total = await Company.countDocuments(query);
        
        res.json({
            companies,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            total
        });
    } catch (err) {
        next(err);
    }
};

// Obtener una empresa por ID
exports.getCompanyById = async (req, res, next) => {
    try {
        const company = await Company.findById(req.params.id);
        if (!company) return res.status(404).json({ error: 'Empresa no encontrada' });
        res.json(company);
    } catch (err) {
        next(err);
    }
};

// Actualizar una empresa
exports.updateCompany = async (req, res, next) => {
    try {
        const company = await Company.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true }
        );
        
        if (!company) return res.status(404).json({ error: 'Empresa no encontrada' });
        res.json(company);
    } catch (err) {
        next(err);
    }
};

// Eliminar una empresa
exports.deleteCompany = async (req, res, next) => {
    try {
        const company = await Company.findByIdAndDelete(req.params.id);
        if (!company) return res.status(404).json({ error: 'Empresa no encontrada' });
        res.json({ message: 'Empresa eliminada exitosamente' });
    } catch (err) {
        next(err);
    }
};

// Obtener bandas de una empresa
exports.getCompanyBands = async (req, res, next) => {
    try {
        const bands = await Band.find({ companyId: req.params.id })
            .populate('members', 'name stageName position');
        res.json(bands);
    } catch (err) {
        next(err);
    }
};

// Obtener ídolos de una empresa
exports.getCompanyIdols = async (req, res, next) => {
    try {
        const idols = await Idol.find({ companyId: req.params.id })
            .populate('bandId', 'name koreanName');
        res.json(idols);
    } catch (err) {
        next(err);
    }
};

// Obtener estadísticas de una empresa
exports.getCompanyStats = async (req, res, next) => {
    try {
        const companyId = req.params.id;
        
        const [totalBands, totalIdols, activeBands, activeIdols] = await Promise.all([
            Band.countDocuments({ companyId }),
            Idol.countDocuments({ companyId }),
            Band.countDocuments({ companyId, isActive: true }),
            Idol.countDocuments({ companyId, isActive: true })
        ]);
        
        res.json({
            totalBands,
            totalIdols,
            activeBands,
            activeIdols,
            inactiveBands: totalBands - activeBands,
            inactiveIdols: totalIdols - activeIdols
        });
    } catch (err) {
        next(err);
    }
};

// Buscar empresas por nombre
exports.searchCompanies = async (req, res, next) => {
    try {
        const { q } = req.query;
        if (!q) return res.status(400).json({ error: 'Término de búsqueda requerido' });
        
        const companies = await Company.find({
            $or: [
                { name: { $regex: q, $options: 'i' } },
                { koreanName: { $regex: q, $options: 'i' } },
                { englishName: { $regex: q, $options: 'i' } },
                { ceo: { $regex: q, $options: 'i' } }
            ]
        });
        
        res.json(companies);
    } catch (err) {
        next(err);
    }
}; 