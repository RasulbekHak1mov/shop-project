const express = require('express')
const mongoose = require('mongoose');
const flash = require(`connect-flash`)
const session = require(`express-session`)
const cookieParser = require('cookie-parser');
const varMidddleware = require('./middleware/var.js')
const app = express()
const { create } = require(`express-handlebars`)
const dotenv = require('dotenv');
dotenv.config();

const AuthRouter = require('./routes/auth.js')
const ProductsRouter = require('./routes/products.js');


const hbs = create({ defaultLayout: 'main', extname: 'hbs' })
app.engine(`hbs`, hbs.engine)
app.set('view engine', 'hbs')
app.set('views', './views')


app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
app.use(varMidddleware)
// app.use(express.cookieParser('keyboard cat'))
// app.use(express.session({ cookie: { maxAge: 60000 } }))
app.use(session({secret: 'KH', resave: false, saveUninitialized: false}))
app.use(flash())

app.use(AuthRouter)
app.use(ProductsRouter)

function startApp() {
    try {
        mongoose.connect(process.env.MONGO_URI)
        const PORT = process.env.PORT || 5500
        app.listen(PORT, () => {
            console.log(`Server is running on port: ${PORT}`)
        })
    } catch (error) {
        console.log(error);
    }

}
startApp()