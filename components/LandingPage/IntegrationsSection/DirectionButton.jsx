// some-inner-component.jsx
import { React } from 'react'
import { useSwiper } from 'swiper/react'

const DirectionButton = () => {
  const swiper = useSwiper()

  return <button onClick={() => swiper.slideNext()}>Left</button>
}

export default DirectionButton
