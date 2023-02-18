import express from 'express'
import handlebars from 'express-handlebars'
import __dirname from './utils.js'
import {
    Server
} from 'socket.io'
import productsRouter from './routes/api/products.router.js'
import viewsRouter from './routes/web/views.router.js'

const app = express()
app.use(express.static(`${__dirname}/public`))

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.engine('handlebars', handlebars.engine())
app.set('views', `${__dirname}/views`)
app.set('view engine', 'handlebars')

app.use('/realtimeproducts', viewsRouter)
app.use('/api/products', productsRouter);

const server = app.listen(8080, () => console.log('Listening server on port 8080'))

const io = new Server(server)

app.set('socketio', io);