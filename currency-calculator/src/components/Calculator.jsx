import React, { useEffect, useState } from "react";

export default function Calculator() {
  const [display, setDisplay] = useState("");
  const calcButtons = ["1", "2", "3", "+", "4", "5", "6", "-", "7", "8", "9", "*", "C", "0", "=", "/"];

  function calc(input) {
    if (input === "C") {
      setDisplay("");
    } else if (input === "=") {
      try {
        const result = eval(display);

        setDisplay(result);
        console.log(result);
      } catch  {
        setDisplay("Error");
        
        setTimeout(() => {
          setDisplay("");
          
        }, 1000)
        
      }
    } else {
      setDisplay(display + input);
    }
  }

  return (
    <>
      <div className="flex flex-col items-center gap-5 p-5 bg-blue-300 border rounded-md  text-white">
      <input type="text" value={display} disabled className="p-2 text-xl text-center border rounded bg-blue-500" />
      <div className="grid grid-cols-4 gap-2">
        {calcButtons.map((button, index) => (
          <button key={index} onClick={() => calc(button)} className="p-3 text-xl bg-blue-500 text-white rounded-lg hover:bg-blue-600 active:bg-blue-700">
            {button}
          </button>
        ))}

      </div>
      </div>
    </>
  );
}
