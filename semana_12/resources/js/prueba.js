export default class Prueba {
  constructor() {
    throw new Error('Esta clase no permite el uso del constructor. Utilice Prueba.init()')
  }

  static async init() {
    document.querySelector('main').innerHTML = `
        <div class="p-2 w-full">
            <div id="table-container"></div>
        </div>
    `

    //define data array
    const tabledata = [
      { id: 1, name: 'Oli Bob', progress: 12, gender: 'male', rating: 1, col: 'red', dob: '19/02/1984', car: 1 },
      { id: 2, name: 'Mary May', progress: 1, gender: 'female', rating: 2, col: 'blue', dob: '14/05/1982', car: true },
      { id: 3, name: 'Christine Lobowski', progress: 42, gender: 'female', rating: 0, col: 'green', dob: '22/05/1982', car: 'true' },
      { id: 4, name: 'Brendon Philips', progress: 100, gender: 'male', rating: 1, col: 'orange', dob: '01/08/1980' },
      { id: 5, name: 'Margret Marmajuke', progress: 16, gender: 'female', rating: 5, col: 'yellow', dob: '31/01/1999' },
      { id: 6, name: 'Frank Harbours', progress: 38, gender: 'male', rating: 4, col: 'red', dob: '12/05/1966', car: 1 }
    ]

    //initialize table
    const table = new Tabulator('#table-container', {
        height: 'calc(100vh - 190px)', // ocupar casi toda la altura
        layout: 'fitColumns', // ocupar todo el ancho
      data: tabledata, //assign data to table
      autoColumns: true //create columns from data field names
    })
  }
}
