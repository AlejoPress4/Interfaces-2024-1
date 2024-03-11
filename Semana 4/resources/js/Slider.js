export default class Slider {
  #currentIndex = 0;
  #autoplayInterval = null;
  #galleryImg = null;

  constructor(config) {
    (async () => await this.#createSlider(config))();
  }

  async #createSlider(config) {
    this.#galleryImg = await fetch(config.gallery).then((response) =>
      response.json()
    );
    console.log(this.#galleryImg);
    let slider = "";
    for (const img of this.#galleryImg) {
      slider += `
        <figure>
        <h3>${img.title}</h3>
          <img class="image" src="${img.image}" alt="${img.title}">
          <figcaption>
            <p>${img.description}</p>
          </figcaption>
        </figure>
      `;
    }
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
    document.querySelector('.prev-btn').addEventListener('click', () => this.#navigate(-1));
    document.querySelector('.next-btn').addEventListener('click', () => this.#navigate(1));
    this.#startAutoplay(1000000);
    this.#navigate(0);
  }

  #navigate(direction) {
    this.#currentIndex = (this.#currentIndex + direction + this.#galleryImg.length) % this.#galleryImg.length;
    const figures = document.querySelectorAll('#gallery .gallery-container figure');
    figures.forEach((figure, index) => {
      figure.style.display = index === this.#currentIndex ? 'block' : 'none';
    });
  }

  #startAutoplay(interval) {
    this.#autoplayInterval = setInterval(() => this.#navigate(1), interval);
  }
}