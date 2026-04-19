const express = require('express')
const router = express.Router()
const { protect, authorize } = require('../middleware/auth')
const {
  createBooking,
  getBookings,
  getMyBookings,
  getAllBookingsAdmin,
  updateBookingStatus,
  cancelBooking,
  getBookingById
} = require('../controllers/bookingController')

// ✅ my-bookings SABSE PEHLE
router.get('/my-bookings', protect, getMyBookings)
router.get('/admin/all', protect, authorize('admin'), getAllBookingsAdmin)

router.post('/', createBooking)
router.get('/', getBookings)

router.get('/:id', protect, getBookingById)
router.put('/:id/status', protect, authorize('admin'), updateBookingStatus)
router.put('/:id/cancel', protect, cancelBooking)

module.exports = router;