import React, { useEffect } from "react";
import { useBrewStore } from "../../store/brews";
import { Link } from "react-router-dom";
const BrewLog = () => {
  const { brews, fetchBrews } = useBrewStore();

  useEffect(() => {
    fetchBrews();
  }, []);

  return (
    <div>
      <h1>Brew Log</h1>

     <Link to="/add">
  <button>Add</button>
</Link>

      <select>
        <option>Filter by method</option>
        <option>Aeropress</option>
        <option>Drip Coffee</option>
        <option>V60</option>
      </select>

      <div>
        {brews.map((coffee) => (
          <div key={coffee._id}>
            <h3>{coffee.beans}</h3>
            <p>Rating: {coffee.rating}/5</p>
            <p>Method: {coffee.method}</p>
            <p>Coffee: {coffee.coffeeGrams}g</p>
            <p>Water: {coffee.waterGrams}g</p>

     <Link to={`/edit/${coffee._id}`}>
  <button>Edit</button>
</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrewLog;