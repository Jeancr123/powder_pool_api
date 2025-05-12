const {ConversationMessage, Conversation, Carpool}  = require('../models/index');

module.exports = async (req, res) => {
    const { userId } = req.user;

    const conversationMessageJson = req.body;
    const conversationMessage = ConversationMessage.build(conversationMessageJson);
    conversationMessage.userId = req.user.userId;



    try {

      // load carpool and make sure that user is a part of it
      // var carpool = await Carpool.findByPk(conversationMessageJson.carpoolId);
      // if (!carpool) {
      //   return res.status(404).json({ error: 'carpool_not_found' });
      // }



        if (!conversationMessageJson.conversationId) {
            if (!conversationMessageJson.carpoolId) {
                return res.status(400).json({ error: 'carpool_id_required' });
            }
            // use carpoolId to find the conversation
            var conversation = await Conversation.findOne({
                where: { carpoolId: conversationMessageJson.carpoolId },
            });

            if (!conversation) {
               conversation = await Conversation.create({
                    carpoolId: conversationMessageJson.carpoolId,
                    status: 'active',
                })
            }

            conversationMessage.conversationId = conversation.id;
        }

      await conversationMessage.save();
      return res.status(200).json({ message: 'carpool_message_added', conversationMessage: conversationMessage });
    } catch (error) {
      console.error('Error updating carpool:', error);
      return res.status(500).json({ error: 'internal_server_error' });
    }
  }