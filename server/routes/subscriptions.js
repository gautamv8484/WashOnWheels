const express = require('express');
const router = express.Router();
const Subscription = require('../models/Subscription');

// @route   POST /api/subscriptions
// @desc    Create new subscription
// @access  Public
router.post('/', async (req, res) => {
  try {
    // Calculate end date based on billing cycle
    const startDate = new Date(req.body.startDate || Date.now());
    let endDate = new Date(startDate);

    if (req.body.billingCycle === 'yearly') {
      endDate.setFullYear(endDate.getFullYear() + 1);
    } else {
      endDate.setMonth(endDate.getMonth() + 1);
    }

    const subscriptionData = {
      ...req.body,
      startDate,
      endDate
    };

    const subscription = await Subscription.create(subscriptionData);

    res.status(201).json({
      success: true,
      message: 'Subscription created successfully!',
      subscription
    });
  } catch (error) {
    console.error('Subscription Error:', error);
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to create subscription'
    });
  }
});

// @route   GET /api/subscriptions
// @desc    Get all subscriptions
// @access  Admin
router.get('/', async (req, res) => {
  try {
    const { status, plan, phone } = req.query;
    let query = {};

    if (status) query.status = status;
    if (plan) query.plan = plan;
    if (phone) query.phone = phone;

    const subscriptions = await Subscription.find(query)
      .sort({ createdAt: -1 })
      .limit(100);

    res.json({
      success: true,
      count: subscriptions.length,
      subscriptions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch subscriptions'
    });
  }
});

// @route   GET /api/subscriptions/active
// @desc    Get all active subscriptions
// @access  Admin
router.get('/active', async (req, res) => {
  try {
    const subscriptions = await Subscription.find({ status: 'active' })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: subscriptions.length,
      subscriptions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch active subscriptions'
    });
  }
});

// @route   GET /api/subscriptions/:id
// @desc    Get subscription by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id)
      .populate('user', 'name email phone');

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: 'Subscription not found'
      });
    }

    res.json({
      success: true,
      subscription
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch subscription'
    });
  }
});

// @route   PATCH /api/subscriptions/:id
// @desc    Update subscription
// @access  Admin
router.patch('/:id', async (req, res) => {
  try {
    const subscription = await Subscription.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: 'Subscription not found'
      });
    }

    res.json({
      success: true,
      message: 'Subscription updated successfully',
      subscription
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to update subscription'
    });
  }
});

// @route   DELETE /api/subscriptions/:id
// @desc    Cancel subscription
// @access  Public
router.delete('/:id', async (req, res) => {
  try {
    const subscription = await Subscription.findByIdAndUpdate(
      req.params.id,
      { status: 'cancelled' },
      { new: true }
    );

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: 'Subscription not found'
      });
    }

    res.json({
      success: true,
      message: 'Subscription cancelled successfully',
      subscription
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to cancel subscription'
    });
  }
});

// @route   POST /api/subscriptions/:id/renew
// @desc    Renew subscription
// @access  Public
router.post('/:id/renew', async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id);

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: 'Subscription not found'
      });
    }

    // Extend end date
    const newEndDate = new Date(subscription.endDate);
    if (subscription.billingCycle === 'yearly') {
      newEndDate.setFullYear(newEndDate.getFullYear() + 1);
    } else {
      newEndDate.setMonth(newEndDate.getMonth() + 1);
    }

    subscription.endDate = newEndDate;
    subscription.status = 'active';
    await subscription.save();

    res.json({
      success: true,
      message: 'Subscription renewed successfully',
      subscription
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to renew subscription'
    });
  }
});

module.exports = router;