import React, { useState } from 'react';
import './App.css';


const App = () => {
    const [input, setInput] = useState('');
    const [result, setResult] = useState('');

    const handleButtonClick = (value) => {
        setInput((prev) => prev + value);
    };

    const handleClear = () => {
        setInput('');
        setResult('');
    };

    const handleCalculate = () => {
        try {
            if (input === '') {
                setResult('Error');
                return;
            }
            const evaluatedResult = eval(input); // Use eval carefully
            if (evaluatedResult === Infinity) {
                setResult('Infinity');
            } else if (Number.isNaN(evaluatedResult)) {
                setResult('NaN');
            } else {
                setResult(evaluatedResult);
            }
        } catch (error) {
            setResult('Error');
        }
    };

    return (
        <div>
            <input type="text" value={input} readOnly />
            <div>
                <button onClick={() => handleButtonClick('1')}>1</button>
                <button onClick={() => handleButtonClick('2')}>2</button>
                <button onClick={() => handleButtonClick('3')}>3</button>
                <button onClick={() => handleButtonClick('+')}>+</button>
                <button onClick={() => handleButtonClick('4')}>4</button>
                <button onClick={() => handleButtonClick('5')}>5</button>
                <button onClick={() => handleButtonClick('6')}>6</button>
                <button onClick={() => handleButtonClick('-')}>-</button>
                <button onClick={() => handleButtonClick('7')}>7</button>
                <button onClick={() => handleButtonClick('8')}>8</button>
                <button onClick={() => handleButtonClick('9')}>9</button>
                <button onClick={() => handleButtonClick('*')}>*</button>
                <button onClick={() => handleButtonClick('0')}>0</button>
                <button onClick={() => handleButtonClick('/')}>&#247;</button>
                <button onClick={handleCalculate}>=</button>
                <button onClick={handleClear}>C</button>
            </div>
            <div>{result}</div>
        </div>
    );
};

export default App;
