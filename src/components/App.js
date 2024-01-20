import React, { useState, useEffect } from "react";
import "../styles/App.css";

const App = () => {
  const [workDuration, setWorkDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const [timer, setTimer] = useState(null);
  const [isWorkTime, setIsWorkTime] = useState(true);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    resetClock();
  }, [workDuration, breakDuration]);

  const startClock = () => {
    setIsRunning(true);
    setTimer(
      setInterval(() => {
        if (isWorkTime) {
          if (workDuration > 0) {
            setWorkDuration((prev) => prev - 1);
          } else {
            setIsWorkTime(false);
            setBreakDuration(5); // Reset break duration
          }
        } else {
          if (breakDuration > 0) {
            setBreakDuration((prev) => prev - 1);
          } else {
            setIsWorkTime(true);
            setWorkDuration(25); // Reset work duration
          }
        }
      }, 1000)
    );
  };

  const stopClock = () => {
    clearInterval(timer);
    setIsRunning(false);
  };

  const resetClock = () => {
    clearInterval(timer);
    setIsRunning(false);
    setIsWorkTime(true);
    setWorkDuration(25);
    setBreakDuration(5);
  };

  const handleStart = () => {
    startClock();
  };

  const handleStop = () => {
    stopClock();
  };

  const handleReset = () => {
    resetClock();
  };

  return (
    <div id="main">
      <h1>{isWorkTime ? "Work-Time" : "Break-Time"}</h1>
      <button data-testid="start-btn" onClick={handleStart} disabled={isRunning}>
        Start
      </button>
      <button data-testid="stop-btn" onClick={handleStop} disabled={!isRunning}>
        Stop
      </button>
      <button data-testid="reset-btn" onClick={handleReset} disabled={isRunning}>
        Reset
      </button>
      <input
        type="number"
        data-testid="work-duration"
        value={workDuration}
        onChange={(e) => setWorkDuration(Math.max(0, parseInt(e.target.value, 10)))}
        disabled={isRunning}
      />
      <input
        type="number"
        data-testid="break-duration"
        value={breakDuration}
        onChange={(e) => setBreakDuration(Math.max(0, parseInt(e.target.value, 10)))}
        disabled={isRunning}
      />
      <button
        data-testid="set-btn"
        onClick={() => {
          if (!isRunning) startClock();
        }}
        disabled={isRunning}
      >
        Set
      </button>
    </div>
  );
};

export default App;
