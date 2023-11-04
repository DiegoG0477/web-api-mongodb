require('dotenv').config();
require('../configs/db.config');
const bcrypt = require('bcrypt');
const saltosBcrypt = parseInt(process.env.BCRYPT_SALT);

const User = require('../models/user.model');
const mongoose = require('mongoose');

const usuarios = [
    { nombre: "nombre1", apellido_pat:"apellido_pat1", apellido_mat:"apellido_mat1", email: "email1@gmail.com", password: bcrypt.hashSync('1234', saltosBcrypt) },
    { nombre: "nombre2", apellido_pat:"apellido_pat2", apellido_mat:"apellido_mat2", email: "email2@gmail.com", password: bcrypt.hashSync('1234', saltosBcrypt) },
    { nombre: "nombre3", apellido_pat:"apellido_pat3", apellido_mat:"apellido_mat3", email: "email3@gmail.com", password: bcrypt.hashSync('1234', saltosBcrypt) },
    { nombre: "nombre4", apellido_pat:"apellido_pat4", apellido_mat:"apellido_mat4", email: "email4@gmail.com", password: bcrypt.hashSync('1234', saltosBcrypt) },
    { nombre: "nombre5", apellido_pat:"apellido_pat5", apellido_mat:"apellido_mat5", email: "email5@gmail.com", password: bcrypt.hashSync('1234', saltosBcrypt) },
    { nombre: "nombre6", apellido_pat:"apellido_pat6", apellido_mat:"apellido_mat6", email: "email6@gmail.com", password: bcrypt.hashSync('1234', saltosBcrypt) },
    { nombre: "nombre7", apellido_pat:"apellido_pat7", apellido_mat:"apellido_mat7", email: "email7@gmail.com", password: bcrypt.hashSync('1234', saltosBcrypt) },
    { nombre: "nombre8", apellido_pat:"apellido_pat8", apellido_mat:"apellido_mat8", email: "email8@gmail.com", password: bcrypt.hashSync('1234', saltosBcrypt) },
    { nombre: "nombre9", apellido_pat:"apellido_pat9", apellido_mat:"apellido_mat9", email: "email9@gmail.com", password: bcrypt.hashSync('1234', saltosBcrypt) },
    { nombre: "nombre10", apellido_pat:"apellido_pat10", apellido_mat:"apellido_mat10", email: "email10@gmail.com", password: bcrypt.hashSync('1234', saltosBcrypt)},
];

User.deleteMany({})
    .then(() => {
        return User.insertMany(usuarios);
    })
    .then(() => {
        console.log("usuarios creados");
        mongoose.connection.close();
    })
    .catch((error) => {
        console.log(error);
        mongoose.connection.close();
    });