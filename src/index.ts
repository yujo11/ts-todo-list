import Todo from "./Todo";
import Todos from "./Todos";

const App = () => {
  const form = document.querySelector("form");
  const ul = document.querySelector("ul");
  const allRemove = document.querySelector("#all-remove");

  const App = new Todos();

  const render = () => {
    console.log(App.todos);

    ul.innerHTML =
      App.todos
        ?.map(
          ({ id, content, complete, category, tags }) =>
            `<li data-id=${id}>
              ${content}
              <button class="delete">X</button>
              ${complete === true ? "완료" : "미완료"}
              <button class="toggle">상태변경</button>
              <span>카테고리: ${category}</span>
              <div>태그: ${tags?.join(", ")}</div>
            </li>`
        )
        .join("") || "";
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const content = e.target["content"].value;
    const category = e.target["category"].value;
    const tags = e.target["tags"].value.split(",").filter((tag) => tag !== "");

    App.addTodo(
      new Todo({
        complete: false,
        content,
        category,
        tags,
      })
    );

    render();
  });

  ul.addEventListener("click", ({ target }) => {
    if (target instanceof Element) {
      if (target.classList.contains("delete")) {
        console.log("delete");
        App.removeTodoById(target.closest("li").dataset.id);
        render();
        return;
      }

      if (target.classList.contains("toggle")) {
        console.log("toggle");
        const targetTodo = App.findTodoById(target.closest("li").dataset.id);

        console.log(targetTodo);

        App.updateTodoById({ ...targetTodo, complete: !targetTodo.complete });
        render();
        return;
      }
    }
  });

  allRemove.addEventListener("click", () => {
    // App.removeAllTodo();
    App.todos = [];
    render();
  });
};

window.onload = () => {
  App();
};
