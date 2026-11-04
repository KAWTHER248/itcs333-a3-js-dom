// ITCS333 A3 starter — implement the to-do app per README.
// You may wrap everything in a DOMContentLoaded handler or an IIFE.
// Requirements: add / toggle-complete / delete / filter / counter,
// using event delegation on #todo-list.

// TODO: your code here
(function () {

    const form = document.getElementById("todo-form");
    const input = document.getElementById("todo-input");
    const todoList = document.getElementById("todo-list");
    const errorMsg = document.getElementById("error-msg");
    const counter = document.getElementById("counter");

    const filterAll = document.getElementById("filter-all");
    const filterActive = document.getElementById("filter-active");
    const filterDone = document.getElementById("filter-done");

    let currentFilter = "all";

    function updateCounter() {
        const items = todoList.querySelectorAll("li");
        let count = 0;

        items.forEach(function (item) {
            if (!item.classList.contains("completed")) {
                count++;
            }
        });

        counter.textContent =
            count + (count === 1 ? " item left" : " items left");
    }

    function applyFilter() {
        const items = todoList.querySelectorAll("li");

        items.forEach(function (item) {
            const isCompleted = item.classList.contains("completed");

            if (currentFilter === "all") {
                item.hidden = false;
            } else if (currentFilter === "active") {
                item.hidden = isCompleted;
            } else if (currentFilter === "done") {
                item.hidden = !isCompleted;
            }
        });
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const taskText = input.value.trim();

        if (taskText === "") {
            errorMsg.classList.remove("hidden");
            return;
        }

        errorMsg.classList.add("hidden");

        const li = document.createElement("li");

        const span = document.createElement("span");
        span.className = "item-text";
        span.textContent = taskText;

        const deleteBtn = document.createElement("button");
        deleteBtn.type = "button";
        deleteBtn.className = "delete-btn";
        deleteBtn.textContent = "Delete";

        li.appendChild(span);
        li.appendChild(deleteBtn);

        todoList.appendChild(li);

        input.value = "";

        updateCounter();
        applyFilter();
    });

    todoList.addEventListener("click", function (event) {

        const deleteButton = event.target.closest(".delete-btn");

        if (deleteButton && todoList.contains(deleteButton)) {
            const li = deleteButton.closest("li");
            li.remove();

            updateCounter();
            applyFilter();
            return;
        }

        const task = event.target.closest(".item-text");

        if (task && todoList.contains(task)) {
            const li = task.closest("li");
            li.classList.toggle("completed");

            updateCounter();
            applyFilter();
        }
    });

    filterAll.addEventListener("click", function () {
        currentFilter = "all";
        applyFilter();
    });

    filterActive.addEventListener("click", function () {
        currentFilter = "active";
        applyFilter();
    });

    filterDone.addEventListener("click", function () {
        currentFilter = "done";
        applyFilter();
    });

    updateCounter();

})();