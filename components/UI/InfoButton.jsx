import { useEffect, useState } from 'react'
import { MdOutlineInfo } from 'react-icons/md'
import { useMouseMove } from '../../Hooks/useMouseMove'
import { useWindowDimensions } from '../../Hooks/useWindowDimensions'

export const InfoButton = ({ text }) => {
  //? states
  const [show, setShow] = useState(false)
  const [alignment, setAlignment] = useState('right')
  const [vAlignment, setVAlignment] = useState('top')
  const { x, y, handleMouseMove } = useMouseMove()
  const { height, width } = useWindowDimensions()

  useEffect(() => {
    if (x <= width / 2) {
      setAlignment('left')
    }
    if (x > width / 2) {
      setAlignment('right')
    }
    if (y <= height / 2) {
      setVAlignment('top')
    }
    if (y > height / 2) {
      setVAlignment('bottom')
    }
  }, [width, height, y, x])

  return (
    <div className="relative">
      <MdOutlineInfo
        className="w-4 h-4 cursor-pointer opacity-60"
        onClick={() => setShow(true)}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      />

      {show && (
        <div
          className={`absolute ${
            alignment === 'right' ? 'right-0' : 'left-0'
          } ${
            vAlignment === 'bottom' ? 'bottom-5' : 'top-5'
          } p-4 rounded-xl z-40 bg-white shadow-xl border-[1px] border-dBlack/30 dark:border-BlackTer/30 w-56 text-sm dark:bg-dBlack text-black dark:text-white`}>
          {text}
        </div>
      )}
    </div>
  )
}
