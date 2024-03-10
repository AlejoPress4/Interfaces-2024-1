export default class Slider {
  #currentIndex = 0;
  #autoplayInterval = null;

  constructor(config) {
    (async () => await this.#createSlider(config))();
  }

  async #createSlider(config) {
    //Cargar el array de datos de la presentación desde gallery.json => galleryImg
    const galleryImg = await fetch(config.gallery).then((response) =>
      response.json()
    );
    console.log(galleryImg);
    //Intesetar el section al slider
    let slider = "";
    //Recorrer el array gallery agregando a un string el html que represente cada <figure>
    for (const img of galleryImg) {
      //
      slider += `
        <figure>
          <img src="${img.image}" alt="${img.title}">
          <figcaption>
            <h3>${img.title}</h3>
            <p>${img.description}</p>
          </figcaption>
        </figure>
      `;
    }
    //Agregar los gestores de eventos clic de los botones anterior y siguiente
    const body = document.querySelector(config.container);
    body.innerHTML = `
    <section id="gallery">
      <div class="gallery-container">${slider}</div>
      <nav>
         <button class="prev-btn">&#x2329</button>
         <button class="next-btn">&#x232a</button>
      </nav>
   </section>
   `;
    //Detener autoplay cuando el usuario interactúa con los botones de navegación.

    //Llamado a startAutoplay para que inice la presentación, terminada la carga del componente
  }

  //#navigate(direction) { ...  }

  // #startAutoplay(interval) { ...  }
}
