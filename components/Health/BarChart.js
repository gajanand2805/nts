import React from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
} from 'chart.js'

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip)

const BarChart = ({ data }) => {
  console.log(data)
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
        label: 'success',
        data: data.success,
        backgroundColor: '#00CE92',
        borderWidth: 2,
        borderColor: 'rgba(0,0,0,0)',
        borderRadius: 10,
        barThickness: 'flex',
        borderSkipped: false,
        minBarLength: 10,
      },
      {
        label: 'error',
        data: data.error,
        backgroundColor: '#232361',
        borderWidth: 2,
        borderColor: 'rgba(0,0,0,0)',
        borderRadius: 10,
        barThickness: 'flex',
        borderSkipped: false,
        minBarLength: 10,
      },
    ],
  }

  const options = {
    maintainAspectRatio: false,
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
    <div className="h-[300px] w-full">
      <Bar
        data={Data}
        options={options}
      />
    </div>
  )
}

export default BarChart
