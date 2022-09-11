const mongoose = require('mongoose');

const URL_BD = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@clusterlg.hqndx.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;

console.log("Conectando bd");
mongoose.connect(URL_BD,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }, err => err ? console.log('Failed to connect to MongoDB', err) : console.log('MongoDB connected!!'))



