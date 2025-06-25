const allowedOrigins = [
  'http://localhost:3060',
  'http://localhost:3000',
  'http://localhost:5500',
  'https://fast-cv-phi.vercel.app'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, origin);
    } else {
      callback(new Error('Not allowed by CORS: ' + origin));
    }
  },
  credentials: true
};

export default corsOptions;