import React, { useState } from "react";

function SelectInput({ options, selected, setSelected }) {
  return (
    <div className="bg-white p-[8px] rounded-2xl">
      <select value={selected} onChange={(e) => setSelected(e.target.value)}>
        {Object.entries(options).map(([key, label]) => (
          <option key={key} value={key}>{label}</option>
        ))}
      </select>
    </div>
  );
}

export default SelectInput;