const { User } = require("../database/models")
const { cloudinary } = require("./../config/storage")
const fs = require("fs");
const path = require("path");
const upload = require("../config/upload");
const AppError = require("../errors/AppError");

const createUserService = async ({ name, email, phone, birth }) => {
    const newUser = await User.create({ name, email, phone, birth })
    return newUser
}

const updateUserService = async ({ id, name, email, phone, birth }) => {
    const user = await getUserService({ id })

    user.name = name ? name : user.name
    user.email = email ? email : user.email
    user.phone = phone ? phone : user.phone
    user.birth = birth ? birth : user.birth

    await user.save()

    return user
}

const removeUserService = async ({ id }) => {
    const user = await getUserService({ id })
    await removePhotographOfFiles(user.photograph)
    await user.destroy()
    return user
}

const getUserService = async ({ id }) => {
    const user = await User.findByPk(id)
    if (!user) throw new AppError("Nenhum usuário cadastrado com esse 'id'", 400)
    return user
}

const getAllUsersService = async () => {
    const user = await User.findAll()
    return user
}

const uploadPhotographService = async ({ id, filename, caminho }) => {
    const user = await getUserService({ id })

    try {
        const uploadResponse = await cloudinary.uploader.upload(caminho, { folder: "photographs" });
        if (user.dataValues.photograph_public_id) await cloudinary.uploader.destroy(user.dataValues.photograph_public_id);

        if (user.photograph) {
            const linkArray = `${user.photograph}`.split('/files/')
            const userPhotographFilePath = path.join(upload.directory, linkArray.length > 1 ? linkArray[1] : "")
            await removePhotographOfFiles(userPhotographFilePath)
        }
        
        const userPhotographFilePath = path.join(upload.directory, filename)
        await removePhotographOfFiles(userPhotographFilePath)

        user.photograph = uploadResponse.url
        user.photograph_public_id = uploadResponse.public_id

    } catch (err) {
        // Se ocorrer um erro no upload da foto para o cloudinary nada acontece, o fluxo do programa continua e ele salvará a foto localmente

        if (user.photograph) {
            const linkArray = `${user.photograph}`.split('/files/')
            const userPhotographFilePath = path.join(upload.directory, linkArray.length > 1 ? linkArray[1] : "")
            await removePhotographOfFiles(userPhotographFilePath)
        }

        user.photograph = `${process.env.URL}/files/${filename}`
    }

    await user.save()

    return user
}

const removePhotographOfFiles = async (userPhotographFilePath) => {
    try {
        const userPhotographFileExists = await fs.promises.stat(userPhotographFilePath)
        if (userPhotographFileExists) await fs.promises.unlink(userPhotographFilePath)
    } catch (err) {

    }
}

module.exports = { createUserService, updateUserService, removeUserService, getUserService, getAllUsersService, uploadPhotographService }