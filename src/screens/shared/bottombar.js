import React from "react";
// import { Link } from "react-router-dom";
import { FiLayout, FiLayers, FiPlus, FiSearch, FiBell } from "react-icons/fi";

function BottomBar() {
  return (
    <div className="fixed bottom-0 flex lg:hidden flex-row w-full py-3 text-white justify-evenly items-center bg-primary">
      <div className="flex flex-row items-center gap-2">
        <FiLayout size={21} />
      </div>
      <div className="flex flex-row items-center gap-2">
        <FiLayers size={21} />
      </div>
      <div className="p-1.5 flex flex-row justify-center items-center bg-pink2 rounded-lg">
        <FiPlus size={21} />
      </div>
      <div className="flex flex-row items-center gap-2">
        <FiSearch size={21} />
      </div>
      <div className="flex flex-row items-center gap-2">
        <FiBell size={21} />
      </div>
    </div>
  );
}

export default BottomBar;
