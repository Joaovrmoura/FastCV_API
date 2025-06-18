require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const productRoute = require('./src/routes/product.route')
const auth = require('./src/routes/auth.route')
const resumeRoute = require('./src/routes/resume.route')

const Connection = require('./src/config/connection');

(async () => {await Connection.connect(); })();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// use router
app.use('/', productRoute)
app.use('/auth', auth)
app.use('/', resumeRoute)

 app.listen(PORT, (req, res) => {
    console.log(`SERVER ON http://localhost:${PORT} `);
});

