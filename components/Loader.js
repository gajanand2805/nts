export default function Loader({ flag }) {
  return (
    <div
      className={` ${
        flag ? 'relative w-full' : 'absolute top-0 bottom-0 left-0 right-0 z-50'
      } flex flex-col h-screen items-center justify-center pb-20 bg-bgWhiteSec dark:bg-dBlack`}>
      <div className="bg-blue-500 w-24 h-24  absolute animate-ping rounded-full delay-5s shadow-xl"></div>
      <div className="bg-blue-400 w-16 h-16 absolute animate-ping rounded-full shadow-xl"></div>
      <div className="bg-white w-12 h-12 absolute animate-pulse rounded-full shadow-xl"></div>
    </div>
  )
}
