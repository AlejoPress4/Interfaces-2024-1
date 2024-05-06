import Dialog from "./dialog.js";

export default class Popup extends Dialog {
    #buttons; // Atributo privado para almacenar los botones adicionales del Popup
    #image
    /**
     * Constructor de la clase Popup.
     * @param {Object[]} _buttons - Opciones para configurar el Popup.
     */
    constructor({ title, content, modal, image, style, buttons } = {}) {
        super({ content, modal, style }); // Llama al constructor de la superclase con los atributos content, modal y style

        // Inicializa this.#buttons como un array vacío si buttons está definido y es iterable
        if (buttons && buttons.buttons && Array.isArray(buttons.buttons)) {
            this.#buttons = buttons;
        } else {
            this.#buttons = { buttons: [] };
        }
        this.#image = image
        // Agrega la cabecera con el título y el botón de cerrar, junto con una línea de separación
        document.querySelector(`#${this.id}`).insertAdjacentHTML(
            "afterbegin",
            `<header id="title-${this.id}">
            ${this.#buttons.title, title}
            <button id="_close" >✖</button>
        </header>
        <hr>
        <div align= flex-wrap:nowrap>
        <img src="${image}" height="30px"</div>`
        );

        // Agrega los botones adicionales al Popup
        this.#addButtons();

        // Agrega el evento de clic al botón de cerrar
        document
            .querySelector(`#${this.id} #_close`)
            .addEventListener("click", () => {
                this.close();
            });
    }

    /**
     * Método privado para agregar los botones adicionales al Popup.
     * @private
     */
    #addButtons() {
        const buttonContainer = document.createElement("div");
        buttonContainer.id = `buttons-${this.id}`;

        // Verificar si this.#buttons.buttons está definido
        if (this.#buttons && this.#buttons.buttons) {
            // Agrega cada botón al contenedor
            this.#buttons.buttons.forEach((button) => {
                const buttonElement = document.createElement("button");
                buttonElement.textContent = button.text;
                buttonElement.addEventListener("click", button.callback);
                buttonContainer.appendChild(buttonElement);
            });
        } else {
            console.error("No se encontraron botones adicionales.");
        }

        // Inserta el contenedor de botones después de la cabecera del Popup
        document.querySelector(`#${this.id}`).appendChild(buttonContainer);
    }

    /**
     * Método para agregar un pie de página con botones al Popup.
     * @param {Array<Object>} buttons - Array de objetos que representan los botones del pie de página.
     * @param {string} buttons.text - Texto del botón.
     * @param {Function} buttons.callback - Función de devolución de llamada del botón.
     */
    addFooterButtons(buttons) {
        const footerButtonContainer = document.createElement("div");
        footerButtonContainer.id = `footer-buttons-${this.id}`;

        // Agrega cada botón al contenedor del pie de página
        buttons.forEach((button) => {
            const buttonElement = document.createElement("button");
            buttonElement.textContent = button.text;
            buttonElement.addEventListener("click", button.callback);
            footerButtonContainer.appendChild(buttonElement);
        });

        // Inserta el contenedor de botones del pie de página después del contenido del Popup
        document
            .querySelector(`#${this.id} section`)
            .appendChild(footerButtonContainer);
    }
    doSomething(message) {
        console.log(`Haciendo algo en el Popup: ${message}`);
    }
    show() {
        return new Promise((resolve, reject) => {
            if (this.instance) {
                if (this.modal) {
                    // el usuario sólo puede interactuar con el cuadro de diálogo abierto
                    this.instance.showModal();
                } else {
                    // el usuario puede seguir interactuando con otros elementos de la página
                    this.instance.show();
                }

                // Filtra los botones para excluir el botón de cerrar
                const buttonsToAttachListener = this.#buttons.buttons.filter(
                    (button) =>
                        button instanceof HTMLElement &&
                        button !== document.querySelector(`#${this.id} #_close`)
                );

                // Agrega event listeners solo a los botones filtrados
                buttonsToAttachListener.forEach((button) => {
                    button.addEventListener("click", (e) => {
                        resolve(e.target.innerText);
                    });
                });
            } else {
                reject("No se puede mostrar un popup removido del DOM");
            }
        });
    }

}