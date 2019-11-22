/* eslint-disable no-bitwise */
const path = require('path');
const uuid = require('uuid/v1');
const { readJsonFile, writeJsonFile } = require('../utils/file.utils');

const FILE_PATH = path.resolve(
  path.dirname(require.main.filename),
  '..',
  'data',
  'games.json'
);

class Game {
  constructor(name, developers, platforms, genres, id = 0) {
    if (id === 0) {
      this.id = uuid();
    } else {
      this.id = id;
    }
    this.name = name;
    this.developers = developers.split(',');
    this.platforms = platforms.split(',');
    this.genres = genres.split(',');
  }
}

const gamesRepository = {
  async getAll() {
    return (await readJsonFile(FILE_PATH)) || [];
  },
  async add(game, oldId = 0) {
    const games = await this.getAll();
    if (oldId === 0) {
      const content = new Game(
        game.name,
        game.developers,
        game.platforms,
        game.genres
      );
      games.push(content);
      await writeJsonFile(FILE_PATH, games);
    } else {
      const content = new Game(
        game.name,
        game.developers,
        game.platforms,
        game.genres,
        oldId
      );
      games.push(content);
      await writeJsonFile(FILE_PATH, games);
    }
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
