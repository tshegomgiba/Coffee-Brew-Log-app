import Coffee from "../models/coffee.model.js";



export const getAllCoffees = async (req, res) => {
    try {
        const coffees = await Coffee.find();
        res.status(200).json(coffees);
    } catch (error) {
        res.status(500).json({ message: "Error fetching coffees." });
    }
};


export const createCoffee =  async (req, res) => {
    const coffee = req.body

    if (!coffee.beans || !coffee.method || !coffee.coffeeGrams  || !coffee.waterGrams || !coffee.rating || !coffee.toastingNotes) {
        return res.status(400).json({ message: "Please provide all required fields for the coffee." });
    }

  const newCoffee = new Coffee(coffee);

   try {
    await newCoffee.save();
    res.status(201).json(newCoffee);
   } catch (error) {     
    res.status(500).json({ message: "Error saving coffee." });
   }
};


export const deleteCoffee =  async (req, res) => {
    const coffeeId = req.params.id;

    try {
        const deletedCoffee = await Coffee.findByIdAndDelete(coffeeId);

        if (!deletedCoffee) {
            return res.status(404).json({ message: "Coffee not found." });
        }

        res.status(200).json({ message: "Coffee deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: "Error deleting coffee." });
    }
};


export const updateCoffee = async (req, res) => {
    const coffeeId = req.params.id;
    const updatedData = req.body;

    try {
        const updatedCoffee = await Coffee.findByIdAndUpdate(coffeeId, updatedData, { new: true });

        if (!updatedCoffee) {
            return res.status(404).json({ message: "Coffee not found." });
        }

        res.status(200).json(updatedCoffee);
    } catch (error) {
        res.status(500).json({ message: "Error updating coffee." });
    }
};