"use strict";

const form = document.querySelector("#bookingform");

document.addEventListener(
  "DOMContentLoaded",
  form.addEventListener("submit", makeBooking),
);

async function makeBooking(e) {
  e.preventDefault();

  let numberOfGuests = document.querySelector("#numberofguests").value;
  let dateAndTime = document.querySelector("#dateandtime").value;
  let name = document.querySelector("#name").value;
  let phone = document.querySelector("#phone").value;
  let info = document.querySelector("#information").value;

  let errors = [];
  if (numberOfGuests === "") {
    errors.push("Ange antal gäster.");
  }
  if (dateAndTime === "") {
    errors.push("Ange datum och tid.");
  }
  if (name === "") {
    errors.push("Ange ett namn för bokningen.");
  }
  if (phone === "") {
    errors.push("Ange ett telefonnummer.");
  }

  if (errors.length > 0) {
    errors.forEach((error) => {
      console.log(error);
    });
  } else {
    let booking = {
      guests: numberOfGuests,
      date: dateAndTime,
      name: name,
      phone: phone,
      description: info,
    };

    try {
      let response = await fetch("http://localhost:3000/api/bookings", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(booking),
      });
      form.reset();
    } catch (error) {
      console.log(error);
    }
  }
}
