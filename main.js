const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");

const dns = require("dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const dbConnection = require("./config/dbconnection.config");

const skillRoutes = require("./router/skill.router");
const userRoutes = require("./router/user.router");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/skills", skillRoutes);
app.use("/api/users", userRoutes);

dbConnection();
app.listen(process.env.port, () => {
    console.log(`Server running on ${process.env.port}`);
});