import { useState } from 'react'
import Select from 'react-select'
import { useDispatch } from 'react-redux'
import { changeScoring, selectScoring } from './settingsSlice'
import { useSelector } from "react-redux/es/hooks/useSelector"

const scoringOptions = [
  { value: "Standard", label: "Standard" },
  { value: "Half PPR", label: "Half PPR" },
  { value: "PPR", label: "PPR" },
];

const ScoringSettings = () => {
  const [scoring, setScoring] = useState(useSelector(selectScoring))
  const dispatch = useDispatch()
  const handleScoringInput = async (e) => {
    const scoring = e.value
    dispatch(changeScoring({ scoring }))
    setScoring(e)
  }

  return (
    <Select
      options={scoringOptions}
      onChange={handleScoringInput}
      defaultValue={scoring}
    />
  )
}

export default ScoringSettings



