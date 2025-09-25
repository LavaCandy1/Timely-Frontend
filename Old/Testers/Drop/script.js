var dropdownLabel = document.getElementById("dropdown-label");

var dropdownFood = document.getElementById("dropdown-food");

function toggleDropdown() {
  dropdownFood.classList.toggle("is-open");
}

document.formFood.onclick = function () {
  var selectedFood = document.querySelector(
    "input[name = selected-food]:checked"
  );
  if (selectedFood != null) {
    var span = selectedFood.parentNode.querySelector("span").innerHTML;
    dropdownLabel.innerHTML = span;
    dropdownFood.classList.remove("is-open");
  }
};