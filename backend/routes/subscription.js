const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

// Get subscription plans
router.get('/plans', async (req, res) => {
  try {
    const plans = [
      {
        id: 'basic',
        name: 'Basic',
        price: 5.99,
        features: ['Basic AI homework completion', 'Limited submissions']
      },
      {
        id: 'premium',
        name: 'Premium',
        price: 14.99,
        features: ['Advanced AI homework completion', 'Unlimited submissions', 'Priority support']
      }
    ];
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subscription plans' });
  }
});

// Subscribe to a plan
router.post('/subscribe', protect, async (req, res) => {
  try {
    res.json({ message: 'Subscription processing coming soon' });
  } catch (error) {
    res.status(500).json({ message: 'Error processing subscription' });
  }
});

module.exports = router;
