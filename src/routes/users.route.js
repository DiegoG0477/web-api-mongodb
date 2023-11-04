const express = require('express');
const usuariosController = require('../controllers/users.controller');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/', authMiddleware.verificarJWT, usuariosController.index);
router.get('/:id', authMiddleware.verificarJWT, usuariosController.getById);
router.delete('/:id', authMiddleware.verificarJWT, usuariosController.delete);
router.patch('/user/:id', authMiddleware.verificarJWT, usuariosController.update);
router.put('/user/:id', authMiddleware.verificarJWT, usuariosController.completeUpdate);

module.exports = router;