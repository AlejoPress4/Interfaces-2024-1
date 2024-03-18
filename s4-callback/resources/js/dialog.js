export default class Dialog {
  #id
  #instance
  #modal
  #buttons

  constructor({
    modal = true,
    style = 'width:500px;',
    title = 'Sin título',
    content = 'Sin contenido',
    buttons = [], // los botones que se agregan al footer
    doSomething = null // un callBack
  } = {}) {
    // si no se envía un objeto se utiliza el por defecto y se desestructura automáticamente
    this.#modal = modal
    this.#buttons = buttons
    // generar un ID de hasta 10 caracteres aleatorios
    this.#id = 'dialog-' + Math.random().toString(36).slice(2, 12)

    // ver https://lenguajejs.com/javascript/dom/insertar-elementos-dom/
    document.querySelector('body').insertAdjacentHTML(
      'beforeend',
      `
        <dialog id="${this.#id}" class="dialog" style="${style}">
          <header id="title-${this.#id}">
            ${title}
            <button id="_close" >✖</button>
          </header>
          <hr>
          <section id="content-${this.#id}"></section>
          <hr>
        </dialog>`
    )

    this.#instance = document.querySelector(`#${this.#id}`)

    this.content = content

    if (typeof doSomething === 'function') {
      doSomething(this.#id)
    }

    // llamado a los métodos set para asignar los valores del objeto recibido y desestructruado

    this.addButtons()
  }

  get id() {
    return this.#id
  }

  /**
   * Establecer el contenido del cuadro de diálogo
   * @param {string} _content
   */
  set content(_content) {
    document.querySelector(`#content-${this.#id}`).innerHTML = _content
    return this
  }

  /**
   * @param {string} styles
   */
  set style(styles) {
    if (this.#instance) {
      if (styles) {
        this.#instance.setAttribute('style', styles)
      }
    } else {
      console.error('No se pueden asignar estilos a una instancia eliminada del DOM')
    }
  }

  /**
   * Agregar botones al pie de página del modal u ocultar el pie de página
   * @param {any[]} _buttons
   */
  addButtons() {
    if (this.#buttons.length) {
      document.querySelector(`#${this.id}`).insertAdjacentHTML('beforeend', `<footer></footer>`)
      const footer = document.querySelector(`#${this.#id} footer`)

      this.#buttons.forEach((item, i) => {
        const idButton = `${this.id}-btn${i}`
        const html = `<button id="${idButton}" style="margin-left:5px">${item.html}</button>`
        footer.insertAdjacentHTML('beforeend', html)
        const button = document.querySelector(`#${idButton}`)

        if (button && typeof item.action === 'function') {
          button.addEventListener('click', e => item.action(e))
        }
      })

      // el botón de cerrar de la parte superior derecha del modal elimina del DOM el dialog
      document.querySelector(`#${this.#id} #_close`).addEventListener('click', () => this.remove())
    }
  }

  show() {
    if (this.#instance) {
      if (this.#modal) {
        // el usuario sólo puede interactuar con el cuadro de diálogo abierto
        this.#instance.showModal()
      } else {
        // el usuario puede seguir interactuando con otros elementos de la página
        this.#instance.show()
      }
    } else {
      console.log('No se puede mostrar un popup removido del DOM')
    }
    return this
  }

  doSomething(fx) {
    if (typeof fx === 'function') {
      return fx(this.#id)
    }
  }

  close() {
    if (this.#instance) {
      this.#instance.close()
    } else {
      console.warn('Nada para cerrar. La instancia ya no existe en el DOM')
    }
    return this
  }

  remove() {
    if (this.#instance) {
      this.#instance.remove()
      // otra forma de eliminar nodos del DOM:
      // this.instance.parentNode.removeChild(this.instance)
    } else {
      console.warn('Nada para eliminar. La instancia ya no existe en el DOM')
    }
    this.#instance = undefined
    this.#id = undefined
    this.#buttons = undefined
  }
}
