
const jwt = require("jsonwebtoken");

const authenticateJWT = (req, res, next) => {
  const token = req.cookies.token;
  console.log(token);
  
    if (!token) {
      return res.status(401).json({success: false, message: 'No token, authorization denied' });
    }

    
  
    try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);


  
      // Attach thee user information to the request object
      req.user = { id: decoded.userId };
    console.log("authenticateJWT middleware verified");

  
      next(); // Proceed to the next middleware or route handler
    } catch (error) {
      res.status(401).json({ success: false, message: 'Invalid token' });
    }
};

module.exports = {authenticateJWT};