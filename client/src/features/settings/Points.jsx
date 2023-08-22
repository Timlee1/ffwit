const Points = ({ team, points, handlePointsInput }) => {
  return (
    <>
      <label htmlFor="points">{team} Points:</label>
      <input
        type="text"
        id="points"
        name="points"
        maxLength="6"
        onChange={handlePointsInput}
        value={points}
      />
    </>
  )
}

export default Points

