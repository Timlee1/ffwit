const PlayerRow = ({ player, onDelete }) => {
  return (
    <tr>
      <td>{player.name} {player.team} {player.position}</td>
      <td><button onClick={() => onDelete(player)}>X</button></td>
    </tr>
  )
}

export default PlayerRow