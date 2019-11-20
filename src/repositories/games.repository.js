const path = require('path');
const { readJsonFile, writeJsonFile } = require('../utils/file.utils');

const FILE_PATH = path.resolve(
  path.dirname(require.main.filename),
  '..',
  'data',
  'games.json'
);

class Game {
  constructor(name, developers, platforms, genres) {
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
  async add(game) {
    const games = await this.getAll();
    const content = new Game(
      game.name,
      game.developers,
      game.platforms,
      game.genres
    );
    games.push(content);
    await writeJsonFile(FILE_PATH, games);
  },
  async find(name) {
    const games = await this.getAll();
    const indexOfGame = games.findIndex(item => item.name === name);
    return games[indexOfGame];
  },
  async delete(name) {
    const games = await this.getAll();
    const indexOfGame = games.findIndex(item => item.name === name);
    const copyGames = [];
    copyGames.push(...games.slice(0, indexOfGame));
    copyGames.push(...games.slice(indexOfGame + 1));
    await writeJsonFile(FILE_PATH, copyGames);
  },
};

module.exports = gamesRepository;
