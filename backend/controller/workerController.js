const pool = require('../config/db');

exports.getPendingWorkers = async (req, res) => {
  try {
    const [rows] = await pool.execute(
      "SELECT id, name, nic, email, status FROM station_operator WHERE status = 'pending'"
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching pending workers:", error);
    res.status(500).json({ message: error.message || "Failed to fetch pending workers." });
  }
};

exports.approveWorker = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: "Missing required parameter: id" });
  }
  try {
    const [result] = await pool.execute(
      "UPDATE station_operator SET status = 'approved' WHERE id = ?",
      [id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Worker not found." });
    }
    res.status(200).json({ message: "Worker approved successfully." });
  } catch (error) {
    console.error("Error approving worker:", error);
    res.status(500).json({ message: error.message || "Failed to approve worker." });
  }
};

exports.rejectWorker = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: "Missing required parameter: id" });
  }
  try {
    const [result] = await pool.execute(
      "UPDATE station_operator SET status = 'rejected' WHERE id = ?",
      [id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Worker not found." });
    }
    res.status(200).json({ message: "Worker rejected successfully." });
  } catch (error) {
    console.error("Error rejecting worker:", error);
    res.status(500).json({ message: error.message || "Failed to reject worker." });
  }
};