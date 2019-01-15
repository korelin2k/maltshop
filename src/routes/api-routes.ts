import * as express from "express";
import db from "../models/index";
import { CustomerInstance } from "../models/repository/customer";
import { InventoryInstance } from "../models/repository/inventory";

const router = express.Router();

// Create all our routes and set up logic within those routes where required.
router.get("/", (req, res) => {
    db.Inventory.findAll({ raw: true })
        .then((inventory: InventoryInstance[]) => {
            const allBurgers = {
                burgers: inventory,
            };

            db.Customer.findAll(
                {
                    include: [{ model: db.Inventory }],
                    raw: true,
                },
            )
                .then((customer: CustomerInstance[]) => {
                    const allCustomers = {
                        customers: customer,
                    };

                    console.log(customer);
                    res.render("index", { burgers: inventory, customers: customer });
                });
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

router.post("/api/customer/", (req, res) => {
    db.Customer.create(req.body)
        .then((response) => res.status(200).json(response))
        .catch((err) => res.status(500).json({ err: ["oops", err] }));
});

router.get("/api/customer/:id", (req, res) => {
    db.Customer.findOne({
        include: [{
            model: db.Inventory,
        }],
        raw: true,
        where: {
            id: req.params.id,
        },
    })
        .then((customer: CustomerInstance) => {
            res.status(200).json(customer);
        })
        .catch((err) => { res.status(500).json({ err: ["oops", err] }); });
});

export default router;
