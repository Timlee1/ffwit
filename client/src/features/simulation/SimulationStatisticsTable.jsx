import SimulationStatisticsRow from "./SimulationStatisticsRow"

const SimulationStatisticsTable = ({ userStatistics, opponentStatistics }) => {
  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th>Win %</th>
          <th>Average</th>
          <th>Std Dev</th>
          <th>10%</th>
          <th>25%</th>
          <th>Median</th>
          <th>75%</th>
          <th>90%</th>
        </tr>
      </thead>
      <tbody>
        <SimulationStatisticsRow playerStatistics={userStatistics} name={"User"} />
        <SimulationStatisticsRow playerStatistics={opponentStatistics} name={"Opponent"} />
      </tbody>
    </table >
  )
}

export default SimulationStatisticsTable