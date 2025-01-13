import React, { useState } from "react";
import "./App.css";
const App = () => {
  const [input, setInput] = useState("");

  const handleClick = (value) => {
    if (value === "C") {
      setInput("");
    } else if (value === "=") {
      try {
        if (input.trim() === "") {
          setInput("Error");
        } else {
          const result = eval(input);
          setInput(result.toString());
        }
      } catch (error) {
        setInput("Error");
      }
    } else {
      setInput((prev) => prev + value);
    }
  };

  return (
    <div className="calculator">
      <input type="text" value={input} readOnly className="display" />
      <div className="buttons">
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
