exports.userSignupValidator = (req, res, next) => {
    req.check('name', 'Nome é obrigatório').notEmpty();
    req.check('email', 'E-mail precisa ter de 3 à 32 caracteres')
        .matches(/.+\@.+\..+/)
        .withMessage('Email deve conter @')
        .isLength({
            min: 4,
            max: 32
        });
    req.check('password', 'Password é obrigatório').notEmpty();
    req.check('password')
        .isLength({ min: 6 })
        .withMessage('Password deve conter no mínimo 6 caracteres')
        .matches(/\d/)
        .withMessage('Password deve conter número');
    const errors = req.validationErrors();
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    next();
};
