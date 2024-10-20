const SkeletonText = () => {
  return (
    <div className="w-full px-4 bg-white dark:bg-dBlack rounded-[10px] dark:border-White/20 border-2 py-5 shadow-sm border-BlackTer">
      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
      <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
      <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-700 mb-2.5"></div>
      <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
      <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
      <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
      <span className="sr-only">Custom campaign text</span>
    </div>
  )
}

export default SkeletonText
