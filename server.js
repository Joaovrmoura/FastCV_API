// import cors from 'cors';
// import cookieParser from 'cookie-parser';
// import dotenv from 'dotenv';
// import express from 'express';
// import rateLimit from 'express-rate-limit';

// dotenv.config();
// const app = express();
// const PORT = process.env.PORT || 3000;


// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // max for IP
//   standardHeaders: true, 
//   legacyHeaders: false, 
//   message: { 
//     success: false,
//     message: 'Você atingiu o limite de requisições, tente novamente mais tarde.'
//   }
// });


// const allowedOrigins = [
//   'http://localhost:3060',
//   'http://localhost:3000',
//   'http://localhost:5500',
//   'https://sharehub-dev-v2.onrender.com',
//   'https://seusite.vercel.app'
// ];

// app.use(cors({
//   origin: function(origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, origin);
//     } else {
//       callback(new Error('Not allowed by CORS: ' + origin));
//     }
//   },
//   credentials: true
// }));


// app.use(limiter);
// app.use(cookieParser());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// import Connection from './src/config/connection.js';
// import authRoute from './src/routes/auth.route.js';
// import resumeRoute from './src/routes/resume.route.js';
// import userRoute from './src/routes/user.routes.js';
// import notFoundRoute from './src/middlewares/notFoundRoute.js';

// // connect with DB
// (async () => {
//   await Connection.connect();
// })();



// app.use('/api', userRoute);
// app.use('/auth', authRoute);
// app.use('/api', resumeRoute);
// app.use(notFoundRoute)

// app.listen(PORT, () => {
//   console.log(`SERVER ON http://localhost:${PORT}`);
// });



import dotenv from 'dotenv';
import app from './app.js';
import Connection from './src/config/connection.config.js';
import authRoute from './src/routes/auth.route.js';
import resumeRoute from './src/routes/resume.route.js';
import userRoute from './src/routes/user.routes.js';
import notFoundRoute from './src/middlewares/notFoundRoute.js';

dotenv.config();
const PORT = process.env.PORT || 3000;

// Conectar DB
(async () => {
  await Connection.connect();
})();

// Rotas
app.use('/api', userRoute);
app.use('/auth', authRoute);
app.use('/api', resumeRoute);
app.use(notFoundRoute);

// Start servidor
app.listen(PORT, () => {
  console.log(`SERVER ON http://localhost:${PORT}`);
});
