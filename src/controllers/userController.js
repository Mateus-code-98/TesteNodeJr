const { uploadPhotographService, createUserService, getAllUsersService, getUserService, updateUserService, removeUserService } = require("../services/userService")

const createUserController = async (req, res, next) => {
    const { name, email, phone, birth } = req.body

    const newUser = await createUserService({ name, email, phone, birth })

    return res.json(newUser)
}

const getAllUsersController = async (req, res, next) => {
    const allUsers = await getAllUsersService()

    return res.json(allUsers)
}

const getUserController = async (req, res, next) => {
    const { id } = req.params

    const user = await getUserService({ id })

    return res.json(user)
}

const updateUserControler = async (req, res, next) => {
    const { id } = req.params
    const { name, email, phone, birth } = req.body

    const editedUser = await updateUserService({ id, name, email, phone, birth })

    return res.json(editedUser)
}

const removeUserController = async (req, res, next) => {
    const { id } = req.params

    const removedUser = await removeUserService({ id })

    return res.json(removedUser)
}

const uploadPhotographController = async (req, res, next) => {
    const { filename, path: caminho } = req.file
    const { id } = req.params

    const editedUser = await uploadPhotographService({ caminho, filename, id })

    return res.json(editedUser)
}

module.exports = { createUserController, uploadPhotographController, getAllUsersController, getUserController, updateUserControler, removeUserController }