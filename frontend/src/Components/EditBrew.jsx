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
    <form onSubmit={handleSubmit}>
      <h1>Edit Brew</h1>

      <input
        value={coffee.beans}
        onChange={(e) =>
          setCoffee({ ...coffee, beans: e.target.value })
        }
      />

      <select
        value={coffee.method}
        onChange={(e) =>
          setCoffee({ ...coffee, method: e.target.value })
        }
      >
        <option value="Aeropress">Aeropress</option>
        <option value="V60">V60</option>
        <option value="Drip coffee">Drip coffee</option>
      </select>

      <input
        type="number"
        value={coffee.coffeeGrams}
        onChange={(e) =>
          setCoffee({ ...coffee, coffeeGrams: e.target.value })
        }
      />

      <input
        type="number"
        value={coffee.waterGrams}
        onChange={(e) =>
          setCoffee({ ...coffee, waterGrams: e.target.value })
        }
      />

      <input
        type="number"
        value={coffee.rating}
        onChange={(e) =>
          setCoffee({ ...coffee, rating: Number(e.target.value) })
        }
      />

      <input
        value={coffee.toastingNotes}
        onChange={(e) =>
          setCoffee({ ...coffee, toastingNotes: e.target.value })
        }
      />

      <button type="button" onClick={handleDelete}>
        Delete
      </button>

      <button type="submit">
        Save
      </button>
    </form>
  );
};

export default EditBrew;