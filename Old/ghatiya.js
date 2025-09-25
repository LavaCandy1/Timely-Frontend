// SIDEBAR
// SIDEBAR
// SIDEBAR
// SIDEBAR
// SIDEBAR
// SIDEBAR
// SIDEBAR

function toggleFunction() {
  let isToggled = false;
  const opaElements = document.querySelectorAll(".opa");
  const sid = document.getElementById("sid");
  const TD = document.getElementById("TD");
  const main = document.getElementById("main");
  return function () {
    isToggled = !isToggled;
    if (isToggled) {
      TD.style.width = "450px";
      main.style.marginLeft = "450px";
      opaElements.forEach((element) => {
        element.style.transitionDuration = "0.5s";
      });
      setTimeout(function () {
        opaElements.forEach((element) => {
          element.style.opacity = 1;
        });
      }, 600);
    } else {
      TD.style.width = "0";
      main.style.marginLeft = "0";
      opaElements.forEach((element) => {
        element.style.opacity = "0";
        element.style.transitionDuration = "0.3s";
      });
    }
  };
}
const toggleButton = document.getElementById("sid");
toggleButton.addEventListener("click", toggleFunction());

// FORRRRRRRRRRRRRRRRRRRRRRRRRRM
function calculateTimeDifference() {
  const time1Input = document.getElementById("time1");
  const time2Input = document.getElementById("time2");
  const resultElement = document.getElementById("result");

  const time1 = new Date("1970-01-01T" + time1Input.value + "Z");
  const time2 = new Date("1970-01-01T" + time2Input.value + "Z");

  const timeDifference = new Date(time2 - time1);

  const hours = timeDifference.getUTCHours();
  const minutes = timeDifference.getUTCMinutes();
  const seconds = timeDifference.getUTCSeconds();

  resultElement.textContent = `Time Difference: ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
}

// NAAAAAAAAAAAAAAAAAAAAAAAAAAMMMMMMMMMMMMMMMMMMMMMMMMMMMMEEEEEEEEEEEEEEEEEEEEEEEEEEEEEe

// DRRRRRRRRRRRROOOOOOOOOOOOOOOOOOOOOOOOOPPPPPPPPPPPPPPPP
const selectedAll = document.querySelectorAll(".wrapper-dropdown");

selectedAll.forEach((selected) => {
  const optionsContainer = selected.children[2];
  const optionsList = selected.querySelectorAll("div.wrapper-dropdown li");

  selected.addEventListener("click", () => {
    let arrow = selected.children[1];

    if (selected.classList.contains("active")) {
      handleDropdown(selected, arrow, false);
    } else {
      let currentActive = document.querySelector(".wrapper-dropdown.active");

      if (currentActive) {
        let anotherArrow = currentActive.children[1];
        handleDropdown(currentActive, anotherArrow, false);
      }

      handleDropdown(selected, arrow, true);
    }
  });

  // Update the display of the dropdown and set the value of "selected-display" input
  for (let o of optionsList) {
    o.addEventListener("click", () => {
      const inputValue = o.textContent; // Get the text content of the selected option
      const parentDropdown = o.closest(".wrapper-dropdown");
      const selectedDisplay = parentDropdown.querySelector(".selected-display");

      selectedDisplay.value = inputValue; // Set the value of "selected-display" input
    });
  }
});

// close all the dropdowns
function closeAllDropdowns() {
  const selectedAll = document.querySelectorAll(".wrapper-dropdown");
  selectedAll.forEach((selected) => {
    const optionsContainer = selected.children[2];
    let arrow = selected.children[1];

    handleDropdown(selected, arrow, false);
  });
}

// open all the dropdowns
function handleDropdown(dropdown, arrow, open) {
  if (open) {
    arrow.classList.add("rotated");
    dropdown.classList.add("active");
  } else {
    arrow.classList.remove("rotated");
    dropdown.classList.remove("active");
  }
}

// USSSSSSSSSSSSSSSSSSSSPPPPPPPPPPPPPPPPPPPPPPPppp

// DIALOG BOX

const changeZIndexButton = document.getElementById("changeZIndexButton");
const ccDiv = document.getElementById("mydiv");
changeZIndexButton.addEventListener("click", function () {
  ccDiv.style.zIndex = "2";
});

const changeZIndexButton2 = document.getElementById("changeZIndexButton2");
changeZIndexButton2.addEventListener("click", function () {
  ccDiv.style.zIndex = "0";
});

function displayDay() {
  var daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  var currentTime = new Date();
  var currentDay = daysOfWeek[currentTime.getDay()];

  document.getElementById("current-day").textContent = currentDay;
}
function displayDate() {
  var currentDate = new Date();
  var year = currentDate.getFullYear();
  var month = currentDate.getMonth() + 1; // Adding 1 since months are zero-indexed
  var day = currentDate.getDate();

  // Add leading zeros if necessary
  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }

  var formattedDate = day;
  document.getElementById("current-date").textContent = formattedDate;

  // Update date every day
  setTimeout(displayDate, 86400000); // 24 hours in milliseconds
}
