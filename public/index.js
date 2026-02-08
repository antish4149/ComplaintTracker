document.getElementById("complaintForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const complaint = {
        name: name.value,
        email: email.value,
        title: title.value,
        description: description.value
    };

    await fetch("/complaints", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(complaint)
    });

    alert("Complaint submitted successfully!");
    e.target.reset();
});
