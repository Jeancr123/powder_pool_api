const {Resort}  = require('../models/index');


module.exports = async (req, res) => {
    try {
      const allResorts = await Resort.findAll();
      return res.status(200).json(allResorts);
    } catch (error) {
      console.error('Error fetching resorts:', error);
     return res.status(500).json({ error: 'internal_server_error' });
    }
  }