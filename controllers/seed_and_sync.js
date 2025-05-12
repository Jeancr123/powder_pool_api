const sequelize = require("../database");
const carpoolSeeds = require("../dev-data/carpools");
const resortSeeds = require("../dev-data/resorts");
const userSeeds = require("../dev-data/users");
const { User, Resort, Carpool } = require("../models");

module.exports = (req, res, next) => {
    try {
      var userIds = []
      var resortIds = []

        sequelize.sync({force: true}).then(() => {
            userSeeds.map((e) => {
              var newUser = User.create(e)
              userIds.push(newUser.id)
            })
            resortSeeds.map((e) => {
              var newResort = Resort.create(e)
              resortIds.push(newResort.id)
            })

            var adjustedCarpools = carpoolSeeds.map((e) => {
              e.creatorId = userIds[Math.floor(Math.random() * userIds.length)]
              e.resortId = resortIds[Math.floor(Math.random() * resortIds.length)]
              return e
            })

            adjustedCarpools.map((e) => {
              Carpool.create(e)
            })


          })
          return res.json({'message': 'completed'})
    } catch (e) {
        return res.status(500).json({ error: 'internal_server_error' });
    }
  };