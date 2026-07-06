import { verifyToken } from '../config/jwt.js';

export const auth = async (req, res, next) => {
  try {
    // Get token from cookie
    const token = req.cookies.accessToken;
    
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'Authentication required' 
      });
    }
    
    // Verify token
    const decoded = verifyToken(token);
    
    if (!decoded) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid or expired token' 
      });
    }
    
    // Attach user info to request
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ 
      success: false, 
      message: 'Authentication failed' 
    });
  }
};

export const optionalAuth = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    
    if (token) {
      const decoded = verifyToken(token);
      if (decoded) {
        req.user = decoded;
      }
    }
    
    next();
  } catch (error) {
    next();
  }
};
