const { validationResult } = require("express-validator");

const catchValidationError = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        let mappedErrors = errors.array();

        mappedErrors = mappedErrors.map((item) => {
            return {
                param: item?.param,
                title: item.msg,
                detail: item.msg,
            };
        });

        return res.status(422).json({
            success: false,
            errors: mappedErrors,
            msg: "Validation Error",
        });
    }
    return next();
};
module.exports = { catchValidationError };
