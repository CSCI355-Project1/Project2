const express = require("express");
const { resolve } = require("path");
const env = require("dotenv").config({ path: "./.env" })

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();
const port = 3000;

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
        const { amount } = req.body;
        const paymentIntent = await stripe.paymentIntent.create({
            amount: amount,
            currency: "usd",
        });
        res.send({
            clientSecret: paymentIntent.client_secret
        });
    }
    catch (e) {
        console.error("Error in creating payment intent:", e.message);
        return res.status(400).send({
            error: {
                message: e.message,
            }
        });
    }
});

app.listen(port, () => {
    console.log(`Node server listening at http://localhost:${port}`)
});
