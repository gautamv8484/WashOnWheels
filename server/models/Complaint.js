const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: [true, 'Please provide your phone number']
  },
  type: {
    type: String,
    required: [true, 'Please select complaint type'],
    enum: [
      'service-quality',
      'late-arrival',
      'damage',
      'billing',
      'staff-behavior',
      'missed-service',
      'subscription-issue',
      'app-issue',
      'suggestion',
      'other'
    ]
  },
  subject: {
    type: String,
    required: [true, 'Please provide a subject'],
    trim: true,
    maxlength: [200, 'Subject cannot exceed 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide description'],
    trim: true,
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  bookingId: {
    type: String,
    trim: true
  },
  vehicleNumber: {
    type: String,
    trim: true,
    uppercase: true
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  status: {
    type: String,
    enum: ['open', 'in-progress', 'resolved', 'closed', 'rejected'],
    default: 'open'
  },
  resolution: {
    type: String,
    trim: true
  },
  resolvedAt: {
    type: Date
  },
  resolvedBy: {
    type: String
  },
  adminNotes: [{
    note: String,
    addedBy: String,
    addedAt: {
      type: Date,
      default: Date.now
    }
  }],
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  feedback: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

complaintSchema.index({ status: 1, createdAt: -1 });
complaintSchema.index({ phone: 1 });
complaintSchema.index({ type: 1 });

module.exports = mongoose.model('Complaint', complaintSchema);