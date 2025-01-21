const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const logger = require('../config/logger');

// Logging middleware for auth routes
router.use((req, res, next) => {
    logger.info(`Auth Route accessed: ${req.method} ${req.originalUrl}`);
    next();
});

router.post('/register', register);
router.post('/login', login);

module.exports = router; 