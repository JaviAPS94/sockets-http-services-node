import {
    Router
} from 'express'

import ProductManager from '../../manager/ProductManager.js';

const router = Router()
const productManager = new ProductManager();

router.get('/', async (req, res) => { 
    res.render('realTimeProducts', { products: productManager.listarAll() });
});

export default router;