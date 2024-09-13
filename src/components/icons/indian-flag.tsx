import React from 'react'

const IndianFlag = ({ className } : { className: string }) => {
  return (
    <span role="img" aria-label="indian-flag" className={` ${className}`}>🇮🇳</span>
  )
}

export default IndianFlag