const usersRouters = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouters.post('/', async (request, response) => {
    const { username, name, password } = request.body

    if(!password || password.length < 3) {
        return response.status(400).json({ error: 'password is required' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
})

usersRouters.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', {title: 1, author: 1, url: 1})
    response.json(users)
})

module.exports = usersRouters