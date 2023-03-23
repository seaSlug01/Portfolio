import throttle from "lodash.throttle";
import {setMediaQuerySize} from "../store/mediaQuerySlice";


export const getWindowWidth = throttle((dispatch) => {

  if(window.matchMedia('(min-width: 1480px)').matches) {
    console.log("Im large")
    return dispatch(setMediaQuerySize({size: 4}))
  }
 
  if(window.matchMedia('(min-width: 1280px)').matches) {
    console.log("Im large")
    return dispatch(setMediaQuerySize({size: 3}))
  }

  if(window.matchMedia('(min-width: 601px)').matches) {
    console.log("Im medium")
    return dispatch(setMediaQuerySize({size: 2}))
  }

  if(window.matchMedia('(max-width: 600px)').matches) {
    console.log("Im small")
    dispatch(setMediaQuerySize({size: 1}))
  }
}, 500)