import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [input, setInput] = useState("");

  const handleClick = (value) => {
    if (value === "C") {
      setInput(""); // Clear everything
    } else if (value === "=") {
      handleCalculation(); // Evaluate the expression
    } else {
      setInput(input + value); // Append clicked button value
    }
  };

  const handleCalculation = () => {
    try {
      if (input.trim() === "") {
        setInput("Error");
        return;
      }

      if (/^[0-9+\-*/.() ]+$/.test(input)) {
        if (input === "0/0") {
          setInput("NaN"); // Handle specific edge case
          return;
        }

        const result = Function(`"use strict"; return (${input})`)(); // Evaluate safely
        setInput(result === Infinity ? "Infinity" : result.toString()); // Handle divide by 0
      } else {
        setInput("Error"); // Invalid expression
      }
    } catch {
      setInput("Error"); // Catch any unexpected issues
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
