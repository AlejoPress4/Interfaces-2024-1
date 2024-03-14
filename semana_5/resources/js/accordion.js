export default class accordion {
  #id;
  // id ID de la capa principal del accordion

  constructor(config) {
    (async () => await this.create(config))();
  }

  async create(config) {
    this.#id = `accordion-${Math.random().toString(36).slice(2, 12)}`;

    const accordion = document.createElement("div");
    accordion.classList.add("accordion");
    accordion.id = this.#id;
    let i = 0;

    // Crear un array de objetos con los datos del archivo JSON referenciado por data
    let data = fetch(config.data);
    data = await (await data).json();

    for await (const item of data) {
      const resource = await fetch(item.urlContent);
      const texto = await resource.text();
      item.content = texto;
    }

    let contentAccordion = "";
    for await (const item of data) {
      contentAccordion += `<div id="accordion-${
        this.#id
      }-item-${i}" class="accordion-item"><h2 id="accordion-${
        this.#id
      }-title-${i}">${item.title}</h2>`;
      contentAccordion += `<div id="accordion-${
        this.#id
      }-content-${i}" class="accordion-content">${item.content}</div>`;
      contentAccordion += "</div>";
      i++;
    }

    accordion.innerHTML = contentAccordion;
    document.body.innerHTML = "<h1>FAQ</h1>";
    document.body.appendChild(accordion);

    document
      .querySelectorAll(".accordion-item h2")
      .forEach((accordionToggle) => {
        accordionToggle.addEventListener("click", () => {
          const accordionItem = accordionToggle.parentNode;
          const contentAccordion = accordionToggle.nextElementSibling;

          if (contentAccordion.style.maxHeight) {
            contentAccordion.style.maxHeight = null;
            accordionItem.classList.remove("active");
          } else {
            contentAccordion.style.maxHeight =
              contentAccordion.scrollHeight + "px";
            accordionItem.classList.add("active");
          }
        });
      });

    if (typeof config.built === "function") {
      config.built({
        id: this.#id,
        data: data,
      });
    }
  }
  get id() {
    return this.#id;
  }
}
