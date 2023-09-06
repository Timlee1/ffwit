import './PlayerRow.css'

const PlayerRow = ({ player, onDelete }) => {
  return (
    <tr>
      <td>{player.name} {player.team} {player.position}</td>
      <td><button className="delete-player" onClick={() => onDelete(player)}>X</button></td>
    </tr>
  )
}

export default PlayerRow