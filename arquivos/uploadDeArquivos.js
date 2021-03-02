const { on } = require('events')
const fs = require ('fs')

fs.createReadStream('./assets/dartvader.jpg' )
.pipe(fs.createWriteStream('./assets/dart-Stream.jpg'))
.on('finish', () => console.log('Imagem foi escrita com sucess..'))