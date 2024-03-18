import Dialog from './dialog.js'

class App {
  static dialog

  static main() {
    App.dialog = new Dialog({
      modal: false,
      title: '<span style="color:#727272;font-weight: bold;">Ingreso de usuarios</span>',
      content: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos veniam inventore iste assumenda libero dicta eveniet sapiente, perspiciatis, minima, atque eligendi possimus nisi esse alias dolor! Quaerat quibusdam eos repellendus.',
      doSomething: async id => {
        // ver más abajo otra posible solución para el punto 32
        const poblaciones = await this.listarPoblaciones()
        App.dialog.content = poblaciones
      },
      buttons: [
        {
          html: `Ingresar`,
          action: App.ingresar
        },
        {
          html: `Cancelar`,
          action: () => App.dialog.close()
        }
      ]
    })

    // Otra solución para el punto 32:
    // App.dialog.doSomething(async id => (App.dialog.content = await this.listarPoblaciones()))

    // ----------------

    document.querySelector('#abrir-dialog').addEventListener('click', () => {
      App.dialog.show()
    })

    document.querySelector('#cerrar-dialog').addEventListener('click', () => {
      App.dialog.close()
    })

    document.querySelector('#eliminar-dialog').addEventListener('click', () => {
      App.dialog.remove()
    })

    document.querySelector('#probar-dialog').addEventListener('click', () => {
      console.log(App.dialog)
    })

    document.querySelector('#probar-hacer').addEventListener('click', async () => {
      const x = App.dialog.doSomething(App.sumar)
      console.log('resultado = ' + x)
      // punto 30
      console.log(`ID del cuadro de diálogo: ${App.dialog.id}`)
      App.dialog.style = 'background-color:#eef5ff; width:80vw'
    })
  }

  static ingresar() {
    console.log('Ingreso existoso')
  }

  static sumar(idDialog) {
    console.log('id = ' + idDialog)
    return 20 + 30
  }

  static generarTabla(idDialog) {
    console.log('generando tabla en ' + idDialog)
    // https://www.w3schools.com/html/html_tables.asp
    const personas = ['Jorge', 'Carlos', 'Lucas']

    // generar la cabecera de la tabla
    let cabecera = ''
    personas.forEach(p => {
      cabecera += `<th>${p}</th>`
    })

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

  static async listarPoblaciones() {
    let response = await fetch('./resources/data/colombia.json')
    if (response.ok) {
      const poblaciones = await response.json()
      const columnas = ['REGIÓN', 'CÓD DEPTO', 'DEPARTAMENTO', 'COD. POBLACIÓN', 'POBLACIÓN']
      // generar la cabecera de la tabla
      let cabecera = ''
      columnas.forEach(c => {
        cabecera += `<th>${c}</th>`
      })
      cabecera = `<tr>${cabecera}</tr>`

      // generar las filas de la tabla
      let filas = ''
      poblaciones.forEach(poblacion => {
        let fila = ''
        Object.values(poblacion).forEach(v => {
          fila += `<td>${v}</td>`
        })
        filas += `<tr>${fila}</tr>`
      })

      // crear el código fuente de la tabla
      let tabla = `
        <table>
          ${cabecera}
          ${filas}
        </table>
      `
      return tabla
    } else {
      alert('Error-HTTP: ' + response.status)
    }
  }
}

App.main()
