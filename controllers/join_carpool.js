const {Carpool} = require("../models/index");

module.exports = async (req, res) => {
    const { carpoolId } = req.body;
    const { userId } = req.user;
  
    try {
      const carpool = await Carpool.findByPk(carpoolId);
  
      if (!carpool) {
        return res.status(404).json({ error: 'carpool_not_found' });
      }

      await carpool.setUsers([userId]);
  
      return res.status(201).json({ message: 'joined_successfully', carpool: carpool });
    } catch (error) {
      console.error('Error joining carpool:', error);
      res.status(500).json({ error: 'internal_server_error' });
    }
  }