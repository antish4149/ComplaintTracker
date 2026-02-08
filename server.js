const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

let complaints = [];


app.get("/complaints", (req, res) => {
    res.json(complaints);
});


app.get("/complaints/:id", (req, res) => {
    const id = Number(req.params.id);
    const complaint = complaints.find(c => c.id === id);

    if (!complaint) {
        return res.status(404).json({ message: "Complaint not found" });
    }

    res.json(complaint);
});

app.post("/complaints", (req, res) => {
    const { name, email, title, description } = req.body;

    const newComplaint = {
        id: Date.now(),
        name,
        email,
        title,
        description,
        status: "pending"
    };

    complaints.push(newComplaint);
    res.status(201).json(newComplaint);
});


app.put("/complaints/:id", (req, res) => {
    const id = Number(req.params.id);
    const { status } = req.body;

    const complaint = complaints.find(c => c.id === id);
    if (!complaint) {
        return res.status(404).json({ message: "Complaint not found" });
    }

    complaint.status = status;
    res.json(complaint);
});


app.delete("/complaints/:id", (req, res) => {
    const id = Number(req.params.id);
    complaints = complaints.filter(c => c.id !== id);
    res.json({ message: "Complaint deleted" });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
