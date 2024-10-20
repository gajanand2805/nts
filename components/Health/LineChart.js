import React from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler,
} from 'chart.js'

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler
)

let width, height, gradient
function getGradient(ctx, chartArea) {
  const chartWidth = chartArea.right - chartArea.left
  const chartHeight = chartArea.bottom - chartArea.top
  if (!gradient || width !== chartWidth || height !== chartHeight) {
    // Create the gradient because this is either the first render
    // or the size of the chart has changed
    width = chartWidth
    height = chartHeight
    gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top)
    gradient.addColorStop(0, 'rgba(87, 132, 247, 0)')
    gradient.addColorStop(1, 'rgba(87, 132, 247, 0.3)')
  }

  return gradient
}

const LineChart = ({ data, label, color }) => {
  if (data.step == 0) {
    data.step = 1
  }
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
        label: label,
        data: data.total_api_arr,
        borderColor: color,
        borderWidth: 4,
        backgroundColor: function (context) {
          const chart = context.chart
          const { ctx, chartArea } = chart
          if (!chartArea) {
            return
          }
          return getGradient(ctx, chartArea)
        },
        radius: 0,
        pointHitRadius: 40,
        pointHoverBorderWidth: 4,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#5784F7',
        pointBorderColor: '#FFFFFF',
        tension: 0.4,
        fill: 'start',
      },
    ],
  }

  const options = {
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        xAlign: 'center',
        yAlign: 'bottom',
        titleAlign: 'center',
        displayColors: false,
        titleFont: {
          size: 10,
        },
        bodyFont: {
          size: 12,
          weight: 'bold',
        },
        bodyAlign: 'center',
        labelColor: '#5784F7',
        labelTextColor: '#543453',
        backgroundColor: '#5784F7',
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        min: data.min - data.step,
        max: data.max + data.step,
        ticks: {
          stepSize: data.step,
        },
      },
    },
  }

  return (
    <div className="pl-2 h-[180px]">
      <Line
        data={Data}
        options={options}
      />
    </div>
  )
}

export default LineChart
