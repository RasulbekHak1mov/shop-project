const express = require('express')
const app = express()
const { create } = require(`express-handlebars`)

const AuthRouter = require('./routes/auth.js')
const ProductsRouter = require('./routes/products.js')


const hbs = create({ defaultLayout: 'main', extname: 'hbs' })
app.engine(`hbs`, hbs.engine)
app.set('view engine', 'hbs')
app.set('views', './views')

app.use(AuthRouter)
app.use(ProductsRouter)

const PORT = process.env.PORT || 9000
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
    console.log(`http://127.0.0.1:${PORT}/`)
})