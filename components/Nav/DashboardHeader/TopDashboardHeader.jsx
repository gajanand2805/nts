import Image from 'next/image'
import React, { useState } from 'react'

import Link from 'next/link'
import logoLandscapeDark from '../../../Logo/logo_landscape_dark.svg'
import logoLandscapeLight from '../../../Logo/logo_landscape_light.svg'
import { useGlobalNavContext } from '../../../contexts/NavContext'
import Modal from '../../Modal'
import LogoutModal from './LogoutModal'
import MobileMenu from './MobileMenu'
import MobileMenuButton from './MobileMenuButton'
import ProfileButton from './ProfileButton'
import ProfileDropdown from './ProfileDropdown'

const TopDashboardHeader = ({ buisnessDetails, active, routes }) => {
  //? contexts
  const {
    setShowProfileDropdown,
    showProfileDropdown,
    openProfileDropDown,
    showLogout,
    setShowLogout,
    mobileMenuActive,
    setMobileMenuActive,
  } = useGlobalNavContext()

  //? states
  const [toggleStatus, setToggleStatus] = useState(false)

  return (
    <header className="absolute top-0 z-50 items-center justify-center w-full px-4 bg-white touch-none dark:bg-bgBlack mobileL:px-9">
      <div className="flex items-center justify-between w-full py-2 h-[78px] ">
        <div className="flex tablet:hidden">
          <ProfileButton
            isTablet={false}
            buisnessDetails={buisnessDetails}
          />
        </div>

        <div>
          <Link href={'/'}>
            <div className="hidden cursor-pointer w-36 tablet:w-40 dark:flex">
              <Image
                src={logoLandscapeDark}
                objectFit="cover"
                className=""
                alt=""
              />
            </div>
          </Link>
          <Link href={'/'}>
            <div className="flex cursor-pointer w-36 tablet:w-40 dark:hidden">
              <Image
                src={logoLandscapeLight}
                objectFit="cover"
                className=""
                alt=""
              />
            </div>
          </Link>
        </div>
        <div className="flex items-center gap-7">
          <div className="items-center hidden gap-7 tablet:flex">
            {/* <Link href="/support">
              <button
                className={`flex items-center justify-center w-10 h-10 p-2 text-xl  rounded-full ${active === 'support'
                    ? 'bg-Blue text-white'
                    : 'bg-bgWhiteSec text-black dark:bg-dBlack dark:text-white'
                  } `}>
                <BiSupport />
              </button>
            </Link> */}
            {/* <DarkModeSwitch /> */}
            {/* <LanguageChange Dark={true} /> */}
            <ProfileButton
              isTablet={false}
              buisnessDetails={buisnessDetails}
            />
          </div>

          <MobileMenuButton />
        </div>
      </div>

      {/* Mobile Menu modal */}
      <Modal
        top={'88'}
        isVisible={mobileMenuActive}
        onClose={() => setMobileMenuActive(false)}>
        <MobileMenu
          active={active}
          routes={routes}
        />
      </Modal>

      {/* Profile Dropdown */}

      <Modal
        isVisible={showProfileDropdown}
        onClose={() => setShowProfileDropdown(false)}>
        <ProfileDropdown buisnessDetails={buisnessDetails} />
      </Modal>

      {/* Logout Modal */}
      <Modal
        isVisible={showLogout}
        onClose={() => {
          setShowLogout(false)
        }}>
        <LogoutModal />
      </Modal>
    </header>
  )
}

export default TopDashboardHeader
