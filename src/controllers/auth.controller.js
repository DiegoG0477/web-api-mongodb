const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcryptSalt = parseInt(process.env.BCRYPT_SALT);
const secretJWT = process.env.SECRET_JWT;

const login = async (req, res) => {
    try {
        const { email, password } = req.params;
        console.log(req.params);
        const userFound = await User.findOne({ email });

        if (!userFound) {
            return res.status(200).json({
                message: "email o contraseña incorrecta",
            });
        }

        const correctPassword = bcrypt.compareSync(
            password,
            userFound.password
        );

        if (!correctPassword) {
            return res.status(200).json({
                message: "email o contraseña incorrecta",
            });
        }

        const token = jwt.sign({ _id: userFound._id }, secretJWT, {
            expiresIn: "12h",
        });

        return res.status(200).json({
            message: "inicio de sesion correcto",
            token,
        });
    } catch (error) {
        return res.status(500).json({
            message: "error al intentar loguearse",
            error: error.message,
        });
    }
};

const signUp = async (req, res) => {
    try {
        const { email, password, nombre, apellido_pat, apellido_mat } =
            req.body;
        console.log(req.body);
        const encryptedPassword = bcrypt.hashSync(password, bcryptSalt);

        const userFound = await User.findOne({ email });

        if (userFound) {
            return res.status(200).json({
                message: "Error, el usuario ya existe en la base de datos",
            });
        }

        const user = new User({
            email,
            password: encryptedPassword,
            nombre,
            apellido_pat,
            apellido_mat,
        });

        const createdUser = await user.save();

        return res.status(201).json({
            message: "usuario creado exitosamente",
            createdUser,
        });
    } catch (error) {
        return res.status(500).json({
            message: "error al crear el usuario",
            error: error.message,
        });
    }
};

module.exports = {
    login,
    signUp,
};
