import React from 'react'
import Image from 'next/image'
import dummyAvatar from '../../../public/dummyAvatar.png'
import { FiChevronDown } from 'react-icons/fi'
import { useGlobalNavContext } from '../../../contexts/NavContext'

const ProfileButton = ({ buisnessDetails, isTablet }) => {
  const { openProfileDropDown } = useGlobalNavContext()
  return isTablet ? (
    <div className={`flex items-center gap-2 tablet:hidden`}>
      <div className="w-10 h-10 bg-bgWhiteSec border-[1px] border-[#EAEEEE] flex items-center justify-center rounded-full ">
        {buisnessDetails?.Logo_Link ? (
          <Image
            src={buisnessDetails?.Logo_Link}
            alt="profile avatar"
            objectFit="cover"
            width={40}
            height={40}
            className="rounded-full"
          />
        ) : (
          <Image
            src={dummyAvatar}
            alt="profile avatar"
            objectFit="cover"
          />
        )}
      </div>
      <button
        onClick={openProfileDropDown}
        className="text-lg text-black dark:text-white">
        <FiChevronDown />
      </button>
    </div>
  ) : (
    <div className="flex items-center gap-2">
      <div className="w-10 h-10  bg-bgWhiteSec border-[1px] border-[#EAEEEE] flex items-center justify-center rounded-full ">
        {buisnessDetails?.Logo_Link ? (
          <Image
            src={buisnessDetails?.Logo_Link}
            alt="profile avatar"
            objectFit="cover"
            width={40}
            height={40}
            className="rounded-full"
          />
        ) : (
          <Image
            src={dummyAvatar}
            alt="profile avatar"
            objectFit="cover"
          />
        )}
      </div>
      <button
        onClick={openProfileDropDown}
        className="text-lg text-black dark:text-white">
        <FiChevronDown />
      </button>
    </div>
  )
}

export default ProfileButton
