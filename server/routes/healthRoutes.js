import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'quickchat-server',
    author: 'Gulshan Kumar (IIIT Ranchi)'
  });
});

export default router;
