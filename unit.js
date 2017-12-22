/*
* DATA
*/

var property = new Array();
var unit = new Array();
var factor = new Array();

property[0] = "Weight";
unit[0] = new Array("Pounds", "Tons", "Ounce", "Grams", "Kilograms");
factor[0] = new Array(1, 2000, 0.0625, 453.592, 0.453592);

property[1] = "Length/Distance";
unit[1] = new Array("Inches", "Feet", "Miles", "Yards", "Centimeters", "Meters", "Kilometers");
factor[1] = new Array(1, 12, 63360, 36, 0.393701, 39.3701, 39370.1);

property[2] = "Time";
unit[2] = new Array("Seconds", "Minutes", "Hours", "Days(Earth)", "Weeks", "Years");
factor[2] = new Array(1, 60, 3600, 86400, 604800, 31536000);

property[3] = "Currency";
unit[3] = new Array("US Dollar", "Euro", "Japanese Yen", "Bitcoin", "Pound");
factor[3] = new Array(1, 1.15, 0.01, 14951, 1.34);

property[4] = "Temperature";
unit[4] = new Array("Degrees Celsius", "Degrees Fahrenheit");
factor[4] = new Array(1, 0.555555555555);
tempIncrement = new Array(0, -32);


/*
* FUNCTIONS
*/

function UpdateUnitMenu(propMenu, unitMenu) {
  var i;
  i = propMenu.selectedIndex;
  FillMenuWithArray(unitMenu, unit[i]);
}

function FillMenuWithArray(myMenu, myArray) {
  var i;
  myMenu.length = myArray.length;
  for (i = 0; i < myArray.length; i++) {
    myMenu.options[i].text = myArray[i];
  }
}

function CalculateUnit(sourceForm, targetForm) {
  var sourceValue = sourceForm.unit_input.value;

  sourceValue = parseFloat(sourceValue);
  if (!isNaN(sourceValue) || sourceValue == 0) {
    sourceForm.unit_input.value = sourceValue;
    ConvertFromTo(sourceForm, targetForm);
  }
}

function ConvertFromTo(sourceForm, targetForm) {
  var propIndex;
  var sourceIndex;
  var sourceFactor;
  var targetIndex;
  var targetFactor;
  var result;

  propIndex = document.property_form.the_menu.selectedIndex;

  sourceIndex = sourceForm.unit_menu.selectedIndex;
  sourceFactor = factor[propIndex][sourceIndex];

  targetIndex = targetForm.unit_menu.selectedIndex;
  targetFactor = factor[propIndex][targetIndex];


  result = sourceForm.unit_input.value;

  if (property[propIndex] == "Temperature") {
    result = parseFloat(result) + tempIncrement[sourceIndex];
  }
  result = result * sourceFactor;

  result = result / targetFactor;
  
  if (property[propIndex] == "Temperature") {
    result = parseFloat(result) - tempIncrement[targetIndex];
  }

  targetForm.unit_input.value = result;
}

window.onload = function(e) {
  FillMenuWithArray(document.property_form.the_menu, property);
  UpdateUnitMenu(document.property_form.the_menu, document.form_A.unit_menu);
  UpdateUnitMenu(document.property_form.the_menu, document.form_B.unit_menu)
}

// Restricting textboxes to accept numbers + navigational keys only
document.getElementsByClassName('numbersonly').addEventListener('keydown', function(e) {
  var key = e.keyCode ? e.keyCode : e.which;

  if (!([8, 9, 13, 27, 46, 110, 190].indexOf(key) !== -1 ||
      (key == 65 && (e.ctrlKey || e.metaKey)) || // Select All 
      (key == 67 && (e.ctrlKey || e.metaKey)) || // Copy
      (key == 86 && (e.ctrlKey || e.metaKey)) || // Paste
      (key >= 35 && key <= 40) || // End, Home, Arrows
      (key >= 48 && key <= 57 && !(e.shiftKey || e.altKey)) || // Numeric Keys
      (key >= 96 && key <= 105) // Numpad
      (key == 190) // Numpad
    )) e.preventDefault();
});
