const Joi = require("joi")

const validator = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(15).required().trim().pattern(new RegExp("[A-Za-z\s]+$")).messages({
            "string.empty": "The NAME field must be completed",
            "string.min": "The NAME field must be between 3 and 8 letters",
            "string.max": "The NAME field must be between 3 and 8 letters",
            "string.pattern.base": "Only letters are allowed in the NAME field. No spaces"
        }),
        lastName: Joi.string().min(3).max(15).required().pattern(new RegExp("[A-Za-z\s]+$")).trim().messages({
            "string.empty": "The LAST NAME field must be completed",
            "string.min": "The LAST NAME field must be between 3 and 8 letters",
            "string.max": "The LAST NAME field must be between 3 and 8 letters",
            "string.pattern.base": "Only letters are allowed in the LAST NAME field. No spaces"
        }),
        email: Joi.string().email().required().trim().messages({
            "string.empty": "The EMAIL field must be completed",
            "string.email": "The EMAIL field must be a valid email",
        }),
        password: Joi.string().required().messages({
            // .pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{4,15}$'))
            "string.empty": "The PASSWORD field must be completed",
            "string.pattern.base": "The password must be between 4 and 15 characters long. At least one uppercase, 1 lowercase, and 1 number. No spaces"
        }),
        photoUser: Joi.string().required().messages({
            // .pattern(new RegExp(".*\.(gif|jpe?g|bmp|png)$"))
            "string.empty": "The PHOTO field must be completed",
            "string.pattern.base": "Url of the image is not valid"
        }),
        country: Joi.string().required().messages({
            "string.empty": "You must select a country"
        }),
        google: Joi.boolean()
    })

    const valid = schema.validate(req.body, {abortEarly: false})
    if (!valid.error) {
        next()
    } else{
    res.json({success: false, errors: valid.error.details})
    }
    
}
module.exports = validator