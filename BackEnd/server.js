const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const gameRoutes = require("./routes/GameRoutes");
const dotenv = require('dotenv');

dotenv.config({ path: '.env' });

const app = express();
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connecté à MongoDB"))
    .catch(err => console.error("Erreur de connexion à MongoDB:", err));

app.use(express.json());

app.use("/games", gameRoutes);

app.listen(process.env.PORT, () => console.log(`Serveur démarré sur http://${process.env.IP_ADDRESS}:${process.env.PORT}`));
