const express = require('express');
const app = express();
const path = require('path');
const bcrypt = require('bcrypt');

//Libreria encargada de subir archivos, se usa como middleware
const multer = require('multer');
const files = require('./models/files');

//Upload termina siendo una función, donde como parámetro pide que le indiquemos donde guardara los archivos
const upload = multer({ dest: path.join(__dirname, '/uploads') })

app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.get('/', (req, res) => {
    res.render('index')
})

//single es para especificar cuantos archivos espera recibir y de que tipo
app.post('/upload', upload.single('file'), async (req, res) => {
    const { password } = req.body
    const fileData = {
        path: req.file.path,
        originalName: req.file.originalname,
        originalPassword: password
    }
    if (password != null && password != "") fileData.password = await bcrypt.hash(password, 10)


    const file = await files.create(fileData)
    res.render('index', { fileLink: `${req.headers.origin}/file/${file.id}` })
})

app.route('/file/:id').get(handleDownload).post(handleDownload)


async function handleDownload(req, res) {
    const file = await files.findById(req.params.id);
    if (!file) res.send('No se encontró archivo');

    if (file.password) {

        if (!req.body.password) {
            res.render('password')
            return
        }

        const isValidPassword = await bcrypt.compare(req.body.password, file.password);
        if (!isValidPassword) {
            res.render('password', {
                error: true
            })
            return
        }
    }

    file.downloadCount++
    await file.save()
    res.download(file.path, file.originalName)
}
module.exports = app;