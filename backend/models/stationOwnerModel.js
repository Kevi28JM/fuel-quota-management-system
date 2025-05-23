const db = require('../config/db'); // Your database connection pool

exports.fetchPendingOwners = async () => {
  const [rows] = await db.query('SELECT * FROM pending_station_and_owner WHERE Status = "Pending"');
  return rows;
};

exports.approveOwner = async (ownerId) => {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    // 1. Get pending owner
    const [ownerRows] = await connection.query('SELECT * FROM pending_station_and_owner WHERE ID = ?', [ownerId]);
    if (ownerRows.length === 0) throw new Error('Owner not found');

    const owner = ownerRows[0];

    // 2. Insert into station_owner
    await connection.query(`
      INSERT INTO station_owner (OwnerID, OwnerName, Email, Phone, NIC, Password, RegistrationDate, Status)
      VALUES (?, ?, ?, ?, ?, ?, ?, 'Approved')
    `, [
      owner.ID,
      owner.OwnerName,
      owner.Email,
      owner.Phone,
      owner.NIC,
      owner.Password,
      owner.RegistrationDate
    ]);

    // 3. Insert into stations
    await connection.query(`
      INSERT INTO stations (owner_id, name, location, capacity)
      VALUES (?, ?, ?, ?)
    `, [
      owner.ID,
      owner.StationName,
      owner.Location,
      owner.Capacity
    ]);

    // 4. Delete from pending table
    await connection.query('DELETE FROM pending_station_and_owner WHERE ID = ?', [ownerId]);

    await connection.commit();
  } catch (err) {
    await connection.rollback();
    throw err;
  } finally {
    connection.release();
  }
};

exports.rejectOwner = async (ownerId) => {
  await db.query('DELETE FROM pending_station_and_owner WHERE ID = ?', [ownerId]);
};
