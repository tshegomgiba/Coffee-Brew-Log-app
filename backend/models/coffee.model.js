import mongoose from "mongoose";

const CoffeeSchema = new mongoose.Schema({
    beans: {
        type: String,
        required: true,
    },
    method: {
        type: String,
        required: true,
    }  ,
    coffeeGrams: {
        type: Number,
        required: true,
    },
    waterGrams: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    toastingNotes: {
        type: String,
        required: true, 
    },
},
    {

    timestamps: true 

    }
);

const Coffee = mongoose.model("Coffee", CoffeeSchema);


export default Coffee;