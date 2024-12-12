const express = require("express");
const cors = require("cors");
const app = express();
const port = 3005;

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "status",
      "max-price",
      "min-price",
    ],
  })
);

app.use(express.json());

const helloRoute = require("./endpoints/hello");
// const usersRoute = require("./endpoints/users");
const transactionsSeller = require("./endpoints/transactionsSeller");
const transactionsBuyer = require("./endpoints/transactionsBuyer");
const createProduct = require("./endpoints/createProduct");
const getProducts = require("./endpoints/getProducts");
const eventsNew = require("./endpoints/eventsNew");
const eventsGet = require("./endpoints/eventsGet");

app.use("/api/", helloRoute);
// app.use("/api/users", usersRoute);
app.use("/api/transactions/seller", transactionsSeller);
app.use("/api/transactions/buyer", transactionsBuyer);
app.use("/api/products/create", createProduct);
app.use("/api/products", getProducts);
app.use("/api/events/new", eventsNew);
app.use("/api/events", eventsGet);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
