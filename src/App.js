import React, { useState } from "react";
import "./App.css"; 

const App = () => {
  const [input, setInput] = useState("");

  const handleClick = (value) => {
    if (value === "C") {
      setInput("");
    } else if (value === "=") {
      try {
        setInput(eval(input).toString()); // Evaluate the input (use cautiously)
      } catch {
        setInput("Error");
      }
    } else {
      setInput(input + value);
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
