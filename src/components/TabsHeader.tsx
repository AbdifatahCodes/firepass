import "~styles/components/tabs-header.css"
import React from 'react';
import { IoSearch, IoAddSharp, IoChevronBack } from "react-icons/io5";

type TabsHeaderProps = {
  isTitle?: boolean;
  titleName?: string;
  prefix?: string;
  prefixAction?: () => void;
  suffix?: string;
  suffixAction?: () => void;
};

const TabsHeader: React.FC<TabsHeaderProps> = ({ 
    isTitle = false, 
    titleName, 
    prefix = '', 
    prefixAction, 
    suffix = '', 
    suffixAction,
}) => {
  return (
    <div className="header">
      {isTitle ? (
        <>
          {prefix != '' ? (
            <div role="button" className="prefix-button no-icon-in-button" onClick={prefixAction} >
              <p>{ prefix }</p>
            </div>
          ) : <></>}
          <div className={`title-container`}>
            <h1 className="title-text">{ titleName }</h1>
          </div>
          {suffix != '' ? (
            <div role="button" className="suffix-button no-icon-in-button" onClick={suffixAction} >
            <p>{ suffix }</p>
          </div>
          ) : <></>}
        </>
      ) : (
        <>
          {prefix == "back" ? (
            <div role="button" className="prefix-button" onClick={prefixAction} >
              <IoChevronBack size={23} />
              <p>Back</p>
            </div>
          ) : <></>}
          <div className={`search-container ${prefix == "back" ? "search-container-with-prefix" : ""}`}>
            <div className="search-icon-container">
              <IoSearch size={20} className="search-icon" />
            </div>
            <input type="search" name="search" className="header-search" placeholder="Search" />
          </div>
          <div role="button" className="suffix-button" onClick={suffixAction} >
            <IoAddSharp size={35} />
          </div>
        </>
      )}
    </div>
  );
};

export default TabsHeader;
