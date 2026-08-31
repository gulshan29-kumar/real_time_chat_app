/**
 * Simple in-memory rate limiter for auth endpoints
 */
const requestCounts = new Map();

export const rateLimiter = (limit = 100, windowMs = 60000) => {
  return (req, res, next) => {
    const ip = req.ip || req.connection.remoteAddress;
    const now = Date.now();
    const clientData = requestCounts.get(ip) || { count: 0, startTime: now };

    if (now - clientData.startTime > windowMs) {
      clientData.count = 1;
      clientData.startTime = now;
    } else {
      clientData.count++;
    }

    requestCounts.set(ip, clientData);

    if (clientData.count > limit) {
      return res.status(429).json({ success: false, message: 'Too many requests. Please try again later.' });
    }
    next();
  };
};
