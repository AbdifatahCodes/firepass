import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

type Tab = 'vault' | 'browsers' | 'generator' | 'settings';

interface TabContextType {
  currentTab: Tab;
  setCurrentTab: (tab: Tab) => void;
}

const TabContext = createContext<TabContextType | undefined>(undefined);

export const useTab = () => {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error('useTab must be used within a TabProvider');
  }
  return context;
};

export const TabProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentTab, setCurrentTab] = useState<Tab>('vault');

  return (
    <TabContext.Provider value={{ currentTab, setCurrentTab }}>
      {children}
    </TabContext.Provider>
  );
};
