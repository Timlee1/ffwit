import Select from 'react-select';
import TeamPoints from '../features/settings/TeamPoints'
import OpponentPoints from '../features/settings/OpponentPoints'
import ScoringSettings from '../features/settings/ScoringSettings'



const Simulation = () => {
  return (
    <>
      <TeamPoints />
      <OpponentPoints />
      <ScoringSettings />
    </>

  )
}

export default Simulation

// const SCORING = [
//   { value: "Standard", label: "Standard" },
//   { value: "Half PPR", label: "Half PPR" },
//   { value: "PPR", label: "PPR" },
// ];

// const OPTIONS = [
//   { value: "Daniel Jones", label: "Daniel Jones" },
//   { value: "Saquon Barkley", label: "Saquon Barkley" },
//   { value: "Darren Waller", label: "Darren Waller" },
//   { value: "Jalin Hyatt", label: "Jalin Hyatt" },
//   { value: "Isiah Hodgins", label: "Isiah Hodgins" },
// ];

// function ScoringDropdown({ options }) {
//   //const [selectedOption, setSelectedOption] = useState();
//   return (
//     <>
//       Scoring:
//       < Select
//         //defaultValue={selectedOption}
//         //onChange={setSelectedOption}
//         options={options}
//       />
//     </>
//   )
// }

// function PointsAlreadyScoredInput() {
//   return (
//     <>
//       <form>
//         <label htmlFor="pts">Points Already Scored:</label>
//         <input type="text" id="pts" name="pts" minLength="1" maxLength="5" />
//       </form>
//     </>
//   )
// }

// function SearchPlayerDropdown({ options }) {
//   //const [selectedOption, setSelectedOption] = useState();
//   return (
//     <Select
//       //defaultValue={selectedOption}
//       //onChange={setSelectedOption}
//       options={options}
//     />
//   )
// }

// function AddPlayerButton() {
//   return (
//     <button type="submit">Add Player</button>
//   )
// }

// function AddPlayer() {
//   return (
//     <>
//       <SearchPlayerDropdown options={OPTIONS} />
//       <AddPlayerButton />
//     </>
//   )
// }

// function PlayerRow({ player }) {
//   return (
//     <tr>
//       <td>{player.name}</td>
//     </tr>
//   )
// }