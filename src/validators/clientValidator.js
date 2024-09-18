const {body, param, query, validationResult } = require('express-validator');

const clientValidator = [
    body('nombre').notEmpty().withMessage('El nombre es requerido'),
    body('precio').notEmpty().withMessage('El precio es requerido'),
    query('precio_min').optional().isInt({ min: 0 }).withMessage('El precio mínimo debe ser un número positivo'),
    query('precio_max').optional().isInt({ min: 0 }).withMessage('El precio máximo debe ser un número positivo'),

    (req, res, next) => {
        const errors = validationResult(req).mapped()
        if (Object.keys(errors).length) {
            res.status(400).json(errors)
        }else {
            next()
        }
    }
];

module.exports = {
    clientValidator
};