const express = require('express')
const router = express.Router();
const Users = require('../model/user')

router.get('/', (req, res) => {
    console.log("entrou no search")
    Users.find({}, (err, data) => {
        console.log("procurando...")
        if (err) return res.send({ error: "Erro na consulta de usuários!" });
        return res.send(data);
    });
});

router.post('/create', (req, res) => {
    console.log(`Entrou no create ${JSON.stringify(req.body)}`);
    const { email, password } = req.body;
    console.log(`email: ${email}, password: ${password}`)

    if (!email || !password) return res.send({ error: "Dados insuficientes!" });

    Users.findOne({ email }, (err, data) => {
        if (err) res.send({ error: "Erro ao buscar usuário!" });
        if (data) return res.send({ error: "Usuário já cadastrado!" });

        Users.create(req.body, (err, data) => {
            if (err) return res.send({ error: "Erro ao criar usuário!"});
            return res.send(data);
        });
    });
});

module.exports = router;