const Food = require('../models/Food');

// Crear un nuevo alimento
exports.createFood = async (req, res, next) => {
    try {
        const foodData = {
            ...req.body,
            createdBy: req.user.id
        };
        const food = new Food(foodData);
        await food.save();
        res.status(201).json(food);
    } catch (err) {
        next(err);
    }
};

// Obtener todos los alimentos
exports.getFoods = async (req, res, next) => {
    try {
        const { 
            page = 1, 
            limit = 10, 
            category, 
            isActive, 
            search,
            minCalories,
            maxCalories,
            sortBy = 'createdAt',
            sortOrder = 'desc'
        } = req.query;
        
        let query = { createdBy: req.user.id };
        
        if (category) query.category = category;
        if (isActive !== undefined) query.isActive = isActive === 'true';
        if (minCalories || maxCalories) {
            query.calories = {};
            if (minCalories) query.calories.$gte = parseInt(minCalories);
            if (maxCalories) query.calories.$lte = parseInt(maxCalories);
        }
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { tags: { $in: [new RegExp(search, 'i')] } }
            ];
        }
        
        const sortOptions = {};
        sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;
        
        const foods = await Food.find(query)
            .sort(sortOptions)
            .limit(limit * 1)
            .skip((page - 1) * limit);
            
        const total = await Food.countDocuments(query);
        
        res.json({
            foods,
            totalPages: Math.ceil(total / limit),
            currentPage: parseInt(page),
            total
        });
    } catch (err) {
        next(err);
    }
};

// Obtener un alimento por ID
exports.getFoodById = async (req, res, next) => {
    try {
        const food = await Food.findOne({ 
            _id: req.params.id, 
            createdBy: req.user.id 
        });
        
        if (!food) return res.status(404).json({ error: 'Alimento no encontrado' });
        res.json(food);
    } catch (err) {
        next(err);
    }
};

// Actualizar un alimento
exports.updateFood = async (req, res, next) => {
    try {
        const food = await Food.findOneAndUpdate(
            { _id: req.params.id, createdBy: req.user.id },
            req.body,
            { new: true, runValidators: true }
        );
        
        if (!food) return res.status(404).json({ error: 'Alimento no encontrado' });
        res.json(food);
    } catch (err) {
        next(err);
    }
};

// Eliminar un alimento
exports.deleteFood = async (req, res, next) => {
    try {
        const food = await Food.findOneAndDelete({ 
            _id: req.params.id, 
            createdBy: req.user.id 
        });
        
        if (!food) return res.status(404).json({ error: 'Alimento no encontrado' });
        res.json({ message: 'Alimento eliminado exitosamente' });
    } catch (err) {
        next(err);
    }
};

// Buscar alimentos
exports.searchFoods = async (req, res, next) => {
    try {
        const { q, category, minCalories, maxCalories } = req.query;
        
        if (!q) return res.status(400).json({ error: 'Término de búsqueda requerido' });
        
        let query = { 
            createdBy: req.user.id,
            $or: [
                { name: { $regex: q, $options: 'i' } },
                { description: { $regex: q, $options: 'i' } },
                { tags: { $in: [new RegExp(q, 'i')] } }
            ]
        };
        
        if (category) query.category = category;
        if (minCalories || maxCalories) {
            query.calories = {};
            if (minCalories) query.calories.$gte = parseInt(minCalories);
            if (maxCalories) query.calories.$lte = parseInt(maxCalories);
        }
        
        const foods = await Food.find(query).limit(20);
        res.json(foods);
    } catch (err) {
        next(err);
    }
};

// Obtener estadísticas de alimentos
exports.getFoodStats = async (req, res, next) => {
    try {
        const userId = req.user.id;
        
        const [
            totalFoods,
            totalCalories,
            categoryStats,
            avgCalories
        ] = await Promise.all([
            Food.countDocuments({ createdBy: userId }),
            Food.aggregate([
                { $match: { createdBy: mongoose.Types.ObjectId(userId) } },
                { $group: { _id: null, total: { $sum: '$calories' } } }
            ]),
            Food.aggregate([
                { $match: { createdBy: mongoose.Types.ObjectId(userId) } },
                { $group: { _id: '$category', count: { $sum: 1 } } }
            ]),
            Food.aggregate([
                { $match: { createdBy: mongoose.Types.ObjectId(userId) } },
                { $group: { _id: null, avg: { $avg: '$calories' } } }
            ])
        ]);
        
        res.json({
            totalFoods,
            totalCalories: totalCalories[0]?.total || 0,
            avgCalories: Math.round(avgCalories[0]?.avg || 0),
            categoryStats
        });
    } catch (err) {
        next(err);
    }
};

// Obtener alimentos por categoría
exports.getFoodsByCategory = async (req, res, next) => {
    try {
        const { category } = req.params;
        const foods = await Food.find({ 
            category, 
            createdBy: req.user.id,
            isActive: true 
        }).sort({ name: 1 });
        
        res.json(foods);
    } catch (err) {
        next(err);
    }
};
