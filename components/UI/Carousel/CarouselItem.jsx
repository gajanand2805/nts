export const CarouselItem = ({ children, width }) => {
  return (
    <div
      className="inline-flex items-center justify-center"
      style={{ width: width }}>
      {children}
    </div>
  )
}
