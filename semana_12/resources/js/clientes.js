export default class Clientes {
  static #table
  static #modal
  static #currentOption
  static #form

  constructor() {
    throw new Error('No utilice el constructor. Use Clientes.init()')
  }

  static async init() {
    try {
      Clientes.#form = await Helpers.loadPage('./resources/html/clientes.html')

      const response = await Helpers.fetchData(`${urlAPI}/clientes`)
      if (response.message !== 'ok') {
        throw new Error('Falló la carga de clientes')
      }

      document.querySelector('main').innerHTML = `
                    <div class="p-2 w-full">
                        <div id="clientes" class="m-2"></div>
                    </dv>
                `
      console.log(response.data)
      Clientes.#table = new Tabulator('#clientes', {
        height: 'calc(100vh - 190px)', // establecer la altura de la tabla, esto habilita el DOM virtual y mejora drásticamente la velocidad de procesamiento
        data: response.data, // asignar los datos a la tabla
        layout: 'fitColumns', // ajustar columnas al ancho de la tabla (opcional)
        columns: [
          // definir las columnas de la tabla
          { title: 'identificacion', field: 'identificacion', width: 100, hozAlign: 'center' },
          { title: 'id', field: 'id', hozAlign: 'left' },
          { title: 'nombre', field: 'nombre', hozAlign: 'left' },
          { title: 'telefono', field: 'telefono', hozAlign: 'center' },
          { formatter: Clientes.#editRowButton, width: 40, hozAlign: 'center', cellClick: Clientes.#editRowClick },
          { formatter: Clientes.#deleteRowButton, width: 40, hozAlign: 'center', cellClick: Clientes.#deleteRowClick }
        ],
        footerElement: `
                <div class='flex justify-end w-full'>
                    <button id="add-Clientes" type="button" class="px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">${icons.add}Nuevo producto</button>
                </div>`.trim()
      })

      Clientes.#table.on('tableBuilt', () => document.querySelector('#add-Clientes').addEventListener('click', Clientes.#addRow))
    } catch (e) {
      new Toast({ content: 'Sin acceso a la opción de Clientes', mode: 'danger', error: e })
    }

    return this
  }

  static #editRowClick = async (e, cell) => {
    // configurar el cuadro de diáloogo
    Clientes.#currentOption = 'edit'
    Clientes.#modal = new Popup({
      classes: 'col-12 col-sm-10 col-md-9 col-lg-8 col-xl-7',
      title: '<span class="text-back dark:text-gray-300">Actualizar un producto</span>',
      content: Clientes.#form,
      buttons: [
        { caption: 'Actualizar', classes: 'text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-1.5 text-center me-2 mt-2 ' },
        { caption: 'Cancelar', classes: 'text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-1.5 text-center me-2 mt-2' }
      ],
      doSomething: idModal => {
        console.log(cell.getRow().getData())
        Clientes.#toComplete(idModal, cell.getRow().getData())
      }
    })

    try {
      const option = await Clientes.#modal.show()
      if (option === 'Cancelar' || option === '✖') {
        Clientes.#modal.close()
      } else if (option === 'Actualizar') {
        Clientes.#edit(cell)
      }
    } catch (e) {
      new Toast({ content: 'Problemas al actualizar el Cliente', mode: 'danger', error: e })
    }
  }

  static #editRowButton = () => `
    <button id="edit-row" class="border-0 bg-transparent" data-bs-toggle="tooltip" title="Editar">${icons.edit}</button>
    `
  static async #edit(cell) {
    // verificar si los datos cumplen con las restricciones indicadas en el formulario HTML
    // *** falta validar que pVenta no sea <= pBase ***
    if (!Helpers.okForm('#form-clientes')) {
      return
    }

    // asignar en la variable data, los datos del formulario
    const data = Clientes.#getFormData()
    // configurar la url para enviar la solicitud PUT
    const url = `${urlAPI}/clientes/${cell.getRow().getData().id}`

    try {
      // intentar enviar la solicitud de actualización

      let response = await Helpers.fetchData(url, {
        method: 'PATCH',
        body: data
      })
      console.log(response)
      if (response.message === 'ok') {
        new Toast({ content: 'Cliente actualizado exitosamente' })
        cell.getRow().update(response.data)
        Clientes.#modal.close()
      } else {
        new Toast({ content: 'No se pudo actualizar el cliente', mode: 'danger', error: response })
      }
    } catch (e) {
      new Toast({ content: 'Sin acceso a la actualización de clientes', mode: 'danger', error: e })
    }
  }
  static #deleteRowButton = cell => `
    <button id="delete-row" class="border-0 bg-transparent" data-bs-toggle="tooltip" title="Eliminar">${icons.delete}</button>
    `

  static #deleteRowClick = async (e, cell) => {
    Clientes.#currentOption = 'delete'
    Clientes.#modal = new Popup({
      classes: 'col-12 col-sm-10 col-md-9 col-lg-8 col-xl-7',
      title: '<span class="text-back dark:text-gray-300">Eliminar un cliente</span>',
      content: `<span class="text-back dark:text-gray-300">
      Confirme la eliminación del producto:<br>
      ${cell.getRow().getData().id} – ${cell.getRow().getData().nombre} – Valor venta $${cell.getRow().getData().valorVenta}<br>
    </span>`,
      buttons: [
        { caption: 'Eliminar', classes: 'text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-1.5 text-center me-2 mt-2 ' },
        { caption: 'Cancelar', classes: 'text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-1.5 text-center me-2 mt-2' }
      ]
    })
    // mostrar el cuadro de diálogo y gestionar las opciones de eliminar y cancelar
    try {
      const option = await Clientes.#modal.show()
      if (option === 'Cancelar' || option === '✖') {
        Clientes.#modal.close()
      } else if (option === 'Eliminar') {
        Clientes.#delete(cell)
      }
    } catch (e) {
      new Toast({ content: 'Problemas al eliminar el producto', mode: 'danger', error: e })
    }
  }
  static async #delete(cell) {
    const id = cell.getRow().getData().id
    const url = `${urlAPI}/clientes/${id}`

    try {
      // enviar la solicitud de eliminación
      let response = await Helpers.fetchData(url, {
        method: 'DELETE'
      })

      if (response.message === 'ok') {
        new Toast({ content: 'Cliente eliminado exitosamente' })
        cell.getRow().delete()
        Clientes.#modal.close()
      } else {
        new Toast({ content: 'No se pudo eliminar el cliente', mode: 'danger', error: response })
      }
    } catch (e) {
      new Toast({ content: 'Sin acceso a la eliminación de clientes', mode: 'danger', error: e })
    }
  }

  static #addRow = async e => {
    Clientes.#currentOption = 'add'
    Clientes.#modal = new Popup({
      classes: 'col-12 col-sm-10 col-md-9 col-lg-8 col-xl-7',
      title: '<span class="text-back dark:text-gray-300">Agregar un producto</span>',
      content: Clientes.#form,
      buttons: [
        { caption: 'Agregar', classes: 'text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-1.5 text-center me-2 mt-2 ' },
        { caption: 'Cancelar', classes: 'text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-1.5 text-center me-2 mt-2' }
      ],
      doSomething: Clientes.#toComplete
    })
    // mostrar el cuadro de diálogo y gestionar las opciones de agregar y cancelar
    try {
      const option = await Clientes.#modal.show()
      if (option === 'Cancelar' || option === '✖') {
        Clientes.#modal.close()
      } else if (option === 'Agregar') {
        Clientes.#add()
      }
    } catch (e) {
      new Toast({ content: 'Problemas al agregar el cliente', mode: 'danger', error: e })
    }
  }

  static async #add() {
    // verificar si los datos cumplen con las restricciones indicadas en el formulario HTML
    if (!Helpers.okForm('#form-clientes')) {
      return
    }

    const data = Clientes.#getFormData()

    try {
      // enviar la solicitud de creación con los datos del formulario
      let response = await Helpers.fetchData(`${urlAPI}/clientes`, {
        method: 'POST',
        body: data
      })

      if (response.message === 'ok') {
        Clientes.#table.addRow(response.data) // agregar el producto a la tabla
        Clientes.#modal.close()
        new Toast({ content: 'Producto agregado exitosamente' })
      } else {
        new Toast({ content: 'No se pudo agregar el cliente', mode: 'danger', error: response })
      }
    } catch (e) {
      new Toast({ content: 'Sin acceso a la creación de cliente', mode: 'danger', error: e })
    }
  }

  static #toComplete(idModal, rowData) {
    if (Clientes.#currentOption === 'edit') {
      document.querySelector(`#${idModal} #mainID`).value = rowData.identificacion
      document.querySelector(`#${idModal} #twoid`).value = rowData.id
      document.querySelector(`#${idModal} #name`).value = rowData.nombre
      document.querySelector(`#${idModal} #phonenumber`).value = rowData.telefono
    }
  }
  static #getFormData() {
    const identificacion = document.querySelector(`#${Clientes.#modal.id} #mainID`).value
    const id = document.querySelector(`#${Clientes.#modal.id} #id`).value
    const nombre = document.querySelector(`#${Clientes.#modal.id} #name`).value
    const telefono = document.querySelector(`#${Clientes.#modal.id} #phonenumber`).value
    return { identificacion, id, nombre, telefono }
  }
}
