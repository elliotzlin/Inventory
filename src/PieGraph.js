import React from 'react';
import { VictoryPie, VictoryTheme } from 'victory';

const PieChart = (props) => {
  const { categories } = props;
  let sum = categories.reduce((a, b) => {
    return a + b.total;
  },0);

  let dataArray = categories.map((oneCat) => {
    return {
      ...oneCat,
      label: `${oneCat.label}:` + '\n' + `${oneCat.total.toString()}`,
      y: Math.floor(oneCat.total/sum * 100),
    }
  })

  return (
    <svg width={520} height={520}>
      <circle cx={200} cy={200} r={60} fill="#c65c55" />
      <text x="39%" y="39%" alignment-baseline="middle" text-anchor="middle">Total: {sum}</text>
      <VictoryPie
        standalone={false}
        width={400} height={400}
        innerRadius={100}
        theme={VictoryTheme.material}
        animate={{ duration: 2000 }}
        colorScale={["#fc4a1a", "#4abdac", "#f7b733", "#555abf", "#c2bcbc" ]}
        data={dataArray}
      />
    </svg>
  )
}

export default PieChart;
