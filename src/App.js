import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [input, setInput] = useState("");

  const handleClick = (value) => {
    if (value === "C") {
      setInput(""); // Clear input
    } else if (value === "=") {
      handleCalculation();
    } else {
      setInput(input + value); // Append the button value to input
    }
  };

  const handleCalculation = () => {
    try {
      // Sanitize and validate input
      if (/^[0-9+\-*/.() ]+$/.test(input)) {
        // Handle division by zero and invalid patterns
        if (input.includes("/0")) {
          setInput("Error");
        } else if (/[\+\-\*/]{2,}/.test(input)) {
          setInput("Error"); // Multiple consecutive operators
        } else if (/[\+\-\*/]$/.test(input)) {
          setInput("Error"); // Trailing operator
        } else {
          const result = Function(`"use strict"; return (${input})`)(); // Evaluate safely
          setInput(result.toString());
        }
      } else {
        setInput("Error");
      }
    } catch (error) {
      setInput("Error"); // Catch any unexpected calculation errors
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
