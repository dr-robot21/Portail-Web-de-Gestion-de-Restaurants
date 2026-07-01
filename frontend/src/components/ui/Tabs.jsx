import React from 'react';
import './Tabs.css';

const Tabs = ({ tabs, activeTab, onChange }) => {
  return (
    <div className="ui-tabs">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`ui-tab ${activeTab === tab.id ? 'ui-tab--active' : ''}`}
          onClick={() => onChange(tab.id)}
        >
          {tab.icon && <span className="ui-tab-icon">{tab.icon}</span>}
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
