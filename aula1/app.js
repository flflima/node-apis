const express = require('express');
const app = express();

app.get("/", (req, res) => {
    let obj = req.query

    return res.send({message: `Tudo OK com o GET. Parametro enviado: ${obj.nome}`});
})

app.post("/", (req, res) => {
    return res.send({message: 'Tudo OK com o POST'});
})

app.listen(3000);

module.exports = app;