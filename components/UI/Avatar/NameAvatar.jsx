// Avatar.js

import React from 'react'

const sizeMap = {
  small: 'w-6 h-6',
  medium: 'w-8 h-8',
  large: 'w-10 h-10',
}

const backgroundColors = [
  'bg-blue-700',
  'bg-green-700',
  'bg-yellow-700',
  'bg-pink-700',
  'bg-purple-700',
  'bg-amber-600',
  'bg-orange-700',
  'bg-red-700',
  'bg-teal-700',
  'bg-cyan-700',
  'bg-gray-700',
  'bg-fuchsia-600',
  'bg-rose-700',
]

const NameAvatar = ({ name, size }) => {
  const getColorForName = (name) => {
    let Name = name
    if (isStringNumeric(name)) {
      Name = 'U K'
    }
    // Use a simple hash function to map names to colors
    const colorIndex =
      Name?.split('')
        ?.map((char) => char.charCodeAt(0))
        ?.reduce((acc, val) => acc + val, 0) % backgroundColors.length
    // const colorIndex = djb2Hash(Name) % backgroundColors.length;
    return backgroundColors[colorIndex]
  }

  function isStringNumeric(inputString) {
    // Use isNaN to check if the inputString is not a number
    return !isNaN(inputString)
  }

  const getInitials = (name) => {
    if (isStringNumeric(name)) {
      return 'U K'
    }
    const names = name.split(' ')
    return names
      .map((word) => word[0])
      .slice(0, 2)
      .join('')
      .toUpperCase()
  }

  const avatarSize = sizeMap[size] || sizeMap['medium'] // Default to medium if size is not recognized.
  const backgroundColor = getColorForName(name)

  return name ? (
    <div
      className={`${avatarSize} ${backgroundColor} text-xs bg- font-light text-white rounded-full flex items-center justify-center`}>
      {getInitials(name)}
    </div>
  ) : (
    <div
      className={`${avatarSize} bg-gray-200 animate-pulse text-xs bg- font-light text-white rounded-full flex items-center justify-center`}></div>
  )
}

export default NameAvatar
