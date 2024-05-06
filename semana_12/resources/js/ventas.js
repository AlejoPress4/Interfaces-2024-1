export default class Ventas {
  static #table
  static #modal
  static #currentOption
  static #form

  constructor() {
    throw new Error('No utilice el constructor. Use Clientes.init()')
  }

  static async init() {
    try {
      Ventas.#form = await Helpers.loadPage('./resources/html/ventas.html')

      const response = await Helpers.fetchData(`${urlAPI}/ventas`)
      if (response.message !== 'ok') {
        throw new Error('Falló la carga de clientes')
      }

      document.querySelector('main').innerHTML = `
                      <div class="p-2 w-full">
                          <div id="ventas" class="m-2"></div>
                      </dv>
                  `
      console.log(response.data)
      Ventas.#table = new Tabulator('#ventas', {
        height: 'calc(100vh - 190px)', // establecer la altura de la tabla, esto habilita el DOM virtual y mejora drásticamente la velocidad de procesamiento
        data: response.data, // asignar los datos a la tabla
        layout: 'fitColumns', // ajustar columnas al ancho de la tabla (opcional)
        columns: [
          // definir las columnas de la tabla
          { title: 'Nro', field: 'venta.numero', width: 100, hozAlign: 'center' },
          { title: 'FECHA', field: 'venta.fecha', hozAlign: 'left' },
          { title: 'CLIENTE', field: 'venta.cliente.nombre', hozAlign: 'left' },
          { title: 'TOTAL', field: 'venta.total', hozAlign: 'center' }
        ],
        rowFormatter: function (row) {
          //create and style holder elements
          var holderEl = document.createElement('div')
          var tableEl = document.createElement('div')

          holderEl.style.boxSizing = 'border-box'
          holderEl.style.padding = '10px 30px 10px 10px'

          holderEl.appendChild(tableEl)

          row.getElement().appendChild(holderEl)

          var subTable = new Tabulator(tableEl, {
            layout: 'fitColumns',
            data: row.getData().detalle,
            columns: [
              { title: 'Cantidad', field: 'cantidad', sorter: 'date' },
              { title: 'Nombre', field: 'producto.nombre' },
              { title: 'Valor', field: 'producto.valorVenta' },
              { title: 'Subtotal', field: 'subtotal' }
              // { title: 'Fecha Vencimiento', field: 'producto.vence' }
            ]
          })
        }
      })
    } catch (e) {
      console.error(e)
    }

    return this
  }
}
