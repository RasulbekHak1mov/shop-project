const { Router } = require('express')
const router = Router()


router.get(`/login`, (req, res) => {
    res.render('login', {
        title: "Login page",
        isLogin : true,
    })
})
router.get(`/register`, (req, res) => {
    res.render('register', {
        title: "Register page",
        isRegister: true,
    })
})

module.exports = router;