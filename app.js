const form = document.querySelector(".form-control");
const exercise = document.querySelector(".exercises-container");
const exerciseName = document.getElementById("exerciseInput");
const alert = document.getElementById("alert");
const submitBtn = document.querySelector(".submit-btn");

/*  agregar funcion timer en cada ejercicio con los descansos
    mobile friendly
    delete submit once submitted!!
    tracking semanal/mensual de los dias que fui al gym?
*/

// different options for the display alert function
const messages = [
  "Great job!",
  "Keep on going!",
  "You got this!",
  "Killing it!",
  "Looking good!",
];

let doneState = false;
let editFlag = false;
let modifyingDiv;

form.addEventListener("submit", function (e) {
  e.preventDefault();
  // lowercase the input to properly check if exists
  let name = exerciseName.value.toLowerCase();
  let allExercises = document.querySelectorAll(".name");
  let exerciseCreated = exerciseCheck(name, allExercises);
  // checks that a name was inputted
  if (!name) {
    displayAlert("red", "Please, write an exercise!");
    return;
  }
  //checks that the exercise was not created already
  if (exerciseCreated) {
    displayAlert("red", "Exercise already exists!");
  } else if (!editFlag) {
    createExercise(name);
  } else {
    modifyExercise(name, modifyingDiv);
  }
});

//Create exercise div

const createExercise = (name) => {
  let newExercise = document.createElement("div");
  newExercise.innerHTML = `<div class="exercise">
        <h3 class='name'>${name}</h3>
        <p class="emoji" id="muscle">&#128170</p>
        <div class="modifying-container">
          <div class="exercise-data">
              <p>Sets</p>
              <input type="number" class="inputs" placeholder="1" min="1" max="10">
          </div>
          <div class="exercise-data">
              <p>Reps</p>
              <input type="number" class="inputs" placeholder="1" min="1" max="20">
          </div>
          <div class="exercise-data">
              <p>Weight</p>
              <input type="number" class="inputs" placeholder="0" step="2.5" min="0" max="500">
              </div>
          </div>   
          <div class="btn-container">
            <button type="button" class="edit-btn">Edit</button>
            <button type="button" class="done-btn">Done</button>
            <button type="button" class="delete-btn">Delete</button>
          </div>
        </div>`;
  // new exercise created, adds functionality to the new buttons
  const editBtn = newExercise.querySelector(".edit-btn");
  const doneBtn = newExercise.querySelector(".done-btn");
  const deleteBtn = newExercise.querySelector(".delete-btn");
  editBtn.addEventListener("click", editExercise);
  doneBtn.addEventListener("click", completeExercise);
  deleteBtn.addEventListener("click", deleteExercise);
  // display random message from the messages variable
  let message = messages[Math.floor(Math.random() * messages.length)];
  displayAlert("green", message);
  exerciseName.value = "";
  exercise.appendChild(newExercise);
};

// if the user wrote something, success message, if not, displaying a warning sign
const displayAlert = (color, text) => {
  alert.classList.add(`${color}-alert`);
  alert.textContent = `${text}`;
  setTimeout(() => {
    alert.classList.remove(`${color}-alert`);
    alert.textContent = "";
  }, 800);
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

//buttons functionality

const modifyExercise = (name, modifyingDiv) => {
  modifyingDiv.firstElementChild.textContent = name;
  editFlag = false;
  modifyingDiv = "";
  exerciseName.value = "";
  submitBtn.textContent = "Submit";
};

const editExercise = (e) => {
  modifyingDiv = e.currentTarget.parentElement.parentElement;
  let name =
    e.currentTarget.parentElement.parentElement.firstElementChild.textContent;
  exerciseName.value = name;
  submitBtn.textContent = "Edit";
  editFlag = true;
};

// restyle the exercise if it gets marked as completed, back to normal if clicked again
const completeExercise = (e) => {
  const parent = e.currentTarget.parentElement.parentElement;
  const inputs = parent.querySelector(".modifying-container");
  const deleteBtn = parent.querySelector(".delete-btn");
  const editBtn = parent.querySelector(".edit-btn");
  const doneBtn = parent.querySelector(".done-btn");
  const emoji = parent.querySelector(".emoji");
  if (doneState) {
    parent.classList.remove("exercise-completed");
    emoji.classList.remove("emoji-on");
    deleteBtn.style.display = "block";
    editBtn.style.display = "block";
    inputs.style.display = "block";
    doneState = false;
    doneBtn.innerHTML = "Done";
  } else {
    parent.classList.add("exercise-completed");
    deleteBtn.style.display = "none";
    editBtn.style.display = "none";
    inputs.style.display = "none";
    emoji.classList.add("emoji-on");
    doneState = true;
    doneBtn.innerHTML = "Undone?";
  }
};

const deleteExercise = (e) => {
  const parent = e.currentTarget.parentElement.parentElement;
  parent.remove();
};
