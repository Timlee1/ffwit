import PlayerRow from './PlayerRow'

const PlayerTable = ({ players, onDeletePlayer }) => {
  if (players.length == 0) {
    return
  }
  return (
    <table>
      <thead>
        <tr>
          <th>Players</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {players.map(player => (
          <PlayerRow
            key={player.id}
            player={player}
            onDelete={onDeletePlayer}
          />
        ))}
      </tbody>
    </table >
  )
}

export default PlayerTable