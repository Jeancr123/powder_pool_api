const {User} = require('../models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



module.exports = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ where: { email: email} });
  
      if (!user || !(await bcrypt.compare(password, user.password))) {

        return res.status(401).json({ error: 'Invalid credentials' + user });
      }
  
      const token = jwt.sign({ userId: user.id, userEmail: user.email }, process.env.JWT_KEY, {
        expiresIn: '1h', 
      });
  
      return res.status(200).json({ token });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }