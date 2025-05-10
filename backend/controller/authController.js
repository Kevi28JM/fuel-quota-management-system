const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");

// uer registration
exports.register = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    // Check if user already exists
      const [existingUser] = await pool.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    if (existingUser.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    await pool.execute(
      "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)",
      [username, email, hashedPassword, role]
    );

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// User login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [users] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);

    if (users.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = users[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Determine redirect path based on role
    let redirectPath = "";
    switch (user.role) {
      case "admin":
        redirectPath = "/admin";
        break;
      case "vehicleOwner":
        redirectPath = "/vehicle";
        break;
      case "stationOwner":
        redirectPath = "/station";
        break;
      default:
        redirectPath = "/"; // default fallback
    }

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      redirectPath,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
