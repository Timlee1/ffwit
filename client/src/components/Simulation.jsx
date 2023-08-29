import { useState } from 'react'
import { useSelector } from "react-redux/es/hooks/useSelector"
import { useDispatch } from 'react-redux'
import Points from '../features/settings/Points'
import ScoringSettings from '../features/settings/ScoringSettings'
import AddablePlayerTable from '../features/players/AddablePlayerTable'
import Simulate from '../features/simulation/Simulate'
import { addPlayer, removePlayer, addOpponentPlayer, removeOpponentPlayer, selectUserPlayers, selectOpponentPlayers } from '../features/players/playersSlice'
import { useGetPlayersQuery } from '../features/players/playersApiSlice'
import { changeTeamPoints, selectTeamPoints, changeOpponentPoints, selectOpponentPoints } from '../features/settings/settingsSlice'
import { changeScoring, selectScoring } from '../features/settings/settingsSlice'

const Simulation = () => {
  const [userPlayers, setUserPlayers] = useState(useSelector(selectUserPlayers))
  const [opponentPlayers, setOpponentPlayers] = useState(useSelector(selectOpponentPlayers))
  const [userMsg, setUserMsg] = useState()
  const [opponentMsg, setOpponentMsg] = useState()
  const [teamPoints, setTeamPoints] = useState(useSelector(selectTeamPoints))
  const [opponentPoints, setOponentPoints] = useState(useSelector(selectOpponentPoints))
  const [scoring, setScoring] = useState(useSelector(selectScoring))
  const dispatch = useDispatch()
  const {
    data: options,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetPlayersQuery()

  function handleAddPlayer(player) {
    if (userPlayers.every(p => p.id != player.id) && opponentPlayers.every(p => p.id != player.id)) {
      setUserPlayers(
        [
          ...userPlayers,
          { id: player.id, name: player.name, position: player.position, team: player.team }
        ]
      )
      dispatch(addPlayer({ player }))
      setUserMsg('')
      setOpponentMsg('')
    } else {
      setUserMsg('Player already on a team')
    }
  }

  function handleDeletePlayer(player) {
    setUserPlayers(
      userPlayers.filter(p => p.id !== player.id)
    )
    dispatch(removePlayer({ player }))
  }

  function handleAddOpponentPlayer(player) {
    if (userPlayers.every(p => p.id != player.id) && opponentPlayers.every(p => p.id != player.id)) {
      setOpponentPlayers(
        [
          ...opponentPlayers,
          { id: player.id, name: player.name, position: player.position, team: player.team }
        ]
      )
      dispatch(addOpponentPlayer({ player }))
      setUserMsg('')
      setOpponentMsg('')
    } else {
      setOpponentMsg('Player already on a team')
    }
  }

  function handleDeleteOpponentPlayer(player) {
    setOpponentPlayers(
      opponentPlayers.filter(p => p.id !== player.id)
    )
    dispatch(removeOpponentPlayer({ player }))
  }

  function handleTeamPointsInput(e) {
    const points = e.target.value
    dispatch(changeTeamPoints({ points }))
    setTeamPoints(points)
  }

  function handleOpponentPointsInput(e) {
    const points = e.target.value
    dispatch(changeOpponentPoints({ points }))
    setOponentPoints(points)
  }

  function handleScoringInput(e) {
    const scoring = e.value
    dispatch(changeScoring({ scoring }))
    setScoring(e)
  }

  let content
  if (isLoading) {
    content = <h2>Loading...</h2>
  } else if (isSuccess) {
    content = <>
      <ScoringSettings
        scoring={scoring}
        handleScoringInput={handleScoringInput}
      />
      <Points
        team={'User'}
        points={teamPoints}
        handlePointsInput={handleTeamPointsInput}
      />
      <AddablePlayerTable
        team={'User'}
        players={userPlayers}
        options={options}
        handleAddPlayer={handleAddPlayer}
        handleDeletePlayer={handleDeletePlayer}
        message={userMsg}
      />
      <Points
        team={'Opponent'}
        points={opponentPoints}
        handlePointsInput={handleOpponentPointsInput}
      />
      <AddablePlayerTable
        team={'Opponent'}
        players={opponentPlayers}
        options={options}
        handleAddPlayer={handleAddOpponentPlayer}
        handleDeletePlayer={handleDeleteOpponentPlayer}
        message={opponentMsg}
      />
      <Simulate
        scoring={scoring}
        teamPoints={teamPoints}
        opponentPoints={opponentPoints}
        userPlayers={userPlayers}
        opponentPlayers={opponentPlayers}
      />
    </>
  } else if (isError || error) {
    content = <div>Error</div>
  }

  return (
    <>
      {content}
    </>

  )
}

export default Simulation
