import { useState } from 'react'

const Select = ({ children, value, onValueChange, ...props }) => {
  return (
    <div className="relative">
      {children}
    </div>
  )
}

const SelectTrigger = ({ children, className = '', ...props }) => (
  <button 
    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-left ${className}`}
    {...props}
  >
    {children}
  </button>
)

const SelectValue = ({ placeholder, children }) => (
  <span className="block truncate">
    {children || placeholder}
  </span>
)

const SelectContent = ({ children, className = '' }) => (
  <div className={`absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg ${className}`}>
    {children}
  </div>
)

const SelectItem = ({ children, value, onSelect, className = '' }) => (
  <div 
    className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${className}`}
    onClick={() => onSelect && onSelect(value)}
  >
    {children}
  </div>
)

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem }

