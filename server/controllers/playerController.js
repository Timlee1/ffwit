const playersData = require('../utils/playersData')

const getPlayers = async (req, res) => {
  try {
    var players = []
    for (var i = 0; i < playersData.length; i++) {
      const playerInformation = playersData[i]
      var player = new Object();
      player.id = playerInformation['id'];
      player.name = playerInformation['Name'];
      player.position = playerInformation['Pos'];
      player.team = playerInformation['Team'];
      players.push(player)
    }
    return res.status(201).json({ players: players })
  } catch (err) {
    return res.status(400).json({ message: 'Unable to Get Players' })
  }
}

module.exports = { getPlayers }