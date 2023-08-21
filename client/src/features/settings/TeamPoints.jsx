import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { changeTeamPoints, selectTeamPoints } from './settingsSlice'
import { useSelector } from "react-redux/es/hooks/useSelector"

const TeamPoints = () => {
  const [teamPoints, setTeamPoints] = useState(useSelector(selectTeamPoints))
  const dispatch = useDispatch()
  const handlePointsInput = async (e) => {
    const points = e.target.value
    dispatch(changeTeamPoints({ points }))
    setTeamPoints(points)
  }

  return (
    <>
      <label htmlFor="points">Team Points:</label>
      <input
        type="text"
        id="points"
        name="points"
        onChange={handlePointsInput}
        value={teamPoints}
      />
    </>
  )
}

export default TeamPoints