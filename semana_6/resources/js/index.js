import Dialog from './dialog.js'

class App {
  static dialog

  static main() {
    const dialog = new Dialog({
      modal: false,
      style: 'background-color: #f2f5ff;',
      content: `
          <h2 class="title">Mejoremos este Dialog</h2>
            <p class="paragraph">Visita a <a href="https://fonts.google.com/">https://fonts.google.com</a> y … `
    })

    // Otra solución para el punto 32:
    // App.dialog.doSomething(async id => (App.dialog.content = await this.listarPoblaciones()))

    // ----------------

    document.querySelector('#cerrar-dialog').addEventListener('click', () => {
      dialog.close()
    })

    document.querySelector('#eliminar-dialog').addEventListener('click', () => {
      dialog.instance.remove()
    })

    document.querySelector("#probar-dialog").addEventListener("click", () => {
      // Comprobar si la instancia de Dialog existe
      if (dialog) {
          // Comprobar si la instancia de Dialog está en el DOM
          const isDialogInDOM = document.body.contains(dialog.instance);

          if (isDialogInDOM) {
              console.log("La instancia de Dialog está en el DOM.");
          } else {
              console.log("La instancia de Dialog ha sido eliminada del DOM.");
          }
      } else {
          console.log("La instancia de Dialog no está definida.");
      }
  });
    document.querySelector('#estado-dialogo').addEventListener('click', () => {})
    document.querySelector('#probar-hacer').addEventListener('click', async () => {
      const x = App.dialog.doSomething(App.sumar)
      console.log('resultado = ' + x)
      // punto 30
      console.log(`ID del cuadro de diálogo: ${App.dialog.id}`)
      App.dialog.style = 'background-color:#eef5ff; width:80vw'
    })
    //Listener del cursor para abrir dialog con async
    document.querySelector('#abrir-dialog').addEventListener('click', async () => {
      try {
        const opcion = await dialog.show()
        console.info(`Todo ${opcion}, promesa cumplida`)
      } catch (error) {
        console.error('Sucedió un error.', error)
      }
    })

    document.querySelector("#abrir-toast").addEventListener("click", () => {
      const toastContainer = document.querySelector("#toast-container");
      // Crea el toast
      const toast = new Toast({
          content: "Mensaje de Toast",
          mode: "danger",
          delay: 5000,
      });
      // Agrega el toast al contenedor
      toastContainer.appendChild(toast.instance);
      // Muestra el toast
      toast
          .show()
          .then(() => {
              // Remueve el toast del contenedor después de que se complete
              toast.instance.remove();
          })
          .catch((error) => {
              console.error(error);
          });
  });
  }
}

App.main()
