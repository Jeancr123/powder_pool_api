const { Conversation, ConversationMessage, Carpool, User } = require('../models/index');

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
        // {
        //   model: Carpool,
        //   include: [
        //     {
        //       model: User,
        //       as: 'creator',
        //       attributes: ['id', 'firstName', 'lastName', 'email']
        //     },
        //     {
        //       model: User,
        //       as: 'participants',
        //       attributes: ['id', 'firstName', 'lastName', 'email'],
        //       through: { attributes: [] }
        //     }
        //   ]
        // }
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
