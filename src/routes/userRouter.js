const { Router } = require('express');
const multer = require("multer");
const uploadConfig = require("../config/upload");
const { createUserController, uploadPhotographController, getAllUsersController, getUserController, updateUserControler, removeUserController } = require('../controllers/userController');

const UserRouter = Router()

const upload = multer(uploadConfig)

UserRouter.post('/', createUserController) // Criar um novo usuário
UserRouter.get('/:id', getUserController) // Buscar um usuário
UserRouter.put('/:id', updateUserControler) // Editar um usuário
UserRouter.delete('/:id', removeUserController) // Remover um usuário
UserRouter.patch('/:id', upload.single('photograph'), uploadPhotographController) // atualizar a foto do usuário
UserRouter.get('/', getAllUsersController) // Buscar todos os usuário

module.exports = { UserRouter }