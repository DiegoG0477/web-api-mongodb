const jwt = require("jsonwebtoken");
const secretJWT = process.env.SECRET_JWT;

const verificarJWT = (req, res, next) => {
    try {
        const token = req.headers["x-access-token"];
        jwt.verify(token, secretJWT, (err, decode) => {
            if (err) {
                return res.status(401).json({
                    message: "error al validar token",
                    error: err.message,
                });
            }

            req._id = decode._id;
            next();
        });
    } catch (error) {
        return res.status(401).json({
            message: "error al validar token",
            error: error.message,
        });
    }
};

module.exports = {
    verificarJWT,
};
