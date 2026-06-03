/**
 * Denna fil gör ett POST-anrop till API:et för att lägga till en ny bokning.
 * Av: Josefine Backlund
 */

"use strict";

const form = document.querySelector("#bookingform"); //Formuläret

document.addEventListener(
  "DOMContentLoaded",
  form.addEventListener("submit", makeBooking),
);

async function makeBooking(e) {
  //Förhindra standardbeteende på formulär
  e.preventDefault();
  //Input-värden
  let numberOfGuests = document.querySelector("#numberofguests").value;
  let dateAndTime = document.querySelector("#dateandtime").value;
  let name = document.querySelector("#name").value;
  let phone = document.querySelector("#phone").value;
  let info = document.querySelector("#information").value;
  //Error/bekräftelse-meddelanden
  const errorHolder = document.querySelector("#errorcontainer");
  const confirmHolder = document.querySelector("#confirmcontainer");
  //Array med fel-meddelanden som sedan skrivs ut till DOM om input är felaktig.
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
    errorHolder.innerHTML = "";
    confirmHolder.innerHTML = "";
    errors.forEach((error) => {
      const errorEl = document.createElement("p");
      const errorText = document.createTextNode(error);
      errorEl.appendChild(errorText);
      errorHolder.appendChild(errorEl);
    });
  } else {
    //Samlat objekt med inputvärden
    let booking = {
      guests: numberOfGuests,
      date: dateAndTime,
      name: name,
      phone: phone,
      description: info,
    };
    confirmHolder.innerHTML = "";
    errorHolder.innerHTML = "";
    const confirmEl = document.createElement("p");
    const confirmText = document.createTextNode("Din bokning är genomförd!"); //Bekräftelsemeddelande vid lyckad bokning.
    confirmEl.appendChild(confirmText);
    confirmHolder.appendChild(confirmEl);

    //Ett post-anrop till API:et med samlat data från formulär.
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
