import { useRef, useState, useEffect } from 'react';
import './Tabs.css';

const Tabs = ({ tabs, activeTab, onChange }) => {
  const containerRef = useRef(null);
  const [overflowing, setOverflowing] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const check = () => setOverflowing(container.scrollWidth > container.clientWidth + 1);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [tabs]);

  return (
    <div ref={containerRef} className={`ui-tabs${overflowing ? ' ui-tabs--overflow' : ''}`}>
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
