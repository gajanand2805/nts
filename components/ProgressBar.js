import React from 'react'
import { useRouter } from 'next/router'

function ProgressBar() {
  const router = useRouter()
  return (
    <div className="w-52 relative h-fit">
      <div className="w-full top-1/2 absolute bg-slate-400 h-1 translate-y-[-50%]"></div>
      <div className="w-[50%] top-1/2 absolute bg-blue-400 h-1 translate-y-[-50%]"></div>

      <div className="flex justify-between relative z-10">
        <div
          className="w-10 h-10 rounded-[50%] bg-blue-400 flex items-center justify-center cursor-pointer"
          onClick={() => router.push('/profile')}>
          <span>1</span>
          <span className="absolute top-10">Intro</span>
        </div>
        <div
          className="w-10 h-10 rounded-[50%] bg-blue-400 flex items-center justify-center cursor-pointer"
          onClick={() => router.push('/profile')}>
          <span>2</span>
          <span className="absolute top-10">Profile</span>
        </div>
        <div
          className="w-10 h-10 rounded-[50%] bg-slate-400 flex items-center justify-center cursor-pointer"
          onClick={() => router.push('/profile')}>
          <span>3</span>
          <span className="absolute top-10">Contact</span>
        </div>
      </div>
    </div>
  )
}

export default ProgressBar
