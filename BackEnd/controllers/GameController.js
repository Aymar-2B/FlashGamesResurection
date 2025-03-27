const Game = require("../models/Game");

exports.getAll = async (req, res) => res.send(await Game.find());

exports.getById = async (req, res) => {
    try {
        const game = await Game.findById(req.params.id); // Renommé pour éviter le conflit

        if (!game) {
            return res.status(404).json({ message: "Game non trouvée" });
        }

        res.status(200).json(game);
    } catch (err) {
        console.error("Erreur GET /Games/:id :", err);
        res.status(500).json({ error: err.message });
    }
};

exports.post = async (req, res) => {
    try {
        const newGame = new Game(req.body);
        const savedGame = await newGame.save();
        res.status(201).json(savedGame);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.put = async (req, res) => {
    try {
        const game = await Game.findById(req.params.id); // Renommé pour éviter le conflit

        if (!game) {
            return res.status(404).json({ message: "Game non trouvé" });
        }

        const updatedGame = await Game.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(201).json(updatedGame);
    } catch (err) {
        console.error("Erreur PUT /Games/:id :", err);
        res.status(500).json({ error: err.message });
    }
};

exports.drop = async (req, res) => {
    try {
        const game = await Game.findById(req.params.id); // Renommé pour éviter le conflit

        if (!game) {
            return res.status(404).json({ message: "Game non trouvé" });
        }

        await Game.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Game supprimé avec succès" });
    } catch (err) {
        console.error("Erreur DELETE /Games/:id :", err);
        res.status(500).json({ error: err.message });
    }
};
