const userList = document.getElementById('userList');
const errorMsg = document.getElementById('error');
const reloadBtn = document.getElementById('reloadBtn');
const loadingMsg = document.getElementById('loading');

function fetchUsers() {
  userList.innerHTML = '';
  errorMsg.textContent = '';
  loadingMsg.style.display = 'block';

  fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(users => {
      users.forEach(user => {
        const div = document.createElement('div');
        div.classList.add('user-card');
        div.innerHTML = `
          <h3>${user.name}</h3>
          <p><strong>Email:</strong> ${user.email}</p>
          <p><strong>Address:</strong> ${user.address.street}, ${user.address.city}</p>
        `;
        userList.appendChild(div);
      });
    })
    .catch(error => {
      errorMsg.textContent = `Error: ${error.message}`;
    })
    .finally(() => {
      loadingMsg.style.display = 'none';
    });
}

reloadBtn.addEventListener('click', fetchUsers);

// Load data on page load
fetchUsers();
