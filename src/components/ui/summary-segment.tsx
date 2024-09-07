import React from 'react'

const SummarySegment = ({segment, i}: {segment: string, i: number}) => {
  return (
    <p className="bg-gray-400 border border-lg" key={i}>{segment}</p>
  )
}

export default SummarySegment;