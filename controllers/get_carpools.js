const {Carpool}  = require('../models/index');


module.exports = async (req, res) => {
    try {
      const allCarpools = await Carpool.findAll();
      return res.status(200).json(allCarpools);
    } catch (error) {
      console.error('Error fetching carpools:', error);
      return res.status(500).json({ error: 'internal_server_error' });
    }
  }