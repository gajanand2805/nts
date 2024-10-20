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

const LineChart = ({ data, toggle }) => {
  const Data = {
    labels: [
      'JAN',
      'FEB',
      'MAR',
      'APR',
      'MAY',
      'JUN',
      'JUL',
      'AUG',
      'SEP',
      'OCT',
      'NOV',
      'DEC',
    ],
    datasets: [
      {
        label: toggle ? 'Orders' : 'Revenue',
        data: toggle ? data.orders : data.revenue,
        backgroundColor: 'aqua',
        borderColor: toggle ? '#5784F7' : '#FEC53D',
        pointBackgroundColor: toggle ? '#5784F7' : '#FEC53D',
        pointBorderColor: 'white',
        pointBorderWidth: 2,
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
    <div className="tabletM:pl-2 w-full">
      <Line
        data={Data}
        options={options}
      />
    </div>
  )
}

export default LineChart
