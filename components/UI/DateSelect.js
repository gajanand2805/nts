import React from 'react';
const MONTHS = [
  { display: 'Jan', value: 1 },
  { display: 'Feb', value: 2 },
  { display: 'Mar', value: 3 },
  { display: 'Apr', value: 4 },
  { display: 'May', value: 5 },
  { display: 'Jun', value: 6 },
  { display: 'Jul', value: 7 },
  { display: 'Aug', value: 8 },
  { display: 'Sep', value: 9 },
  { display: 'Oct', value: 10 },
  { display: 'Nov', value: 11 },
  { display: 'Dec', value: 12 },
]

const MONTH = {
  1: '01',
  2: '02',
  3: '03',
  4: '04',
  5: '05',
  6: '06',
  7: '07',
  8: '08',
  9: '09',
  10: '10',
  11: '11',
  12: '12',
}

const YEARS = [
  '2020',
  '2021',
  '2022',
  '2023',
  '2024',
  '2025',
  '2026',
  '2027',
  '2028',
  '2029',
  '2030',
]
const DateSelect = ({ setmonth, setyear, month, year }) => {
  const min = 2022;
  const max = new Date().getFullYear();
  const arr = [];

  for (let i = min; i <= max; i++) {
    arr.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  return (
    <div className="flex gap-4 font-bold rounded font-noto text-Black dark:text-White">
      <select
        value={MONTH[month]}
        onChange={(e) => setmonth(parseInt(e.target.value))}
        className="py-1 px-2 border-[1px] border-dBlack/20 dark:bg-dBlack dark:border-BlackTer/20 rounded-xl cursor-pointer">
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
        <option value="12">Dec</option>
      </select>

      <select
        name=""
        value={year}
        onChange={(e) => setyear(parseInt(e.target.value))}
        className="py-1 px-2 border-[1px] border-dBlack/20 dark:bg-dBlack dark:border-BlackTer/20 rounded-xl cursor-pointer">
        {arr}
      </select>
    </div>
  );
};

export default DateSelect;
