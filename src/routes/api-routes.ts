import * as express from "express";
import db from "../models/index";
import { InventoryInstance } from "../models/repository/inventory";

const router = express.Router();

// Create all our routes and set up logic within those routes where required.
router.get("/", (req, res) => {
    db.Inventory.findAll({ raw: true })
        .then((inventory: InventoryInstance[]) => {
            const burgers = {
                burgers: inventory,
            };

            res.render("index", burgers);
        })
        .catch((err) => { res.status(500).json({ err: ["oops", err] }); });
});

router.get("/api/burger/:id", (req, res) => {
    db.Inventory.findOne({
        raw: true,
        where: {
            id: req.params.id,
        },
    })
        .then((inventory: InventoryInstance) => {
            const burgers = {
                burgers: inventory,
            };

            res.status(200).json(inventory);
        })
        .catch((err) => { res.status(500).json({ err: ["oops", err] }); });
});

router.post("/api/burger", (req, res) => {
    db.Inventory.create(req.body)
        .then((response: any) => res.status(200).json({ id: response.insertId }))
        .catch((err) => res.status(500).json({ err: ["oops", err] }));
});

router.put("/api/burger/:id", (req, res) => {
    db.Inventory.update(req.body, {
        where: { id: req.params.id },
    })
        .then((response) => res.status(200).json(response))
        .catch((err) => res.status(500).json({ err: ["oops", err] }));
});

export default router;
