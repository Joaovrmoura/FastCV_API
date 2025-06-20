import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import Connection from './src/config/connection.js';
import productRoute from './src/routes/product.route.js';
import authRoute from './src/routes/auth.route.js';
import resumeRoute from './src/routes/resume.route.js';
import userRoute from './src/routes/user.routes.js';
import notFoundRoute from './src/middlewares/notFoundRoute.js';

// connect with DB
(async () => {
  await Connection.connect();
})();


app.use('/api', userRoute);
app.use('/auth', authRoute);
app.use('/api', productRoute);
app.use('/api', resumeRoute);
app.use(notFoundRoute)

app.listen(PORT, () => {
  console.log(`SERVER ON http://localhost:${PORT}`);
});
