'use client'

import React, { useState, useCallback } from 'react'
import { X, Minimize, Square } from 'lucide-react'
import { useFinancialCalculations } from '@/hooks/useFinancialCalculations'
import FinancialDataInput from './FinancialDataInput'
import TabNavigation from './TabNavigation'

interface FinancialData {
  ordinaryShareCapital: number
  preferenceShareCapital: number
  capitalReserve: number
  generalReserve: number
  unappropriatedProfit: number
  otherRetainedEarnings: number
  surplusOnRevaluation: number
  unrealizedGain: number
  directorsLoan: number
  subordinatedDebt: number
  faceValue: number
}

const CompanyAccountsApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Capital')
  const [companyType, setCompanyType] = useState('Public')
  const [country, setCountry] = useState('Pakistan')
  const [company, setCompany] = useState('')
  const [year, setYear] = useState('')
  const [accountType, setAccountType] = useState('')

  const [financialData, setFinancialData] = useState<FinancialData>({
    ordinaryShareCapital: 0,
    preferenceShareCapital: 0,
    capitalReserve: 0,
    generalReserve: 0,
    unappropriatedProfit: 0,
    otherRetainedEarnings: 0,
    surplusOnRevaluation: 0,
    unrealizedGain: 0,
    directorsLoan: 0,
    subordinatedDebt: 0,
    faceValue: 0,
  })

  const tabs = ['Capital', 'Liabilities', 'Assets', 'Revenues', 'Expenses', 'Cash Flow', 'Risk']

  const { totalEquityTier1, totalEquity, isUnbalanced } = useFinancialCalculations(financialData)

  const updateFinancialData = useCallback((field: keyof FinancialData, value: number) => {
    setFinancialData(prev => ({
      ...prev,
      [field]: value
    }))
  }, [])

  const handleExportToFile = useCallback(() => {
    const data = {
      company,
      country,
      year,
      accountType,
      financialData,
      totalEquityTier1,
      totalEquity
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${company || 'company'}_accounts_${year || 'data'}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, [company, country, year, accountType, financialData, totalEquityTier1, totalEquity])

  const capitalFields = [
    { key: 'ordinaryShareCapital', label: 'Ordinary Share Capital' },
    { key: 'preferenceShareCapital', label: 'Preference Share Capital' },
    { key: 'capitalReserve', label: 'Capital Reserve' },
    { key: 'generalReserve', label: 'General Reserve' },
    { key: 'unappropriatedProfit', label: 'Unappropriated Profit' },
    { key: 'otherRetainedEarnings', label: 'Other Retained Earnings' },
  ]

  const additionalFields = [
    { key: 'surplusOnRevaluation', label: 'Surplus on Revaluation on Fixed Assets' },
    { key: 'unrealizedGain', label: 'Unrealized Gain on Revaluation of Investments' },
    { key: 'directorsLoan', label: 'Directors / Sponsors Loan' },
    { key: 'subordinatedDebt', label: 'Subordinated Debt' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Window Frame */}
        <div className="bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden">
          {/* Title Bar */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-400 rounded-sm flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-sm"></div>
              </div>
              <span className="font-semibold text-sm">Add/Edit Company Accounts</span>
            </div>
            <div className="flex items-center space-x-1">
              <button className="w-6 h-6 bg-blue-500 hover:bg-blue-400 rounded flex items-center justify-center transition-colors">
                <Minimize className="w-3 h-3" />
              </button>
              <button className="w-6 h-6 bg-blue-500 hover:bg-blue-400 rounded flex items-center justify-center transition-colors">
                <Square className="w-3 h-3" />
              </button>
              <button className="w-6 h-6 bg-red-500 hover:bg-red-400 rounded flex items-center justify-center transition-colors">
                <X className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-6">
            {/* Top Section */}
            <div className="mb-6">
              {/* Radio Buttons */}
              <div className="flex items-center space-x-6 mb-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="companyType"
                    value="Public"
                    checked={companyType === 'Public'}
                    onChange={(e) => setCompanyType(e.target.value)}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 focus:ring-2"
                  />
                  <span className="text-sm font-medium text-gray-700">Public</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="companyType"
                    value="Private"
                    checked={companyType === 'Private'}
                    onChange={(e) => setCompanyType(e.target.value)}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 focus:ring-2"
                  />
                  <span className="text-sm font-medium text-gray-700">Private</span>
                </label>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  >
                    <option value="Pakistan">Pakistan</option>
                    <option value="India">India</option>
                    <option value="Bangladesh">Bangladesh</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter company name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                  <select
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  >
                    <option value="">Select Year</option>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Account Type</label>
                  <select
                    value={accountType}
                    onChange={(e) => setAccountType(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  >
                    <option value="">Select Type</option>
                    <option value="Consolidated">Consolidated</option>
                    <option value="Standalone">Standalone</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors duration-200 font-medium shadow-md hover:shadow-lg">
                    Go
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md transition-colors duration-200 shadow-sm hover:shadow-md">
                  Add/Edit Company
                </button>
                <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md transition-colors duration-200 shadow-sm hover:shadow-md">
                  Load Existing
                </button>
                <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md transition-colors duration-200 shadow-sm hover:shadow-md">
                  Add New Account
                </button>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200 shadow-md hover:shadow-lg">
                  Get Zeal Data
                </button>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200 shadow-md hover:shadow-lg">
                  AI Score
                </button>
                <button 
                  onClick={handleExportToFile}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200 shadow-md hover:shadow-lg"
                >
                  Export to file
                </button>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200 shadow-md hover:shadow-lg">
                  Calculate Credit Score
                </button>
              </div>

              {/* Tabs */}
              <TabNavigation 
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={setActiveTab}
              />
            </div>

            {/* Financial Data Section */}
            {activeTab === 'Capital' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Data Entry */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Capital</h3>
                  
                  <div className="space-y-3">
                    {capitalFields.map(({ key, label }) => (
                      <FinancialDataInput
                        key={key}
                        label={label}
                        value={financialData[key as keyof FinancialData]}
                        onChange={(value) => updateFinancialData(key as keyof FinancialData, value)}
                      />
                    ))}
                    
                    <div className="flex items-center justify-between py-2 border-b-2 border-blue-200 bg-blue-50 px-2 rounded">
                      <span className="font-semibold text-gray-800">Total Equity (Tier 1)</span>
                      <span className="font-bold text-blue-600">{totalEquityTier1.toFixed(2)}</span>
                    </div>

                    {additionalFields.map(({ key, label }) => (
                      <FinancialDataInput
                        key={key}
                        label={label}
                        value={financialData[key as keyof FinancialData]}
                        onChange={(value) => updateFinancialData(key as keyof FinancialData, value)}
                      />
                    ))}

                    <div className="flex items-center justify-between py-2 border-b-2 border-green-200 bg-green-50 px-2 rounded">
                      <span className="font-semibold text-gray-800">Total Equity</span>
                      <span className="font-bold text-green-600">{totalEquity.toFixed(2)}</span>
                    </div>

                    <FinancialDataInput
                      label="Face Value"
                      value={financialData.faceValue}
                      onChange={(value) => updateFinancialData('faceValue', value)}
                    />
                  </div>
                </div>

                {/* Right Column - Summary */}
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-gray-800 mb-3">Summary</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Company:</span>
                        <span className="font-medium">{company || 'Not set'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Year:</span>
                        <span className="font-medium">{year || 'Not set'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Type:</span>
                        <span className="font-medium">{companyType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Country:</span>
                        <span className="font-medium">{country}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-gray-800 mb-3">Financial Overview</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Total Equity (Tier 1):</span>
                        <span className="font-bold text-blue-600">{totalEquityTier1.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Equity:</span>
                        <span className="font-bold text-green-600">{totalEquity.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {isUnbalanced && (
                    <div className="bg-red-50 border border-red-200 p-4 rounded-lg shadow-sm">
                      <h4 className="font-semibold text-red-800 mb-2">Balance Check</h4>
                      <p className="text-red-600 text-sm">
                        Accounts are currently unbalanced. Total Equity: {totalEquity.toFixed(2)}
                      </p>
                    </div>
                  )}

                  <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-yellow-800 mb-2">Quick Actions</h4>
                    <div className="space-y-2">
                      <button 
                        onClick={() => setFinancialData(prev => ({ ...prev, ordinaryShareCapital: 1000000 }))}
                        className="w-full text-left text-sm text-yellow-700 hover:text-yellow-900 transition-colors"
                      >
                        • Set sample Ordinary Share Capital (1M)
                      </button>
                      <button 
                        onClick={() => setFinancialData({
                          ordinaryShareCapital: 0,
                          preferenceShareCapital: 0,
                          capitalReserve: 0,
                          generalReserve: 0,
                          unappropriatedProfit: 0,
                          otherRetainedEarnings: 0,
                          surplusOnRevaluation: 0,
                          unrealizedGain: 0,
                          directorsLoan: 0,
                          subordinatedDebt: 0,
                          faceValue: 0,
                        })}
                        className="w-full text-left text-sm text-yellow-700 hover:text-yellow-900 transition-colors"
                      >
                        • Clear all values
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Other Tabs Content */}
            {activeTab !== 'Capital' && (
              <div className="text-center py-12">
                <h3 className="text-lg font-semibold text-gray-600 mb-2">{activeTab} Tab</h3>
                <p className="text-gray-500 mb-4">Content for {activeTab} tab will be implemented here.</p>
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg max-w-md mx-auto">
                  <p className="text-sm text-blue-600">
                    This section would contain fields specific to {activeTab} management.
                    The interface can be extended to include all financial statement categories.
                  </p>
                </div>
              </div>
            )}

            {/* Bottom Section */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center space-y-4 lg:space-y-0">
                <div className="flex flex-wrap gap-2">
                  <button className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md transition-colors duration-200 shadow-sm hover:shadow-md">
                    Save
                  </button>
                  <button className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md transition-colors duration-200 shadow-sm hover:shadow-md">
                    Edit
                  </button>
                  <button className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md transition-colors duration-200 shadow-sm hover:shadow-md">
                    Transmit
                  </button>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">Total Equities and Liabilities</span>
                    <span className="bg-gray-100 px-2 py-1 rounded font-mono">{totalEquity.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">Total Assets</span>
                    <span className="bg-gray-100 px-2 py-1 rounded font-mono">0.00</span>
                  </div>
                  <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${
                    isUnbalanced 
                      ? 'bg-red-100 text-red-600' 
                      : 'bg-green-100 text-green-600'
                  }`}>
                    <span className="font-medium">{isUnbalanced ? 'Unbalanced' : 'Balanced'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompanyAccountsApp