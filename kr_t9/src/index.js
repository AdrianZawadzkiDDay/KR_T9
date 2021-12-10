import React, { useState, useEffect, useReducer } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

function fib2(n) {
  if (n <= 1) {
    return [n - 1, n];
  }
  const [fNminus2, fNminus1] = fib2(n - 1);
  return [fNminus1, fNminus2 + fNminus1];
}

function fibbonnacciReducer(prevFibs, action) {
  if (action.type === "GET_INITIAL_FIBS") {
    console.log("GET_INITIAL_FIBS");
    const { initialN } = action;
    const [prev, current] = fib2(initialN);
    console.log(current);
    return {
      prev,
      current,
      next: prev + current,
      n: initialN
    };
  }
  if (action.type === "INCREMENT_N") {
    return {
      n: prevFibs.n + 1,
      prev: prevFibs.current,
      current: prevFibs.next,
      next: prevFibs.current + prevFibs.next
    };
  }
  if (action.type === "DECREMENT_N") {
    return {
      n: prevFibs.n - 1,
      prev: prevFibs.current - prevFibs.prev,
      current: prevFibs.prev,
      next: prevFibs.current
    };
  }

  if (action.type === "RESET") {
    const { initialN } = action;
    const [prev, current] = fib2(initialN);
    return {
      prev,
      current,
      next: prev + current,
      n: initialN
    };
  }

  return prevFibs;
}

const FIBO_INIT = {
  prev: 0,
  current: 0,
  next: 0,
  n: 0
};
function initFibbo(initial) {
  return FIBO_INIT;
}

function FibonacciCounter({ initialN }) {
  console.log("GET_INITIAL_FIBS");
  const [fibbo, fibboDispatch] = useReducer(
    fibbonnacciReducer,
    initialN,
    initFibbo
  );
  console.log(fibbo);
  const { current, n } = fibbo;

  useEffect(() => {
    document.title = `I've calculated ${current}`;
  }, [current]);

  useEffect(() => {
    fibboDispatch({ type: "GET_INITIAL_FIBS", initialN });
  }, []);

  return (
    <div>
      <h1>
        fibbo({n}) == {current}
      </h1>
      <button onClick={() => fibboDispatch({ type: "INCREMENT_N" })}>
        <h2>+1</h2>
      </button>
      <button onClick={() => fibboDispatch({ type: "DECREMENT_N" })}>
        <h2>-1</h2>
      </button>
      <button onClick={() => fibboDispatch({ type: "RESET", initialN })}>
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
      <FibonacciCounter initialN={41} />
      <button onClick={() => setSpyOnUser(prev => !prev)}>
        Toggle spying on user
      </button>
      {spyOnUser && <TimeOnPage />}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
