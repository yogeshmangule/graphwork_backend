import bcrypt from 'bcrypt';

// Middleware para hashear la contraseña antes de almacenarla
export const hashPasswordMiddleware = async (req, res, next) => {
    if (req.body.passwd) {
        try {
            const hashedPassword = await bcrypt.hash(req.body.passwd, 10);
            req.body.passwd = hashedPassword;
            next();
        } catch (error) {
            return res.status(500).json({ message: 'Error al hashear la contraseña' });
        }
    } else {
        next();
    }
};

// Middleware para comparar la contraseña durante la autenticación
export const comparePasswordMiddleware = async (candidatePassword, hashedPassword) => {
    try {
        const match = await bcrypt.compare(candidatePassword, hashedPassword);
        return match;
    } catch (error) {
        throw new Error('Error al comparar la contraseña');
    }
};
