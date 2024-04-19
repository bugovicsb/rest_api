const express = require("express");
const router = express.Router();
const Subscriber = require("../models/subscriber");

// get all
router.get("/", async (req, res) => {
    try {
        const subscribers = await Subscriber.find();
        res.json(subscribers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// get one
router.get("/:id", getSubscriber, (req, res) => {
    res.json(res.subscriber);
});

// create
router.post("/", async (req, res) => {
    const subscriber = new Subscriber({
        name: req.body.name,
        subscribeToChannel: req.body.subscribeToChannel,
    });

    try {
        const newSubscriber = await subscriber.save();
        res.status(201).json(newSubscriber);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// update
router.patch("/:id", getSubscriber, async (req, res) => {
    if (req.body.name !== undefined) {
        res.subscriber.name = req.body.name;
    }

    if (req.body.subscribeToChannel !== undefined) {
        res.subscriber.subscribeToChannel = req.body.subscribeToChannel;
    }

    try {
        const updatedSubscriber = await res.subscriber.save();
        res.json(updatedSubscriber);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// delete
router.delete("/:id", getSubscriber, async (req, res) => {
    try {
        await res.subscriber.deleteOne();
        res.json({ message: `Deleted subscriber: ${res.subscriber.name}` });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getSubscriber(req, res, next) {
    let subscriber;
    try {
        subscriber = await Subscriber.findById(req.params.id);
        if (subscriber === null) {
            return res.status(404).json({ message: "Cannot find subscriber" });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.subscriber = subscriber;
    next();
}

module.exports = router;
