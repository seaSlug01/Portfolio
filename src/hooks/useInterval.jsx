import { useEffect, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import { addInterval } from "../store/setIntervalSlice"

function useInterval(callback, intervalName, delay) {
  const savedCallback = useRef()
  const dispatch = useDispatch()
  const animationIsRunning = useSelector(
    (state) => state.intervals[intervalName]?.isRunning || null
  )
  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    dispatch(addInterval({ name: intervalName, delay }))
  }, [dispatch, delay, intervalName])

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current()
    }
    if (delay !== null && animationIsRunning) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay, animationIsRunning])
}

export default useInterval
