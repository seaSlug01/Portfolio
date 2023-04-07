import { useEffect, useRef, useState } from 'react';

function useInterval(callback, delay) {
  const savedCallback = useRef();
  const [intervalId, setIntervalId] = useState(null);
  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      setIntervalId(id);
      return () => clearInterval(id);
    }
  }, [delay]);


  return {id: intervalId}
}

export default useInterval