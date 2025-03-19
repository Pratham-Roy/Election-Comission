const express = require('express');
const axios = require('axios');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 4000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const DB_URL = 'mongodb+srv://PrathamRoy:Pratham1@cluster0.fwyfqt0.mongodb.net/election';  
mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const conn = mongoose.connection;
conn.once('open', () => {
    console.log("Successfully connected to MongoDB");
});
conn.once('error', () => {
    console.log("Failed to connect to MongoDB");
});

const userSchema = new mongoose.Schema({}, { strict: false });

const User = mongoose.model('Vote', userSchema, 'vote');  




app.get('/getUser/:id', async (req, res) => {
    const { id } = req.params;  
    try {
        const user = await User.findOne({ [`${id}`]: { $exists: true } });

        if (!user) {
            return res.status(404).json({ error: `User not found for ID ${id}` });
        }

        const userData = user[id];

        if (!userData) {
            return res.status(404).json({ error: `User data not found under ID ${id}` });
        }

        return res.status(200).json({
            message: `${userData.name} found!`,
            user: userData
        });

    } catch (err) {
        console.error("Error fetching user:", err);
        return res.status(500).json({ error: "Failed to fetch user" });
    }
});


app.post("/voteUser", async (req, res) => {
    const { id } = req.body;  
    console.log("Received vote request for ID:", id);

    if (!id) {
        return res.status(400).json({ error: "ID is required to vote" });
    }

    try {
        const user = await User.findOneAndUpdate(
            { [`${id}`]: { $exists: true } },  
            { $inc: { [`${id}.vote`]: 1 } },   
            { new: true }  
        )
        if (!user) {
            return res.status(404).json({ error: "User not found for the given ID" });
        }

        const userData = user[id];

        if (!userData) {
            return res.status(404).json({ error: "User data not found under the provided ID" });
        }

   
             
               console.log(`Current vote count for ${userData.name}: ${userData.vote}`);

            
               userData.vote += 1;
       
          
               console.log(`Updated vote count for ${userData.name}: ${userData.vote}`);
       
          
               await user.save();



        return res.status(200).json({
            message: `${userData.name} has been successfully voted for!`,
            user: userData
        });
    } catch (err) {
        console.error("Error voting:", err);
        return res.status(500).json({ error: "Failed to vote" });
    }
});


app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});
