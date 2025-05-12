const sequelize = require("../database");
const carpoolSeeds = require("../dev-data/carpools");
const resortSeeds = require("../dev-data/resorts");
const userSeeds = require("../dev-data/users");
const { User, Resort, Carpool } = require("../models");

module.exports = async (req, res, next) => {
  try {
    await sequelize.sync({ force: true });

    const newUsers = await Promise.all(userSeeds.map((e) => User.create(e)));
    const userIds = newUsers.map((u) => u.id);

    const newResorts = await Promise.all(resortSeeds.map((e) => Resort.create(e)));
    const resortIds = newResorts.map((r) => r.id);

    const adjustedCarpools = carpoolSeeds.map((e) => {
      return {
        ...e,
        createdBy: userIds[Math.floor(Math.random() * userIds.length)],
        resortId: resortIds[Math.floor(Math.random() * resortIds.length)],
      };
    });

    await Promise.all(adjustedCarpools.map((e) => Carpool.create(e)));

    return res.json({ message: 'completed' });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'internal_server_error' });
  }
};
