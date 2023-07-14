const express = require('express');
const userRoutes= require("./routes/userRoutes")
const userRoles = require("./routes/roleRoutes")
const projectRoutes = require("./routes/projectRoutes")
const projectById = require("./routes/projectByIdRoute")
const taskRoute = require("./routes/taskRoute");
require('dotenv').config();
const db = require('./models');
const cors = require('cors');
 const app = express();
 app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:false}))
 const port = process.env.PORT || 7000;

 app.use("/api/users",userRoutes);
 app.use("/api/users",userRoles);
 app.use("/api/users", projectRoutes);
 app.use("/api/users", projectById);
 app.use('/api/tasks', taskRoute);
db.sequelize.sync().then(() => {
    app.listen(port, () => {
           console.log(`SERVER RUNNING ON PORT ${port}`);
          });
});
