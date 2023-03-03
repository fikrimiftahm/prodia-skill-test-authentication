const { ValidationError } = require('yup');
const { userUpdateSchema, authHeaderSchema } = require('../validation/user');
const { getUserPassById } = require('../data/get');
const { updateUserData } = require('../data/update');
const { validatePass } = require('../hash/validatePass');
const { GenericError } = require('../exceptions/GenericError');

const updateUser = async (req, res) => {
    const { body, headers } = req;

    try {
        const header = authHeaderSchema.validateSync(headers, {
            abortEarly: false,
            stripUnknown: true,
        });

        const data = userUpdateSchema.validateSync(body, {
            abortEarly: false,
            stripUnknown: true,
        });

        const auth = Buffer.from(header.authorization, 'base64').toString();

        const username = auth.split(':')[0];
        const password = auth.split(':')[1];

        const getUserPassword = await getUserPassById(body.id);

        const validateResult = await validatePass(password, getUserPassword.password);

        const updateUser = await updateUserData(body.username, body.email, body.gender, body.phone, username);

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
    updateUser
};