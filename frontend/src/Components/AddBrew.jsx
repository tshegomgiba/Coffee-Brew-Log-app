import React, { useState } from "react";
import { useBrewStore } from "../../store/brews";

const AddBrew = () => {
  const [coffee, setCoffee] = useState({
    beans: "",
    method: "",
    coffeeGrams: "",
    waterGrams: "",
    rating: 0,
    toastingNotes: "",
  });

  const { createBrew } = useBrewStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createBrew(coffee);

      alert("Brew created successfully!");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
  <form
  onSubmit={handleSubmit}
  className="max-w-md mx-auto mt-10 bg-white rounded-3xl p-8 shadow-lg"
>
  <h1 className="text-4xl font-light mb-8">Add a brew</h1>

  <label className="block mb-4">
    <span className="block mb-2 text-sm">Beans</span>
    <input
      type="text"
      value={coffee.beans}
      onChange={(e) => setCoffee({ ...coffee, beans: e.target.value })}
      className="w-full border rounded-md p-2"
    />
  </label>

  <label className="block mb-4">
    <span className="block mb-2 text-sm">Method</span>
    <select
      value={coffee.method}
      onChange={(e) => setCoffee({ ...coffee, method: e.target.value })}
      className="w-full border rounded-md p-2"
    >
      <option value="">Select a method</option>
      <option value="Aeropress">Aeropress</option>
      <option value="V60">V60</option>
      <option value="Drip Coffee">Drip Coffee</option>
    </select>
  </label>

  <div className="grid grid-cols-2 gap-4 mb-4">
    <label>
      <span className="block mb-2 text-sm">Coffee grams</span>
      <input
        type="number"
        value={coffee.coffeeGrams}
        onChange={(e) =>
          setCoffee({ ...coffee, coffeeGrams: e.target.value })
        }
        className="w-full border rounded-md p-2"
      />
    </label>

    <label>
      <span className="block mb-2 text-sm">Water grams</span>
      <input
        type="number"
        value={coffee.waterGrams}
        onChange={(e) =>
          setCoffee({ ...coffee, waterGrams: e.target.value })
        }
        className="w-full border rounded-md p-2"
        
      />
    </label>
  </div>

  <label className="block mb-4">
    <span className="block mb-2 text-sm">Rating (out of 5)</span>
    <input
      type="number"
      min="1"
      max="5"
      value={coffee.rating}
      onChange={(e) =>
        setCoffee({ ...coffee, rating: Number(e.target.value) })
      }
      className="w-full border rounded-md p-2"
    />
  </label>

  <label className="block mb-8">
    <span className="block mb-2 text-sm">Tasting notes</span>
    <input
      type="text"
      value={coffee.toastingNotes}
      onChange={(e) =>
        setCoffee({ ...coffee, toastingNotes: e.target.value })
      }
      className="w-full border rounded-md p-2"
    />
  </label>

  <button className="bg-black text-white px-8 py-3 rounded-full">
    Save
  </button>
</form>
  );
};

export default AddBrew;