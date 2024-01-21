import React, {useState, useEffect, useRef} from 'react'
import {useSelector, useDispatch} from "react-redux";
import styled, {keyframes} from "styled-components";
import throttle from "lodash.throttle";
import {BsChevronRight, BsChevronLeft} from "react-icons/bs"

function Gallery({projectId, imageSRCs, index, gallery, closePortal,  ...restProps}) {
  
  const {imageSize} = useSelector(state => state.mediaQuerySize)
  const imgRef = useRef();

  const [currentItem, setCurrentItem] = useState({
    projectId,
    index,
    src: imageSRCs[imageSize]
  })

  function changePhoto() {
    var targetIndex = cursor.direction === "right" ? currentItem.index + 1 : currentItem.index - 1;
    if(targetIndex === - 1 || targetIndex > gallery.length - 1) return closePortal();

    var nextGalleryItem = gallery[targetIndex];

    console.log(nextGalleryItem)
    setCurrentItem({
      projectId: nextGalleryItem.id,
      index: targetIndex,
      src: nextGalleryItem.images[imageSize]
    })

    console.log("clicked")
  }

  const [cursor, setCursor] = useState({
    direction: "",
    x: 0,
    y: 0
  })

  const getCursorPosition = throttle((e) => {
    var rect = e.target.getBoundingClientRect();

    const x = e.clientX - rect.left;

    const direction = x > (rect.width / 2) ? "right" : "left";

    console.log(direction)
    
    setCursor({
      direction,
      x,
      y: e.clientY - rect.top
    })
  }, 100)

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
      <Image ref={imgRef} onClick={changePhoto}>
        <img src={currentItem.src} alt={currentItem.src} />
        <Pointer top={cursor.y} left={cursor.x} scale={cursor.scale} direction={cursor.direction}>
          {cursor.direction === "right" ? <BsChevronRight /> : <BsChevronLeft />}
        </Pointer>
      </Image>
      
    </Container>
  )
}

export default Gallery

const Pointer = styled.div.attrs(props => ({
  style: {
    top:`${props.top}px`,
    left: `${props.left}px`
  },
}))`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(49 103 255 / 47%);
  position: absolute;
  transition: all 0.5s ease;
  transform: translate(-50%, -50%) scale(0);
  pointer-events: none;
  box-shadow: 0px 0px 5px rgba(0,0,0, 0.5);

  svg {
    font-size: 2rem;
    position: relative;
    left: ${props => props.direction === "right" ? "0.1rem" : "-0.1rem"};
    transition: 0.5s all ease;
    -webkit-filter: drop-shadow(0px 0px 2px rgba(0, 0, 0, .7));
    filter: drop-shadow(0px 0px 2px rgba(0, 0, 0, .7));
  }

  @media (max-width: 775px) {
    width: 2.5rem;
    height: 2.5rem;

    svg {
      font-size: 1.5rem;
    }
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
  cursor: pointer;
  user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -o-user-select: none;

  img {
    pointer-events: none;
    max-height: 80vh;
  }

  &:hover {
    ${Pointer} {
      transform: translate(-50%, -50%) scale(1);
    }
  }
`;

const Container = styled.div`
  width: 50rem;
  animation: ${props => scaleUp(props.cordinates.top, props.cordinates.left, props.cordinates.width / 800)} 0.5s ease-in-out forwards;
  transform-origin: 0 0;
  background: rgb(62, 62, 62, 0.5);
  backdrop-filter: blur(2px);
  border: 1px solid #6464644d;
  overflow: hidden;
  border-radius: 4px;
`;

