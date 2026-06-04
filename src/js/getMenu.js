/**
 * Denna fil hämtar meny-innehållet från varje tabell och skriver ut innehållet i DOM.
 * Av: Josefine Backlund
 */

"use strict";

document.addEventListener("DOMContentLoaded", () => {
  getAppetizers();
  getMainCourses();
  getDesserts();
  getDrinks();
});
//URL:er
const appetizerUrl = "http://localhost:3000/api/appetizers";
const mainCourseUrl = "http://localhost:3000/api/maincourses";
const dessertsUrl = "http://localhost:3000/api/desserts";
const drinksUrl = "http://localhost:3000/api/drinks";

//Grundläggande funktion för get-anrop för mindre redundans.
async function getData(url, getProduct) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    getProduct(data);
  } catch (error) {
    console.log("Fel: " + error);
  }
}

//Denna generella funktion skapar nödvändiga element och textnodes från anropet och skriver ut i DOM på rätt plats i menyn med hjälp av id.
function printData(id, data) {
  const container = document.querySelector(id);
  const articleEl = document.createElement("article");
  const label = document.createElement("h4");
  const description = document.createElement("p");
  const price = document.createElement("p");
  const courseText = document.createTextNode(data.name);
  const descriptionText = document.createTextNode(data.description);
  const priceText = document.createTextNode(data.price);
  const currency = document.createTextNode(" kr");

  label.appendChild(courseText);
  description.appendChild(descriptionText);
  price.appendChild(priceText);
  price.appendChild(currency);
  const holder = document.createElement("div");
  holder.classList.add("courseandinfo");
  holder.appendChild(label);
  holder.appendChild(description);

  articleEl.appendChild(holder);
  articleEl.appendChild(price);

  container.appendChild(articleEl);
}

async function getAppetizers() {
  getData(appetizerUrl, printAppetizers);
}
async function getMainCourses() {
  getData(mainCourseUrl, printMainCourses);
}
async function getDesserts() {
  getData(dessertsUrl, printDesserts);
}
async function getDrinks() {
  getData(drinksUrl, printDrinks);
}
function printAppetizers(data) {
  data.forEach((appetizer) => {
    printData("#appetizers", appetizer);
  });
}
function printMainCourses(data) {
  data.forEach((mainCourse) => {
    printData("#maincourses", mainCourse);
  });
}
function printDesserts(data) {
  data.forEach((dessert) => {
    printData("#desserts", dessert);
  });
}
function printDrinks(data) {
  data.forEach((drink) => {
    if (drink.category === "red wine") {
      printData("#redwine", drink);
    }
    if (drink.category === "white wine") {
      printData("#whitewine", drink);
    }
    if (drink.category === "sparkling wine") {
      printData("#sparklingwine", drink);
    }
    if (drink.category === "beer") {
      printData("#beer", drink);
    }
    if (drink.category === "alcohol free") {
      printData("#alcoholfree", drink);
    }
    if (drink.category === "coffee/tea") {
      printData("#coffeeortea", drink);
    }
  });
}
