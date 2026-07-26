import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import BrewLog from "./Components/BrewLog";
import AddBrew from "./Components/AddBrew";
import EditBrew from "./Components/EditBrew";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BrewLog />} />
        <Route path="/add" element={<AddBrew />} />
        <Route path="/edit/:id" element={<EditBrew />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;