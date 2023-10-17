import React from "react";

const CategoryTabs = () => {
  return (
    <div className="w-full h-8 mb-4 gap-4 flex flex-row items-center justify-between ">
      <div className="w-full bg-yellow-400 rounded-full h-full flex items-center justify-center">
        <h4 className="text-xs">Daily</h4>
      </div>

      <div className="w-full bg-neutral-200 rounded-full h-full flex items-center justify-center">
        <h4 className="text-xs text-white">Weekly</h4>
      </div>

      <div className="w-full bg-neutral-200 rounded-full h-full flex items-center justify-center">
        <h4 className="text-xs text-white">Monthly</h4>
      </div>
    </div>
  );
};

export default CategoryTabs;
