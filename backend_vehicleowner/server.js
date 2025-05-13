const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const vehicleRoutes = require('./routes/vehicle');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use('/api/vehicle', vehicleRoutes);

const PORT = 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
