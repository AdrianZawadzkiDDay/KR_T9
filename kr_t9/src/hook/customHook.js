import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
​
import "./styles.css";
​
function customHook() {
  const [counter, setCounter] = useState(1);
  useInterval(() => {
    setCounter(prev => prev + 1);
  }, 1000);
  return (
    <div className="App">
      <h1>Custom hook example</h1>
      Current: {counter}
    </div>
  );
}
​
function useInterval(callback, delay) {
  const intervalId = useRef();
​
  useEffect(() => {
    intervalId.current = setInterval(callback, delay);
    return () => {
      console.log("custom hook working");
      clearInterval(intervalId.current);
    };
  }, []);
}