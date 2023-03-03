const { ValidationError } = require('yup');
const { userRegistrationSchema } = require('../validation/user');
const { hashPassword } = require('../hash/hashPassword');
const { saveToDb } = require('../data/store');
const { getUserId } = require('../data/get');
const { GenericError } = require('../exceptions/GenericError');

const registerUser = async (req, res) => {
    const { body } = req;

    try {
        const data = userRegistrationSchema.validateSync(body, {
            abortEarly: false,
            stripUnknown: true,
        });

        data.password = await hashPassword(data.password);

        const storeUser = await saveToDb(data);
        const userId = await getUserId(data.username);

        res.status(201);
        res.json({
            message: 'Success',
            data: {
                userId: userId
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
    registerUser
};