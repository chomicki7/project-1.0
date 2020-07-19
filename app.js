const form = document.querySelector(".form-control");
const exercise = document.querySelector(".exercises-container");
const exerciseName = document.getElementById("exerciseInput");
const alert = document.getElementById("alert");

// different options for the display alert function
const messages = [
  "Great job!",
  "Keep on going!",
  "You got this!",
  "Killing it!",
  "Looking good!",
];

form.addEventListener("submit", function (e) {
  e.preventDefault();
  let name = exerciseName.value.toLowerCase();
  let allExercises = document.querySelectorAll(".name");
  let exerciseBoolean = exerciseCheck(name, allExercises);
  if (name && !exerciseBoolean) {
    createExercise(name);
  } else if (exerciseBoolean) {
    displayAlert("red", "Exercise already added!");
  } else {
    displayAlert("red", "Please, write an exercise!");
  }
  exerciseName.value = "";
});

//Create exercise

const createExercise = (name) => {
  let newExercise = document.createElement("div");
  newExercise.innerHTML = `<div class="exercise">
        <h3 class='name'>${name}</h3>
        <p class="emoji"></p>
        <div class="exercise-data">
            <p>Sets</p>
            <input type="number" class="inputs" placeholder="1" min="1" max="10">
        </div>
        <div class="exercise-data">
            <p>Reps</p>
            <input type="number" class="inputs" placeholder="1" min="1" max="10">
        </div>
        <div class="exercise-data">
            <p>Weight</p>
            <input type="number" class="inputs" placeholder="1" step="1" min="1" max="500">
        </div>
        <div class="btn-container">
        <button type="button" class="edit-btn"><i class="far fa-edit fa-lg"></i></i></button>
        <button type="button" class="done-btn"><i class="fas fa-check fa-lg"></i></button>
        <button type="button" class="delete-btn"><i class="far fa-trash-alt fa-lg"></i></button>
        </div>
        </div>`;
  // new exercise created, adding functionality to the new buttons
  const editBtn = newExercise.querySelector(".edit-btn");
  const doneBtn = newExercise.querySelector(".done-btn");
  const deleteBtn = newExercise.querySelector(".delete-btn");
  editBtn.addEventListener("click", editExercise);
  doneBtn.addEventListener("click", completeExercise);
  deleteBtn.addEventListener("click", deleteExercise);
  // display random message from the messages variable
  let message = messages[Math.floor(Math.random() * messages.length)];
  displayAlert("green", message);
  exercise.appendChild(newExercise);
};

// if the user wrote something, success message, if not, displaying a warning sign

const displayAlert = (color, text) => {
  alert.classList.add(`${color}-alert`);
  alert.textContent = `${text}`;
  setTimeout(() => {
    alert.classList.remove(`${color}-alert`);
    alert.textContent = "";
  }, 700);
};

//check if the exercise exists already

const exerciseCheck = (name, exerciseDiv) => {
  let exerciseArr = [];
  exerciseDiv.forEach((item) => {
    if (item.textContent == name) {
      exerciseArr.push(true);
    } else {
      exerciseArr.push(false);
    }
  });
  if (exerciseArr.includes(true)) {
    return true;
  } else {
    return false;
  }
};

const editExercise = () => {};

const completeExercise = (e) => {
  const parent = e.currentTarget.parentElement.parentElement;
  const inputs = parent.querySelectorAll(".exercise-data");
  const deleteBtn = parent.querySelector(".delete-btn");
  const editBtn = parent.querySelector(".edit-btn");
  const emoji = parent.querySelector(".emoji");
  parent.classList.add("exercise-completed");
  deleteBtn.style.display = "none";
  editBtn.style.display = "none";
  parent.style.alignItems = "center";
  emoji.innerHTML = "&#128170";
  inputs.forEach((item) => {
    item.style.display = "none";
  });
};

const deleteExercise = (e) => {
  const parent = e.currentTarget.parentElement.parentElement;
  parent.style.display = "none";
};
