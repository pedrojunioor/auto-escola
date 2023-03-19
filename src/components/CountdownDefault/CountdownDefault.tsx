import React, { useState, useEffect, useRef } from 'react';
import './CountdownDefault.scss'

import Countdown, { CountdownApi } from 'react-countdown';

export const CountdownDefault = () => {
  // countdownApi: CountdownApi | null = null;
  let countdownApi: CountdownApi
  const [st, setSt] = useState({ date: Date.now() + 10000 })
  const [ct, setCt] = useState<any>(undefined)


  const handleStartClick = () => {
    // console.log('->', isPaused())
    countdownApi.start();
  };

  const handlePauseClick = () => {
    // console.log('->', isPaused())
    countdownApi.pause();
  };

  const handleResetClick = () => {
    setSt({ date: Date.now() + 10000 });
  };

  const handleUpdate = () => {
    if (ct !== undefined) {
      ct.forceUpdate();
    }
  };

  const setRef = (countdown: Countdown | null): void => {
    if (countdown) {
      setCt(countdown)
      countdownApi = countdown.getApi();
    }
  };

  function isPaused() {
    return !!(countdownApi && countdownApi.isPaused());
  }

  function isCompleted() {
    return !!(countdownApi && countdownApi.isCompleted());
  }

  return (
    <>
      <Countdown
        key={st.date}
        ref={setRef}
        date={st.date}
        onMount={handleUpdate}
        onStart={handleUpdate}
        onPause={handleUpdate}
        onComplete={handleUpdate}
        autoStart={false}
      />
      <div>
        <button
          type="button"
          onClick={handleStartClick}
        // disabled={!isPaused() || isCompleted()}
        >
          Start
        </button>{' '}
        <button
          type="button"
          onClick={handlePauseClick}
        // disabled={isPaused() || isCompleted()}
        >
          Pause
        </button>{' '}
        <button type="button" onClick={handleResetClick}>
          Reset
        </button>
      </div>
    </>
  );
}
