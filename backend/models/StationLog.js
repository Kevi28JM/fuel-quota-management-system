const db = require('../config/db'); 

const getLogsByStationId = async (stationId) => {
  const [rows] = await db.execute(
    `SELECT 
      ft.id,
      v.vehicleNumber,
      v.ownerName,
      ft.amount,
      ft.transaction_date,
      so.name AS operatorName,
      s.Current_qatar AS currentQuota
     FROM fuel_transactions ft
     JOIN vehicles v ON ft.vehicle_id = v.id
     JOIN station_operator so ON ft.operator_id = so.id
     JOIN stations s ON ft.station_id = s.id
     WHERE ft.station_id = ?
     ORDER BY ft.transaction_date DESC`,
    [stationId]
  );
  return rows;
};

module.exports = { getLogsByStationId };
