const userR = require('express').Router()
const controller = require('../controllers/usersControllers')

userR.get('/', controller.userGet)

userR.post('/', controller.userPost)

userR.put('/:id', controller.userPut)

userR.delete('/:id', controller.userDelete)

module.exports = userR
