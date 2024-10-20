import React from 'react'

const ProgressBar = ({ progress = '100', count = '', showProgress = true }) => {
  return (
    <>
      {progress == 100 && (
        <div className="relative flex flex-col items-center w-full text-center">
          <div className={`relative h-[90px] overflow-hidden w-[180px] `}>
            <div
              className={`absolute top-0 left-0 w-[180px] h-[180px] rounded-[50%] box-border border-[28px] dark:border-white/20 border-black/20 border-b-Green dark:border-b-Green border-l-Green dark:border-l-Green  border-t-Green dark:border-t-Green border-r-Green dark:border-r-Green`}></div>
          </div>
          <div className="flex flex-col items-center gap-1 w-[180px]">
            {showProgress && (
              <span className="text-3xl font-bold">{progress}%</span>
            )}
            <div className="flex flex-col gap-3">
              <p className="text-2xl font-bold ">{count}</p>
            </div>
          </div>
        </div>
      )}
      {progress >= 80 && progress < 100 && (
        <div className="relative flex flex-col items-center w-full text-center">
          <div className={`relative h-[90px] overflow-hidden w-[180px] `}>
            <div
              className={`absolute top-0 left-0 w-[180px] h-[180px] rounded-[50%] box-border border-[28px] dark:border-white/20 border-black/20 border-b-Green dark:border-b-Green border-l-Green dark:border-l-Green  border-t-Green dark:border-t-Green rotate-12`}></div>
          </div>
          <div className="flex flex-col items-center gap-1 w-[180px]">
            {showProgress && (
              <span className="text-3xl font-bold">{progress}%</span>
            )}
            <div className="flex flex-col gap-3">
              <p className="text-2xl font-bold ">{count}</p>
            </div>
          </div>
        </div>
      )}
      {progress > 50 && progress < 80 && (
        <div className="relative flex flex-col items-center w-full text-center">
          <div className={`relative h-[90px] overflow-hidden w-[180px] `}>
            <div
              className={`absolute top-0 left-0 w-[180px] h-[180px] rounded-[50%] box-border border-[28px] dark:border-white/20 border-black/20 border-b-Green dark:border-b-Green border-l-Green dark:border-l-Green  border-t-Green dark:border-t-Green -rotate-12`}></div>
          </div>
          <div className="flex flex-col items-center gap-1 w-[180px]">
            {showProgress && (
              <span className="text-3xl font-bold">{progress}%</span>
            )}
            <div className="flex flex-col gap-3">
              <p className="text-2xl font-bold ">{count}</p>
            </div>
          </div>
        </div>
      )}
      {progress == 50 && (
        <div className="relative flex flex-col items-center w-full text-center">
          <div className={`relative h-[90px] overflow-hidden w-[180px] `}>
            <div
              className={`absolute top-0 left-0 w-[180px] h-[180px] rounded-[50%] box-border border-[28px] dark:border-white/20 border-black/20 border-b-Green dark:border-b-Green border-l-Green dark:border-l-Green  border-t-Green dark:border-t-Green -rotate-45`}></div>
          </div>
          <div className="flex flex-col items-center gap-1 w-[180px]">
            {showProgress && (
              <span className="text-3xl font-bold">{progress}%</span>
            )}
            <div className="flex flex-col gap-3">
              <p className="text-2xl font-bold ">{count}</p>
            </div>
          </div>
        </div>
      )}
      {progress < 50 && progress >= 30 && (
        <div className="relative flex flex-col items-center w-full text-center">
          <div className={`relative h-[90px] overflow-hidden w-[180px] `}>
            <div
              className={`absolute top-0 left-0 w-[180px] h-[180px] rounded-[50%] box-border border-[28px] dark:border-white/20 border-black/20 border-b-Green dark:border-b-Green border-l-Green dark:border-l-Green  `}></div>
          </div>
          <div className="flex flex-col items-center gap-1 w-[180px]">
            {showProgress && (
              <span className="text-3xl font-bold">{progress}%</span>
            )}
            <div className="flex flex-col gap-3">
              <p className="text-2xl font-bold ">{count}</p>
            </div>
          </div>
        </div>
      )}
      {progress < 30 && progress > 0 && (
        <div className="relative flex flex-col items-center w-full text-center">
          <div className={`relative h-[90px] overflow-hidden w-[180px] `}>
            <div
              className={`absolute top-0 left-0 w-[180px] h-[180px] rounded-[50%] box-border border-[28px] dark:border-white/20 border-black/20 border-b-Green dark:border-b-Green border-l-Green dark:border-l-Green  -rotate-[15deg]`}></div>
          </div>
          <div className="flex flex-col items-center gap-1 w-[180px]">
            {showProgress && (
              <span className="text-3xl font-bold">{progress}%</span>
            )}
            <div className="flex flex-col gap-3">
              <p className="text-2xl font-bold ">{count}</p>
            </div>
          </div>
        </div>
      )}
      {progress == 0 && (
        <div className="relative flex flex-col items-center w-full text-center">
          <div className={`relative h-[90px] overflow-hidden w-[180px] `}>
            <div
              className={`absolute top-0 left-0 w-[180px] h-[180px] rounded-[50%] box-border border-[28px] dark:border-white/20 border-black/20  `}></div>
          </div>
          <div className="flex flex-col items-center gap-1 w-[180px]">
            {showProgress && (
              <span className="text-3xl font-bold">{progress}%</span>
            )}
            <div className="flex flex-col gap-3">
              <p className="text-2xl font-bold ">{count}</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ProgressBar
