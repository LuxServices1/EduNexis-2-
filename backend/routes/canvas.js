const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const axios = require('axios');
const User = require('../models/User'); // Add this import

// Connect Canvas account
router.post('/connect', protect, async (req, res) => {
  try {
    const { apiKey, institutionUrl } = req.body;
    
    if (!apiKey || !institutionUrl) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both API key and institution URL'
      });
    }

    // Clean up the institution URL (remove https:// if present and trailing slashes)
    const cleanUrl = institutionUrl
      .replace(/^https?:\/\//, '')
      .replace(/\/$/, '');

    // Test the Canvas connection
    try {
      const testResponse = await axios.get(`https://${cleanUrl}/api/v1/users/self`, {
        headers: { 'Authorization': `Bearer ${apiKey}` }
      });

      if (testResponse.status === 200) {
        // Update user with Canvas credentials
        const updatedUser = await User.findByIdAndUpdate(
          req.user._id,
          {
            canvasIntegration: {
              isConnected: true,
              apiKey: apiKey,
              institutionUrl: cleanUrl,
              lastSync: new Date()
            }
          },
          { new: true }
        );

        if (!updatedUser) {
          throw new Error('Failed to update user with Canvas credentials');
        }

        res.json({ 
          success: true, 
          message: 'Canvas successfully connected',
          canvasIntegration: {
            isConnected: true,
            institutionUrl: cleanUrl,
            lastSync: new Date()
          }
        });
      } else {
        throw new Error('Invalid Canvas credentials');
      }
    } catch (error) {
      console.error('Canvas API Error:', error.response?.data || error.message);
      
      if (error.response?.status === 401) {
        return res.status(401).json({
          success: false,
          message: 'Invalid Canvas API key'
        });
      }

      throw new Error('Failed to connect to Canvas - Please verify your institution URL and API key');
    }
  } catch (error) {
    console.error('Canvas Connection Error:', error);
    res.status(400).json({ 
      success: false, 
      message: error.message || 'Failed to connect to Canvas',
    });
  }
});

// Get Canvas assignments
router.get('/assignments', protect, async (req, res) => {
  try {
    if (!req.user.canvasIntegration?.isConnected) {
      return res.status(400).json({ 
        message: 'Canvas not connected' 
      });
    }

    // TODO: Implement assignment fetching
    res.json({ message: 'Canvas integration coming soon' });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching Canvas assignments' 
    });
  }
});

module.exports = router;
