// https://codepen.io/nera-iba/pen/VwRmvpz

export default class Accordion {
  #id

  constructor(config) {
    ;(async () => await this.create(config))()
  }

  async create(info) {
    this.#id = `accordion-${Math.random().toString(36).slice(2, 12)}`

    // Cargar un array de objetos con los datos del archivo info-tabs.json
    let resources = await fetch(info.data)
    const data = await resources.json()

    let tabs = ''
    let i = 0
    // Recorrer el array de objetos obtenidos a partir de la lectura del archivo info-tabs.json
    for await (const item of data) {
      // En cada iteración recuperar el texto HTML referenciado por urlContent
      resources = await fetch(item.urlContent)
      item.content = await resources.text()

      // Crear el HTML del pliegue actual y concaténarlo a los demás pliegues
      tabs += `
        <div id="${this.#id}-item-${i}" class="accordion-item">
          <h2 id="${this.#id}-item-title-${i}">${item.title}</h2>
            <div id="${this.#id}-item-content-${i}" class="accordion-content">
              ${item.content}
            </div>
        </div>
      `
      i++
    }

    // Agregar los pliegues a un string que represente el HTML de la capa principal del accordion
    const htmlAccordion = `<div id="${this.#id}" class="accordion">${tabs}</div>`

    // Insertar el accordion en el container indicado en el parámetro config.
    document.querySelector(info.container).innerHTML = htmlAccordion

    // Agregar la funcionalidad JavaScript complementaria, dada por el autor
    document.querySelectorAll('.accordion-item h2').forEach(accordionToggle => {
      accordionToggle.addEventListener('click', () => {
        // referenciar el nodo padre y el nodo hermano siguiente
        const accordionItem = accordionToggle.parentNode
        const accordionContent = accordionToggle.nextElementSibling

        // Si este elemento de accordion ya está abierto, ciérrelo
        if (accordionContent.style.maxHeight) {
          accordionContent.style.maxHeight = null
          accordionItem.classList.remove('active')
        } else {
          accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px'
          accordionItem.classList.add('active')
        }
      })
    })

    // si la propiedad built de config es una función, ejecútese enviando como
    // argumento un objeto con el ID de Tabs y la data completa:
    if (typeof info.built === 'function') {
      info.built({ id: this.id, data })
    }
  }

  get id() {
    return this.#id
  }
}
