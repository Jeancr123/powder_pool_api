const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers.authorization;
  
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized - Token not provided' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_KEY);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ error: 'Unauthorized - Invalid token' });
    }
  };