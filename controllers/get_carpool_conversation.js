const { Conversation, ConversationMessage, Carpool, User, Resort } = require('../models/index');

module.exports = async (req, res) => {
  try {
    const { carpoolId } = req.params;

    console.log('carpoolId:', carpoolId);

    // we're going to return a carpool object instead, with the conversation messages included
    const carpool = await Carpool.findOne({
      where: { id: carpoolId },
      include: [
        {
          model: Conversation,
          as: 'conversation',
          include: [
            {
              model: ConversationMessage,
              as: 'messages',
              include: [
                {
                  model: User,
                  as: 'user',
                  attributes: ['id', 'firstName', 'lastName', 'email']
                }
              ]
            }
          ]
        },
        {
          model: Resort,
          as: 'resort',
          attributes: ['id', 'name', 'address', 'city', 'state', 'zipCode', 'description', 'imageUrl']
        }
      ]
    });

    if (!carpool) {
      return res.status(200).json({});
    }

    return res.status(200).json(carpool);
  } catch (error) {
    console.error('Error fetching conversation:', error);
    return res.status(500).json({ error: 'internal_server_error' });
  }
};
