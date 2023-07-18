"use strict";
// CONTAINER ELEMENT
const containerEl = document.querySelector(".container");
// ELEMENT WITH ITEM CLASS
const itemEl = document.querySelectorAll(".item");
// LEFT BUTTON
const leftBtn = document.querySelector(".btn-left");
// RIGHT BUTTON
const rightBtn = document.querySelector(".btn-right");
// MAIN CENTERED IMAGE
const mainImageEl = document.querySelector(".center-image-main");
// CIRCULAR PATH RADIUS IN PIXELS DIVIDED BY 16(FOR REMS) * 2 (FOR RADIUS)
const radius = containerEl.offsetWidth / 32;
// GET COORDINATES USING X=COS(0), Y=SIN(0) TO PLACE IMAGES IN CIRCULAR PATH
function getCoordinates(angleDegree) {
  return [
    radius * Math.cos(angleDegree * (Math.PI / 180)),
    radius * Math.sin(angleDegree * (Math.PI / 180)),
  ];
}
// THIS FUNCTION POSITIONS THE IMAGES USING THOSE X AND Y COORDINATES FROM getCoordinates() FUNCTION
function setPosition() {
  let degreeMove = 0;
  itemEl.forEach(function (el) {
    let [x, y] = [...getCoordinates(degreeMove)];
    el.style.transform = `translate(${x}rem, ${y}rem) translate(-50%, -50%)`;
    degreeMove += 40;
  });
}
setPosition();

// BUTTON FUNCTIONS FOR LEFT AND RIGHT AND OTHER ANIMATIONS

let recipe = {
  0: {
    imagePath: `images/0.png`,
    mainImagePath: `images/0-main.png`,
    primaryColor: "hsl(29, 100%, 94%)",
    secondaryColor: "hsl(29, 100%, 59%)",
  },
  1: {
    imagePath: `images/1.png`,
    mainImagePath: `images/1-main.png`,
    primaryColor: "hsl(0, 100%, 94%)",
    secondaryColor: "hsl(10, 100%, 59%)",
  },
  2: {
    imagePath: `images/2.png`,
    mainImagePath: `images/2-main.png`,
    primaryColor: "hsl(103, 100%, 94%)",
    secondaryColor: "hsl(103, 65%, 45%)",
  },
  mainImage: 0,
};

// Get the buttons and array elements
const leftButton = document.querySelector(".btn-left");
const rightButton = document.querySelector(".btn-right");
const array = [0, 1, 2];
let currentIndex = 0;

// Add event listener for the left button
let currentRotate = 30;
leftButton.addEventListener("click", () => {
  console.log(document.documentElement);
  currentRotate -= 40;
  currentIndex = (currentIndex - 1 + array.length) % array.length;
  recipe.mainImage = currentIndex;
  mainImageEl.src = recipe[recipe.mainImage].mainImagePath;
  containerEl.style.transform = `translate(-50%, -50%) rotate(${currentRotate}deg)`;
  document.documentElement.style.setProperty(
    "--secondaryColor",
    `${recipe[currentIndex].secondaryColor}`
  );
  document.documentElement.style.setProperty(
    "--primaryColor",
    `${recipe[currentIndex].primaryColor}`
  );
});

// Add event listener for the right button
rightButton.addEventListener("click", () => {
  currentRotate += 40;
  currentIndex = (currentIndex + 1) % array.length;
  recipe.mainImage = currentIndex;
  mainImageEl.src = recipe[recipe.mainImage].mainImagePath;
  containerEl.style.transform = `translate(-50%, -50%) rotate(${currentRotate}deg)`;
  document.documentElement.style.setProperty(
    "--secondaryColor",
    `${recipe[currentIndex].secondaryColor}`
  );
  document.documentElement.style.setProperty(
    "--primaryColor",
    `${recipe[currentIndex].primaryColor}`
  );
});
