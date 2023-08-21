import PlayerTable from './PlayerTable'
import AddPlayer from './AddPlayer'

const AddablePlayerTable = ({ team, players, options, handleAddPlayer, handleDeletePlayer }) => {
  return (
    <>
      {team}
      <AddPlayer
        options={options.players}
        onAddPlayer={handleAddPlayer}
      />
      <PlayerTable
        players={players}
        onDeletePlayer={handleDeletePlayer}
      />
    </>
  )
}

export default AddablePlayerTable


