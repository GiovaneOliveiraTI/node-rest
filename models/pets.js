const conexao = require('../infra/database/conexao')
const uploadArquivo = require('../infra/arquivos/uploadDeArquivos')
class Pets {
    adiciona(pet, res) {
        const query = 'INSERT INTO Pets SET ?'
         
        uploadArquivo(pet.imagem,pet.nome, ( erro, novoCaminho) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                const novoPet = {nome: pet.nome, imagem: novoCaminho}
                conexao.query(query, pet, erro => {
                    if (erro) {
                        res.status(400).json(erro)
                    } else {
                        res.status(200).json(novoPet)
                    }
                })
            }

        })
    }
}

module.exports = new Pets
