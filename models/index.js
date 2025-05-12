const sequelize = require('../database');

const Resort = require('./resort');
const Carpool = require('./carpool');
const User = require('./user');
const Vehicle = require('./vehicle');
const Conversation = require('./conversation');
const ConversationMessage = require('./conversation_message');

// ------------------------------
// One-to-Many Associations
// ------------------------------

// Vehicles belong to a User
Vehicle.belongsTo(User, { as: 'user', foreignKey: 'userId' });

// A User can create many Carpools
User.hasMany(Carpool, { as: 'createdCarpools', foreignKey: 'createdBy' });

// A Carpool is created by a User
Carpool.belongsTo(User, { as: 'creator', foreignKey: 'createdBy' });

// A Carpool belongs to a Resort
Carpool.belongsTo(Resort, { as: 'resort', foreignKey: 'resortId' });

// Conversation belongs to a Carpool
Conversation.belongsTo(Carpool, { foreignKey: 'carpoolId' });

// A Conversation has many Messages
Conversation.hasMany(ConversationMessage, {
  as: 'messages',
  foreignKey: 'conversationId'
});

// Each Message belongs to a Conversation
ConversationMessage.belongsTo(Conversation, {
  foreignKey: 'conversationId'
});

// Each Message is authored by a User
ConversationMessage.belongsTo(User, {
  as: 'user',
  foreignKey: 'userId'
});

// ------------------------------
// Many-to-Many Associations
// ------------------------------

// Users can join many Carpools
User.belongsToMany(Carpool, {
  through: 'CarpoolUser',
  as: 'joinedCarpools',
  foreignKey: 'userId'
});

// Carpools can have many Riders (Users)
Carpool.belongsToMany(User, {
  through: 'CarpoolUser',
  as: 'participants',
  foreignKey: 'carpoolId'
});

// ------------------------------
// Export Models
// ------------------------------

module.exports = {
  sequelize,
  Resort,
  User,
  Carpool,
  Vehicle,
  Conversation,
  ConversationMessage
};
