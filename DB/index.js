    const ENV = require('../.env');
    const mongoPass = ENV.MONGODB_PASS
    const mongoose = require('mongoose');
    console.log(mongoPass);

const DB_URI = `mongodb+srv://root:${mongoPass}@gameon.p78bo.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(DB_URI)
.then(()=>console.log('connected'))
.catch((err)=>console.error(err));