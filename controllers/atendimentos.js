module.exports = app => {
    app.get('/atendimentos', (req, res)=> res.send('Você esta na rota de atendimentos e esta rodando um get'))

    app.post('/atendimentos', (req, res) => {
        console.log(req.body)
        res.send('você vesta na roda atendimento e esta rodando um POST')
    })
}





