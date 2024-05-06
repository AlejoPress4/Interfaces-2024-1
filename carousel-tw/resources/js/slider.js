export default class Slider {
  #currentIndex = 0
  #autoplayInterval = null

  constructor(config) {
    ;(async () => await this.#createSlider(config))()
  }

  async #createSlider(config) {
    // cargar el array de datos de la presentación
    const response = await fetch(config.gallery) // <<<<< OJO con el uso de config.gallery
    const gallery = await response.json()

    // crear el html de los slider mediante un forEach()
    let htmlImages = ''
    gallery.forEach(item => {
      htmlImages += `
        <figure class="gallery-item m-0 min-w-full box-border">
            <header class= "flex justify-center w-full absolute text-[white] font-[bold] pt-2.5 pb-[5px] px-0 top-0;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.8), transparent">${item.title}</header>
            <img class="w-full block" src="${item.image}" alt="Imagen 1">
            <figcaption class="flex w-full absolute text-[white] bg-[linear-gradient(to_top,rgba(0,0,0,1),rgba(0,0,0,0.2))] text-[80%] box-border px-2.5 py-[15px] top-[91%]">
              <!--  ***** OJO con el uso de config.visibleDescription ***** -->
              <div class="long-text whitespace-nowrap overflow-hidden text-ellipsis text-justify">${config.visibleDescription ? item.description : ''}</div>
            </figcaption>
        </figure>
      `
    })

    // Agregar los slider
    const htmlGallery = `
      <section id="gallery" class=" max-w-[99%] overflow-hidden absolute m-auto">
        <div class="gallery-container flex transition-transform duration-[0.5s] ease-[ease-in-out]">${htmlImages}</div>
        <nav class="gallery-navigation flex justify-between w-[calc(100%_-_40px)] absolute -translate-y-2/4 mx-5 my-0 top-2/4">
            <button class="nav-button prev-button bg-[rgba(0,0,0,0.3)] text-[white] cursor-pointer px-5 py-2.5 rounded-[5px] border-[none] hover:bg-[#005f5f]"><span class="text-3xl">&#60;</span></button>
            <button class="nav-button next-button bg-[rgba(0,0,0,0.3)] text-[white] cursor-pointer px-5 py-2.5 rounded-[5px] border-[none] hover:bg-[#005f5f]"><span class="text-3xl">&#62;</span></button>
        </nav>
      </section>`

    document.querySelector(config.container).innerHTML = htmlGallery // <<<<< OJO con el uso de config.container

    document.querySelector('.prev-button').addEventListener('click', () => this.#navigate(-1))
    document.querySelector('.next-button').addEventListener('click', () => this.#navigate(1))

    // Opcional: Detener autoplay cuando el usuario interactúa con los botones de navegación.
    document.querySelectorAll('.nav-button').forEach(button => {
      button.addEventListener('click', () => clearInterval(this.#autoplayInterval))
    })

    this.#startAutoplay(config.interval) // <<<<< OJO con el uso de config.interval
  }

  #navigate(direction) {
    const galleryContainer = document.querySelector('.gallery-container')
    const totalImages = document.querySelectorAll('.gallery-item').length

    this.#currentIndex = (this.#currentIndex + direction + totalImages) % totalImages
    const offset = -this.#currentIndex * 100

    galleryContainer.style.transform = 'translateX(${offset}%)'
  }

  #startAutoplay(interval) {
    clearInterval(this.#autoplayInterval) // Detiene cualquier autoplay anterior para evitar múltiples intervalos.
    this.#autoplayInterval = setInterval(() => {
      this.#navigate(1) // Navega a la siguiente imagen cada intervalo de tiempo.
    }, interval)
  }

  // get id de la galería
  // get el objeto JSON de los elementos
  // get un elemento en particular
  // agregar un elemento
  // quitar un elemento
  // reemplazar los elementos
}