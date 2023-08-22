import Select from 'react-select'

const scoringOptions = [
  { value: "Standard", label: "Standard" },
  { value: "Half PPR", label: "Half PPR" },
  { value: "PPR", label: "PPR" },
];

const ScoringSettings = ({ scoring, handleScoringInput }) => {
  return (
    <Select
      options={scoringOptions}
      onChange={handleScoringInput}
      defaultValue={scoring}
    />
  )
}

export default ScoringSettings





