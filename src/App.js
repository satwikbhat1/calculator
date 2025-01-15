import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleClick = (value) => {
    if (value === "C") {
      // Fully reset input and output
      setInput("");
      setOutput("");
    } else if (value === "=") {
      try {
        // Handle empty or invalid inputs safely
        if (input.trim() === "") {
          setOutput("Error");
        } else {
          // Avoid unsafe eval in production
          const result = Function(`"use strict"; return (${input})`)();
          setOutput(result.toString());
        }
      } catch (error) {
        setOutput("Error");
      }
    } else {
      const lastChar = input.slice(-1);
      // Prevent multiple consecutive operators
      if (
        ["+", "-", "*", "/"].includes(value) &&
        ["+", "-", "*", "/"].includes(lastChar)
      ) {
        setInput(input.slice(0, -1) + value);
      } else {
        setInput((prev) => prev + value);
        setOutput(""); // Clear output for new inputs
      }
    }
  };

  return (
    <div className="calculator" id="calculator">
      <div className="display">
        <div className="input-display" id="input">
          Input: {input || "0"}
        </div>
        <div className="output-display" id="output">
          Output: {output || "0"}
        </div>
      </div>
      <div className="buttons" id="buttons">
        {[
          "7",
          "8",
          "9",
          "+",
          "4",
          "5",
          "6",
          "-",
          "1",
          "2",
          "3",
          "*",
          "C",
          "0",
          "=",
          "/",
        ].map((button) => (
          <button
            key={button}
            id={`btn-${button}`}
            onClick={() => handleClick(button)}
            className={`btn ${button === "C" ? "btn-clear" : ""}`}
          >
            {button}
          </button>
        ))}
      </div>
    </div>
  );
};

export default App;
