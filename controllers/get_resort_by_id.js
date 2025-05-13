const {Resort}  = require('../models/index');


module.exports = async (req, res) => {
  console.log('Fetching resort by ID:', req.params.id);
    try {
      const { resortId } = req.params;
      const resort = await Resort.findOne({ where: { id: resortId } });
      if (!resort) {
        return res.status(404).json({ error: 'resort_not_found' });
      }
      return res.status(200).json(resort);
    } catch (error) {
      console.error('Error fetching resorts:', error);
     return res.status(500).json({ error: 'internal_server_error' });
    }
  }