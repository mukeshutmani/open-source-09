import React, { memo } from 'react'

interface TabNavigationProps {
  tabs: string[]
  activeTab: string
  onTabChange: (tab: string) => void
}

const TabNavigation: React.FC<TabNavigationProps> = memo(({ 
  tabs, 
  activeTab, 
  onTabChange 
}) => {
  return (
    <div className="flex space-x-1 border-b border-gray-200">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${
            activeTab === tab
              ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  )
})

TabNavigation.displayName = 'TabNavigation'

export default TabNavigation