/**
 * Validate message payload
 */
export const validateMessagePayload = (req, res, next) => {
  const { text, image } = req.body;
  if (!text && !image) {
    return res.status(400).json({ success: false, message: 'Message text or image is required' });
  }
  next();
};
