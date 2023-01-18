const jwt = require('jsonwebtoken')

module.exports = (req , res , next ) => {
    // Get the token from the request headers
    const token = req.headers.authorization.split(" ")[1];
  
    // Check if the token is present and not null
    if (!token) {
      // Return a 401 error if the token is not present
      return res.status(401).json({ msg: 'No token, authorization denied' });
    }
  
    try {
      // Verify the token using your secret key
      const decoded = jwt.verify(token, process.env.JWT_KEY);
  
      // Add the decoded user data to the request object
      req.user = decoded.user;
  
      // Call the next middleware
      next();
    } catch (err) {
      // Return a 401 error if the token is invalid
      return res.status(401).json({
        message : 'Auth failed'
      });
    }
  }
  