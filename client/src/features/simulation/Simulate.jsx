import { useCreateSimulationMutation } from '../players/playersApiSlice'
import { useState } from 'react'
import { Scatter } from 'react-chartjs-2'
import SimulationStatisticsTable from './SimulationStatisticsTable'
import "chart.js/auto";

const Simulate = ({ scoring, teamPoints, opponentPoints, userPlayers, opponentPlayers }) => {
  const [userData, setUserData] = useState();
  const [userStatistics, setUserStatistics] = useState()
  const [opponentStatistics, setOpponentStatistics] = useState()

  const [simulate, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useCreateSimulationMutation()
  const [msg, setMsg] = useState('')
  const handleSimulate = async (e) => {
    e.preventDefault()
    try {
      const { userData, opponentData, userStatistics, opponentStatistics } = await simulate({ scoring, teamPoints, opponentPoints, userPlayers, opponentPlayers }).unwrap()
      setUserStatistics(userStatistics)
      setOpponentStatistics(opponentStatistics)
      setUserData({
        datasets: [
          {
            label: "Team",
            data: userData,
            borderColor: 'rgb(54, 162, 235)',
            backgroundColor: 'rgb(54, 162, 235, .2)',
            showLine: true,
            fill: true
          },
          {
            label: "Opponent",
            data: opponentData,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            showLine: true,
            fill: true
          }
        ],

      })
    } catch (err) {
      if (err?.data?.message) {
        setMsg(err.data.message);
      } else {
        setMsg('No Server Response');
      }
    }
  }
  return (
    <>
      <button onClick={handleSimulate}>Simulate</button>
      {msg}
      {userData && <Scatter data={userData} />}
      {userStatistics && opponentStatistics && <SimulationStatisticsTable userStatistics={userStatistics} opponentStatistics={opponentStatistics} />}
    </>
  )
}

export default Simulate
