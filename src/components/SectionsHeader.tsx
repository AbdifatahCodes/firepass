import React from 'react';
import '~styles/components/sections-header.css';

type SectionsHeaderProps = {
  title: string;
  count?: int;
};

const SectionsHeader: React.FC<SectionsHeaderProps> = ({ title, count }) => {
return (
  <div className="sections-header">
    <div>
      <p>{title}</p>
    </div>
    <div>
      <p>{count}</p>
    </div>
  </div>
);
};

export default SectionsHeader;