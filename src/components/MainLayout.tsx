// MainLayout.tsx
import "~styles/layout.css";
import React from 'react';
import { useState, useEffect } from 'react';
import BottomNavigation from './BottomNavigation';
import VaultTab from './tabs/VaultTab';
import BrowsersTab from './tabs/BrowsersTab';
import GeneratorTab from './tabs/GeneratorTab';
import SettingsTab from './tabs/SettingsTab';
import { useTab } from "../contexts/TabContext";

const MainLayout: React.FC = () => {
  const { currentTab } = useTab();
  const [content, setContent] = useState(<VaultTab />);

  useEffect(() => {
    switch (currentTab) {
      case 'vault':
        setContent(<VaultTab />);
        break;
      case 'browsers':
        setContent(<BrowsersTab />);
        break;
      case 'generator':
        setContent(<GeneratorTab />);
        break;
      case 'settings':
        setContent(<SettingsTab />);
        break;
      default:
        setContent(<VaultTab />);
    }
  }, [currentTab]); // Re-run this effect when currentTab changes

  return (
    <div className="main">
        <div className="content">
          {content}
        </div>
        <BottomNavigation />
      </div>
  );
};

export default MainLayout;
