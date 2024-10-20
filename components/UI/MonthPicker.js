import React from 'react'

const MonthPicker = ({ value, }) => {
  console.log(value.split('-')[0])
  const min = 2000
  const max = (new Date()).getFullYear()
  const arr = []
  for (let i = min; i <= max; i++) {
    arr.push(<option value={i}>{i}</option>)
  }
  return (
    <div className='flex gap-4'>
      <select value={value.split('-')[1]} className='p-2'>
        <option value="01">Jan</option>
        <option value="02">Feb</option>
        <option value="03">March</option>
        <option value="04">April</option>
        <option value="05">May</option>
        <option value="06">June</option>
        <option value="07">July</option>
        <option value="08">Aug</option>
        <option value="09">Sept</option>
        <option value="10">Oct</option>
        <option value="11">Nov</option>
        <option value="12">Dev</option>
      </select>
      <select name="" value={value.split('-')[0]} className='p-2' id="">
        {arr}
      </select>
    </div >
  )
}

export default MonthPicker