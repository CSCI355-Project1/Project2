const express = require("express");
const app = express();
const { resolve } = require("path");
const dotenv = require("dotenv");
const cors = require('cors');

app.use(cors());

dotenv.config({ path: "./.env" });

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2022-08-01",
});

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

app.listen(3000, () =>
    console.log(`Node server listening at http://localhost:3000`)
);
