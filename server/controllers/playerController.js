const playersData = require('../utils/playersData')
const correlationMatrix = require('../utils/correlationMatrix')
const rankData = require('../utils/rankData')

const getPlayers = async (req, res) => {
  try {
    let players = []
    for (let i = 0; i < playersData.length; i++) {
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

const simulation = async (req, res) => {
  try {
    const { scoring, teamPoints, opponentPoints, userPlayers, opponentPlayers } = req.body
    //console.log(userPlayers)
    const userTeam = getPlayersData(userPlayers)
    //console.log(userTeam)
    const opponentTeam = getPlayersData(opponentPlayers)
    const players = userTeam.concat(opponentTeam)
    const correlationMatrix = createCorrelationMatrix(players)
    //console.log(correlationMatrix)
    const choleskyDecompositionMatrix = createCholeskyDecompositionMatrix(correlationMatrix)
    //console.log(choleskyDecompositionMatrix)
    const playersNormalDistribution = createPlayersNormalDistribution(players, scoring.value)
    //console.log(playersNormalDistribution)
    const playersUncorrelatedSample = createPlayersUncorrelatedSample(playersNormalDistribution)
    //console.log(playersUncorrelatedSample)
    const playersCorrelatedSample = createPlayersCorrelatedSample(choleskyDecompositionMatrix, playersUncorrelatedSample)
    //console.log(playersCorrelatedSample)

    return res.status(201).json({ players: "test" })
  } catch (err) {
    return res.status(400).json({ message: 'Unable to simulate model' })
  }
}

module.exports = { getPlayers, simulation }


const getPlayersData = (players) => {
  let res = [];
  for (let i = 0; i < players.length; i++) {
    const id = players[i].id
    for (let j = 0; j < playersData.length; j++) {
      if (id == playersData[j].id) {
        res.push(playersData[j])
        break
      }
    }
  }
  //console.log(res)
  return res
}

const createCorrelationMatrix = (players) => {
  //console.log(userTeam)
  //console.log(opponentTeam)
  //console.log(players)
  const size = players.length
  let correlationMatrix = Array(size).fill(0).map(x => Array(size).fill(0))
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      let playerOne = players[i]
      let playerTwo = players[j]
      if (i == j) {
        correlationMatrix[i][j] = 1
      }
      else if (i < j) {
        continue
      }
      else if (playerOne.Team == playerTwo.Team || playerOne.Team == playerTwo.Opp) {
        let correlation = getCorrelation(playerOne, playerTwo)
        correlationMatrix[i][j] = correlation
        correlationMatrix[j][i] = correlation
      }
      else {
        correlationMatrix[i][j] = 0
        correlationMatrix[j][i] = 0
      }
    }
  }
  return correlationMatrix
}

const getCorrelation = (playerOne, playerTwo) => {
  playerOnePosition = getCorrelationPosition(playerOne)
  playerTwoPosition = getCorrelationPosition(playerTwo)
  if (playerOne.Team == playerTwo.Opp) {
    playerTwoPosition = 'OPP_' + playerTwoPosition
  }
  for (let i = 0; i < correlationMatrix.length; i++) {
    const correlationPair = correlationMatrix[i]
    const positionOne = correlationPair['Position_1']
    const positionTwo = correlationPair['Position_2']
    if (playerOnePosition == positionOne && playerTwoPosition == positionTwo) {
      return correlationPair['Correlation']
    }
    else if (playerOnePosition == positionTwo && playerTwoPosition == positionOne) {
      return correlationPair['Correlation']
    }
  }
}

const getCorrelationPosition = (player) => {
  let playerPosition = player.Pos;
  let playerRank = player.Rank
  if (playerPosition == 'RB' && playerRank <= 32) {
    playerPosition = 'RB1'
  }
  else if (playerPosition == 'RB' && playerRank > 32) {
    playerPosition = 'RB2'
  }
  else if (playerPosition == 'WR' && playerRank <= 32) {
    playerPosition = 'WR1'
  }
  else if (playerPosition == 'WR' && playerRank <= 64) {
    playerPosition = 'WR2'
  }
  else if (playerPosition == 'RB' && playerRank > 32) {
    playerPosition = 'WR3'
  }
  return playerPosition
}

const createCholeskyDecompositionMatrix = (correlationMatrix) => {
  //console.log(correlationMatrix)
  size = correlationMatrix.length
  let lowerMatrix = Array(size).fill(0).map(x => Array(size).fill(0))
  for (var i = 0; i < size; i++) {
    for (var j = 0; j <= i; j++) {
      var sum = 0;
      if (j == i) {
        for (var k = 0; k < j; k++)
          sum += parseInt(Math.pow(lowerMatrix[j][k],
            2));
        lowerMatrix[j][j] = parseInt(Math.sqrt(
          correlationMatrix[j][j] - sum));
      }
      else {
        for (var k = 0; k < j; k++)
          sum += (lowerMatrix[i][k] * lowerMatrix[j][k]);
        lowerMatrix[i][j] = (correlationMatrix[i][j] - sum)
          / lowerMatrix[j][j];
      }
    }
  }
  //console.log(lowerMatrix)
  return lowerMatrix
}

const createPlayersNormalDistribution = (players, scoring) => {
  let playersNormalDistributionData = []
  for (let i = 0; i < players.length; i++) {
    const player = players[i]
    const playerNormalDistributionData = getPlayerNormalDistribution(player, scoring)
    //console.log(playerNormalDistributionData)
    playersNormalDistributionData.push(playerNormalDistributionData)
  }
  //console.log(playersNormalDistributionData)
  return playersNormalDistributionData
}

const getPlayerNormalDistribution = (player, scoring) => {
  const position = player.Pos
  let projectedScore;
  let rank;
  let projectedStandardDeviation;
  if (scoring == 'Standard') {
    projectedScore = player.Std
    rank = player['Std Rank']
    projectedStandardDeviation = player['Std Sdev']
  } else if (scoring == 'Half PPR') {
    projectedScore = player.Half
    rank = player['Half Rank']
    projectedStandardDeviation = player['Half Sdev']
  } else if (scoring == 'PPR') {
    projectedScore = player.PPR
    rank = player['PPR Rank']
    projectedStandardDeviation = player['PPR Sdev']
  }
  rank = Math.round(rank)
  if (position == 'QB' && rank > 32) {
    rank = 32
  }
  if (position == 'RB' && rank > 64) {
    rank = 64
  }
  if (position == 'WR' && rank > 96) {
    rank = 96
  }
  if (position == 'TE' && rank > 32) {
    rank = 32
  }
  let rankStandardDeviation
  let rankProjectedScore
  for (let j = 0; j < rankData.length; j++) {
    let rankStatistic = rankData[j]
    if (position == rankStatistic.position && rank == rankStatistic.rank) {
      rankStandardDeviation = rankStatistic.std_sdev
      if (scoring == 'Standard') {
        rankProjectedScore = rankStatistic.std_pts
      } else if (scoring == 'Half PPR') {
        rankProjectedScore = rankStatistic.half_ppr_pts
      } else if (scoring == 'PPR') {
        rankProjectedScore = rankStatistic.std_pts
      }
      break
    }
  }
  const finalStandardDeviation = Math.abs(projectedScore / rankProjectedScore) * rankStandardDeviation
  return { name: player.Name, mean: projectedScore, standardDeviation: finalStandardDeviation }
}

const createPlayersUncorrelatedSample = (playersNormalDistribution) => {
  let sample = []
  for (let i = 0; i < playersNormalDistribution.length; i++) {
    player = playersNormalDistribution[i]
    let randomNormalNumber = getRandomNormalNumber(player.mean, player.standardDeviation)
    sample.push(randomNormalNumber)
  }
  //console.log(sample)
  return sample

}

const getRandomNormalNumber = (mean = 0, stdev = 1) => {
  const u = 1 - Math.random();
  const v = Math.random();
  const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  return z * stdev + mean;
}

const createPlayersCorrelatedSample = (choleskyDecompositionMatrix, playersUncorrelatedSample) => {
  //console.log(choleskyDecompositionMatrix)
  //console.log(playersUncorrelatedSample)
  let sample = []
  for (let i = 0; i < choleskyDecompositionMatrix.length; i++) {
    let playerSample = 0;
    for (let j = 0; j < choleskyDecompositionMatrix[0].length; j++) {
      //console.log(playersUncorrelatedSample[i])
      //console.log(choleskyDecompositionMatrix[i][j])
      playerSample = playerSample + playersUncorrelatedSample[i] * choleskyDecompositionMatrix[i][j]
    }
    //console.log(playerSample)
    sample.push(playerSample)
  }
  return sample
}