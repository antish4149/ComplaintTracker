async function loadComplaints() {
    const res = await fetch("/complaints");
    const complaints = await res.json();

    const container = document.getElementById("complaints");
    container.innerHTML = "";

    complaints.forEach(c => {
        const div = document.createElement("div");

        div.innerHTML = `
            <p><b>ID:</b> ${c.id}</p>
            <p><b>Name:</b> ${c.name}</p>
            <p><b>Title:</b> ${c.title}</p>
            <p><b>Status:</b> ${c.status}</p>
            <button onclick="updateStatus(${c.id}, 'resolved')">Resolve</button>
            <button onclick="updateStatus(${c.id}, 'rejected')">Reject</button>
            <button onclick="deleteComplaint(${c.id})">Delete</button>
            <hr>
        `;

        container.appendChild(div);
    });
}

async function updateStatus(id, status) {
    await fetch(`/complaints/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
    });
    loadComplaints();
}

async function deleteComplaint(id) {
    await fetch(`/complaints/${id}`, { method: "DELETE" });
    loadComplaints();
}

loadComplaints();
