const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    name: {type: String, required: true},
    developer: {type: String, required: true},
    platforms: {type: String, required: true},
});

gameSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('Game', gameSchema);