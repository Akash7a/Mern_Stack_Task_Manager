require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./config/db");
const taskRoutes = require("./routes/TaskRoutes");
const errorHandler = require("./middleware/errorHandler");

connectDB();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", taskRoutes);
app.use(errorHandler);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));