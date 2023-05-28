import React, {useState, useRef, useEffect, useCallback, useReducer} from 'react'
import {useSelector} from "react-redux";
import styled, {keyframes} from "styled-components";
import {BsChevronRight, BsChevronLeft} from "react-icons/bs"
import { RxMagnifyingGlass } from "react-icons/rx"
import throttle from "lodash.throttle";
import { getContainedSize } from '../utils/utils';




const initialState = {
  lens: {
    show: false,
    imageDiffY: 0,
    imageDiffX: 0,
    x: 0,
    y: 0
  },
  cursor: {
    show: false,
    x: 0,
    y: 0,
  },
  zoomedImageCordinates: {
    width: 0,
    height: 0,
    realWidth: 0,
    realHeight: 0
  }
};

function reducer(state, action) {
  switch (action.type) {
    case 'set_lens':
      return {...state, ...action.payload};
    case 'toggle_lens':
      return {...state, cursor: {...state.cursor, show: !state.lens.show ? false : true}, lens: {...state.lens, show: !state.lens.show}};
    case 'close_lens':
      return {...state, lens: {...state.lens, show: false}, cursor: {...state.cursor, show: false}}
    case 'set_zoomed_image_cordinates':
      return {
        ...state, 
        zoomedImageCordinates: action.payload
      }
    default:
      return state
  }
}

const setContainedSize = (img, dispatch) => {
    if(!img) return;
    const containedSize = getContainedSize(img);

    console.log("Contained size triggers")

    dispatch({type: "set_zoomed_image_cordinates", payload: {
      width: containedSize[0],
      height: containedSize[1],
      realWidth: containedSize[2],
      realHeight: containedSize[3],
    }})
}

function Gallery({projectId, imageSRCs, index, gallery, closePortal,  ...restProps}) {
  const {imageSize} = useSelector(state => state.mediaQuerySize)
  const zoomRef = useRef();

  const [currentItem, setCurrentItem] = useState({
    projectId,
    index,
    src: imageSRCs[imageSize]
  })

  const [zoom, dispatch] = useReducer(reducer, initialState);

  const {cursor, lens, zoomedImageCordinates} = zoom;

  useEffect(() => {
    setContainedSize(zoomRef.current, dispatch);
  }, [currentItem])

  useEffect(() => {

    const throttled = throttle(() => setContainedSize(zoomRef.current, dispatch), 1000)
    const resize = window.addEventListener("resize", throttled);

    return () => {
      window.removeEventListener("resize", resize);
    }
  }, [])


  function changePhoto(direction) {
    var targetIndex = direction === "right" ? currentItem.index + 1 : currentItem.index - 1;
    if(targetIndex === - 1 || targetIndex > gallery.length - 1) return closePortal();

    var nextGalleryItem = gallery[targetIndex];

    setCurrentItem({
      projectId: nextGalleryItem.id,
      index: targetIndex,
      src: nextGalleryItem.images[imageSize]
    })

  }

  const getCursorCordinates = (e) => {
    const parentRect = e.target.parentElement.parentElement.getBoundingClientRect();
    const imgRect = e.target.getBoundingClientRect();
    let cursorX = e.clientX - parentRect.left;
    let cursorY =  e.clientY - parentRect.top;

    const imageDiffX = zoomedImageCordinates.width - imgRect.width;
    let backgroundPositionX = (Math.abs(imgRect.left - e.clientX) / imgRect.width) * imageDiffX;

    const imageDiffY = zoomedImageCordinates.height - imgRect.height;
    const backgroundPositionY = (Math.abs(imgRect.top - e.clientY) / imgRect.height) * imageDiffY;
    // let backgroundPositionY = 60 - (((Math.abs(imgRect.top - e.clientY) / imgRect.height) * 100) * 0.6);

    console.log("Y: ", (e.target.parentElement.offsetHeight - e.target.offsetHeight) / 2, "X: ", (parentRect.width - e.target.offsetWidth) / 2, )

    dispatch({type: "set_lens", payload: {cursor: {
      show: !lens.show,
      x: cursorX,
      y: cursorY
    },
    lens: {
      ...lens,
      offsetY: (e.target.parentElement.offsetHeight - e.target.offsetHeight) / 2,
      offsetX: (parentRect.width - e.target.offsetWidth) / 2,
      imageBgX: ((zoomedImageCordinates.realWidth - zoomedImageCordinates.width) / 2) + ((imageDiffX / 2) - backgroundPositionX),
      imageBgY: (((zoomedImageCordinates.realHeight - zoomedImageCordinates.height) / 2) + ((imageDiffY / 2) - backgroundPositionY)),
    }}})
  }
  const getCursorCordinatesCb = useCallback(getCursorCordinates, [lens, zoomedImageCordinates])

  return (
    <Container {...restProps}>
        <Controller className="left" onClick={() => changePhoto("left")}>
          <BsChevronLeft />
        </Controller>
        <Controller className="right" onClick={() => changePhoto("right")}>
          <BsChevronRight />
        </Controller>
      <Image>
        <img 
          src={currentItem.src} alt={currentItem.src} 
          onMouseLeave={() => dispatch({type: "close_lens"})} 
          onMouseMove={getCursorCordinatesCb}
          onClick={() => dispatch({type: "toggle_lens"})}
        />
        <Pointer top={cursor.y} left={cursor.x} show={cursor.show}>
          <RxMagnifyingGlass />
        </Pointer>
      </Image>
      <ZoomContainer>
          <ZoomedImage ref={zoomRef} 
           cursorY={cursor.y}
           offsetX={lens.offsetX} 
           offsetY={lens.offsetY} 
           cursorX={cursor.x} 
           show={lens.show} 
           backgroundPositionX={lens.imageBgX} 
           backgroundPositionY={lens.imageBgY} 
           src={currentItem.src} />
      </ZoomContainer>
    </Container>
  )
}

