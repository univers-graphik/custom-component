'use strict'

/**
 * Slideshow
 */
const imagesAll = document.querySelectorAll('.jsSlideShowImage')
let slideIndex = 0
const duration = 5000
const automaticSlideShow = () => {
  for (let i = 0; i < imagesAll.length; i++) {
    (item => {
      item.style.opacity = '0'
    })(imagesAll[i])
  }
  slideIndex++
  // Reinit index
  if (slideIndex > imagesAll.length) slideIndex = 1
  // Showing current item
  imagesAll[slideIndex - 1].style.opacity = '1'

  // Automatic
  setTimeout(automaticSlideShow, duration)
}

// Run
if (imagesAll.length) automaticSlideShow()
