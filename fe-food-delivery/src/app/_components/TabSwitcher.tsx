import React from 'react'

type TabSwitcherProps = {
  activeTab: 'cart' | 'order'
  setActiveTab: (tab: 'cart' | 'order') => void
}

const TabSwitcher: React.FC<TabSwitcherProps> = ({
  activeTab,
  setActiveTab,
}) => {
  return (
    <div className="bg-gray-200 p-1 rounded-full flex w-full max-w-xs mx-auto">
      {['cart', 'order'].map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab as 'cart' | 'order')}
          className={`flex-1 py-2 text-sm rounded-full transition-all duration-200 font-semibold ${
            activeTab === tab
              ? 'bg-red-500 text-white shadow'
              : 'text-gray-800 hover:bg-white'
          }`}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </button>
      ))}
    </div>
  )
}

export default TabSwitcher
