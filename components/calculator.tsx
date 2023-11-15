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
    <div className="max-w-xs mx-auto bg-gray-200 p-4 rounded-lg shadow-md m-12">
      <p className="text-xs text-center my-2">Calculator by dafex301</p>
      <div
        id="currentDisplay"
        className="bg-black relative text-white p-4 pt-8 text-right text-2xl font-bold rounded mb-4"
      >
        <div
          id="calculation"
          className="text-xs text-gray-400 text-right font-bold rounded mb-1 absolute top-3 right-4"
        >
          {result !== null && result}
          {calculation !== null && calculation}
          {!["+", "-", "x", "/"].includes(currentDisplay) &&
            currentDisplay !== "0" &&
            currentDisplay}
        </div>
        {currentDisplay}
      </div>
      <div className="grid grid-cols-4 gap-2">
        <button
          onClick={() => handleButtonClick("C")}
          id="clear"
          className="col-span-2 bg-red-600 text-white font-bold py-2 rounded hover:bg-red-800 transition-all"
        >
          AC
        </button>
        <button
          onClick={() => handleButtonClick("/")}
          id="divide"
          className="bg-gray-600 text-white font-bold py-2 rounded hover:bg-gray-800 transition-all"
        >
          /
        </button>
        <button
          onClick={() => handleButtonClick("x")}
          id="multiply"
          className="bg-gray-600 text-white font-bold py-2 rounded hover:bg-gray-800 transition-all"
        >
          x
        </button>
        {["7", "8", "9", "-", "4", "5", "6", "+", "1", "2", "3"].map(
          (number) => (
            <button
              key={number}
              onClick={() => handleButtonClick(number)}
              id={number}
              className={
                !["+", "-"].includes(number)
                  ? "bg-gray-700 text-white font-bold py-2 rounded hover:bg-gray-800 transition-all"
                  : "bg-gray-600 text-white font-bold py-2 rounded hover:bg-gray-700 transition-all"
              }
            >
              {number}
            </button>
          )
        )}
        <button
          onClick={() => handleButtonClick("=")}
          id="equals"
          className="col-span-1 row-span-2 bg-blue-700 hover:bg-blue-900 transition-all text-white font-bold py-2 rounded"
        >
          =
        </button>
        <button
          onClick={() => handleButtonClick("0")}
          id="zero"
          className="col-span-2 bg-gray-700 text-white font-bold py-2 rounded hover:bg-gray-800 transition-all"
        >
          0
        </button>
        <button
          onClick={() => handleButtonClick(".")}
          id="decimal"
          className="bg-gray-700 text-white font-bold py-2 rounded hover:bg-gray-800 transition-all"
        >
          .
        </button>
      </div>
    </div>
  );
};

export default Calculator;
