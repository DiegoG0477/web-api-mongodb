const express = require('express');
const usuariosController = require('../controllers/users.controller');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/', authMiddleware.verificarJWT, usuariosController.index);
router.get('/:id', authMiddleware.verificarJWT, usuariosController.getById);
router.delete('/:id', authMiddleware.verificarJWT, usuariosController.delete);
// router.patch('/:id', authMiddleware.verificarJWT, usuariosController.updateParcial);
// router.put('/:id', authMiddleware.verificarJWT, usuariosController.updateCompleto);

module.exports = router;