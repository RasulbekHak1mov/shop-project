const { Router } = require('express')
const Product = require('../models/Product.js')
const authMiddleware = require('../middleware/auth.js')
const userMiddleware = require('../middleware/user.js')
const router = Router()


router.get(`/`, async (req, res) => {
    const products = await Product.find().lean()
    res.render('index', {
        title: "Boom Shop",
        products: products.reverse(),
        userId: req.userId ? req.userId.toString() : null,
    })
})

router.get(`/products`, async (req, res) => {
    const user = req.userId ? req.userId.toString() : null;
    const myProducts = await Product.find({ user }).populate(`user`).lean()
    res.render('products', {
        title: "Products",
        isProducts: true,
        myProducts: myProducts,
    })
})
router.get('/product/:id', async (req, res) => {
    const id = req.params.id
    const product = await Product.findById(id).populate('user').lean()

    res.render('product', {
        product: product,
    })

})
router.get(`/add`, authMiddleware, (req, res) => {
    res.render('add', {
        title: "Add products",
        isAdd: true,
        errorAddProducts: req.flash('errorAddProducts')
    })
})

router.post('/add-products', userMiddleware, async (req, res) => {
    const { title, description, image, price } = req.body
    if (!title || !description || !image || !price) {
        req.flash('errorAddProducts', 'All feilds is required')
        res.redirect('/add')
        return
    }


    await Product.create({ ...req.body, user: req.userId })
    res.redirect('/')
})

module.exports = router;