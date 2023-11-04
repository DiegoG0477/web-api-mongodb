const UserModel = require('../models/user.model');

const index = async (req, res) => {
    try {
        console.log(req._id);
        const { page, limit } = req.query;
        const skip = (page - 1) * limit;
        const users = await UserModel.find({ deleted: false }).skip(skip).limit(limit);

        let response = {
            message: "se obtuvieron correctamente los usuarios",
            data: users
        }

        if (page && limit) {
            const totalUsers = await UserModel.countDocuments({ deleted: false });
            const totalPages = Math.ceil(totalUsers / limit);

            response = {
                ...response,
                total: totalUsers,
                totalPages,
            }
        }

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            message: "ocurrió un error al obtener los usuarios",
            error: error.message
        })
    }
}


const getById = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "usuario no encontrado"
            });
        }

        return res.status(200).json({
            message: "se obtuvo el usuario correctamente",
            data:user,
        });
    } catch (error) {
        return res.status(500).json({
            message: "ocurrió un error al obtener el usuario",
            error: error.message
        })
    }
}

// /usuario/:id
const update = async (req, res) => {
    try {
        const userId = req.params.id;
        const updatedData = {
            ...req.body,
            updated_at: new Date()
        };

        const updatedUser = await UserModel.findByIdAndUpdate(userId, updatedData);

        if (!updatedUser) {
            return res.status(404).json({
                message: "usuario no encontrado"
            });
        }

        return res.status(200).json({
            message: "usuario actualizado exitosamente"
        });

    } catch (error) {
        return res.status(500).json({
            mensaje: "no se pudo actualizar el usuario",
            error: error.message
        });
    }
}

const completeUpdate = async (req, res) => {
    try {
        const userId = req.params.id;
        const updatedData = {
            nombre: req.body.nombre || null,
            email: req.body.email || null,
            password: req.body.password || null,
            updated_at: new Date()
        }

        const updatedUser = await UserModel.findByIdAndUpdate(userId, updatedData);

        if (!updatedUser) {
            return res.status(404).json({
                message: "usuario no encontrado"
            });
        }

        return res.status(200).json({
            message: "usuario actualizado exitosamente"
        });
    } catch (error) {
        return res.status(500).json({
            mensaje: "no se pudo actualizar el usuario",
            error: error.message
        });
    }
}

// usuarios/:id
const logicDelete = async (req, res) => {
    try {
        const userId = req.params.id;
        const deletedUser = await UserModel.findByIdAndUpdate(userId, { deleted: true, deleted_at: new Date() });

        if (!deletedUser) {
            return res.status(404).json({
                message: "usuario no encontrado"
            });
        }

        return res.status(200).json({
            message: "usuario eliminado exitosamente"
        });
    } catch (error) {
        return res.status(500).json({
            mensaje: "no se pudo eliminar el usuario",
            error: error.message
        });
    }
}

const physicDelete = async (req, res) => {
    try {
        const userId = req.params.id;
        const deletedUser = await usuarioModel.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({
                message: "usuario no encontrado"
            });
        }

        return res.status(200).json({
            message: "usuario eliminado exitosamente"
        });
    } catch (error) {
        return res.status(500).json({
            mensaje: "no se pudo eliminar el usuario",
            error: error.message
        });
    }
};

module.exports = {
    index,
    getById,
    delete: logicDelete,
    update,
    completeUpdate,
}