import Select from 'react-select';
import { useState } from 'react';
import './AddPlayer.css'

const AddPlayer = ({ options, onAddPlayer, message }) => {
  const [selectPlayer, setSelectPlayer] = useState()

  const handleSelectPlayer = async (player) => {
    setSelectPlayer(player)
  }

  const clickAddPlayer = (selectPlayer) => {
    if (selectPlayer) {
      onAddPlayer(selectPlayer)
    }
  }

  return (
    <>
      <div className="add-player">
        <div className="add-player-dropdown">
          < Select
            options={options}
            getOptionValue={option => option.id}
            getOptionLabel={option => option.name}
            onChange={handleSelectPlayer}

          />
        </div>
        <button onClick={() => clickAddPlayer(selectPlayer)}>Add Player</button>

      </div>
      {message}</>
  )
}

export default AddPlayer