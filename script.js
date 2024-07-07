const inputBox = document.querySelector(".task-input");
const result = document.querySelector(".result");
const button = document.querySelector(".add-task");
const clearButton = document.querySelector(".clear-btn");
const today = new Date();

const day = today.toLocaleString("en-us", {
    weekday: "long",
});

const date = today.toLocaleString("en-us", {
    day: "2-digit",
});

const month = today.toLocaleString("en-us", {
    month: "short",
});

const years = today.toLocaleString("en-us", {
    year: "2-digit",
});

const formattedDate = `${date} - ${month} - ${years}`;

document.querySelector(".day").textContent = day;
document.querySelector(".date").textContent = formattedDate;

let tasks = JSON.parse(localStorage.getItem("tasks")) ?? [];

function renderTasks() {
    result.innerHTML = "";

    tasks.sort((a, b) => a.done - b.done);

    tasks.forEach((element, i) => {
        const resultContainer = document.createElement("div");
        const taskDiv = document.createElement("div");
        const taskDone = document.createElement("button");

        resultContainer.setAttribute("class", "result-container");
        taskDiv.setAttribute("class", "task-div");
        taskDone.setAttribute("class", "task-done");
        taskDiv.setAttribute("data-id", i);
        taskDiv.textContent = `${i + 1}. ${element.task}`;

        if (element.done) {
            taskDiv.classList.add("task-done");
            const deleteText = document.createElement("del");
            deleteText.textContent = taskDiv.textContent;
            taskDiv.textContent = "";
            taskDiv.appendChild(deleteText);
            taskDiv.style.color = "white";

            const tickImage = document.createElement("img");
            tickImage.src = "./images/tick.png";
            tickImage.alt = "Done";
            tickImage.style.width = "20px";
            tickImage.style.height = "20px";
            taskDone.appendChild(tickImage);
        } else {
            const crossImage = document.createElement("img");
            crossImage.src = "./images/close.png";
            crossImage.alt = "Not Done";
            crossImage.style.width = "20px";
            crossImage.style.height = "20px";
            taskDone.appendChild(crossImage);
        }

        resultContainer.appendChild(taskDiv);
        resultContainer.appendChild(taskDone);
        result.appendChild(resultContainer);

        taskDone.addEventListener("click", function () {
            tasks[i].done = !tasks[i].done;
            localStorage.setItem("tasks", JSON.stringify(tasks));
            renderTasks();
        });
    });
}

renderTasks();

button.addEventListener("click", function () {
    const task = inputBox.value.trim();
    if (!task) return;
    tasks.push({ task: task, done: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    inputBox.value = "";
    renderTasks();
});

clearButton.addEventListener("click", function () {
    if (tasks.length === 0) {
        return;
    }
    if (confirm("Do you want to clear your tasks?")) {
        localStorage.clear();
        tasks = [];
        renderTasks();
    }
});
