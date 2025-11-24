const cors = require('cors');

// CORS Configuration - Allow only explicit URLs
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map(origin => origin.trim())
  : ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:5173'];

// Log allowed origins in development
if (process.env.NODE_ENV !== 'production') {
  console.log('CORS Allowed Origins:', allowedOrigins);
}

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl requests, Postman)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      // Log rejected origin in development
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`CORS: Origin "${origin}" is not allowed`);
      }
      callback(new Error(`Not allowed by CORS. Origin "${origin}" is not in the whitelist.`));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

module.exports = cors(corsOptions);

