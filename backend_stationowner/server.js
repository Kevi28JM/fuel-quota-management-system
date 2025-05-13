const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const stationRoutes = require("./routes/station");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/stations", stationRoutes); 

const PORT = 5002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
