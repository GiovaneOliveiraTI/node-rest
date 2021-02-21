const conexao = require('../infra/conexao')
const moment = require('moment')
class Atendimento {
    adiciona(atendimento) {
        const datacriacao = moment().format('YYYY-MM-DD HH:MM:SS')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        const atendimentoDatado = {...atendimento, datacriacao, data }
        const sql = 'INSERT INTO Atendimentos SET ? '

        conexao.query(sql, atendimentoDatado, (erro, resultados) => {
            if (erro) {
                console.log(erro)
            } else {
                console.log(resultados)
            }
        })
    }
}

module.exports = new Atendimento