export default Gallery

const ZoomContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 110%;
  height: 120%;
  pointer-events: none;
  filter: drop-shadow(0 0 10px rgba(50, 50, 0, 0.5));
  display: flex;
  justify-content: center;
  align-items: center;


  @media (max-width: 750px) {
    display: none;
  }
`;

const ZoomedImage = styled.img`
  /* opacity: 0.5; */
  clip-path: circle(${props => props.show ? "150px" : 0} at ${props => `${(props.cursorX) + 75}px`} ${props => `${(props.cursorY - props.offsetY) + 75}px`});
  max-width: 100%;
  max-height: 100%;
  height: auto;
  object-position: calc(${props => `${props.backgroundPositionX}px`}) calc(${props => `${props.backgroundPositionY}px`});
  object-fit: contain;
`;

const Controller = styled.button`
  position: absolute;
  font-size: 4vw;
  color: white;
  top: 50%;
  transform: translateY(-50%);
  

  &.left {
    left: -4vw;
  }

  &.right {
    right: -4vw;
  }

  @media (max-width: 750px) {
    font-size: 3.5rem;
    

    svg {
      -webkit-filter: drop-shadow(0px 0px 2px rgba(0, 0, 0, .7));
      filter: drop-shadow(0px 0px 2px rgba(0, 0, 0, .7));
    }

    &.left {
      left: 0.5rem;
    }

    &.right {
      right: 0.5rem;
    }
  }
`;

const Pointer = styled.div.attrs(props => ({
  style: {
    top:`${props.top}px`,
    left: `${props.left}px`,
    opacity: props.show ? 1 : 0
  },
}))`

  position: absolute;
  transform: translate(-50%, -50%);
  pointer-events: none;
  

  svg {
    font-size: 3rem;
    color: #bdbdbd;
    position: relative;
    left: ${props => props.direction === "right" ? "0.1rem" : "-0.1rem"};
    transition: 0.5s all ease;
    -webkit-filter: drop-shadow(0px 0px 2px rgba(0, 0, 0, .7));
    filter: drop-shadow(0px 0px 2px rgba(0, 0, 0, .7));
  }

  @media (max-width: 975px) {
    width: 2.5rem;
    height: 2.5rem;

    svg {
      font-size: 1.5rem;
    }
  }

  @media (max-width: 750px) {
    display: none;
  }
`;

const scaleUp = (top, left, scale) => keyframes`
  from {
    top: ${top}px;
    left: ${left}px;
    transform: scale(${scale});
    opacity: 1;
  } to {
    transform: translateX(-50%) scale(1);
    top: 4.7rem;
    left: 50%;
  }
`

const Image = styled.div`
  user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -o-user-select: none;
  width: 70%;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    object-fit: contain;
    max-width: 100%;
    max-height: 100%;
    height: auto;
    cursor: none;
  }

  @media (max-width: 750px) {
    width: 100%;

    &:hover {
      cursor: default;
    }

    img {
      cursor: default;
    }
  }
`;

const Container = styled.div`
  width: 880px;
  height: 80vh;
  animation: ${props => scaleUp(props.cordinates.top, props.cordinates.left, props.cordinates.width / 800)} 0.5s ease-in-out forwards;
  transform-origin: 0 0;
  background: rgb(62, 62, 62, 0.5);
  backdrop-filter: blur(2px);
  overflow: hidden;
  border-radius: 10px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: visible;

  @media (max-width: 975px) {
    width: 100%;
    height: 100%;
    border-radius: none;
  }
`;

