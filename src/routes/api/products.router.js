import {
    Router
} from 'express'
import ProductManager from '../../manager/ProductManager.js'

const router = Router()
const productManager = new ProductManager();

router.post('/', async (req, res) => {
    await productManager.guardar(req.body);

    const io = req.app.get('socketio');
    io.emit("showProducts", await productManager.listarAll());

    res.send({
        status: 'success'
    })
})

router.delete('/:pid', async (req, res) => {
    await productManager.borrar(req.params.pid);

    const io = req.app.get('socketio');
    io.emit("showProducts", await productManager.listarAll());
    
    res.send({
        status: 'success'
    })
})


export default router