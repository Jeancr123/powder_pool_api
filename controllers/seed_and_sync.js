const sequelize = require("../database");
const resortSeeds = require("../dev-data/resorts");
const userSeeds = require("../dev-data/users");
const { User, Resort } = require("../models");

module.exports = (req, res, next) => {
    try {
        sequelize.sync({force: true}).then(() => {
            userSeeds.map((e) => {
              User.create(e)
            })
            resortSeeds.map((e) => {
              Resort.create(e)
            })
          })
          res.json({'message': 'Completed'})
    } catch (e) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
  };