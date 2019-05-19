const express = require('express')
const router = express.Router();
const Users = require('../model/user');
const bcrypt = require('bcryptjs');

router.get('/', (req, res) => {
    console.log("entrou no search")
    Users.find({}, (err, data) => {
        console.log("procurando...")
        if (err) return res.status(500).send({ error: "Erro na consulta de usuários!" });
        return res.send(data);
    });
});

router.post('/create', (req, res) => {
    console.log(`Entrou no create ${JSON.stringify(req.body)}`);
    const { email, password } = req.body;
    console.log(`email: ${email}, password: ${password}`)

    if (!email || !password) return res.send({ error: "Dados insuficientes!" });

    Users.findOne({ email }, (err, data) => {
        if (err) return res.status(500).send({ error: "Erro ao buscar usuário!" });
        if (data) return res.send({ error: "Usuário já cadastrado!" });

        Users.create(req.body, (err, data) => {
            if (err) return res.status(500).send({ error: "Erro ao criar usuário!"});
            return res.send(data);
        });
    });
});

router.post("/auth", (req, res) => {
    console.log(`Entrou no auth ${JSON.stringify(req.body)}`);
    const { email, password } = req.body;
    console.log(`email: ${email}, password: ${password}`)

    Users.findOne({ email }, (err, data) => {
        if (err) return res.status(500).send({ error: "Erro ao buscar usuário!" });
        if (!data) return res.send({ error: "Usuário não cadastrado!" });

        bcrypt.compare(password, data.password, (err, same) => {
            if (!same) return res.status(500).send({ error: "Erro ao autenticar usuário!" });
            return res.send(data);
        });
    }).select('+password');
});

module.exports = router;