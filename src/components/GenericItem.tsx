import React from 'react';
import '~styles/components/generic-item.css'; // Make sure to create this CSS file for styles
import type { ReactNode } from 'react'; // Type-only import for ReactNode

type GenericItemProps = {
  title: string;
  subtitle?: string;
  prefixComponents?: ReactNode[];
  suffixComponents?: ReactNode[];
  componentAction?: () => void;
};

const GenericItem: React.FC<GenericItemProps> = ({ title, subtitle, prefixComponents, suffixComponents, componentAction }) => {
return (
  <div 
    role='button' 
    className="generic-item"
    onClick={componentAction}
  >
    {prefixComponents && (
      <div className={`prefix ${!subtitle ? 'prefix-no-subtitle' : ''}`}>
      {prefixComponents.slice(0, 2)}
      </div>
    )}
    <div className={`text-content`}>
      <p className={`title ${!subtitle ? 'title-no-subtitle' : ''} ${!prefixComponents ? 'title-no-prefix' : ''}`}>{title}</p>
      {subtitle && <p className="subtitle">{subtitle}</p>}
    </div>
    {suffixComponents && (
      <div className={`actions ${!subtitle ? 'actions-no-subtitle' : ''}`}>
      {suffixComponents.slice(0, 4)}
      </div>
    )}
  </div>
);
};

export default GenericItem;