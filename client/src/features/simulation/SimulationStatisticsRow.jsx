const SimulationStatisticsRow = ({ playerStatistics, name }) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{playerStatistics.winPercentage}</td>
      <td>{playerStatistics.mean}</td>
      <td>{playerStatistics.standardDeviation}</td>
      <td>{playerStatistics.tenPercentile}</td>
      <td>{playerStatistics.quarterPercentile}</td>
      <td>{playerStatistics.median}</td>
      <td>{playerStatistics.threeQuartersPercentile}</td>
      <td>{playerStatistics.ninetyPercentile}</td>
    </tr>
  )
}

export default SimulationStatisticsRow