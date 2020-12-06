const mongoose = require('mongoose');

const keys = require('./keys.config');

const mongoConnect = () => {
    mongoose.connect(keys.MongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
        .then(() => console.log('db connected'))
        .catch(err => console.log(err));
}

module.exports = mongoConnect;