/**
 * Middleware: Register Payload Validation
 */
export const validateRegisterPayload = (req, res, next) => {
  const { fullName, email, password } = req.body;
  if (!fullName || !email || !password) {
    return res.status(400).json({ success: false, message: 'All required fields must be supplied' });
  }
  next();
};
