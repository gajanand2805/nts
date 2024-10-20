import { useState } from 'react'

export const useMouseMove = () => {
  const [mouseState, setMouseState] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    e.persist()
    setMouseState((state) => ({ ...state, x: e.clientX, y: e.clientY }))
  }
  return {
    x: mouseState.x,
    y: mouseState.y,
    handleMouseMove,
  }
}
