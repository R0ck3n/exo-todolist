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
    <input
      required=""
      class="form-control"
      type="text"
      placeholder="Acheter des patates..."
      name="title"
      data-com.bitwarden.browser.user-edited="yes"
    />
    <button class="btn btn-primary">Ajouter</button>
  </form>
  <main>
    <div class="btn-group mb-4" role="group">
      <button
        type="button"
        class="btn btn-outline-primary active"
        data-filter="all"
      >
        Toutes
      </button>
      <button
        type="button"
        class="btn btn-outline-primary"
        data-filter="todo"
      >
        A faire
      </button>
      <button
        type="button"
        class="btn btn-outline-primary"
        data-filter="done"
      >
        Faites
      </button>
    </div>

    <ul class="list-group"></ul>
  </main> 
    `;

    const list = "";
  }
}