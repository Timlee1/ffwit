import { useCreateSimulationMutation } from './playersApiSlice'


const Simulate = ({ scoring, teamPoints, opponentPoints, userPlayers, opponentPlayers }) => {
  const [simulate, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useCreateSimulationMutation()
  const handleSimulate = async (e) => {
    e.preventDefault()
    try {
      const { players } = await simulate({ scoring, teamPoints, opponentPoints, userPlayers, opponentPlayers }).unwrap()
    } catch (err) {
      if (err?.data?.message) {
        setMsg(err.data.message);
      } else {
        setMsg('No Server Response');
      }
    }
  }
  return (
    <button onClick={handleSimulate}>Simulate</button>
  )
}

export default Simulate