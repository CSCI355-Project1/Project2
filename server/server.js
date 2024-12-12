const express = require("express");
const cors = require('cors');
const { resolve } = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

const app = express();
const port = 3000;

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2022-08-01",
});

//app.use(cors());
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

app.use(express.static(process.env.STATIC_DIR));

app.get("/", (req, res) => {
    const path = resolve(process.env.STATIC_DIR + "/index.html");
    res.sendFile(path);
});

app.get("/config", (req, res) => {
    res.send({
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    });
});

app.post("/create-payment-intent", async (req, res) => {
    try {
        const { totalPrice } = req.body;

        if (!totalPrice || isNaN(totalPrice)) {
            return res.status(400).send({ error: { message: "Invalid total price." } });
        }
        const paymentIntent = await stripe.paymentIntents.create({
            currency: "USD",
            amount: totalPrice,
        });
        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (e) {
        return res.status(400).send({
            error: {
                message: e.message,
            },
        });
    }
});

const helloRoute = require("./endpoints/hello");
// const usersRoute = require("./endpoints/users");
const transactionsSeller = require("./endpoints/transactionsSeller");
const transactionsBuyer = require("./endpoints/transactionsBuyer");
const createProduct = require("./endpoints/createListing");
const getListings = require("./endpoints/getListings");
const removeListing = require("./endpoints/removeListing");
const getProducts = require("./endpoints/getProducts");
const eventsNew = require("./endpoints/eventsNew");
const eventsGet = require("./endpoints/eventsGet");
const getNotifications = require("./endpoints/getNotifications");
const enrollNotifications = require("./endpoints/enrollNotifications");
const dismissNotification = require("./endpoints/dismissNotification");

app.use("/api/", helloRoute);
// app.use("/api/users", usersRoute);
app.use("/api/transactions/seller", transactionsSeller);
app.use("/api/transactions/buyer", transactionsBuyer);
app.use("/api/products/create", createProduct);
app.use("/api/products/listings", getListings);
app.use("/api/products", getProducts);
app.use("/api/events/new", eventsNew);
app.use("/api/events", eventsGet);
app.use("/api/notifications", getNotifications);
app.use("/api/notifications/enroll", enrollNotifications);
app.use("/api/notifications/dismiss", dismissNotification);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
