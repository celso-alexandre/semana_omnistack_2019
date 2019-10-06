const Booking = require('../models/Booking')

module.exports = {
    async store(req, res) {
        const { booking_id } = req.params

        const booking = await Booking.findById(booking_id).populate('spot')

        booking.approved = false

        const ownerSocket = req.connectedUsers[booking.user]

        if (ownerSocket) {
            req.io.to(ownerSocket).emit('booking_response', booking)
        }

        await booking.save()

        return res.json(booking)

    }
}