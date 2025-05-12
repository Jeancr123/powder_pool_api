const sequelize = require("../database");
const Resort = require("./resort");
const Carpool = require("./carpool");
const User = require("./user");
const Vehicle = require("./vehicle");
const Conversation = require("./conversation");
const ConversationMessage = require("./conversation_message");

Vehicle.belongsTo(User);
Carpool.hasMany(User, {as: 'users'});
Carpool.belongsTo(Resort);
ConversationMessage.belongsTo(Conversation);
ConversationMessage.belongsTo(User);
User.hasMany(Carpool, {as: 'carpools'});

  module.exports = {
    Resort,
    User,
    Carpool,
    Vehicle,
    Conversation,
    ConversationMessage,
  }