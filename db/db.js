const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Flx_DB');
module.exports = mongoose;