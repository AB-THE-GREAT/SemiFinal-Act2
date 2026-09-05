// Grab the elements we need from the page
const loadBtn = document.getElementById("loadBtn");
const statusEl = document.getElementById("status");
const userList = document.getElementById("userList");

const API_URL = "https://jsonplaceholder.typicode.com/users";

async function loadUsers() {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Request failed");
    }

    const users = await response.json();

    userList.innerHTML = users
      .map(
        (user) => `
      <li>
        <span class="name">${user.name}</span>
        <span class="username">@${user.username}</span>
        <dl>
          <dt>Email</dt><dd>${user.email}</dd>
          <dt>Phone</dt><dd>${user.phone}</dd>
          <dt>Company</dt><dd>${user.company.name}</dd>
        </dl>
      </li>
    `,
      )
      .join("");

    statusEl.textContent = `Showing ${users.length} users.`;
  } catch (error) {
    statusEl.textContent = "Unable to retrieve data.";
  }
}

loadBtn.addEventListener("click", loadUsers);
