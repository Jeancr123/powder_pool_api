const {Carpool}  = require('../models/index');


module.exports = async (req, res) => {
    try {
      const allCarpools = await Carpool.findAll();
      res.status(200).json(allPlans);
    } catch (error) {
      console.error('Error fetching carpools:', error);
      res.status(500).json({ error: 'internal_server_error' });
    }
  }