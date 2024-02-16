import logger from "./Logger";

export function initMiddleware(middleware) {
    return (req, res) =>
        new Promise((resolve, reject) => {
            middleware(req, res, (result) => {
                if (result instanceof Error) {
                    logger("error", "There was an error, request rejected");
                    return reject(result);
                }
                return resolve(result);
            });
        });
}

export function validateMiddleware(validations, validationResult) {
    return async (req, res, next) => {
        await Promise.all(validations.map((validation) => validation.run(req)));

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }

        logger("info", JSON.stringify(errors));

        res.status(422).json({ errors: errors.array() });
    };
}
