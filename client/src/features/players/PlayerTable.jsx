import PlayerRow from './PlayerRow'

const PlayerTable = ({ players, onDeletePlayer }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Player</th>
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