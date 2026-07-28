import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBrewStore } from "../../store/brews";

const EditBrew = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { brews, updateBrew, deleteBrew, fetchBrews } = useBrewStore();

  const [coffee, setCoffee] = useState({
    beans: "",
    method: "",
    coffeeGrams: "",
    waterGrams: "",
    rating: 0,
    toastingNotes: "",
  });

  useEffect(() => {
    fetchBrews();
  }, []);

  useEffect(() => {
    const brew = brews.find((brew) => brew._id === id);

    if (brew) {
      setCoffee(brew);
    }
  }, [brews, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateBrew(id, coffee);
      alert("Brew updated!");
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteBrew(id);
      alert("Brew deleted!");
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (

  <form
    onSubmit={handleSubmit}
    className="max-w-md mx-auto mt-10 bg-white rounded-3xl p-8 shadow-lg"
  >
    <h1 className="text-4xl font-light mb-8">Edit a brew</h1>

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
        <option value="Aeropress">Aeropress</option>
        <option value="V60">V60</option>
        <option value="Drip coffee">Drip coffee</option>
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

    <div className="flex justify-between">
      <button
        type="button"
        onClick={handleDelete}
        className="bg-red-600 text-white px-8 py-3 rounded-full hover:bg-red-700"
      >
        Delete
      </button>

      <button
        type="submit"
        className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800"
      >
        Save
      </button>
    </div>
  </form>
);

};

export default EditBrew;