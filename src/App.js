import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(""); // New state for the result

  const handleClick = (value) => {
    if (value === "C") {
      setInput(""); // Clear input field
      setResult(""); // Clear result
    } else if (value === "=") {
      handleCalculation(); // Perform calculation and update result
    } else {
      setInput(input + value); // Update input with clicked button value
    }
  };

  const handleCalculation = () => {
    try {
      if (input.trim() === "") {
        setResult("Error"); // Handle empty input
        return;
      }

      if (/^[0-9+\-*/.() ]+$/.test(input)) {
        if (input === "0/0") {
          setResult("NaN"); // Handle specific edge case
          return;
        }

        const calculatedResult = Function(`"use strict"; return (${input})`)(); // Safely evaluate expression
        setResult(calculatedResult === Infinity ? "Infinity" : calculatedResult.toString()); // Handle divide by zero
      } else {
        setResult("Error"); // Handle invalid expression
      }
    } catch {
      setResult("Error"); // Catch unexpected errors
    }
  };

  return (
    <div className="calculator">
      <h1>React Calculator</h1>
      <input
        type="text"
        value={input}
        readOnly
        className="calculator-input"
      />
      <div className="result">{result}</div> {/* Separate result display */}
      <div className="calculator-buttons">
        {["7", "8", "9", "+", "4", "5", "6", "-", "1", "2", "3", "*", "C", "0", "=", "/"].map((button) => (
          <button
            key={button}
            onClick={() => handleClick(button)}
            className="calculator-button"
          >
            {button}
          </button>
        ))}
      </div>
    </div>
  );
};

export default App;
