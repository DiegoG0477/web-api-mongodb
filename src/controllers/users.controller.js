const UserModel = require('../models/user.model');

const index = async (req, res) => {
    try {
        const { page, limit } = req.query;
        const skip = (page - 1) * limit;
        const users = await UserModel.find({ deleted: false }).skip(skip).limit(limit);

        let response = {
            message: "se obtuvieron correctamente los usuarios",
            data: users
        }

        if (page && limit) {
            const totalUsuarios = await UserModel.countDocuments({ deleted: false });
            const totalPages = Math.ceil(totalUsuarios / limit);

            response = {
                ...response,
                total: totalUsuarios,
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

// /usuarios/:id
const getById = async (req, res) => {
    try {
        const usuarioId = req.params.id;
        const usuario = await UserModel.findById(usuarioId);

        if (!usuario) {
            return res.status(404).json({
                message: "usuario no encontrado"
            });
        }

        return res.status(200).json({
            message: "se obtuvo el usuario correctamente",
            usuario,
        });
    } catch (error) {
        return res.status(500).json({
            message: "ocurrió un error al obtener el usuario",
            error: error.message
        })
    }
}

// /usuario/:id
const updateParcial = async (req, res) => {
    try {
        const usuarioId = req.params.id;
        const datosActualizar = {
            ...req.body,
            updated_at: new Date()
        };

        const usuarioActualizado = await UserModel.findByIdAndUpdate(usuarioId, datosActualizar);

        if (!usuarioActualizado) {
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

const updateCompleto = async (req, res) => {
    try {
        const usuarioId = req.params.id;
        const datosActualizar = {
            nombre: req.body.nombre || null,
            email: req.body.email || null,
            password: req.body.password || null,
            updated_at: new Date()
        }

        const usuarioActualizado = await UserModel.findByIdAndUpdate(usuarioId, datosActualizar);

        if (!usuarioActualizado) {
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
const deleteLogico = async (req, res) => {
    try {
        const usuarioId = req.params.id;
        const usuarioEliminado = await UserModel.findByIdAndUpdate(usuarioId, { deleted: true, deleted_at: new Date() });

        if (!usuarioEliminado) {
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

module.exports = {
    index,
    getById,
    create,
    delete: deleteLogico,
    updateParcial,
    updateCompleto,
}