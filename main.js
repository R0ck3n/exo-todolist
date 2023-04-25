const addTodoForm = document.querySelector("#addTodo");
const listgroup = document.querySelector("#list-group");
const todobtn = document.querySelector("button[data-filter='todo']");
const donebtn = document.querySelector("button[data-filter='done']");
const allbtn = document.querySelector("button[data-filter='all']");
const btnAddTodo = document.querySelector("#addTodo button");

let todoList = [];

const fetchTodo = async () => {
  try {
    const r = await fetch(
      "https://jsonplaceholder.typicode.com/todos?_limit=5",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "applicatio/json",
        },
      }
    );
    if (!r.ok) {
      throw new Error("Erreur serveur");
    }
    return r.json();
  } catch (e) {
    console.error(e);
  }
};

fetchTodo().then((els) =>
  els.forEach((el) => {
    todoList.push(el);
    createNewToDo(el.id, el.title, el.completed);
    isChecked();
    destroy();
  })
);

const statutTodos = () => {
  const todobtn2 = document.querySelector("button[data-filter='todo']");
  const donebtn2 = document.querySelector("button[data-filter='done']");
  const allbtn2 = document.querySelector("button[data-filter='all']");

  if (allbtn2.classList[2] === "active") {
    listgroup.innerHTML = "";
    todoList.forEach((el) => {
      createNewToDo(el.id, el.title, el.completed);
    });
  }

  if (todobtn2.classList[2] === "active") {
    listgroup.innerHTML = "";
    todoList.forEach((el) => {
      if (!el.completed) {
        createNewToDo(el.id, el.title, el.completed);
      }
    });
  }
  if (donebtn2.classList[2] === "active") {
    listgroup.innerHTML = "";
    todoList.forEach((el) => {
      if (el.completed) {
        createNewToDo(el.id, el.title, el.completed);
      }
    });
  }
  destroy();
};

const destroy = () => {
  const trash = document.querySelectorAll(".bi-trash");
  for (let i = 0; i < trash.length; i++) {
    trash[i].addEventListener("click", () => {
      trash[i].parentNode.parentNode.remove();
    });
  }
};

const newToDo = (title) => {
  return { userId: 1, id: todoList.length + 1, title: title, completed: false };
};

addTodoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const input = document.querySelector("#addTodo input");
  todoList.push(newToDo(input.value));
  createNewToDo(todoList.length, input.value);
  statutTodos();
  destroy();
});

const createNewToDo = (id, title, check = false) => {
  const li = document.createElement("li");
  li.className = "todo list-group-item d-flex align-items-center";
  const input = document.createElement("input");
  let checked;
  if (check) checked = "checked";

  li.innerHTML = `
    <input class="form-check-input" type="checkbox" id="todo-${id}" ${checked} />
    <label class="ms-2 form-check-label" for="todo-${id}">
        ${title}
    </label>
    <label class="ms-auto btn btn-danger btn-sm">
        <i class="bi-trash"> </i>
    </label>
  `;

  listgroup.prepend(li);
  isChecked();
};

allbtn.addEventListener("click", () => {
  btnAddTodo.removeAttribute("disabled");
  allbtn.classList.add("active");
  todobtn.classList.remove("active");
  donebtn.classList.remove("active");
  statutTodos();
  isChecked();
});

todobtn.addEventListener("click", () => {
  btnAddTodo.removeAttribute("disabled");
  allbtn.classList.remove("active");
  todobtn.classList.add("active");
  donebtn.classList.remove("active");
  statutTodos();
  isChecked();
});

donebtn.addEventListener("click", () => {
  allbtn.classList.remove("active");
  todobtn.classList.remove("active");
  donebtn.classList.add("active");
  btnAddTodo.setAttribute("disabled", "true");
  statutTodos();
  isChecked();
});

function isChecked() {
  const inputs = document.querySelectorAll("input[id*=todo]");
  inputs.forEach((el) =>
    el.addEventListener("change", () => {
      const indexElem = Number(el.id.split("-").splice(1).join("")) - 1;
      el.checked
        ? (todoList[indexElem].completed = true)
        : (todoList[indexElem].completed = false);
      statutTodos();
    })
  );
}

isChecked();
destroy();
