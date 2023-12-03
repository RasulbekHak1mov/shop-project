const { Router } = require('express')
const router = Router()


router.get(`/`, (req, res) => {
    res.render('index', {
        title: "Main page",
    })
})

router.get(`/products`, (req, res) => {
    res.render('products', {
        title: "Products",
        isProducts: true,
    })
})

router.get(`/add`, (req, res) => {
    res.render('add', {
        title: "Add products",
        isAdd: true
    })
})

router.post('/add-products', (req, res) => {
    console.log(req.body)
    res.redirect('/')
})

module.exports = router;