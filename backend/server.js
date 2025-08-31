import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

    let users = []

app.get("/api/users", (req, res) => {
    res.json({users});
});

app.post("/api/adduser", (req, res) => {
    console.log(req.body);
    const { name, email } = req.body;

    if (!name || !email){
        return res.status(400).json({ message: "Name and email are required." });
    }


    const newUser = {
        id: users.length + 1,
        name,
        email,
    };

    users.push(newUser);
    res.status(201).json({
        message: "User added successfully",
        user: newUser,
    });
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});