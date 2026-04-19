const Contact = require('../models/Contact')

// @route   POST /api/contact
const createContact = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email and message'
      })
    }

    const contact = await Contact.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || '',
      subject: subject?.trim() || 'General Inquiry',
      message: message.trim()
    })

    console.log('✅ Contact form submitted:', contact._id)

    res.status(201).json({
      success: true,
      message: 'Message sent successfully! We will get back to you soon.',
      contact
    })

  } catch (error) {
    console.error('❌ Contact error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again.'
    })
  }
}

// @route   GET /api/contact (Admin)
const getAllContacts = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query

    let query = {}
    if (status) query.status = status

    const skip = (parseInt(page) - 1) * parseInt(limit)

    const [contacts, total] = await Promise.all([
      Contact.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      Contact.countDocuments(query)
    ])

    res.json({
      success: true,
      contacts,
      total,
      pages: Math.ceil(total / parseInt(limit))
    })

  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' })
  }
}

// @route   PUT /api/contact/:id/status (Admin)
const updateContactStatus = async (req, res) => {
  try {
    const { status } = req.body

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    )

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      })
    }

    res.json({
      success: true,
      message: 'Status updated',
      contact
    })

  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' })
  }
}

// @route   DELETE /api/contact/:id (Admin)
const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id)

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      })
    }

    res.json({
      success: true,
      message: 'Contact deleted'
    })

  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' })
  }
}

module.exports = {
  createContact,
  getAllContacts,
  updateContactStatus,
  deleteContact
}