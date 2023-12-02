const { Router } = require('express')
const bcrypt = require('bcrypt')
const router = Router()
const User = require(`../models/User.js`)

router.get(`/login`, (req, res) => {
    res.render('login', {
        title: "Login page",
        isLogin: true,
        loginError: req.flash('loginError')
    })
})
router.get(`/register`, (req, res) => {
    res.render('register', {
        title: "Register page",
        isRegister: true,
        registerError: 'Error'
    })
})
router.post('/login', async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        req.flash('loginError', 'All fields is required')
        res.redirect('/login')
    }


    const existUser = await User.findOne({ email })
    if (!existUser) {
        console.log('User not found')
        return
    }

    const isPassEqual = await bcrypt.compare(password, existUser.password)
    if (!isPassEqual) {
        console.log('Wrong password')
        return
    }
    console.log(existUser);
    res.redirect('/')
})
router.post('/register', async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const userData = {
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        email: req.body.email,
        password: hashedPassword,
    }
    const user = await User.create(userData)
    res.redirect('/')
})

module.exports = router