const {Carpool}  = require('../models/index');

module.exports = async (req, res) => {
    const { userId } = req.user;

    const carpoolJson = req.body;
    const carpool = Carpool.build(carpoolJson);
    carpool.createdBy = req.user.userId;

    try {
      await carpool.save();
      return res.status(200).json({ message: 'carpool_created_successfully', carpool: carpool });
    } catch (error) {
      console.error('Error updating carpool:', error);
      return res.status(500).json({ error: 'internal_server_error' });
    }
  }