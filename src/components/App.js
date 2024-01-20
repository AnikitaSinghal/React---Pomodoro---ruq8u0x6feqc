import React, { useState, useRef } from "react";
import '../styles/App.css';

const App = () => {
  const [workDuration, setWorkDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const [time, setTime] = useState(workDuration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isWorkTime, setIsWorkTime] = useState(true);

  const intervalRef = useRef();

  const startTimer = () => {
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime === 0) {
          handleTimerEnd();
          return isWorkTime ? breakDuration * 60 : workDuration * 60;
        } else {
          return prevTime - 1;
        }
      });
    }, 1000);
  };

  const stopTimer = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
  };

  const resetTimer = () => {
    stopTimer();
    setTime(workDuration * 60);
    setIsWorkTime(true);
  };

  const handleTimerEnd = () => {
    alert(`Time's up! ${isWorkTime ? 'Take a break!' : 'Get back to work!'}`);
    setIsWorkTime(!isWorkTime);
  };

  const setDurations = () => {
    stopTimer();
    const newWorkDuration = Math.max(1, parseInt(document.querySelector('[data-testid=work-duration]').value) || 25);
    const newBreakDuration = Math.max(1, parseInt(document.querySelector('[data-testid=break-duration]').value) || 5);

    setWorkDuration(newWorkDuration);
    setBreakDuration(newBreakDuration);

    setTime(newWorkDuration * 60);
    setIsWorkTime(true);
  };

  const isInputValid = (value) => {
    return !isNaN(value) && value >= 0;
  };

  const startButtonDisabled = !isInputValid(workDuration) || !isInputValid(breakDuration) || isRunning;
  const resetButtonDisabled = !isRunning;
  const setButtonDisabled = isRunning;
  const inputFieldsDisabled = isRunning;

  return (
    <>
      <div id="main">
        <h1>{isWorkTime ? 'Work-Time' : 'Break-Time'}</h1>
        <button data-testid='start-btn' onClick={startTimer} disabled={startButtonDisabled}>
          Start
        </button>
        <button data-testid='stop-btn' onClick={stopTimer} disabled={!isRunning}>
          Stop
        </button>
        <button data-testid='reset-btn' onClick={resetTimer} disabled={resetButtonDisabled}>
          Reset
        </button>
        <input
          data-testid='work-duration'
          type="number"
          min="1"
          defaultValue={workDuration}
          disabled={inputFieldsDisabled}
          placeholder="Work Duration (minutes)"
        />
        <input
          data-testid='break-duration'
          type="number"
          min="1"
          defaultValue={breakDuration}
          disabled={inputFieldsDisabled}
          placeholder="Break Duration (minutes)"
        />
        <button data-testid='set-btn' onClick={setDurations} disabled={setButtonDisabled}>
          Set
        </button>
      </div>
    </>
  );
};

export default App;
