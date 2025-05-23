const pool = require('../config/db');

const getPendingStationOwnersFromDB = async () => {
  const [owners] = await pool.execute("SELECT * FROM pending_station_and_owner");
  return owners;
};

module.exports = {
  getPendingStationOwnersFromDB,
};
