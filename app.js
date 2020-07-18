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
  let newExercise = document.createElement("div");
  if (name) {
    newExercise.innerHTML = `<div class="exercise">
        <h3 class='name'>${name}</h3>
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
    let newDiv = newExercise.querySelector(".name");
    let allExercises = document.querySelectorAll(".name");
    let exerciseBoolean = exerciseCheck(newDiv.textContent, allExercises);
    // hacer en funcion aparte
    if (!exerciseBoolean) {
      let message = messages[Math.floor(Math.random() * messages.length)];
      displayAlert("green", message);
      const doneBtn = newExercise.querySelectorAll(".done-btn");
      exercise.appendChild(newExercise);
    } else {
      displayAlert("red", "Exercise already added!");
    }
  } else {
    displayAlert("red", "Write an exercise to begin!");
  }

  exerciseName.value = "";
});

// if the user wrote something, success message, if not, a warning sign telling to do so

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

/* doneBtn.forEach(function (button) {
    button.addEventListener("click", function (e) {
      let square = e.currentTarget.parentElement;
      square.classList.add("exercise-completed");
    });
  }); */
