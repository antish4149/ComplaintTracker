const form = document.getElementById('complaintForm');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const issue = document.getElementById('issue').value;

    await fetch('/complaints', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, issue })
    });

    alert("Complaint submitted!");
    form.reset();
  });
}

const list = document.getElementById('complaintList');

if (list) {
  fetch('/complaints')
    .then(res => res.json())
    .then(data => {
      list.innerHTML = data.map(c => `
        <div class="card">
          <p><b>ID:</b> ${c.id}</p>
          <p><b>Name:</b> ${c.name}</p>
          <p><b>Issue:</b> ${c.issue}</p>
          <p><b>Status:</b> ${c.status}</p>

          <select onchange="updateStatus(${c.id}, this.value)">
            <option>pending</option>
            <option>resolved</option>
            <option>rejected</option>
          </select>

          <button onclick="deleteComplaint(${c.id})">Delete</button>
        </div>
      `).join('');
    });
}



function updateStatus(id, status) {
  fetch(`/complaints/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status })
  }).then(() => location.reload());
}


function deleteComplaint(id) {
  fetch(`/complaints/${id}`, {
    method: 'DELETE'
  }).then(() => location.reload());
}
