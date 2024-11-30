import React, { useState } from "react";
import { entrada } from "../utils/data";
import { formatTime, getHighestNonZeroIndex } from "../utils/function";

export const HorizontalBar = ({ username, hours, onHourChange, teamWork, shiftDurationes, phours, isSelecting, setIsSelecting, startSelection, setStartSelection, handleMouseUp, id }) => {

  const handleMouseDown = (index) => {
    setStartSelection(index);
    setIsSelecting(true);
  };

  const handleMouseEnter = (index) => {
    if (isSelecting && startSelection !== null) {
      const selectionStart = Math.min(startSelection, index);
      const selectionEnd = Math.max(startSelection, index);
      const isStartSelected = hours[startSelection] !== "Null" || hours[startSelection] === "PTO";

      for (let i = selectionStart; i <= selectionEnd; i++) {
        if (isInputDisabled(i)) {
          continue;
        }
        onHourChange(i, isStartSelected ? entrada[i] : "Null");
      }
    }
  };



  const handleClick = (index, isChecked) => {
    onHourChange(index, isChecked ? entrada[index] : "Null");
  };


  const isInputDisabled = (index) => {
    const highestIndex = getHighestNonZeroIndex(phours);
    return highestIndex >= (index + 48) ? true : false;
  }

  const getCursorClass = (isDisabled, value) => {
    if (isDisabled) return 'cursor-not-allowed opacity-30';
    if (value == "PTO")  return 'cursor-not-allowed opacity-30';
    return 'cursor-pointer';
  };
  
  const getBackgroundClass = (value) => {
    if (value === "PTO") return 'bg-red-300 '; 
    if (value === "Null") return 'bg-neutral-200';
    return 'bg-indigo-500'; 
  };



  return (
    <>
      <td className="text-base font-semibold text-gray-800">{teamWork}</td>
      <td 
      className="text-base font-semibold text-gray-800">
        <button onClick={()=>console.log(username, teamWork, id)} >{username}</button>
        </td>
      {hours && hours.map((value, index) => (
        <td
          className={`relative md:w-24 w-12 text-center align-bottom ${index % 4 === 3 ? 'border-45-height' : ''}`}
          key={index}
        >
          <input
            type="checkbox"
            className={`w-4 h-4 p-0 m-0 appearance-none border border-gray-400 rounded-3xl 
              ${getCursorClass(isInputDisabled(index), value)} 
              ${getBackgroundClass(value)} 
              relative`}
            checked={value !== "Null" && value !== "PTO"}
            onChange={(event) => handleClick(index, event.target.checked)}
            disabled={isInputDisabled(index) || value === "PTO"}
            onMouseDown={() => handleMouseDown(index)}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseUp={handleMouseUp}
          />
          {index % 4 === 3 && (
            <div className="absolute right-0 top-1/2 h-1/2 bg-slate-400" style={{ zIndex: -1, width: 1 }}></div>
          )}
        </td>
      ))}
      <td className="w-12 pl-2 align-bottom">{formatTime(shiftDurationes)}</td>
    </>
  );
};
