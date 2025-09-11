const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
exports.register = async (req, res, next) => {
try 
{
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: 'Usuario registrado' });
}
catch (err) 
{
    if (err.code === 11000) return res.status(400).json({ error: 'Usuario ya existe'
    });
    next(err);
}
};

exports.login = async (req, res, next) => {
try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: 'Usuario no encontrado' });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ error: 'Contraseña incorrecta' });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h'
    });
    res.json({ token, user: { id: user._id, username: user.username } });
} catch (err) {
    next(err);
}
};