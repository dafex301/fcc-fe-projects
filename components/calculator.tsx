"use client";

import React, { useState } from "react";

const Calculator: React.FC = () => {
  const [currentDisplay, setCurrentDisplay] = useState<string>("0");
  const [calculation, setCalculation] = useState<string>("");
  const [shouldResetDisplay, setShouldResetDisplay] = useState<boolean>(true);
  const [result, setResult] = useState<string | null>(null);

  const handleButtonClick = (value: string): void => {
    if (value === "C") {
      setCurrentDisplay("0");
      setCalculation("");
      setShouldResetDisplay(true);
    } else if (["+", "-", "x", "/"].includes(value)) {
      if (!shouldResetDisplay) {
        setCalculation((prev) => prev + currentDisplay);
      }
      setCalculation((prev) => prev + value);
      setShouldResetDisplay(true);
      setCurrentDisplay(value);
    } else if (value === "=") {
      if (calculation) {
        calculate();
      }
    } else {
      updateDisplay(value);
    }

    if (value !== "=") {
      setResult(null);
    }
  };

  const updateDisplay = (value: string): void => {
    if (shouldResetDisplay) {
      setCurrentDisplay(value !== "." ? value : "0.");
      setShouldResetDisplay(false);
    } else {
      setCurrentDisplay((prev) =>
        value === "." && prev.includes(".")
          ? prev
          : value === "0" && prev === "0"
          ? prev
          : prev === "0"
          ? value
          : prev + value
      );
    }
  };

  const calculate = (): void => {
    setCalculation((prev) => prev + currentDisplay);
    const result = eval((calculation + currentDisplay).replace(/x/g, "*"));
    setResult(calculation + currentDisplay + "=");
    setCurrentDisplay(String(result));
    setCalculation("");
    setShouldResetDisplay(true);
  };

  return (
    <div className="max-w-xs mx-auto py-10">
      <div
        id="calculation"
        className="text-xs text-gray-400 p-4 text-right font-bold rounded mb-1"
      >
        {result !== null && result}
        {calculation !== null && calculation}
        {!["+", "-", "x", "/"].includes(currentDisplay) && currentDisplay}
      </div>
      <div
        id="currentDisplay"
        className="bg-black text-white p-4 text-right text-2xl font-bold rounded mb-4"
      >
        {currentDisplay}
      </div>
      <div className="grid grid-cols-4 gap-2">
        <button
          onClick={() => handleButtonClick("C")}
          id="clear"
          className="col-span-2 bg-red-600 text-white font-bold py-2 rounded"
        >
          AC
        </button>
        <button
          onClick={() => handleButtonClick("/")}
          id="divide"
          className="bg-gray-600 text-white font-bold py-2 rounded"
        >
          /
        </button>
        <button
          onClick={() => handleButtonClick("x")}
          id="multiply"
          className="bg-gray-600 text-white font-bold py-2 rounded"
        >
          x
        </button>
        {["7", "8", "9", "-", "4", "5", "6", "+", "1", "2", "3"].map(
          (number) => (
            <button
              key={number}
              onClick={() => handleButtonClick(number)}
              id={number}
              className="bg-gray-700 text-white font-bold py-2 rounded"
            >
              {number}
            </button>
          )
        )}
        <button
          onClick={() => handleButtonClick("=")}
          id="equals"
          className="col-span-1 row-span-2 bg-blue-700 text-white font-bold py-2 rounded"
        >
          =
        </button>
        <button
          onClick={() => handleButtonClick("0")}
          id="zero"
          className="col-span-2 bg-gray-700 text-white font-bold py-2 rounded"
        >
          0
        </button>
        <button
          onClick={() => handleButtonClick(".")}
          id="decimal"
          className="bg-gray-700 text-white font-bold py-2 rounded"
        >
          .
        </button>
      </div>
    </div>
  );
};

export default Calculator;
