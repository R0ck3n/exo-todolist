import { createElement } from "../functions/dom.js";
export class TodoListItem {
  #element;
  /**
   *
   * @param {Todo} todo
   */
  constructor(todo) {
    const id = `todo-${todo.id}`;
    const li = createElement("li", {
      class: "todo list-group-item d-flex align-items-center",
    });

    this.#element = li;

    const checkbox = createElement("input", {
      type: "checkbox",
      class: "form-check-input",
      id,
      checked: todo.completed ? "" : null,
    });

    const label = createElement("label", {
      type: "label",
      class: "ms-2 form-check-label",
      for: id,
    });
    label.innerText = todo.title;

    const button = createElement("button", {
      class: "ms-auto btn btn-danger btn-sm",
    });
    button.innerHTML = '<i class="bi-trash"> </i>';

    if (todo.completed) {
      li.classList.add("is-completed");
    }

    li.append(checkbox, label, button);

    button.addEventListener("click", (e) => this.remove(e));
    checkbox.addEventListener("change", (e) => this.toggle(e.currentTarget));
  }

  /**
   *
   * @return {HTMLElement}
   *
   */
  get element() {
    return this.#element;
  }

  /**
   *
   * @param {PointerEvent} e
   */
  remove(e) {
    e.preventDefault();
    this.#element.remove();
  }

  /**
   * Change l'état ( fait / a faire) de la tâche
   * @param {HTMLInputElement}
   */
  toggle(checkbox) {
    checkbox.checked
      ? this.#element.classList.add("is-completed")
      : this.#element.classList.remove("is-completed");
  }
}
