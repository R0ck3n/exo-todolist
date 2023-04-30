import { TodoListItem } from "./todoListItem.js";
/**
 * @typedef {object} TodoList
 * @property {number} id
 * @property {string} title
 * @property {boolean} completed
 *
 */

export class TodoList {
  /**@type {Todo[]} */
  #todos = [];

  /**@type {HTMLUlElement} */
  #listElement;

  /**
   *
   * @param {Todo[]} todos
   */
  constructor(todos) {
    this.#todos = todos;
  }

  /**
   *
   * @param {HTMLElement} el
   */
  appendTo(el) {
    el.innerHTML = `
  <form class="d-flex pb-4">
    <input required="" class="form-control" type="text"placeholder="Acheter des patates..." name="title" data-com.bitwarden.browser.user-edited="yes" />
    <button class="btn btn-primary">Ajouter</button>
  </form>
  <main>
    <div class="btn-group mb-4" role="group">
      <button type="button" class="btn btn-outline-primary active" data-filter="all">Toutes</button>
      <button type="button" class="btn btn-outline-primary" data-filter="todo">A faire</button>
      <button type="button" class="btn btn-outline-primary" data-filter="done">Faites</button>
    </div>
    <ul class="list-group"></ul>
  </main> 
    `;

    this.#listElement = el.querySelector(".list-group");

    for (let todo of this.#todos) {
      const t = new TodoListItem(todo);
      this.#listElement.append(t.element);
    }

    el.querySelector("form").addEventListener("submit", (e) =>
      this.#onSubmit(e)
    );

    el.querySelectorAll(".btn-group button").forEach((button) => {
      button.addEventListener("click", (e) => this.#toggleFilter(e));
    });
  }

  /**
   *
   * @param {SubmitEvent} e
   */
  #onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const title = new FormData(form).get("title").toString().trim();
    if (title === "") return;
    const todo = {
      id: Date.now(),
      title,
      completed: false,
    };
    const item = new TodoListItem(todo);
    this.#listElement.prepend(item.element);
    form.reset();
  }

  /**
   *
   * @param {PointerEvent} e
   */
  #toggleFilter(e) {
    e.preventDefault();
    const filter = e.currentTarget.getAttribute("data-filter");
    e.currentTarget.parentElement
      .querySelector(".active")
      .classList.remove("active");
    e.currentTarget.classList.add("active");

    switch (filter) {
      case "todo":
        this.#listElement.classList.add("hide-completed");
        this.#listElement.classList.remove("hide-todo");
        break;
      case "done":
        this.#listElement.classList.add("hide-todo");
        this.#listElement.classList.remove("hide-completed");
        break;
      case "all":
        this.#listElement.classList.remove("hide-todo");
        this.#listElement.classList.remove("hide-completed");
        break;

      default:
        this.#listElement.classList.remove("hide-todo");
        this.#listElement.classList.remove("hide-completed");
        break;
    }
  }
}
