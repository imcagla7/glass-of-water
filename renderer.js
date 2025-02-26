// --- Sound Effects Start ---
const mouseClickSound = new Audio("./assets/mouse-click.mp3");
const drinkingWaterSound = new Audio("./assets/drinking-water-trim.mp3");
const typingSound = new Audio("./assets/keyboard-typing.mp3");

function playSound(audio) {
  audio.currentTime = 0; // Başa sar
  audio.play();
}
// --- Sound Effects End ---

// --- Local Storage Start ---
let waterIntake = localStorage.getItem("waterIntake") ?? 0;
let waterGoal = localStorage.getItem("waterGoal") ?? 0;
function setLocalState(state) {
  localStorage.setItem("waterIntake", state);
}
// --- Local Storage End ---

// --- Window Load Start ---
window.onload = function () {
  if (waterGoal > 0) {
    document.getElementById("intake-group").style.display = "flex";
    document.getElementById("revert-button").style.display = "flex";
    document.getElementById("reset-button").style.display = "flex";
    document.getElementById("goal-modal").style.display = "none";
    updateUI();
  }
};
// --- Window Load End ---

// --- Set Goal Start ---
const goalInput = document.getElementById("water-goal");
goalInput.addEventListener("input", function (e) {
  playSound(typingSound);
  localStorage.setItem("waterGoal", e.target.value);
});

document.getElementById("start-button").addEventListener("click", function () {
  playSound(mouseClickSound);
  const goal = localStorage.getItem("waterGoal");
  if (goal && goal > 0) {
    waterGoal = goal;
    document.getElementById("intake-group").style.display = "flex";
    document.getElementById("revert-button").style.display = "flex";
    document.getElementById("reset-button").style.display = "flex";
    document.getElementById("goal-modal").style.display = "none";
    updateUI();
  } else {
    alert("Please enter a valid water goal!");
  }
});
// --- Set Goal End ---

// --- Update UI Start ---
const waterGroup = document.getElementById("water-drop-group");
const waterCountSpan = document.getElementById("water-count");

function updateUI() {
  if (waterGroup.children.length === 0) {
    for (let i = 0; i < waterGoal; i++) {
      const button = document.createElement("span");
      button.classList.add("water-drop");

      const img = document.createElement("img");
      img.width = 35;
      img.height = 35;
      button.appendChild(img);

      waterGroup.appendChild(button);
    }
  }

  const buttons = waterGroup.children;
  for (let i = 0; i < buttons.length; i++) {
    const img = buttons[i].querySelector("img");
    img.src =
      i < waterIntake
        ? "./assets/WaterDrop.svg"
        : "./assets/WaterDropEmpty.svg";
  }

  waterCountSpan.innerText = `${waterIntake}/${waterGoal}`;
}
updateUI();
// --- Update UI Start End ---

// --- Revert Button Method Start---
document.getElementById("revert-button").addEventListener("click", () => {
  playSound(mouseClickSound);
  if (waterIntake !== 0) {
    waterIntake--;
    setLocalState(waterIntake);
  }
  updateUI();
});
// --- Revert Button Method End---

// --- Reset Button Method Start---
document.getElementById("reset-button").addEventListener("click", () => {
  playSound(mouseClickSound);
  mouseClickSound.onended = () => {
    localStorage.clear();
    location.reload();
  };
});
// --- Reset Button Method End---

// --- Time Update Start ---
function updateTime() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;

  const hoursElement = document.getElementById("hours");
  const minutesElement = document.getElementById("minutes");
  const ampmElement = document.getElementById("ampm");

  if (hoursElement.textContent !== hours.toString()) {
    hoursElement.textContent = hours;
  }
  if (minutesElement.textContent !== minutes.toString().padStart(2, "0")) {
    minutesElement.textContent = minutes.toString().padStart(2, "0");
  }
  if (ampmElement.textContent !== ampm) {
    ampmElement.textContent = ampm;
  }
}

setInterval(updateTime, 1000);
updateTime();
// --- Time Update End ---

// --- Water Glass Animation Start ---
const waterGlassImages = [
  "./assets/0-FilledWaterGlass.svg",
  "./assets/1-FilledWaterGlass.svg",
  "./assets/2-FilledWaterGlass.svg",
  "./assets/3-FilledWaterGlass.svg",
  "./assets/4-FilledWaterGlass.svg",
  "./assets/5-FilledWaterGlass.svg",
  "./assets/6-FilledWaterGlass.svg",
];

let waterGlassIndex = 0;
let isDrinkingWater = false;

document.getElementById("water-glass").addEventListener("click", function () {
  playSound(mouseClickSound);
  playSound(drinkingWaterSound);
  if (!isDrinkingWater) {
    isDrinkingWater = true;

    const interval = setInterval(() => {
      waterGlassIndex++;
      this.src = waterGlassImages[waterGlassIndex % waterGlassImages.length];
      if (waterGlassIndex >= waterGlassImages.length) {
        clearInterval(interval);
        this.src = waterGlassImages[0];
        waterGlassIndex = 0;
        isDrinkingWater = false;
      }
    }, 200);
  }
  if (waterIntake < waterGoal) {
    waterIntake++;
    setLocalState(waterIntake);
  }
  updateUI();
});
// --- Water Glass Animation End ---
