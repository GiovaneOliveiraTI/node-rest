const conexao = require('../infra/database/conexao')
const moment = require('moment')
const axios = require('axios')
const repositories = require('../repositories/atendimentos')

class Atendimento {

    constructor() {

         this.dataEhValida = (data, datacriacao) => moment(data).isSameOrAfter(datacriacao)
        this.clienteEhValido = (tamanho) => tamanho >= 5
        this.valida = parametros => this.validacoes.filter(campo
        => {
            const {nome} = campo
            const parametro = parametros[nome]

            return !campo.valido(parametro)
        })



        this.validacoes = [
            {
                nome: 'data',
                valido: this.dataEhValida,
                mensagem: 'Data deve ser maior ou igual a atual'
            },
            {
                nome: 'cliente',
                valido: this.clienteEhValido,
                mensagem: 'Cliente deve ter pelo menos cinco carcteres.'
            }
        ]

    }

    adiciona(atendimento) {
        const datacriacao = moment().format('YYYY-MM-DD HH:MM:SS')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')

        const parametros = {
            data: {data, datacriacao},
            cliente: { tamanho: atendimento.cliente.length}
        }
        const erros = this.valida(parametros)
        const existemErros = erros.length


        if (existemErros) {
            return new Promise((resolve, reject) => reject(erros))
        } else {
            const atendimentoDatado = {...atendimento, datacriacao, data}

            return repositories.adiciona(atendimentoDatado)
                .then((resultados) => {
                    const id = resultados.insertId
                    return {...atendimento, id}
                })
        }
    }

    lista() {
        return repositories.lista()
    }

    buscaPorId(id, res) {
        const sql = `SELECT * FROM Atendimentos WHERE id=${id}`

        conexao.query(sql, async (erro, resultados) => {
            const atendimento = resultados[0]
            const cpf = atendimento.cliente
            if (erro) {
                res.status(400).json(erro)
            } else {
                const {data} = await axios.get(`http://localhost:8082/${cpf}`)

                atendimento.cliente = data

                res.status(200).json(atendimento)
            }
        })

    }

    alterarAtendimento(id, valores, res) {
        const sql = 'UPDATE Atendimentos SET ? WHERE id=?'

        if (valores.data) {
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        }

        conexao.query(sql, [valores, id], (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({...valores, id})
            }
        })
    }

    deletarAtendimento(id, res) {
        const sql = 'DELETE FROM Atendimentos WHERE id=?'

        conexao.query(sql, id, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }


}

module.exports = new Atendimento
