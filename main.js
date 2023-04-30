import { TodoList } from "./component/todoList.js";
import { createElement } from "./functions/dom.js";
import fetchJSON from "./functions/fetch.js";
try {
  const todos = await fetchJSON(
    "https://jsonplaceholder.typicode.com/todos?_limit=5"
  );
  const list = new TodoList(todos);
  list.appendTo(document.querySelector("#todolist"));
} catch (e) {
  console.error(e);
  const alertElement = createElement("div", {
    class: "alert alert-danger m-2",
    role: "alert",
  });
  alertElement.innerText = "Impossible de charger les éléments";
  document.body.prepend(alertElement);
}
