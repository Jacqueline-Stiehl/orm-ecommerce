const express = require("express");
const routes = require("./routes");
// import sequelize connection
const sequelize = require("./config/connection");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

const syncValue = process.env.NODE_ENV === "production" ? false : false;

//sync sequelize models to the database, then turn on the server
sequelize.sync({ force: syncValue }).then(() => {
  app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});

// sequelize.sync({ force: false }).then(() => {
//   app.listen(PORT, () => console.log("Now listening"));
// });
