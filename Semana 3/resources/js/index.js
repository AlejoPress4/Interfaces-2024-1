import Dialog from './dialog.js'

class App {
  static dialog

  static main() {
    App.dialog = new Dialog({
      modal: false,
      title: 'Ingreso de usuarios',
      content: 'Ando Trabajando en eso :)',
      doSomething: this.generarTabla, // una referencia, no un llamado al método
      buttons: [
        {
          html: 'Ingresar',
          action: App.ingresar
        },
        {
          html: 'Cancelar',
          action: () => App.cancelar
        }
      ]
    })

    document.querySelector('#abrir-dialog').addEventListener('click', () => {
      console.log('abrir la instancia de dialog')
      App.dialog.show()
    })

    document.querySelector('#cerrar-dialog').addEventListener('click', () => {
      console.log('cerrar la instancia de dialog')
      App.dialog.close()
    })

    document.querySelector('#eliminar-dialog').addEventListener('click', () => {
      console.log('eliminar la instancia de dialog')
      App.dialog.remove()
    })

    document.querySelector('#probar-dialog').addEventListener('click', () => {
      console.log('probar el estado de la instancia de dialog')
      console.log(App.dialog)
    })

    document.querySelector('#probar-hacer').addEventListener('click', () => {
      console.log('probar hacer algo')
    })

    document.querySelector('#probar-hacer').addEventListener('click', () => {
      const x = App.dialog.doSomething(App.sumar)
      console.log('resultado = ' + x)
    })
  }

  static generarTabla(idDialog) {
    console.log('generando tabla en ' + idDialog)
    const personas = ['Jorge', 'Carlos', 'Lucas']

    // generar la cabecera de la tabla
    let cabecera = ''
    personas.forEach(p => (cabecera += `<th>${p}</th>`))

    cabecera = `<tr>${cabecera}</tr>`
    // generar las filas de la tabla
    let filas = ''
    for (let i = 0; i < 7; i++) {
      let fila = ''
      for (let j = 0; j < personas.length; j++) {
        fila += `<td>${Math.floor(Math.random() * 1001)}</td>`
      }
      filas += `<tr>${fila}</tr>`
    }

    // crear el código fuente de la tabla
    let tabla = `
        <table>
          ${cabecera}
          ${filas}
        </table>
      `
    // inyectar la tabla en el dialog
    document.querySelector(`#${idDialog} section`).insertAdjacentHTML('beforeend', tabla)
  }

  static sumar(idDialog) {
    console.log('id = ' + idDialog)
    return 20 + 30
  }

  static ingresar() {
    console.log('Ingreso existoso')
  }
}
App.main()
