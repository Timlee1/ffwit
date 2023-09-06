import './Points.css'

const Points = ({ team, points, handlePointsInput }) => {
  return (
    <>
      <label htmlFor="points">Points Already Scored:</label>
      <input
        type="text"
        id="points"
        name="points"
        maxLength="6"
        onChange={handlePointsInput}
        value={points}
        className="points"
      />
    </>
  )
}

export default Points

