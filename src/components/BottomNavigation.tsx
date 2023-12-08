// BottomNavigation.tsx
import "~styles/layout.css";
import React from 'react';
import { IoMdLock } from "react-icons/io";
import { CgBrowser } from "react-icons/cg";
import { IoSettingsSharp } from "react-icons/io5";
import { GrCycle } from "react-icons/gr";
import { useTab } from "../contexts/TabContext";

type Tab = 'vault' | 'browsers' | 'generator' | 'settings'; // Define this if not already defined

const BottomNavigation: React.FC = () => {
  const { currentTab, setCurrentTab } = useTab();

  const navigationItems: { id: Tab; label: string; Icon: React.ElementType; iconSize: number; tooltip: string; }[] = [
    { id: 'vault', label: 'Vault', Icon: IoMdLock, iconSize: 28, tooltip: 'Your secure vault' },
    { id: 'browsers', label: 'Browsers', Icon: CgBrowser, iconSize: 28, tooltip: 'Manage your browsers' },
    { id: 'generator', label: 'Generator', Icon: GrCycle, iconSize: 26, tooltip: 'Password generator' },
    { id: 'settings', label: 'Settings', Icon: IoSettingsSharp, iconSize: 28, tooltip: 'Customize settings' },
  ];

  return (
    <div className="nav">
      {navigationItems.map(({ id, label, Icon, iconSize, tooltip }) => (
        <div
          key={id}
          role="button"
          className={`nav-button ${currentTab === id ? 'nav-button-active' : ''}`}
          onClick={() => setCurrentTab(id)}
          title={tooltip} // Add tooltip here
        >
          <div className="nav-button-content">
            <Icon className="nav-button-icon" size={iconSize}/>
            <p>{label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BottomNavigation;
