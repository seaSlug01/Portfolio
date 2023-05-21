import React, {useState, useRef, useMemo, useCallback} from 'react'
import {useSelector} from "react-redux";
import styled, {keyframes} from "styled-components";
import {BsChevronRight, BsChevronLeft} from "react-icons/bs"
import { RxMagnifyingGlass } from "react-icons/rx"
import throttle from "lodash.throttle";

function Gallery({projectId, imageSRCs, index, gallery, closePortal,  ...restProps}) {
  
  const {imageSize} = useSelector(state => state.mediaQuerySize)
  const imgRef = useRef();

  const [currentItem, setCurrentItem] = useState({
    projectId,
    index,
    src: imageSRCs[imageSize]
  })


  const [zoom, setZoom] = useState({
    lens: {
      show: false,
      x: 0,
      y: 0
    },
    cursor: {
      show: false,
      x: 0,
      y: 0,
    }
  })

  const {cursor, lens} = zoom;

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

  const getCursorCordinates = throttle((e) => {
    const parentRect = e.target.parentElement.parentElement.getBoundingClientRect();
    let cursorX = e.clientX - parentRect.left;
    let cursorY =  e.clientY - parentRect.top;

    // console.log(e.target.offsetHeight, Math.abs(e.target.getBoundingClientRect().top - e.clientY))

    // Thelw na 3ekinaei apo to 0 kai na ftanei sto megethos tis eikonas (y)
    // otan einai 0 einai 60% alla oso plhsiazei to katw meros ginetai 0

    // to x na einai deksia 75 kai na ftanei -75 (75 h aktina tou magnifying glass)
    // ara tha einai eite 0 eite 100
    
    const imgRect = e.target.getBoundingClientRect();
    const imageDiffX = e.target.parentElement.nextElementSibling.offsetWidth - imgRect.width;
    let backgroundPositionY = 60 - (((Math.abs(imgRect.top - e.clientY) / imgRect.height) * 100) * 0.6);
    let backgroundPositionX = (Math.abs(imgRect.left - e.clientX) / imgRect.width) * imageDiffX;

    console.log();

    setZoom({
      cursor: {
        show: !lens.show,
        x: cursorX,
        y: cursorY
      },
      lens: {
        ...lens,
        x: (imageDiffX / 2) - backgroundPositionX,
        y: backgroundPositionY,
      }
    })
  }, 30
)
  const getCursorCordinatesCb = useCallback(e => getCursorCordinates(e), [getCursorCordinates])

  return (
    <Container {...restProps}>
        <Controller className="left" onClick={() => changePhoto("left")}>
          <BsChevronLeft />
        </Controller>
        <Controller className="right" onClick={() => changePhoto("right")}>
          <BsChevronRight />
        </Controller>
      <Image onClick={() => setZoom({cursor: {...cursor, show: !lens.show ? false : true}, lens: { ...lens, show: !lens.show }} )}>
        <img ref={imgRef} src={currentItem.src} alt={currentItem.src} onMouseLeave={() => {
          setTimeout(() => {
            setZoom({
              lens: {
                ...lens, show: false
              },
              cursor: {
                ...cursor, show: false
              }
            })
          }, 30)
        }} 
        onMouseMove={(e) => getCursorCordinatesCb(e)}
        />
        <Pointer top={cursor.y} left={cursor.x} show={cursor.show}>
          <RxMagnifyingGlass />
        </Pointer>
      </Image>
      <ZoomContainer>
        <ZoomedImage cursorY={cursor.y} cursorX={cursor.x} show={lens.show} image={currentItem.src} backgroundPositionX={lens.x} backgroundPositionY={lens.y}/>
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

  @media (max-width: 750px) {
    display: none;
  }
`;

const ZoomedImage = styled.div`
  width: 100%;
  height: 100%;
  clip-path: circle(${props => props.show ? "150px" : 0} at ${props => `${props.cursorX + 75}px`} ${props => `${props.cursorY + 75}px`});
  background-image: url(${props => props.image});
  background-size: contain;
  background-position: calc(${props => `${props.backgroundPositionX}px`}) calc(${props => `${props.backgroundPositionY}%`} + 75px);
  background-repeat: no-repeat;
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
  height: 40vw;
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

