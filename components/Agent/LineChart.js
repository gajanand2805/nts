import React from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  //   Legend,
  Tooltip,
} from 'chart.js'

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  //   Legend,
  Tooltip
)

const LineChart = ({ data, label, color }) => {
  const Data = {
    labels: Array.from({ length: data.length }, (_, i) => i + 1),
    datasets: [
      {
        label: label,
        data: data,
        backgroundColor: 'aqua',
        borderColor: color,
        pointBackgroundColor: color,
        pointBorderColor: 'white',
        pointBorderWidth: 1,
        pointHitRadius: 8,
        pointRadius: 5,
        tension: 0.4,
      },
    ],
  }

  const options = {
    plugins: {
      legend: false,
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        min: undefined,
        max: undefined,
        ticks: {
          stepSize: undefined,
        },
      },
    },
  }

  return (
    <div className="pl-2">
      <Line
        data={Data}
        options={options}
      />
    </div>
  )
}

export default LineChart
