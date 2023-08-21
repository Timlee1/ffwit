import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { changeOpponentPoints, selectOpponentPoints } from './settingsSlice'
import { useSelector } from "react-redux/es/hooks/useSelector"

const OpponentPoints = () => {
  const [opponentPoints, setOponentPoints] = useState(useSelector(selectOpponentPoints))
  const dispatch = useDispatch()
  const handlePointsInput = async (e) => {
    const points = e.target.value
    dispatch(changeOpponentPoints({ points }))
    setOponentPoints(points)
  }

  return (
    <>
      <label htmlFor="points">Opponent Points:</label>
      <input
        type="text"
        id="points"
        name="points"
        onChange={handlePointsInput}
        value={opponentPoints}
      />
    </>
  )
}

export default OpponentPoints