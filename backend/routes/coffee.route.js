import express from "express";
import { createCoffee, getAllCoffees ,deleteCoffee,updateCoffee } from "../controller/brews.controller.js";


const router = express.Router();

router.get("/",getAllCoffees);
router.post("/", createCoffee);
router.delete("/:id",deleteCoffee); 
router.put("/:id", updateCoffee);

export default router;