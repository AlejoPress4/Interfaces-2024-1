import Dialog from './dialog.js'

export default class Popup extends Dialog {
  #buttons
  #image
  constructor({ content, modal, style } = {}) {
    super({ modal: true, style: 'width:500px;', title, content })
    this.#buttons = buttons
    this.#image = image
  }
}
