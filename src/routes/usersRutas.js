const userR = require('express').Router()
const controller = require('../controllers/usersControllers')
const handleErrors = require('../middleware/handleErrors')

userR.get('/', controller.usersGet)

userR.get('/:id', controller.userGetById)

userR.post('/', controller.userPost)

userR.put('/:id', controller.userPut)

userR.delete('/:id', controller.userDelete)

userR.use(handleErrors)

module.exports = userR
