import React, { useState } from 'react'

// import { motion } from "framer-motion";
import { ImSun } from 'react-icons/im'
import { MdDarkMode } from 'react-icons/md'
import { useGlobalAuthContext } from '../AuthContext'
import useDarkMode from '../Hooks/useDarkMode'
import Image from 'next/image'
import { BsFillMoonFill } from 'react-icons/bs'
// import moonImageWhite from "../components/Nav/assets/moon.svg";
const DarkModeSwitch = () => {
  const [darkTheme, setDarkTheme] = useDarkMode()
  const { selectedLang } = useGlobalAuthContext()
  return (
    // <motion.button
    <button
      // layout
      onClick={() => setDarkTheme(!darkTheme)}
      className="flex items-center justify-center w-10 h-10 p-2 text-lg text-black rounded-full bg-bgWhiteSec dark:bg-dBlack dark:text-white"
      name="light/dark-mode-switch"
      aria-label="light/dark-mode-switch">
      {darkTheme ? <ImSun /> : <BsFillMoonFill />}
    </button>
    // </motion.button>
  )
}

export default DarkModeSwitch
