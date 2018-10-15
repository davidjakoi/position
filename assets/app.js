let button = document.querySelector('button');
let input1 = document.querySelector('#firstInput');
let inputLabel = document.getElementById('label');
let routeButton = document.querySelector('.routeHeader');
let locationButton = document.querySelector('.locationHeader');
locationButton.addEventListener('click', removeRouteInput);
routeButton.addEventListener('click', addRouteInput);
button.addEventListener('click', checkInputs);

function checkInputs() {
  console.log(inputLabel.childElementCount);
  if (inputLabel.childElementCount === 2) {
    getCoordinates();
  } else if (inputLabel.childElementCount === 3) {
    getRoute();
  }
}

function getCoordinates() {
  let myRequest = new XMLHttpRequest();
  myRequest.open('GET', `https://position-david.herokuapp.com/location?location=${input1.value}`, true);
  myRequest.onload = () => {
    if (myRequest.status === 200) {
      const results = JSON.parse(myRequest.response);
      console.log(results);
      let inputField = document.getElementById('inputField');
      let newHeader = document.createElement('h1');
      newHeader.innerText = `The coordinates of ${results[0].name}: ${results[0].ll}`;
      inputField.appendChild(newHeader);
      let myMap = document.createElement('iframe');
      myMap.setAttribute('width', '800');
      myMap.setAttribute('height', '550');
      myMap.setAttribute('frameborder', '0');
      myMap.setAttribute('style', 'border:1px solid black');
      myMap.setAttribute('src', `https://www.google.com/maps/embed/v1/place?key=AIzaSyBroxirltG9wAmi2RPM7zgJDMfqDBY32x8&q=${results[0].lat},${results[0].lon}&zoom=12`);
      inputField.appendChild(myMap);
    }
  }
  myRequest.send();
}

function getRoute() {
  console.log('hello');
  let input2 = document.getElementById('input2');
  let routeRequest = new XMLHttpRequest();
  routeRequest.open('GET', `https://position-david.herokuapp.com/route?from=${input1.value}&to=${input2.value}`, true);
  routeRequest.onload = () => {
    if (routeRequest.status === 200) {
      const results = JSON.parse(routeRequest.response);
      let myMap = document.createElement('iframe');
      console.log(results);
      myMap.setAttribute('width', '800');
      myMap.setAttribute('height', '550');
      myMap.setAttribute('frameborder', '0');
      myMap.setAttribute('style', 'border:1px solid black');
      myMap.setAttribute('src', `https://www.google.com/maps/embed/v1/directions?key=AIzaSyBroxirltG9wAmi2RPM7zgJDMfqDBY32x8&origin=${results[0][0].name}&destination=${results[1][0].name}&avoid=tolls|highways&zoom=9`);
      inputField.appendChild(myMap);
    }
  }
  routeRequest.send();
}

function addRouteInput() {
  if (inputLabel.childElementCount < 3) {
    let secondInput = document.createElement('input');
    let myLabel = document.getElementById('label');
    secondInput.setAttribute('type', 'text');
    secondInput.setAttribute('id', 'input2');
    myLabel.insertBefore(secondInput, myLabel.childNodes[2]);
    secondInput.setAttribute('placeholder', 'To...');
    input1.setAttribute('placeholder', 'Go from...');
    button.innerText = "Show me the route!";
  }
}

function removeRouteInput() {
  let secondInput = document.getElementById('input2');
  let myLabel = document.getElementById('label');
  myLabel.removeChild(secondInput);
  button.innerText = "Show me this city on a map!";
  input1.setAttribute('placeholder', 'Name of the city');
}