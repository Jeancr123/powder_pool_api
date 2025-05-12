const {User} = require('../models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



module.exports = async (req, res) => {
    const userJson = req.body;
    console.log(userJson)
  
    try {
      const existingUser = await User.findOne({ where: { email: userJson.email } });
      if (existingUser) {
        return res.status(409).json({ error: 'email_already_in_use' });
      }

       userJson.password = await bcrypt.hash(userJson.password, 10);
       console.log('Hashed password before saving:', userJson.password);

      const newUser = await User.create(userJson);

      const token = jwt.sign(
        { userId: newUser.id, userEmail: newUser.email },
        process.env.JWT_KEY,
        { expiresIn: '1h' }
      );

      return res.status(201).json({ token });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ error: 'internal_server_error' });
    }
};