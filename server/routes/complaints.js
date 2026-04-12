const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint');

// Create complaint
router.post('/', async (req, res) => {
  try {
    const complaint = await Complaint.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Complaint submitted successfully! We will look into it.',
      complaint
    });
  } catch (error) {
    console.error('Complaint Error:', error);
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to submit complaint'
    });
  }
});

// Get all complaints (admin)
router.get('/', async (req, res) => {
  try {
    const { status, type, phone, priority } = req.query;
    let query = {};

    if (status) query.status = status;
    if (type) query.type = type;
    if (phone) query.phone = phone;
    if (priority) query.priority = priority;

    const complaints = await Complaint.find(query)
      .sort({ createdAt: -1 })
      .limit(100);

    res.json({
      success: true,
      count: complaints.length,
      complaints
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch complaints'
    });
  }
});

// Get user complaints
router.get('/my-complaints', async (req, res) => {
  try {
    const { phone } = req.query;

    if (!phone) {
      return res.status(400).json({
        success: false,
        message: 'Phone number is required'
      });
    }

    const complaints = await Complaint.find({ phone })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: complaints.length,
      complaints
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch complaints'
    });
  }
});

// Get complaint by ID
router.get('/:id', async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: 'Complaint not found'
      });
    }

    res.json({ success: true, complaint });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch complaint'
    });
  }
});

// Update complaint status (admin)
router.patch('/:id', async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (req.body.status === 'resolved') {
      updateData.resolvedAt = new Date();
    }

    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: 'Complaint not found'
      });
    }

    res.json({
      success: true,
      message: 'Complaint updated successfully',
      complaint
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to update complaint'
    });
  }
});

// Add admin note to complaint
router.post('/:id/note', async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: 'Complaint not found'
      });
    }

    complaint.adminNotes.push({
      note: req.body.note,
      addedBy: req.body.addedBy || 'Admin'
    });

    await complaint.save();

    res.json({
      success: true,
      message: 'Note added successfully',
      complaint
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to add note'
    });
  }
});

// Submit feedback on resolved complaint
router.post('/:id/feedback', async (req, res) => {
  try {
    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      {
        rating: req.body.rating,
        feedback: req.body.feedback
      },
      { new: true }
    );

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: 'Complaint not found'
      });
    }

    res.json({
      success: true,
      message: 'Thank you for your feedback!',
      complaint
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to submit feedback'
    });
  }
});

// Delete complaint
router.delete('/:id', async (req, res) => {
  try {
    const complaint = await Complaint.findByIdAndDelete(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: 'Complaint not found'
      });
    }

    res.json({
      success: true,
      message: 'Complaint deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete complaint'
    });
  }
});

// Get complaint stats (admin)
router.get('/stats/summary', async (req, res) => {
  try {
    const total = await Complaint.countDocuments();
    const open = await Complaint.countDocuments({ status: 'open' });
    const inProgress = await Complaint.countDocuments({ status: 'in-progress' });
    const resolved = await Complaint.countDocuments({ status: 'resolved' });
    const closed = await Complaint.countDocuments({ status: 'closed' });

    res.json({
      success: true,
      stats: { total, open, inProgress, resolved, closed }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch stats'
    });
  }
});

module.exports = router;