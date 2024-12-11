const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/players", require("./routes/playerRoutes"));
app.use("/api/matches", require("./routes/matchRoutes"));
app.use("/api/teams", require("./routes/teamRoutes"));

// Root Route
app.get("/", (req, res) => {
  res.send("Welcome to the API");
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Something broke!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
