const express = require('express')
const router = express.Router();

router.get('/', (req, res) => {
    return res.send({message: 'OK GET users'})
})
router.post('/', (req, res) => {
    return res.send({message: 'OK POST users'})
})
router.post('/create', (req, res) => {
    return res.send({message: 'Usuario criado com sucesso'})
})

module.exports = router;