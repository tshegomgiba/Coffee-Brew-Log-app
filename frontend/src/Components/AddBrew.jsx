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
    <form onSubmit={handleSubmit}>
      <h1>Add a Brew</h1>

      <label>
        Beans
        <input
          type="text"
          value={coffee.beans}
          onChange={(e) =>
            setCoffee({ ...coffee, beans: e.target.value })
          }
        />
      </label>

      <label>
        Method
        <select
          value={coffee.method}
          onChange={(e) =>
            setCoffee({ ...coffee, method: e.target.value })
          }
        >
          <option value="">Select method</option>
          <option value="Aeropress">Aeropress</option>
          <option value="V60">V60</option>
          <option value="Drip Coffee">Drip Coffee</option>
        </select>
      </label>

      <label>
        Coffee Grams
        <input
          type="number"
          value={coffee.coffeeGrams}
          onChange={(e) =>
            setCoffee({ ...coffee, coffeeGrams: e.target.value })
          }
        />
      </label>

      <label>
        Water Grams
        <input
          type="number"
          value={coffee.waterGrams}
          onChange={(e) =>
            setCoffee({ ...coffee, waterGrams: e.target.value })
          }
        />
      </label>

      <label>
        Rating
        <input
          type="number"
          min="1"
          max="5"
          value={coffee.rating}
          onChange={(e) =>
            setCoffee({ ...coffee, rating: Number(e.target.value) })
          }
        />
      </label>

      <label>
        Tasting Notes
        <input
          type="text"
          value={coffee.toastingNotes}
          onChange={(e) =>
            setCoffee({ ...coffee, toastingNotes: e.target.value })
          }
        />
      </label>

      <button type="submit">Save</button>
    </form>
  );
};

export default AddBrew;