const yup = require('yup');

const Gender = {
    MALE: 'MALE',
    FEMALE: 'FEMALE',
};

const passwordRegex = /^[a-zA-Z0-9]{8,}$/;

const userRegistrationSchema = yup.object({
    username: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().matches(passwordRegex, 'Password must contain only letters and numbers with a minimum of 8 characters').required(),
    gender: yup.string().oneOf([Gender.MALE, Gender.FEMALE]).required(),
    phone: yup.string().optional(),
});

const userLoginSchema = yup.object({
    username: yup.string().required(),
    password: yup.string().matches(passwordRegex, 'Password must contain only letters and numbers with a minimum of 8 characters').required(),
});

const resetPasswordSchema = yup.object({
    username: yup.string().required(),
    password: yup.string().required(),
    newPassword: yup.string().required(),
    confirmationNewPassword: yup.string().oneOf([yup.ref('newPassword')], 'Password does not match').required(),
});

const userUpdateSchema = yup.object({
    id: yup.string().required(),
    username: yup.string().required(),
    email: yup.string().email().required(),
    gender: yup.string().oneOf([Gender.MALE, Gender.FEMALE]).required(),
    phone: yup.string().required(),
});

const authHeaderSchema = yup.object({
    authorization: yup.string().required(),
});

module.exports = {
    userRegistrationSchema, userLoginSchema, resetPasswordSchema, userUpdateSchema, authHeaderSchema
};