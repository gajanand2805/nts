import React, { useState, useContext } from 'react'
import { useGlobalAuthContext } from '../AuthContext'

const NavContext = React.createContext()

const NavProvider = ({ children }) => {
  const { setBuisnessDetails, setCookie, setIsAccessToken, setIsLoading } =
    useGlobalAuthContext()
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)
  const [showLogout, setShowLogout] = useState(false)
  const [mobileMenuActive, setMobileMenuActive] = useState(false)

  const openLogoutModal = () => {
    setShowProfileDropdown(false)
    setShowLogout(true)
  }

  const openProfileDropDown = () => {
    setMobileMenuActive(false)
    setShowLogout(false)
    setShowProfileDropdown(true)
  }

  const logout = async () => {
    console.log('logout')
    await setIsLoading(true)
    await setBuisnessDetails({})
    await setCookie('access-token', '', 7)
    await setIsAccessToken(false)
    setShowLogout(false)
  }

  return (
    <NavContext.Provider
      value={{
        showProfileDropdown,
        setShowProfileDropdown,
        showLogout,
        setShowLogout,
        openLogoutModal,
        openProfileDropDown,
        logout,
        mobileMenuActive,
        setMobileMenuActive,
      }}>
      {children}
    </NavContext.Provider>
  )
}

export const useGlobalNavContext = () => {
  return useContext(NavContext)
}

export { NavContext, NavProvider }
