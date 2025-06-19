import dotenv from 'dotenv';
import express from 'express';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
import productRoute from './src/routes/product.route.js';
import authRoute from './src/routes/auth.route.js';
import resumeRoute from './src/routes/resume.route.js';
import Connection from './src/config/connection.js';

(async () => {await Connection.connect(); })();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// use router
app.use('/', productRoute)
app.use('/auth', authRoute)
app.use('/api', resumeRoute)

 app.listen(PORT, (req, res) => {
    console.log(`SERVER ON http://localhost:${PORT} `);
});

