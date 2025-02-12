const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());


mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error(err));


const FormSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    country:String
});


const FormData = mongoose.model("FormData", FormSchema);


app.post("/submit-form", async (req, res) => {
    try {
        const { name, email, phone, country } = req.body;
        
        
        if (!name || !email || !phone || !country) {
            return res.status(400).json({ message: "All fields are required" });
        }

       
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailPattern.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        
        if (phone.length < 10 || phone.length > 15) {
            return res.status(400).json({ message: "Phone number should be between 10 to 15 digits" });
        }

        
        const newEntry = new FormData({ name, email, phone, country });
        await newEntry.save();

        res.status(201).json({ message: "Form submitted successfully" });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Server error" });
    }
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
