const { Conversation, ConversationMessage, Carpool, User, Resort } = require('../models/index');

module.exports = async (req, res) => {
  try {
    const { carpoolId } = req.params;

    console.log('carpoolId:', carpoolId);

    const conversation = await Conversation.findOne({
      where: { carpoolId },
      include: [
        {
          model: ConversationMessage,
          as: 'messages', // must match alias from Conversation.hasMany(...)
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['id', 'firstName', 'lastName', 'email']
            }
          ]
        },
        {
          model: Carpool,
          as: 'carpool',
          attributes: ['id', 'name', 'description', 'meetupAddress', 'meetUpCity', 'meetUpState', 'meetUpZipCode', 'resortId', 'departureDate', 'departureTime', 'returningDate', 'returningTime'],
          include: [
            {
              model: Resort,
              as: 'resort',
              attributes: ['id', 'name', 'address', 'city', 'state', 'zipCode', 'description', 'imageUrl']
            },
          ]
        }
      ]
    });

    if (!conversation) {
      return res.status(200).json([]);
    }

    return res.status(200).json(conversation);
  } catch (error) {
    console.error('Error fetching conversation:', error);
    return res.status(500).json({ error: 'internal_server_error' });
  }
};
