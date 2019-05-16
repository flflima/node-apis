const express = require('express')
const router = express.Router();

router.get('/', (req, res) => {
    return res.send({message: 'OK GET'})
})
router.post('/', (req, res) => {
    return res.send({message: 'OK POST'})
})

module.exports = router;