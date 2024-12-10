const express = require('express');
const sequelize = require('./Util/database');
const DogProfile = require('./Models/DogProfileSchema');
const bodyParser = require('body-parser');
const cors = require('cors');
const DogUserRouter = require('./Routes/DogUsers');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/dogUser', DogUserRouter);

app.use(bodyParser.urlencoded({ extended: false }));


const startserver = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully!!");

    // Synchronize models and schema
    await sequelize.sync({ alter: true });  // 🔥 Use 'alter' to update table structure safely
    console.log("✅ Database Synchronized!!");

    // Start server only after successful DB connection & sync
    app.listen(4000, () => {
      console.log("✅ Server up at port 4000");
    });
  } catch (err) {
    console.error("❌ Database connection or synchronization failed:", err);
    process.exit(1); // Exit process if DB connection or sync fails
  }
};

startserver();
