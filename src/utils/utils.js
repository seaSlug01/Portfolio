import {projects} from "../db";

export function randomNumBetween(min, max) {  
  return Math.floor(
    Math.random() * (max - min + 1) + min
  )
}

export function randomHeadingColor() {
  const colors = ["blue", "violet", "orange", "green"]

  return colors[randomNumBetween(0, 3)]
}

export const getEveryProjectsImages = () => {
  let images = []

  for(let project of projects.slice(0, 3)) {
    const projectId = project.id;
    let projectImages = project.images.map(imgEl => ({images: imgEl.src, projectId}))

    images = images.concat(projectImages)
  }
  return images;
}

export function getContainedSize(img) {
    var ratio = img.naturalWidth/img.naturalHeight
    var containedWidth = img.height*ratio
    var containedHeight = img.height
    if (containedWidth > img.width) {
      containedWidth = img.width
      containedHeight = img.width/ratio
    }
    return {containedWidth, containedHeight, width: img.width, height: img.height}
}


export function closePortalOnCertainViewPort(e, viewport, closeFn) {
  if(window.matchMedia(`(max-width: ${viewport})`).matches && e.target === e.currentTarget) {
    closeFn()
  }
} 