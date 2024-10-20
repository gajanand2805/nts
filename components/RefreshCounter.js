import { useState, useEffect } from 'react'
import Image from 'next/image'

function RefreshCounter({ fetchData, duration = 59 }) {
  const [counter, setCounter] = useState(duration)
  const [isSpin, setIsSpin] = useState(false)
  async function onRefresh() {
    setCounter(duration)
    setIsSpin(true)
    await fetchData()
    setCounter(duration)
    setIsSpin(false)
  }

  // const [buisnessDetails, setBuisnessDetails] = useState({})
  useEffect(() => {
    if (isSpin) {
      document.getElementById('re-white').classList.add('rotate_spin')
      document.getElementById('re-black').classList.add('rotate_spin')
    } else {
      document.getElementById('re-white').classList.remove('rotate_spin')
      document.getElementById('re-black').classList.remove('rotate_spin')
    }
  }, [isSpin])

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCounter((count) => count - 1)
    }, 1000)

    return () => clearInterval(intervalId)
  }, [])

  useEffect(() => {
    if (counter <= 0) {
      onRefresh()
      // setIsSpin(true)
    }
  }, [counter])

  return (
    <div className="flex items-center px-2 py-1 space-x-2 bg-white rounded shadow dark:bg-bgBlack">
      <span>{`0:${counter < 10 ? '0' : ''}${counter}`}</span>
      <div
        className="flex items-center cursor-pointer dark:hidden"
        onClick={onRefresh}>
        <Image
          src="/images/reload.svg"
          width={20}
          height={20}
          className=""
          id="re-black"
          alt="reload"
        />
      </div>
      <div
        className="items-center hidden cursor-pointer dark:flex"
        onClick={onRefresh}>
        <Image
          src="/images/reload-white.svg"
          width={20}
          height={20}
          className=""
          id="re-white"
          alt="reload"
        />
      </div>
    </div>
  )
}

export default RefreshCounter
