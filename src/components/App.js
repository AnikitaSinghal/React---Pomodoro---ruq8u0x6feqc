import React, { useState, useRef, useEffect } from "react";
import "../styles/App.css";

const App = () => {
  const [workDuration, setWorkDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const [time, setTime] = useState(workDuration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isWorkTime, setIsWorkTime] = useState(true);
  const [startButtonDisabled, setStartButtonDisabled] = useState(false);
  const [resetButtonDisabled, setResetButtonDisabled] = useState(true);
  const [setButtonDisabled, setSetButtonDisabled] = useState(false);
  const [inputFieldsDisabled, setInputFieldsDisabled] = useState(false);

  const intervalRef = useRef();

  useEffect(() => {
    setTime((isWorkTime ? workDuration : breakDuration) * 60);
  }, [workDuration, breakDuration, isWorkTime]);

  const startTimer = () => {
    setIsRunning(true);
    setStartButtonDisabled(true);
    setResetButtonDisabled(false);
    setSetButtonDisabled(true);
    setInputFieldsDisabled(true);

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
    setStartButtonDisabled(false);
    setResetButtonDisabled(true);
    setInputFieldsDisabled(false);
    setSetButtonDisabled(false);
  };

  const resetTimer = () => {
    stopTimer();
    setIsWorkTime(true);
    setTime(workDuration * 60);
    setStartButtonDisabled(false);
    setResetButtonDisabled(true);
    setSetButtonDisabled(false);
  };

  const handleTimerEnd = () => {
    alert(`Time's up! ${isWorkTime ? "Take a break!" : "Get back to work!"}`);
    setIsWorkTime(!isWorkTime);
  };

  const setDurations = () => {
    const newWorkDuration = Math.max(1, parseInt(document.querySelector('[data-testid=work-duration]').value, 10)) || 25;
    const newBreakDuration = Math.max(1, parseInt(document.querySelector('[data-testid=break-duration]').value, 10)) || 5;

    if (newWorkDuration === 0 && newBreakDuration === 0) {
      setWorkDuration(25);
      setBreakDuration(5);
    } else {
      setWorkDuration(newWorkDuration);
      setBreakDuration(newBreakDuration);
    }
  };

  return (
    <div id="main">
      <h1>{isWorkTime ? "Work-Time" : "Break-Time"}</h1>
      <button data-testid="start-btn" onClick={startTimer} disabled={startButtonDisabled}>
        Start
      </button>
      <button data-testid="stop-btn" onClick={stopTimer} disabled={!isRunning}>
        Stop
      </button>
      <button data-testid="reset-btn" onClick={resetTimer} disabled={resetButtonDisabled}>
        Reset
      </button>
      <input
        data-testid="work-duration"
        type="number"
        min="1"
        value={workDuration}
        onChange={(e) => setWorkDuration(Math.max(1, parseInt(e.target.value, 10)))}
        disabled={inputFieldsDisabled}
        placeholder="Work Duration (minutes)"
      />
      <input
        data-testid="break-duration"
        type="number"
        min="1"
        value={breakDuration}
        onChange={(e) => setBreakDuration(Math.max(1, parseInt(e.target.value, 10)))}
        disabled={inputFieldsDisabled}
        placeholder="Break Duration (minutes)"
      />
      <button data-testid="set-btn" onClick={setDurations} disabled={setButtonDisabled}>
        Set
      </button>
      <div data-testid="timer">{`${Math.floor(time / 60)
        .toString()
        .padStart(2, "0")}:${(time % 60).toString().padStart(2, "0")}`}</div>
    </div>
  );
};

export default App;
