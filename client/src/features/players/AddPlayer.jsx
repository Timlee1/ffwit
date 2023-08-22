import Select from 'react-select';
import { useState } from 'react';

const AddPlayer = ({ options, onAddPlayer, message }) => {
  const [selectPlayer, setSelectPlayer] = useState()

  const handleSelectPlayer = async (player) => {
    setSelectPlayer(player)
  }

  return (
    <>
      < Select
        options={options}
        getOptionValue={option => option.id}
        getOptionLabel={option => option.name}
        onChange={handleSelectPlayer}
      />
      <button onClick={() => onAddPlayer(selectPlayer)}>Add Player</button>
      <>{message}</>
    </>
  )
}

export default AddPlayer