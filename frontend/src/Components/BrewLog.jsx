import React, { useEffect } from "react";
import { useBrewStore } from "../../store/brews";
import { Link } from "react-router-dom";
const BrewLog = () => {
  const { brews, fetchBrews } = useBrewStore();

  useEffect(() => {
    fetchBrews();
  }, []);

  return (
   <div className="max-w-md mx-auto bg-white rounded-3xl p-6 shadow-lg">
  <div className="flex justify-between items-center mb-5">
    <h1 className="text-3xl font-light">Brew Log</h1>

    <Link to="/add">
      <button className="bg-black text-white px-6 py-2 rounded-full">
        Add
      </button>
    </Link>
  </div>

  <select className="w-full border rounded-full p-3 mb-4">
    <option>Filter by method</option>
  </select>

  {brews.map((coffee) => (
    <div
      key={coffee._id}
      className="flex items-center justify-between border-t py-4"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-orange-400 border flex items-center justify-center">
          {coffee.rating}
        </div>

        <div>
          <h3 className="font-semibold">{coffee.beans}</h3>

          <div className="flex gap-2 text-xs mt-1">
            <span className="border rounded-full px-2">{coffee.method}</span>
            <span className="border rounded-full px-2">☕ {coffee.coffeeGrams}g</span>
            <span className="border rounded-full px-2">💧 {coffee.waterGrams}g</span>
          </div>
        </div>
      </div>

      <Link to={`/edit/${coffee._id}`}>
        ✏️
      </Link>
    </div>
  ))}
</div>
  );
};

export default BrewLog;