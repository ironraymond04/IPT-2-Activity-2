import axios from "axios";

import JSConfetti from 'js-confetti'

const jsConfetti = new JSConfetti()



const form = document.querySelector('#userForm');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const resultDiv = document.querySelector('#result');
const usersDiv = document.querySelector('#users');

form.addEventListener("submit", async(e) => {
  e.preventDefault(); 

  try {
    const response = await axios.post("http://localhost:3000/api/adduser", {
      name: nameInput.value,
      email: emailInput.value,
    });

    resultDiv.innerHTML = `
      <p style="color: green;">
        ${response.data.message}<br>
        User ID: ${response.data.user.id}<br>
        Name: ${response.data.user.name}<br>
        Email: ${response.data.user.email}
      </p>
    `;

    displayUsers();
    jsConfetti.addConfetti()

  } catch (error) {
    console.log(error);
    resultDiv.innerHTML = `<p style="color: red;"> ${error.response?.data?.message || "Something went wrong"}</p>`;
  }
});

async function displayUsers() {
  try {
    const response = await axios.get("http://localhost:3000/api/users");
    const users = response.data.users;

    usersDiv.innerHTML = "<h3>All Users:</h3>";
    users.forEach(user => {
      usersDiv.innerHTML += `
        <p>
          Name: ${user.name}<br>
          Email: ${user.email}
        </p>
        <hr>
      `;
    });
  } catch (error) {
    console.error(error);
    usersDiv.innerHTML = `<p style="color: red;">Failed to load users</p>`;
  }
}

displayUsers();

