import React, { memo } from 'react'

interface FinancialDataInputProps {
  label: string
  value: number
  onChange: (value: number) => void
  className?: string
}

const FinancialDataInput: React.FC<FinancialDataInputProps> = memo(({ 
  label, 
  value, 
  onChange, 
  className = '' 
}) => {
  return (
    <div className={`flex items-center justify-between py-2 border-b border-gray-100 ${className}`}>
      <label className="text-sm text-gray-600 flex-1">{label}</label>
      <input
        type="number"
        value={value || ''}
        onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
        className="w-24 px-2 py-1 text-right border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
        placeholder="0.00"
        step="0.01"
      />
    </div>
  )
})

FinancialDataInput.displayName = 'FinancialDataInput'

export default FinancialDataInput