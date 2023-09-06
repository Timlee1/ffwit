import PlayerTable from './PlayerTable'
import AddPlayer from './AddPlayer'

const AddablePlayerTable = ({ team, players, options, handleAddPlayer, handleDeletePlayer, message }) => {
  return (
    <>
      <AddPlayer
        options={options.players}
        onAddPlayer={handleAddPlayer}
        message={message}
      />
      <PlayerTable
        players={players}
        onDeletePlayer={handleDeletePlayer}
      />
    </>
  )
}

export default AddablePlayerTable


