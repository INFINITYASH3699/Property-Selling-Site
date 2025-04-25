const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/db');
const fs = require('fs');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

// Route files
const properties = require('./routes/properties');
const auth = require('./routes/auth');
const users = require('./routes/users');
const wishlist = require('./routes/wishlist');
const locations = require('./routes/locations');
const messages = require('./routes/messages');

const app = express();

// Create uploads directory if it doesn't exist
if (!fs.existsSync('./uploads')) {
  fs.mkdirSync('./uploads', { recursive: true });
}

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Security middleware
app.use(mongoSanitize()); // Prevent NoSQL injection

// Set security headers with basic configuration
app.use(helmet({
  contentSecurityPolicy: false, // Disable CSP for now
  crossOriginEmbedderPolicy: false,
  crossOriginOpenerPolicy: false,
  crossOriginResourcePolicy: false
}));

app.use(xss()); // Sanitize inputs

// Allow specific origins or handle development/production differently
let allowedOrigins = [];

if (process.env.CLIENT_URL) {
  // Use CLIENT_URL from .env for both development and production
  allowedOrigins = [process.env.CLIENT_URL];
} else {
  // If CLIENT_URL is not set in .env, fall back to a default URL
  allowedOrigins = ['https://varad-properties.vercel.app'];
}


// Configure CORS with dynamic origin checking
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl requests)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.warn(`CORS blocked request from origin: ${origin}`);
      callback(null, false);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Origin', 'Accept'],
  optionsSuccessStatus: 200
};

// Apply CORS configuration
app.use(cors(corsOptions));

// Handle preflight requests specifically for all routes
app.options('*', (req, res) => {
  // Get origin from request
  const origin = req.headers.origin;

  // Check if origin is allowed
  if (origin && allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  } else if (!origin) {
    // For requests with no origin, we'll allow it with a wildcard
    res.header('Access-Control-Allow-Origin', '*');
  }

  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Origin, Accept');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Max-Age', '86400'); // 24 hours
  res.status(200).end();
});

// Configure rate limiting - UPDATED TO BE MUCH MORE GENEROUS
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3000, // Allow 3000 requests per window
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests from this IP, please try again after 15 minutes',
  skipSuccessfulRequests: true, // Only count failed requests toward the limit
  // Add IP address exemption - you can add your Vercel's IP here
  skip: (req, res) => {
    // Optional: Skip rate limiting for certain routes
    if (req.path.startsWith('/api/properties')) {
      return true; // Skip rate limiting for properties endpoints
    }
    return false;
  }
});

// Only apply rate limiting to specific API routes that need protection
// Instead of applying to all API routes, be selective
app.use('/api/auth', limiter); // Apply to auth routes only

// Set static folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Mount routers AFTER CORS middleware
app.use('/api/properties', properties);
app.use('/api/auth', auth);
app.use('/api/users', users);
app.use('/api/wishlist', wishlist);
app.use('/api/locations', locations);
app.use('/api/messages', messages);

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Real Estate API is running' });
});

// Add a specific route to check CORS
app.get('/api/cors-test', (req, res) => {
  res.json({
    message: 'CORS is working correctly',
    requestOrigin: req.headers.origin || 'No origin header',
    corsHeaders: {
      allowOrigin: res.getHeader('Access-Control-Allow-Origin'),
      allowMethods: res.getHeader('Access-Control-Allow-Methods'),
      allowHeaders: res.getHeader('Access-Control-Allow-Headers'),
      allowCredentials: res.getHeader('Access-Control-Allow-Credentials')
    }
  });
});

// Error handler middleware - must be last
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});
