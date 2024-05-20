export default class Dialog {
  id
  instance
  modal

  constructor({
    modal = true,
    style = 'width:500px;',
    title = 'Sin título',
    content = 'Sin contenido',
    doSomething = null // un callBack
  } = {}) {
    // si no se envía un objeto se utiliza el por defecto y se desestructura automáticamente
    this.modal = modal
    // generar un ID de hasta 10 caracteres aleatorios
    this.id = 'dialog-' + Math.random().toString(36).slice(2, 12)

    // ver https://lenguajejs.com/javascript/dom/insertar-elementos-dom/
    document.querySelector('body').insertAdjacentHTML(
      'beforeend',
      `
        <dialog id="${this.id}" class="dialog" style="${style}">
          <section id="content-${this.id}"></section>
        </dialog>`
    )

    this.instance = document.querySelector(`#${this.id}`)

    this.content = content
  }

  get id() {
    return this.id
  }

  /**
   * Establecer el contenido del cuadro de diálogo
   * @param {string} _content
   */
  set content(_content) {
    if (this.instance) {
      document.querySelector(`#content-${this.id}`).innerHTML = _content
      return this
    } else {
      console.error('No se puede establecer el contenido en un cuadro de diálogo eliminado del DOM')
    }
  }

  /**
   * @param {string} styles
   */
  set style(styles) {
    //TODO: validar que styles es valido
    if (this.instance) {
      if (styles) {
        this.instance.setAttribute('style', styles)
      }
    } else {
      console.error('No se pueden asignar estilos a una instancia eliminada del DOM')
    }
  }

  show() {
    return new Promise((resolve, reject) => {
      if (this.instance) {
        if (this.modal) {
          // el usuario sólo puede interactuar con el cuadro de diálogo abierto
          this.instance.showModal()
        } else {
          // el usuario puede seguir interactuando con otros elementos de la página
          this.instance.show()
        }
        resolve('ok')
      } else {
        reject('No se puede mostrar un dialog removido del DOM')
      }
    })
  }

  doSomething(fx) {
    if (typeof fx === 'function') {
      return fx(this.id)
    }
  }

  close() {
    if (this.instance) {
      this.instance.close()
    } else {
      console.warn('Nada para cerrar. La instancia ya no existe en el DOM')
    }
    return this
  }

  remove() {
    if (this.instance) {
      this.instance.remove()
      // otra forma de eliminar nodos del DOM:
      // this.instance.parentNode.removeChild(this.instance)
    } else {
      console.warn('Nada para eliminar. La instancia ya no existe en el DOM')
    }
    this.instance = undefined
    this.id = undefined
  }
}
