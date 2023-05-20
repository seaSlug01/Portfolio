import React, {useState, useEffect, useRef} from 'react'
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
    show: false,
  })

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

  const [cursor, setCursor] = useState({
    show: false,
    x: 0,
    y: 0
  })

  const getCursorPosition = throttle((e) => {
    var rect = e.target.parentElement.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y =  e.clientY - rect.top; 

    setCursor({
      show: true,
      x,
      y
    })
  }, 35)

  useEffect(() => {
    let cursorUnsub;
    const copyRef = imgRef.current;

    if(copyRef) {
      cursorUnsub = copyRef.addEventListener("mousemove", getCursorPosition)
    }
    

    return () => {
      copyRef.removeEventListener("mouseover", cursorUnsub);
    }
  }, [])

  return (
    <Container {...restProps}>
        <Controller className="left" onClick={() => changePhoto("left")}>
          <BsChevronLeft />
        </Controller>
        <Controller className="right" onClick={() => changePhoto("right")}>
          <BsChevronRight />
        </Controller>
      <Image ref={imgRef} onClick={() => setZoom({show: !zoom.show})} onMouseLeave={() => {
        setZoom({show: false})
        setCursor({...cursor, show: false})
      }}>
        <img src={currentItem.src} alt={currentItem.src} />
        <Pointer top={cursor.y} left={cursor.x} show={cursor.show}>
          <RxMagnifyingGlass />
        </Pointer>
      </Image>
      <ZoomedImageContainer>
        <ZoomedImage y={cursor.y} x={cursor.x} show={zoom.show} image={currentItem.src} />
      </ZoomedImageContainer>
    </Container>
  )
}

export default Gallery

const ZoomedImageContainer = styled.div`
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
  clip-path: circle(${props => props.show ? "150px" : 0} at ${props => `${props.x + 75}px`} ${props => `${props.y + 75}px`});
  background-image: url(${props => props.image});
  background-size: contain;
  background-position: calc(60% + 75px) calc(60% + 75px);
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
    left: `${props.left}px`
  },
}))`

  position: absolute;
  transform: translate(-50%, -50%) scale(0);
  pointer-events: none;
  opacity: ${props => props.show ? 1 : 0};

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
  cursor: none;
  user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -o-user-select: none;
  width: 70%;
  height: 80%;

  img {
    pointer-events: none;
    object-fit: contain;
  }

  &:hover {
    cursor: none;
    ${Pointer} {
      transform: translate(-50%, -50%) scale(1);
    }
  }

  @media (max-width: 750px) {
    width: 100%;

    &:hover {
      cursor: default;
    }

    img {
      pointer-events: all;
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

