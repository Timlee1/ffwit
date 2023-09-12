const playersData = require('../utils/playersData')
const correlationMatrix = require('../utils/correlationMatrix')
const rankData = require('../utils/rankData')
const postgres = require('../database/postgres')

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
    const email = req.email
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
    let userBucketDistribution = createBucketDistribution(0, 500)
    //console.log(userBucketDistribution)
    let opponentBucketDistribution = createBucketDistribution(0, 500)
    //console.log(opponentBucketDistribution)

    const get_plan_query = {
      text: "SELECT plan, plan_end FROM users WHERE email = $1",
      values: [email]
    }
    const planInfo = await postgres.query(get_plan_query)
    // console.log(BigInt(planInfo.rows[0].plan_end))
    // console.log(planInfo.rows[0].plan == 'premium')
    // console.log(BigInt(planInfo.rows[0].plan_end + "00"))
    // console.log(BigInt(Math.floor(Date.now() / 1000)))
    let numSimulations = 100
    if ((BigInt(planInfo.rows[0].plan_end) > BigInt(Math.floor(Date.now() / 1000))) && planInfo.rows[0].plan == 'basic') {
      numSimulations = 1000
    }
    else if ((BigInt(planInfo.rows[0].plan_end) > BigInt(Math.floor(Date.now() / 1000))) && planInfo.rows[0].plan == 'standard') {
      numSimulations = 10000
    }
    else if ((BigInt(planInfo.rows[0].plan_end) > BigInt(Math.floor(Date.now() / 1000))) && planInfo.rows[0].plan == 'premium') {
      numSimulations = 50000
    }


    let userSample = [];
    let opponentSample = [];
    let wins = 0
    let i = 0;
    while (i < numSimulations) {
      const playersUncorrelatedSample = createPlayersUncorrelatedSample(playersNormalDistribution)
      //console.log(playersUncorrelatedSample)
      const playersCorrelatedSample = createPlayersCorrelatedSample(choleskyDecompositionMatrix, playersUncorrelatedSample)
      //console.log(playersCorrelatedSample)
      const teamPointsFloat = convertScoreFloat(teamPoints)
      //console.log(teamPointsFloat)
      const opponentPointsFloat = convertScoreFloat(opponentPoints)
      //console.log(opponentPointsFloat)
      //const userTeamPoints = teamPointsFloat + playersCorrelatedSample.slice(0, userTeam.length).reduce((accumulator, currentValue) => accumulator + currentValue)
      const userTeamPoints = teamPointsFloat + getSumArray(playersCorrelatedSample.slice(0, userTeam.length))
      //console.log(userTeamPoints)
      //const opponentTeamPoints = opponentPointsFloat + playersCorrelatedSample.slice(userTeam.length).reduce((accumulator, currentValue) => accumulator + currentValue)
      const opponentTeamPoints = opponentPointsFloat + getSumArray(playersCorrelatedSample.slice(userTeam.length))
      //console.log(opponentTeamPoints)
      userBucketDistribution.set(Math.round(userTeamPoints), userBucketDistribution.get(Math.round(userTeamPoints)) + 1)
      opponentBucketDistribution.set(Math.round(opponentTeamPoints), opponentBucketDistribution.get(Math.round(opponentTeamPoints)) + 1)
      userSample.push(userTeamPoints)
      opponentSample.push(opponentTeamPoints)
      if (userTeamPoints > opponentTeamPoints) { wins = wins + 1 }
      i = i + 1;
    }
    const userData = convertBucketDistributionToData(userBucketDistribution, 10000 / 1000)
    //console.log(userData)
    const opponentData = convertBucketDistributionToData(opponentBucketDistribution, 10000 / 1000)
    //console.log(opponentData)
    const userStatistics = getStatistics(userSample)
    userStatistics['winPercentage'] = String(((wins / i)).toFixed(2))
    //console.log(userStatistics)
    const opponentStatistics = getStatistics(opponentSample)
    opponentStatistics['winPercentage'] = String(((1 - (wins / i))).toFixed(2))
    //console.log(opponentStatistics)


    return res.status(201).json({ userData: userData, opponentData: opponentData, userStatistics: userStatistics, opponentStatistics: opponentStatistics })
  } catch (err) {
    console.log(err)
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

const convertScoreFloat = (points) => {
  if (typeof points === 'string') {
    const score = points.trim()
    const re = new RegExp("^[0-9]{0,3}$|^[0-9]{0,3}.[0-9]{1,3}$")
    if (score == '') {
      return 0
    }
    if (re.test(score)) {
      return parseFloat(score)
    } else {
      return null
    }
  } else return points
}

const createBucketDistribution = (min, max) => {
  let bucketDistribution = new Map();
  for (i = min; i <= max; i++) {
    let key = i.toString()
    bucketDistribution.set(i, 0)
  }
  return bucketDistribution
}

const convertBucketDistributionToData = (bucketDistribution, lineY) => {
  data = []
  for (const [key, value] of bucketDistribution) {

    if (value != 0) {
      let dataPoint = new Object();
      dataPoint.x = key
      dataPoint.y = value
      data.push(dataPoint)
    }
  }
  if (data.length > 1) {
    firstX = data[0].x
    const firstDataPoint = new Object();
    firstDataPoint.x = firstX - 1
    firstDataPoint.y = 0
    data.unshift(firstDataPoint)
    lastX = data[data.length - 1].x
    const lastDataPoint = new Object();
    lastDataPoint.x = lastX + 1
    lastDataPoint.y = 0
    data.push(lastDataPoint)
  } else {
    firstX = data[0].x
    data[0].y = lineY
    const firstDataPoint = new Object();
    firstDataPoint.x = firstX
    firstDataPoint.y = 0
    data.unshift(firstDataPoint)
  }
  return data
}

const sortArrayAscending = arr => arr.sort((a, b) => a - b);

const getSumArray = arr => arr.reduce((a, b) => a + b, 0);

const getMeanArray = arr => getSumArray(arr) / arr.length;

const getStandardDeviation = (arr) => {
  const mu = getMeanArray(arr);
  const diffArr = arr.map(a => (a - mu) ** 2);
  return Math.sqrt(getSumArray(diffArr) / (arr.length - 1));
};

const getQuantile = (sortedArray, q) => {
  const pos = (sortedArray.length - 1) * q;
  const base = Math.floor(pos);
  const rest = pos - base;
  if (sortedArray[base + 1] !== undefined) {
    return sortedArray[base] + rest * (sortedArray[base + 1] - sortedArray[base]);
  } else {
    return sortedArray[base];
  }
};

const getStatistics = (sample) => {
  const sortedSample = sortArrayAscending(sample);
  const mean = getMeanArray(sortedSample).toFixed(2)
  const standardDeviation = getStandardDeviation(sortedSample).toFixed(2)
  const tenPercentile = getQuantile(sortedSample, .1).toFixed(2)
  const quarterPercentile = getQuantile(sortedSample, .25).toFixed(2)
  const median = getQuantile(sortedSample, .5).toFixed(2)
  const threeQuartersPercentile = getQuantile(sortedSample, .75).toFixed(2)
  const ninetyPercentile = getQuantile(sortedSample, .9).toFixed(2)
  return { mean: mean, standardDeviation: standardDeviation, tenPercentile: tenPercentile, quarterPercentile: quarterPercentile, median: median, threeQuartersPercentile: threeQuartersPercentile, ninetyPercentile: ninetyPercentile }
}