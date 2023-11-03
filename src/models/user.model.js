const mongoose = require('mongoose');

const usuarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    nombre: {
        type: String,
        required: true,
    },
    apellio_pat: {
        type: String,
        required: true,
    },
    apellido_mat: {
        type: String,
        required: true,
    },
    deleted: {
        type: Boolean,
        required: false,
        default: false,
    },
});

module.exports = mongoose.model('Usuario', usuarioSchema);