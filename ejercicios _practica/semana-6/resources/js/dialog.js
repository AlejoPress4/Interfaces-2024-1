export default class Dialog {
  id
  instance
  modal

  constructor({ modal, style, content } = {}) {
    this.modal = modal
    this.id = 'dialog-' + Math.random().toString(36).slice(2, 12)

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
        @param {string}_content
      */
  set content(_content) {
    if (this.instance) {
      document.querySelector(`#content-${this.id}`).innerHTML = _content
    } else {
      console.error('No se puede asignar a una instancia vacia del DOM')
    }
  }
  /** 
      @param {string} styles
      */
  set style(styles) {
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
          this.instance.showModal()
        } else {
          this.instance.show()
        }
        resolve('ok')
      } else {
        reject('No se puede mostrar un dialog removido del DOM')
      }
    })
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
    } else {
      console.warn('Nada para eliminar. La instancia ya no existe en el DOM')
    }
    this.instance = undefined
    this.id = undefined
  }
}
