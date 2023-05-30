import { useEffect, useRef } from 'react';
import {useSelector} from "react-redux";

function useInterval(callback, delay) {
  const savedCallback = useRef();
  const animationIsRunning = useSelector(state => state.wheelInterval.isRunning);
  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null && animationIsRunning) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay, animationIsRunning]);
}

export default useInterval