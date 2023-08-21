import TeamPoints from '../features/settings/TeamPoints'
import OpponentPoints from '../features/settings/OpponentPoints'
import ScoringSettings from '../features/settings/ScoringSettings'
import AddablePlayerTable from '../features/players/AddablePlayerTable';
import { addPlayer, removePlayer, addOpponentPlayer, removeOpponentPlayer, selectUserPlayers, selectOpponentPlayers } from '../features/players/playersSlice'
import { useGetPlayersQuery } from '../features/players/playersApiSlice'
import { useState } from 'react'
import { useSelector } from "react-redux/es/hooks/useSelector"
import { useDispatch } from 'react-redux'

const Simulation = () => {
  const [userPlayers, setUserPlayers] = useState(useSelector(selectUserPlayers))
  const [opponentPlayers, setOpponentPlayers] = useState(useSelector(selectOpponentPlayers))
  const dispatch = useDispatch()
  const {
    data: options,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetPlayersQuery()

  function handleAddPlayer(player) {
    if (userPlayers.every(p => p.id != player.id)) {
      setUserPlayers(
        [
          ...userPlayers,
          { id: player.id, name: player.name, position: player.position, team: player.team }
        ]
      )
      dispatch(addPlayer({ player }))
    }
  }

  function handleDeletePlayer(player) {
    setUserPlayers(
      userPlayers.filter(p => p.id !== player.id)
    )
    dispatch(removePlayer({ player }))
  }

  function handleAddOpponentPlayer(player) {
    if (opponentPlayers.every(p => p.id != player.id)) {
      setOpponentPlayers(
        [
          ...opponentPlayers,
          { id: player.id, name: player.name, position: player.position, team: player.team }
        ]
      )
      dispatch(addOpponentPlayer({ player }))
    }
  }

  function handleDeleteOpponentPlayer(player) {
    setOpponentPlayers(
      opponentPlayers.filter(p => p.id !== player.id)
    )
    dispatch(removeOpponentPlayer({ player }))
  }

  let content
  if (isLoading) {
    content = <h2>Loading...</h2>
  } else if (isSuccess) {
    content = <>
      <TeamPoints />
      <AddablePlayerTable
        team={'User'}
        players={userPlayers}
        options={options}
        handleAddPlayer={handleAddPlayer}
        handleDeletePlayer={handleDeletePlayer}
      />
      <OpponentPoints />
      <AddablePlayerTable
        team={'Opponent'}
        players={opponentPlayers}
        options={options}
        handleAddPlayer={handleAddOpponentPlayer}
        handleDeletePlayer={handleDeleteOpponentPlayer}
      />
    </>
  } else if (isError || error) {
    content = <div>Error</div>
  }

  return (
    <>
      <ScoringSettings />
      {content}
    </>

  )
}

export default Simulation
