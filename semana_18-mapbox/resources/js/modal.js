// version tailwind: https://drive.google.com/drive/folders/1m-RskOpDB1enwETp6sTgksY5BqMhaRHG

export default class Modal {
  #id;
  #modal;

  constructor({
    style = "w-11/12 md:w-8/12 lg:w-6/12 xl:w-5/12",
    title = "",
    content = "",
    buttons = [], // los botones que se agregan al footer
    built = null, // un callBack
  } = {}) {
    const hidden = "hidden";
    // una de las muchas formas de agregar un elemento al DOM con un id único
    this.#id = Helpers.idRandom("modal-");
    document.querySelector("body").insertAdjacentHTML(
      // hacer caso omiso a la advertencia del flex/hidden
      "beforeend",
      `
<div id="${this.#id}" class="flex fixed inset-0 z-50 justify-center items-center bg-yellow-100 bg-opacity-60 ${hidden}">
    <div class="relative mx-auto my-6 w-11/12 md:w-2/3 lg:w-1/2 xl:w-1/3 ${style}">
        <div class="flex relative flex-col w-full bg-white rounded-lg border-0 shadow-lg outline-none focus:outline-none">
            <header class="flex justify-between items-center px-6 py-3 rounded-t border-b-2 border-gray-300 bg-blue-500">
                <h2 id="title-${this.#id}" class="text-3xl font-extrabold text-white font-serif">Título</h2>
                <button id="close" class="text-center text-3xl font-semibold leading-none text-white bg-transparent outline-none focus:outline-none">
                    <span class="block w-6 h-6">
                        <svg viewBox="0 0 20 20" fill="currentColor" class="x w-6 h-6">
                            <path fill-rule="evenodd" d="M10 9.293l6.293-6.293 1.414 1.414L11.414 10l6.293 6.293-1.414 1.414L10 11.414l-6.293 6.293-1.414-1.414L8.586 10 2.293 3.707l1.414-1.414L10 8.586z" clip-rule="evenodd" />
                        </svg>
                    </span>
                </button>
            </header>
            <main id="main-${this.#id}" class="overflow-y-auto relative flex-auto p-4 mx-4 my-2 max-h-96 font-sans bg-gray-100 bg-opacity-90 rounded-lg">
                <img src="ruta_de_la_imagen" class="rounded-lg 2xl mb-4" >
                <p class="text-lg text-gray-800">Descripción</p>
            </main>
            <footer class="bg-white px-4 pt-2.5 pb-1.5 text-right rounded-b-lg"></footer>
        </div>
    </div>
</div>





</div>

              </div>`
    );
    this.title = title;
    this.content = content;
    this.buttons = buttons;
    this.#modal = document.querySelector(`#${this.#id}`);

    if (typeof built === "function") {
      built(this.#id);
    }
  }

  get id() {
    return this.#id;
  }

  /**
   * Establecer el título del cuadro de diálogo
   * @param {string} _title
   */
  set title(_title) {
    document.querySelector(`#title-${this.#id}`).innerHTML = _title;
    return this;
  }

  /**
   * Establecer el contenido del cuadro de diálogo
   * @param {string} _content
   */
  set content(_content) {
    document.querySelector(`#main-${this.#id}`).innerHTML = _content;
    return this;
  }

  /**
   * Agregar botones al pie de página del modal u ocultar el pie de página
   * @param {any[]} _buttons
   */
  set buttons(_buttons) {
    const footer = document.querySelector(`#${this.#id} footer`);
    if (_buttons.length > 0) {
      _buttons.forEach((item) => {
        const html = `<button id="${item.id}" class="${item.style}">${item.html}</button>`;
        footer.insertAdjacentHTML("beforeend", html);
        const button = document.querySelector(
          `#${this.#id} footer #${item.id}`
        );

        if (button && typeof item.callBack === "function") {
          button.addEventListener("click", (e) => item.callBack(e));
        }
      });
    } else {
      footer.classList.add("hidden");
    }

    // el botón de cerrar de la parte superior derecha del modal
    document
      .querySelector(`#${this.#id} header #close`)
      .addEventListener("click", () => this.close());
  }

  show() {
    if (this.#modal) {
      this.#modal.classList.remove("hidden");
    } else {
      console.log("No hay un Modal referenciado por esta variable");
    }
    return this;
  }

  close() {
    this.#modal.classList.add("hidden");
    return this;
  }

  dispose() {
    this.#modal.parentNode.removeChild(this.#modal);
    this.#modal = null;
  }
}
