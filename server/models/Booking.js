const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  name: {
    type: String,
    required: [true, 'Please provide customer name'],
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'Please provide phone number'],
    match: [/^[0-9]{10}$/, 'Please provide a valid 10-digit phone number']
  },
  email: {
    type: String,
    trim: true,
    lowercase: true
  },
  vehicleType: {
    type: String,
    required: [true, 'Please select vehicle type'],
    enum: ['bike', 'car', 'suv']
  },
  vehicleNumber: {
    type: String,
    required: [true, 'Please provide vehicle number'],
    trim: true,
    uppercase: true
  },
  service: {
    type: String,
    required: [true, 'Please select a service'],
    enum: ['exterior', 'interior', 'eco', 'premium', 'bike', 'engine']
  },
  date: {
    type: Date,
    required: [true, 'Please select a date']
  },
  time: {
    type: String,
    required: [true, 'Please select a time slot']
  },
  address: {
    type: String,
    required: [true, 'Please provide service address'],
    trim: true
  },
  notes: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'in-progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  amount: {
    type: Number,
    min: 0
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'refunded'],
    default: 'pending'
  },
  assignedTo: {
    type: String
  },
  completedAt: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for faster queries
bookingSchema.index({ date: 1, status: 1 });
bookingSchema.index({ phone: 1 });
bookingSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Booking', bookingSchema);