const Booking = require('../models/Booking')

const servicePrices = {
  exterior: 250,
  interior: 400,
  eco: 300,
  premium: 800,
  bike: 100,
  engine: 350
}

// ✅ createBooking - user ID properly save karo
const createBooking = async (req, res) => {
  try {
    const {
      name, phone, email,
      vehicleType, vehicleNumber,
      service, date, time,
      address, notes, userId
    } = req.body

    if (!name || !phone || !vehicleType ||
      !vehicleNumber || !service ||
      !date || !time || !address) {
      return res.status(400).json({
        success: false,
        message: 'Please fill all required fields'
      })
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter valid 10-digit phone number'
      })
    }

    const bookingDate = new Date(date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (bookingDate < today) {
      return res.status(400).json({
        success: false,
        message: 'Please select a future date'
      })
    }

    const bookingData = {
      name: name.trim(),
      phone: phone.trim(),
      email: email?.trim() || '',
      vehicleType,
      vehicleNumber: vehicleNumber.trim().toUpperCase(),
      service,
      date: bookingDate,
      time,
      address: address.trim(),
      notes: notes?.trim() || '',
      status: 'pending',
      amount: servicePrices[service] || 0,
      paymentStatus: 'pending'
    }

    // ✅ userId frontend se aata hai - save karo
    if (userId) {
      bookingData.user = userId
      console.log('✅ Booking linked to user:', userId)
    }

    const booking = await Booking.create(bookingData)
    console.log('✅ Booking created:', booking._id)

    res.status(201).json({
      success: true,
      message: 'Booking created successfully!',
      booking
    })

  } catch (error) {
    console.error('❌ Create booking error:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    })
  }
}

const getBookings = async (req, res) => {
  try {
    const { phone, status } = req.query
    let query = {}

    // ✅ Phone optional hai
    if (phone) query.phone = phone
    if (status) query.status = status

    const bookings = await Booking.find(query).sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      bookings,
      total: bookings.length
    })

  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' })
  }
}

// ✅ getMyBookings - user ID aur phone dono se dhundho
const getMyBookings = async (req, res) => {
  try {
    // Debug log
    console.log('📋 getMyBookings called')
    console.log('req.user:', req.user)

    if (!req.user) {
      return res.status(400).json({
        success: false,
        message: 'User not found in request'
      })
    }

    const userId = req.user._id
    const userPhone = req.user.phone

    console.log('🔍 Finding bookings for userId:', userId, 'phone:', userPhone)

    const bookings = await Booking.find({
      $or: [
        { user: userId },
        { phone: userPhone }
      ]
    }).sort({ createdAt: -1 })

    console.log('✅ Bookings found:', bookings.length)

    res.status(200).json({
      success: true,
      bookings,
      total: bookings.length
    })

  } catch (error) {
    console.error('❌ getMyBookings error:', error)
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Server error' 
    })
  }
}

const getAllBookingsAdmin = async (req, res) => {
  try {
    const { status, date, search, page = 1, limit = 20 } = req.query

    let query = {}

    if (status && status !== 'all') query.status = status

    if (date) {
      const startDate = new Date(date)
      const endDate = new Date(date)
      endDate.setDate(endDate.getDate() + 1)
      query.date = { $gte: startDate, $lt: endDate }
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { vehicleNumber: { $regex: search, $options: 'i' } }
      ]
    }

    const skip = (parseInt(page) - 1) * parseInt(limit)

    const [bookings, total] = await Promise.all([
      Booking.find(query)
        .populate('user', 'name email phone')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      Booking.countDocuments(query)
    ])

    const stats = await Booking.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          revenue: { $sum: '$amount' }
        }
      }
    ])

    const statsObj = {
      total: 0, pending: 0, confirmed: 0,
      inProgress: 0, completed: 0,
      cancelled: 0, totalRevenue: 0
    }

    stats.forEach(s => {
      statsObj.total += s.count
      statsObj.totalRevenue += s.revenue || 0
      if (s._id === 'pending') statsObj.pending = s.count
      if (s._id === 'confirmed') statsObj.confirmed = s.count
      if (s._id === 'in-progress') statsObj.inProgress = s.count
      if (s._id === 'completed') statsObj.completed = s.count
      if (s._id === 'cancelled') statsObj.cancelled = s.count
    })

    res.status(200).json({
      success: true,
      bookings,
      total,
      pages: Math.ceil(total / parseInt(limit)),
      currentPage: parseInt(page),
      stats: statsObj
    })

  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' })
  }
}

const updateBookingStatus = async (req, res) => {
  try {
    const { status, assignedTo } = req.body
    const { id } = req.params

    const validStatuses = [
      'pending', 'confirmed', 'in-progress', 'completed', 'cancelled'
    ]

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' })
    }

    const updateData = { status }
    if (assignedTo) updateData.assignedTo = assignedTo
    if (status === 'completed') updateData.completedAt = new Date()

    const booking = await Booking.findByIdAndUpdate(
      id, updateData, { new: true }
    ).populate('user', 'name email phone')

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' })
    }

    res.status(200).json({
      success: true,
      message: `Booking status updated to ${status}`,
      booking
    })

  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' })
  }
}

const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' })
    }

    const isOwner =
      booking.user?.toString() === req.user._id.toString() ||
      booking.phone === req.user.phone

    if (!isOwner) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to cancel this booking'
      })
    }

    if (booking.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: `Cannot cancel booking with status: ${booking.status}`
      })
    }

    booking.status = 'cancelled'
    await booking.save()

    res.status(200).json({
      success: true,
      message: 'Booking cancelled successfully'
    })

  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' })
  }
}

const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('user', 'name email phone')

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' })
    }

    res.status(200).json({ success: true, booking })

  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' })
  }
}

module.exports = {
  createBooking,
  getBookings,
  getMyBookings,
  getAllBookingsAdmin,
  updateBookingStatus,
  cancelBooking,
  getBookingById
}