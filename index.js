let express = require('express');
let app = express();
let mongoose = require('mongoose');
let user = require('./routes/user');
let auth = require('./routes/auth');
let cors = require('cors');
app.use(express.json());
let port = process.env.PORT || 3000;
app.use(cors());
mongoose.connect('mongodb://localhost/users', {useNewUrlParser:true})
        .then(() => console.log('connected to the database'))
        .catch(err => console.log('something went wrong', err.message));

app.use('/api/users',user);
app.use('/api/users',auth);
    app.listen(port, () => console.log(`port is working on ${port}`));


    