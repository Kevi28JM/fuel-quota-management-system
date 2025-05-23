const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const stationOwnerRoutes = require("./routes/station_ownerroutes");
const stationRoutes = require("./routes/station");
const vehicleRoutes = require('./routes/vehicle');
const vehicleOwnerRoutes = require('./routes/vehicleOwnerroutes');
const adminRoutes = require("./routes/adminroutes");
const stationOwnersRoutes = require('./routes/stationOwnersRoutes');
const stationOperatorRoute = require('./routes/stationOperatorRoute');
const workerroutes = require('./routes/workerroutes');
const fuelTransactionRoutes = require('./routes/fuelTransaction');
const stationLogRoutes = require('./routes/stationLogs');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/stationOperator', stationOperatorRoute);
app.use("/api/station_owner", stationOwnerRoutes);
app.use("/api/vehicle_owner", vehicleOwnerRoutes);
app.use("/station", stationRoutes); 
app.use("/api/admin", adminRoutes);
app.use('/api/vehicle', vehicleRoutes);
app.use("/api/station-owners", stationOwnersRoutes);
app.use("/api/workers", workerroutes);
app.use('/api/fuel', fuelTransactionRoutes);
app.use('/api/station', stationLogRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
