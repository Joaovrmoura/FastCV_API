import dotenv from 'dotenv';
import app from './app.js';
import Connection from './src/config/connection.config.js';
import authRoute from './src/routes/auth.route.js';
import resumeRoute from './src/routes/resume.route.js';
import userRoute from './src/routes/user.routes.js';
import notFoundRoute from './src/middlewares/notFoundRoute.js';

dotenv.config();
const PORT = process.env.PORT || 3000;

// connect DB
(async () => {
  await Connection.connect();
})();

// routes
app.use('/api', userRoute);
app.use('/auth', authRoute);
app.use('/api', resumeRoute);
app.use(notFoundRoute);

// Start server
app.listen(PORT, () => {
  console.log(`SERVER ON http://localhost:${PORT}`);
});
