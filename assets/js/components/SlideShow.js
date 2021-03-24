export default class SlideShow extends HTMLElement {
  constructor () {
    super()
    this.duration = parseInt(this.getAttribute('duration'), 10) || 2000
    this.items = this.hasAttribute('items') ? this.getAttribute('items').replace(/\s/g, '').split(/,(?!\\s)/) : []

    this.shadow = this.attachShadow({ mode: 'closed' })
    this.shadow.innerHTML = this.getItems()
    this.shadow.appendChild(this.getStyle())
  }

  getStyle () {
    const style = document.createElement('style')
    style.textContent = `
    :host {
      width: 100%;
      height: 100%;
      display: block;
      position: relative;
    }
    .item {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      overflow: hidden;
      opacity: 0;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      transition: opacity 1s ease-in-out;
    }`

    return style
  }

  getItems () {
    if (!this.items.length) return

    return this.items.map((element) => `<div class="jsItem item" style="background-image: url('${element}')"></div>`).join('')
  }

  connectedCallback () {
    if (!this.items.length) return

    const items = this.shadow.querySelectorAll('.jsItem')
    let slideIndex = 0
    const automaticSlideShow = () => {
      for (const item of items) {
        item.style.opacity = '0'
      }
      slideIndex++
      // Reinit index
      if (slideIndex > items.length) slideIndex = 1
      // Showing current item
      items[slideIndex - 1].style.opacity = '1'

      // Automatic
      this.slider = setTimeout(automaticSlideShow, this.duration)
    }

    // Run
    automaticSlideShow()
  }

  disconnectedCallback () {
    clearTimeout(this.slider)
  }
}

