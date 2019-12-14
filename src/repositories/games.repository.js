/* eslint-disable no-bitwise */
const path = require('path');
const uuid = require('uuid/v1');
const { readJsonFile, writeJsonFile } = require('../utils/file.utils');

const FILE_PATH = path.resolve(path.dirname(require.main.filename), '..', 'data', 'games.json');

class Game {
  constructor(name, developer, platforms, id = 0) {
    if (id === 0) {
      this.id = uuid();
    } else {
      this.id = id;
    }
    this.name = name;
    this.developer = developer.split(',');
    this.platforms = platforms.split(',');
  }
}

const gamesRepository = {
  async getAll() {
    return (await readJsonFile(FILE_PATH)) || [];
  },
  async add(game, oldId = 0) {
    const games = await this.getAll();
    console.log(game);
    if (oldId === 0) {
      const newGame = new Game(game.name, game.developer, game.platforms);
      games.push(newGame);
      await writeJsonFile(FILE_PATH, games);
      return newGame;
    }
    const updatedGame = new Game(game.name, game.developer, game.platforms, oldId);
    games.push(updatedGame);
    await writeJsonFile(FILE_PATH, games);
    return updatedGame;
  },
  async get(id) {
    const games = await this.getAll();
    return games.find(item => item.id === id);
  },
  async delete(id) {
    const games = await this.getAll();
    const indexOfGame = games.findIndex(item => item.id === id);
    games.splice(indexOfGame, 1);
    await writeJsonFile(FILE_PATH, games);
  },
};

module.exports = gamesRepository;
