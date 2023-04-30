import { createElement } from "../functions/dom.js";
//rename
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
    li.append(checkbox, label, button);

    button.addEventListener("click", (e) => this.remove(e));

    this.#element = li;
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
}
