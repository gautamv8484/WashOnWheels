const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  name: {
    type: String,
    required: [true, 'Please provide customer name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: [true, 'Please provide phone number'],
    match: [/^[0-9]{10}$/, 'Please provide a valid 10-digit phone number']
  },
  plan: {
    type: String,
    required: [true, 'Please select a plan'],
    enum: ['basic', 'premium', 'business']
  },
  billingCycle: {
    type: String,
    enum: ['monthly', 'yearly'],
    default: 'monthly'
  },
  vehicleType: {
    type: String,
    required: [true, 'Please select vehicle type'],
    enum: ['bike', 'car', 'suv', 'fleet']
  },
  vehicleNumber: {
    type: String,
    trim: true,
    uppercase: true
  },
  numberOfVehicles: {
    type: Number,
    default: 1,
    min: [1, 'Must have at least 1 vehicle']
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date,
    required: [true, 'Please provide end date']
  },
  status: {
    type: String,
    enum: ['active', 'expired', 'cancelled', 'paused'],
    default: 'active'
  },
  amount: {
    type: Number,
    required: [true, 'Please provide amount'],
    min: [0, 'Amount cannot be negative']
  },
  autoRenew: {
    type: Boolean,
    default: false
  },
  address: {
    type: String,
    required: [true, 'Please provide service address'],
    trim: true
  },
  preferredTime: {
    type: String,
    trim: true
  },
  preferredDays: {
    type: [String],
    enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'card', 'upi', 'netbanking']
  },
  notes: {
    type: String,
    trim: true
  },
  servicesCompleted: {
    type: Number,
    default: 0
  },
  lastServiceDate: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Calculate days remaining
subscriptionSchema.virtual('daysRemaining').get(function() {
  const today = new Date();
  const end = new Date(this.endDate);
  const diff = Math.ceil((end - today) / (1000 * 60 * 60 * 24));
  return diff > 0 ? diff : 0;
});

// Auto-update status based on end date
subscriptionSchema.pre('save', function(next) {
  if (this.endDate < new Date() && this.status === 'active') {
    this.status = 'expired';
  }
  next();
});

// Index for faster queries
subscriptionSchema.index({ status: 1, endDate: 1 });
subscriptionSchema.index({ phone: 1 });

module.exports = mongoose.model('Subscription', subscriptionSchema);