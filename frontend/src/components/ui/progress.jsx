import React from 'react'

export const Progress = ({ value = 0, className = '', max = 100 }) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100))
  
  return (
    <div className={`relative h-4 w-full overflow-hidden rounded-full bg-gray-100 ${className}`}>
      <div
        className="h-full w-full flex-1 bg-blue-600 transition-all duration-300 ease-in-out"
        style={{ transform: `translateX(-${100 - percentage}%)` }}
      />
    </div>
  )
}

