import React from 'react';
import { VictoryTheme, VictoryChart, VictoryBar, VictoryAxis, VictoryLabel } from 'victory';

const BarGraph = (props) => {
  const { categories } = props;
  let dataArray = categories.map((oneCat) => {
    return oneCat.total;
  });
  let labelArray = categories.map((oneCat) => {
    return oneCat.label;
  })

  // this is the weird bars
  dataArray.unshift(0)
  return (
    <div>
      <VictoryChart
        theme={VictoryTheme.material}
      >
        <VictoryAxis/>
        <VictoryBar
          data={dataArray}
          animate={{
            duration: 2000,
            onLoad: { duration: 2000 },
          }}
          labels={(d) => d.y}
          style={{
            labels: { fill: "white" },
            data: { fill: "#555abf", width: 50 },
          }}
          categories={{ x: labelArray }}
          labelComponent={<VictoryLabel dy={30}/>}
        />
      </VictoryChart>
    </div>
  )
}

export default BarGraph;
