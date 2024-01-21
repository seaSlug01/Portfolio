import throttle from "lodash.throttle";
import {setMediaQuerySize} from "../store/mediaQuerySlice";


export const getWindowWidth = throttle((dispatch) => {

  if(window.matchMedia('(min-width: 1480px)').matches) {
    return dispatch(setMediaQuerySize({size: 4}))
  }
 
  if(window.matchMedia('(min-width: 1280px)').matches) {
    return dispatch(setMediaQuerySize({size: 3}))
  }

  if(window.matchMedia('(min-width: 601px)').matches) {
    return dispatch(setMediaQuerySize({size: 2}))
  }

  if(window.matchMedia('(max-width: 600px)').matches) {
    dispatch(setMediaQuerySize({size: 1}))
  }
}, 500)