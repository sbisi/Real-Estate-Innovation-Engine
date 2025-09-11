import React, { useState, useRef, useEffect } from 'react'

export const Select = ({ children, value, onValueChange, defaultValue }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState(value || defaultValue || '')
  const selectRef = useRef(null)

  useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value)
    }
  }, [value])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleValueChange = (newValue) => {
    setSelectedValue(newValue)
    setIsOpen(false)
    if (onValueChange) {
      onValueChange(newValue)
    }
  }

  return (
    <div ref={selectRef} className="relative">
      {React.Children.map(children, child => {
        if (child.type === SelectTrigger) {
          return React.cloneElement(child, {
            onClick: () => setIsOpen(!isOpen),
            selectedValue,
            isOpen
          })
        }
        if (child.type === SelectContent) {
          return isOpen ? React.cloneElement(child, {
            onValueChange: handleValueChange,
            selectedValue
          }) : null
        }
        return child
      })}
    </div>
  )
}

export const SelectTrigger = ({ children, className = '', onClick, selectedValue, isOpen }) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
  >
    {children}
    <svg
      className={`h-4 w-4 opacity-50 transition-transform ${isOpen ? 'rotate-180' : ''}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  </button>
)

export const SelectValue = ({ placeholder, children }) => (
  <span className="block truncate">
    {children || <span className="text-gray-500">{placeholder}</span>}
  </span>
)

export const SelectContent = ({ children, onValueChange, selectedValue }) => (
  <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
    {React.Children.map(children, child =>
      React.cloneElement(child, { onValueChange, selectedValue })
    )}
  </div>
)

export const SelectItem = ({ children, value, onValueChange, selectedValue }) => (
  <div
    className={`relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-gray-100 focus:bg-gray-100 ${
      selectedValue === value ? 'bg-gray-100' : ''
    }`}
    onClick={() => onValueChange(value)}
  >
    {selectedValue === value && (
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </span>
    )}
    {children}
  </div>
)

