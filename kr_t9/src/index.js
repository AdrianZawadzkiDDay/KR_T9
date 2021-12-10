import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

function fib(n) {
  if (n <= 1) return n;
  return fib(n - 2) + fib(n - 1);
}

function fib2(n) {
  if (n <= 1) {
    return [n - 1, n];
  }
  const [fNminus2, fNminus1] = fib2(n - 1);
  return [fNminus1, fNminus2 + fNminus1];
}

function useFibonacciCounter(initialN) {
  const [fibs, setFibs] = useState(getInitialFibs);
  const [n, setN] = useState(initialN);
  const currentFibonacciNumber = fibs.current;

  function getInitialFibs() {
    const [prev, current] = fib2(initialN);
    return {
      prev,
      current,
      next: prev + current
    };
  }
  function incrementN() {
    setN(prevN => {
      const newN = prevN + 1;
      setFibs(prevFibs => ({
        prev: prevFibs.current,
        current: prevFibs.next,
        next: prevFibs.current + prevFibs.next
      }));
      return newN;
    });
  }
  function decrementN() {
    setN(prevN => {
      const newN = prevN - 1;
      setFibs(prevFibs => ({
        prev: prevFibs.current - prevFibs.prev,
        current: prevFibs.prev,
        next: prevFibs.current
      }));
      return newN;
    });
  }
  function resetN() {
    setN(initialN);
    setFibs(getInitialFibs);
  }

  return {
    n,
    currentFibonacciNumber,
    incrementN,
    decrementN,
    resetN
  };
}

function FibonacciCounter({ initialN }) {
  const {
    n,
    currentFibonacciNumber,
    incrementN,
    decrementN,
    resetN
  } = useFibonacciCounter(initialN);

  useEffect(() => {
    document.title = `I've calculated ${currentFibonacciNumber}`;
  }, [currentFibonacciNumber]);

  return (
    <div>
      <h1>
        fib({n}) == {currentFibonacciNumber}
      </h1>
      <button onClick={incrementN}>
        <h2>+1</h2>
      </button>
      <button onClick={decrementN}>
        <h2>-1</h2>
      </button>
      <button onClick={resetN}>
        <h2>Reset</h2>
      </button>
    </div>
  );
}

function useTimeOnPage() {
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(
      () => setSecondsElapsed(prev => prev + 1),
      1000
    );
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return secondsElapsed;
}

function TimeOnPage() {
  const secondsElapsed = useTimeOnPage();
  return <h3>You've been watching this page for {secondsElapsed} seconds.</h3>;
}

function App() {
  const [spyOnUser, setSpyOnUser] = useState(false);
  return (
    <div className="App">
      <FibonacciCounter initialN={40} />
      <button onClick={() => setSpyOnUser(prev => !prev)}>
        Toggle spying on user
      </button>
      {spyOnUser && <TimeOnPage />}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
