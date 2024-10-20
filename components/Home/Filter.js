import React from 'react'

const MONTH = [
  { value: '1', name: 'January' },
  { value: '2', name: 'February' },
  { value: '3', name: 'March' },
  { value: '4', name: 'April' },
  { value: '5', name: 'May' },
  { value: '6', name: 'June' },
  { value: '7', name: 'July' },
  { value: '8', name: 'August' },
  { value: '9', name: 'September' },
  { value: '10', name: 'October' },
  { value: '11', name: 'Novemberr' },
  { value: '12', name: 'December' },
]

const YEAR = ['2022']

const Filter = () => {
  return (
    <div className="flex justify-center w-full py-4 bg-White dark:bg-Black text-Black dark:text-White">
      <div className="flex items-center gap-4 p-2 space-x-2 rounded-b ">
        <label
          className="text-Black dark:text-White"
          htmlFor="cars">
          Choose Month
        </label>

        <select
          className="p-1 bg-transparent border-2 rounded-lg shadow-md border-Black/70 text-Black dark:text-White dark:border-White/70 outline-0 focus-visible:border-blue-500 dark:focus-visible:border-blue-500"
          name="month"
          id="month"
          value={month}
          onChange={handleChange}>
          {MONTH.map((item) => {
            return (
              <option
                className="bg-gray-100 shadow-md dark:bg-gray-900 text-Black dark:text-White"
                key={item.value}
                value={item.value}>
                {item.name}
              </option>
            )
          })}
        </select>
        <select
          className="p-1 bg-transparent border-2 rounded-lg shadow-md border-Black/70 text-Black dark:text-White dark:border-White/70 outline-0 focus-visible:border-blue-500 dark:focus-visible:border-blue-500"
          name="year"
          id="year"
          value={year}
          onChange={handleChange}>
          {YEAR.map((item) => {
            return (
              <option
                className="bg-gray-100 shadow-md dark:bg-gray-900 text-Black dark:text-White"
                key={item}
                value={item}>
                {item}
              </option>
            )
          })}
        </select>
      </div>
    </div>
  )
}

export default Filter
