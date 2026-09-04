    const loadBtn = document.getElementById('loadBtn');
    const statusEl = document.getElementById('status');
    const userList = document.getElementById('userList');
    const API_URL = 'https://jsonplaceholder.typicode.com/users';

    async function loadUsers() {
      loadBtn.disabled = true;
      userList.innerHTML = '';
      statusEl.textContent = 'Loading...';
      statusEl.classList.remove('error');

      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const users = await response.json();
        renderUsers(users);
        statusEl.textContent = `Showing ${users.length} users.`;
      } catch (err) {
        statusEl.textContent = `Couldn't load users: ${err.message}`;
        statusEl.classList.add('error');
      } finally {
        loadBtn.disabled = false;
      }
    }

    function renderUsers(users) {
      const fragment = document.createDocumentFragment();

      users.forEach((user) => {
        const li = document.createElement('li');
        li.innerHTML = `
          <span class="name">${escapeHtml(user.name)}</span>
          <span class="username">@${escapeHtml(user.username)}</span>
          <dl>
            <dt>Email</dt><dd>${escapeHtml(user.email)}</dd>
            <dt>Phone</dt><dd>${escapeHtml(user.phone)}</dd>
            <dt>Company</dt><dd>${escapeHtml(user.company?.name || '')}</dd>
          </dl>
        `;
        fragment.appendChild(li);
      });

      userList.appendChild(fragment);
    }

    function escapeHtml(str) {
      const div = document.createElement('div');
      div.textContent = str ?? '';
      return div.innerHTML;
    }

    loadBtn.addEventListener('click', loadUsers);