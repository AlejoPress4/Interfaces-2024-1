import Alert from "./alert.js";
import Dialog from "./dialog.js";
import Toast from "./toast.js";
import Popup from "./popup.js";

class App {
    static async main() {
        // …

        const dialog = new Dialog({
            modal: false,
            style: "background-color: #f2f5ff;",
            content: `
        <h2 class="title">Mejoremos este Dialog</h2>
          <p class="paragraph">Visita a <a href="https://fonts.google.com/">https://fonts.google.com</a> y … `,
        });
        document
            .querySelector("#abrir-dialog")
            .addEventListener("click", async () => {
                try {
                    const opcion = await dialog.show();
                    console.info(`Todo ${opcion}, promesa cumplida`);
                } catch (error) {
                    console.error("Sucedió un error.", error);
                }
            });
        document.querySelector("#cerrar-dialog").addEventListener("click", () => {
            dialog.close();
        });
        document.querySelector("#eliminar-dialog").addEventListener("click", () => {
            dialog.instance.remove();
        });
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

        const popup = new Popup({
            title: "<span style='font-weight:bold;'>Ingreso de usuarios</span>",
            content: await this.loadPage("./resources/html/form-demo.html"),
            buttons: {
                title: "<span style='font-weight:bold;'>Ingreso de usuarios</span>",
                buttons: [
                    {
                        text: "Ingresar",
                        callback: () => {
                            console.log("Ingresando...");
                            popup.doSomething("Ingresando...");
                        }
                    },
                    {
                        text: "Cancelar",
                        callback: () => popup.close()
                    }
                ]
            }
        });
        document.querySelector("#abrir-popup").addEventListener("click", async () => {
            try {
                const option = await popup.show();
                console.log(`Botón pulsado: ${option}`);


                if (option === "Cancelar" || option === "✖") {
                    // Se ha cerrado el popup
                    console.log("No hacer algo");
                } else if (option === "Ingresar") {
                    console.log("hacer algo");
                    popup.close();
                }
            } catch (e) {
                console.error("Tenemos problemas.", e);
            }
        });
        document.querySelector("#abrir-alert").addEventListener("click", () => {
            new Alert({
                title: `<p>Eliminación concluida</p>`,
                content: "La acción de eliminación ha culminado exitosamente. Se ...",
                image: "./resources/data/warning.png",
                button: {
                    caption: "Aceptar",
                    classes: ["custom-btn", "btn-cancel"],
                    action: () => alert("Botón aceptar presionado"), // Aquí puedes cambiar la acción del botón según tus necesidades
                },
            });
        });
    }
    static async loadPage(url) {
        const response = await fetch(url);
        return await response.text();
    }


}
App.main();