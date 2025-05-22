const pool = require('../config/db');

// Get pending station owners (aliasing Ownerid as id)
exports.getPendingStationOwners = async (req, res) => {
  try {
    const [owners] = await pool.execute(
      "SELECT Ownerid AS id, OwnerName AS name, Email AS email, Phone AS phoneNumber, NIC AS nicNumber, Status AS status FROM station_owner"
    );
    res.status(200).json(owners);
  } catch (error) {
    console.error("Error fetching pending station owners:", error);
    res.status(500).json({ message: error.message || "Failed to fetch pending station owners." });
  }
};

// Approve a station owner by updating the Status column to "Approved"
exports.approveStationOwner = async (req, res) => {
  console.log('Request body:', req.body);
  const { id } = req.body;
  if (id === undefined) {
    return res.status(400).json({ message: "Missing required parameter 'id'." });
  }
  try {
    const [result] = await pool.execute(
      "UPDATE station_owner SET Status = ? WHERE Ownerid = ?",
      ["Approved", id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Station owner not found." });
    }
    res.status(200).json({ message: "Station owner approved successfully." });
  } catch (error) {
    console.error("Error approving station owner:", error);
    res.status(500).json({ message: error.message || "Failed to approve station owner." });
  }
};

// Reject a station owner by updating the Status column to "Rejected"
exports.rejectStationOwner = async (req, res) => {
  console.log('Request body:', req.body);
  const { id } = req.body;
  if (id === undefined) {
    return res.status(400).json({ message: "Missing required parameter 'id'." });
  }
  try {
    const [result] = await pool.execute(
      "UPDATE station_owner SET Status = ? WHERE Ownerid = ?",
      ["Rejected", id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Station owner not found." });
    }
    res.status(200).json({ message: "Station owner rejected successfully." });
  } catch (error) {
    console.error("Error rejecting station owner:", error);
    res.status(500).json({ message: error.message || "Failed to reject station owner." });
  }
};

// Remove a station owner from the system (using DELETE and URL parameter)
exports.removeStationOwner = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Missing required parameter 'id'." });
  }
  try {
    const [result] = await pool.execute(
      "DELETE FROM station_owner WHERE Ownerid = ?",
      [id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Station owner not found." });
    }
    res.status(200).json({ message: "Station owner removed successfully." });
  } catch (error) {
    console.error("Error removing station owner:", error);
    res.status(500).json({ message: error.message || "Failed to remove station owner." });
  }
};