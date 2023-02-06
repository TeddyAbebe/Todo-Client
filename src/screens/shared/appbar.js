import React from "react";
// import { Link } from "react-router-dom";
import { FiLayout, FiLayers, FiPlus, FiSearch, FiBell } from "react-icons/fi";

function AppBar() {
  return (
    <div className="hidden lg:flex flex-row w-full px-4 py-2 bg-secondary text-white justify-between items-center">
      <div className="flex flex-row gap-3">
        <div className="flex flex-row items-center gap-2">
          <FiLayout />
          <div>Dashboard</div>
        </div>
        <div className="flex flex-row items-center gap-2">
          <FiLayers />
          <div>Collections</div>
        </div>
      </div>

      <div className="flex flex-row gap-5 items-center">
        <div className="w-6 h-6 flex flex-row justify-center items-center bg-pink2 rounded-md">
          <FiPlus />
        </div>
        <div className="flex flex-row items-center gap-2">
          <FiSearch />
        </div>
        <div className="flex flex-row items-center gap-2">
          <FiBell />
        </div>
        <img src="https://www.curlcentric.com/wp-content/uploads/2021/12/Dye-Your-Hair-Black-with-Demi-Permanent-or-Permanent-Dye.jpeg" alt="" className="w-8 h-8 rounded-full object-cover" />
      </div>
    </div>
  );
}

export default AppBar;
