module.exports = app => {
    app.post('/pet', (req, res) => {
        res.send('ok')
    })
}
