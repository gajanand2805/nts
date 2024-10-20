import React from 'react'

const ProgressBar = ({
  progress = '100',
  label = '',
  count = '',
  showProgress = true,
}) => {
  return (
    <div className="w-full">
      {progress == 100 && (
        <div className="relative flex flex-col items-center w-full text-center">
          <div className={`relative h-[90px] overflow-hidden w-[180px] `}>
            <div
              className={`absolute top-0 left-0 w-[180px] h-[180px] rounded-[50%] box-border border-[28px] dark:border-[#171818] border-[#F3F4F8] border-b-[#FEC53D] dark:border-b-[#FEC53D] border-l-[#FEC53D] dark:border-l-[#FEC53D]  border-t-[#FEC53D] dark:border-t-[#FEC53D] border-r-[#FEC53D] dark:border-r-[#FEC53D]`}></div>
          </div>
          <div className="flex flex-col items-center gap-1 w-[180px] -translate-y-4">
            {showProgress && (
              <span className="text-3xl font-bold">{progress}%</span>
            )}
            <div className="flex flex-col gap-3">
              <p className="text-2xl font-bold ">{count}%</p>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FEC53D]"></div>
                <p className="text-sm font-semibold opacity-70">{label}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {progress >= 80 && progress < 100 && (
        <div className="relative flex flex-col items-center w-full text-center">
          <div className={`relative h-[90px] overflow-hidden w-[180px] `}>
            <div
              className={`absolute top-0 left-0 w-[180px] h-[180px] rounded-[50%] box-border border-[28px] dark:border-[#171818] border-[#F3F4F8] border-b-[#FEC53D] dark:border-b-[#FEC53D] border-l-[#FEC53D] dark:border-l-[#FEC53D]  border-t-[#FEC53D] dark:border-t-[#FEC53D] rotate-12`}></div>
          </div>
          <div className="flex flex-col items-center gap-1 w-[180px] -translate-y-4">
            {showProgress && (
              <span className="text-3xl font-bold">{progress}%</span>
            )}
            <div className="flex flex-col gap-3">
              <p className="text-2xl font-bold ">{count}%</p>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FEC53D]"></div>
                <p className="text-sm font-semibold opacity-70">{label}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {progress > 50 && progress < 80 && (
        <div className="relative flex flex-col items-center w-full text-center">
          <div className={`relative h-[90px] overflow-hidden w-[180px] `}>
            <div
              className={`absolute top-0 left-0 w-[180px] h-[180px] rounded-[50%] box-border border-[28px] dark:border-[#171818] border-[#F3F4F8] border-b-[#FEC53D] dark:border-b-[#FEC53D] border-l-[#FEC53D] dark:border-l-[#FEC53D]  border-t-[#FEC53D] dark:border-t-[#FEC53D] -rotate-12`}></div>
          </div>
          <div className="flex flex-col items-center gap-1 w-[180px] -translate-y-4">
            {showProgress && (
              <span className="text-3xl font-bold">{progress}%</span>
            )}
            <div className="flex flex-col gap-3">
              <p className="text-2xl font-bold ">{count}%</p>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FEC53D]"></div>
                <p className="text-sm font-semibold opacity-70">{label}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {progress == 50 && (
        <div className="relative flex flex-col items-center w-full text-center">
          <div className={`relative h-[90px] overflow-hidden w-[180px] `}>
            <div
              className={`absolute top-0 left-0 w-[180px] h-[180px] rounded-[50%] box-border border-[28px] dark:border-[#171818] border-[#F3F4F8] border-b-[#FEC53D] dark:border-b-[#FEC53D] border-l-[#FEC53D] dark:border-l-[#FEC53D]  border-t-[#FEC53D] dark:border-t-[#FEC53D] -rotate-45`}></div>
          </div>
          <div className="flex flex-col items-center gap-1 w-[180px] -translate-y-4">
            {showProgress && (
              <span className="text-3xl font-bold">{progress}%</span>
            )}
            <div className="flex flex-col gap-3">
              <p className="text-2xl font-bold ">{count}%</p>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FEC53D]"></div>
                <p className="text-sm font-semibold opacity-70">{label}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {progress < 50 && progress >= 30 && (
        <div className="relative flex flex-col items-center w-full text-center">
          <div className={`relative h-[90px] overflow-hidden w-[180px] `}>
            <div
              className={`absolute top-0 left-0 w-[180px] h-[180px] rounded-[50%] box-border border-[28px] dark:border-[#171818] border-[#F3F4F8] border-b-[#FEC53D] dark:border-b-[#FEC53D] border-l-[#FEC53D] dark:border-l-[#FEC53D]  `}></div>
          </div>
          <div className="flex flex-col items-center gap-1 w-[180px] -translate-y-4">
            {showProgress && (
              <span className="text-3xl font-bold">{progress}%</span>
            )}
            <div className="flex flex-col gap-3">
              <p className="text-2xl font-bold ">{count}%</p>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FEC53D]"></div>
                <p className="text-sm font-semibold opacity-70">{label}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {progress < 30 && progress > 0 && (
        <div className="relative flex flex-col items-center w-full text-center">
          <div className={`relative h-[90px] overflow-hidden w-[180px] `}>
            <div
              className={`absolute top-0 left-0 w-[180px] h-[180px] rounded-[50%] box-border border-[28px] dark:border-[#171818] border-[#F3F4F8] border-b-[#FEC53D] dark:border-b-[#FEC53D] border-l-[#FEC53D] dark:border-l-[#FEC53D]  -rotate-[15deg]`}></div>
          </div>
          <div className="flex flex-col items-center gap-1 w-[180px] -translate-y-4">
            {showProgress && (
              <span className="text-3xl font-bold">{progress}%</span>
            )}
            <div className="flex flex-col gap-3">
              <p className="text-2xl font-bold ">{count}%</p>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FEC53D]"></div>
                <p className="text-sm font-semibold opacity-70">{label}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {progress == 0 && (
        <div className="relative flex flex-col items-center w-full text-center">
          <div className={`relative h-[90px] overflow-hidden w-[180px] `}>
            <div
              className={`absolute top-0 left-0 w-[180px] h-[180px] rounded-[50%] box-border border-[28px] dark:border-[#171818] border-[#F3F4F8]  `}></div>
          </div>
          <div className="flex flex-col items-center gap-1 w-[180px] -translate-y-4">
            {showProgress && (
              <span className="text-3xl font-bold">{progress}%</span>
            )}
            <div className="flex flex-col gap-3">
              <p className="text-2xl font-bold ">{count}%</p>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FEC53D]"></div>
                <p className="text-sm font-semibold opacity-70">{label}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProgressBar
