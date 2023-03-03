const { ValidationError } = require('yup');
const { userLoginSchema } = require('../validation/user');
const { getUserPass } = require('../data/get');
const { validatePass } = require('../hash/validatePass');
const { GenericError } = require('../exceptions/GenericError');

const loginUser = async (req, res) => {
    const { body } = req;

    try {
        const data = userLoginSchema.validateSync(body, {
            abortEarly: false,
            stripUnknown: true,
        });

        const getUserPassword = await getUserPass(data.username);

        const validateResult = await validatePass(data.password, getUserPassword.password);

        res.status(200);
        res.json({
            message: 'Success',
            data: {
                userId: getUserPassword.id
            }
        })
    } catch (err) {
        if (err instanceof ValidationError) {
            res.status(400);
            res.json({
                message: 'Validation error',
                errors: err.errors
            });
        } else if (err instanceof GenericError) {
            res.status(err.statusCode);
            res.json({
                message: 'Failed',
                errors: err.message
            });
        } else {
            res.status(500);
            res.json({
                message: 'Server error',
                errors: err
            });
        }

        return res;
    }
};

module.exports = {
    loginUser
};