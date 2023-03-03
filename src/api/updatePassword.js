const { ValidationError } = require('yup');
const { resetPasswordSchema } = require('../validation/user');
const { getUserPass } = require('../data/get');
const { updatePass } = require('../data/update');
const { validatePass } = require('../hash/validatePass');
const { hashPassword } = require('../hash/hashPassword');
const { GenericError } = require('../exceptions/GenericError');

const updatePassword = async (req, res) => {
    const { body } = req;

    try {
        const data = resetPasswordSchema.validateSync(body, {
            abortEarly: false,
            stripUnknown: true,
        });

        const getUserPassword = await getUserPass(data.username);

        const validateResult = await validatePass(data.password, getUserPassword.password);

        data.newPassword = await hashPassword(data.newPassword);

        const updatePassword = await updatePass(data.username, data.newPassword);

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
    updatePassword
};