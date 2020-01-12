const GameModel = require('../models/game.model');

const gamesRepository = {
    async getAll() {
        return (await GameModel.find({},));
    },
    async add(game) {
        const newGame = new GameModel({
            name: game.name,
            developer: game.developer,
            platforms: game.platforms
        });
        newGame.save();
        return newGame;
    },
    async update(id, game) {
        await GameModel.findByIdAndUpdate(id, game);
        return (await GameModel.findById(id));
    },
    async get(id) {
        return (await GameModel.findById(id));
    },
    async delete(id) {
        await GameModel.findByIdAndDelete(id);
    },
};

module.exports = gamesRepository;
