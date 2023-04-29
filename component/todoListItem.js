import { createElement } from "../functions/dom";

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
  }

  /**
   *
   * @param {HTMLElement} element
   */
  appendTo(element) {
    element.append(this.#element);
  }
}
