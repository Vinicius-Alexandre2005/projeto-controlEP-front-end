import "./Tabs.css";

/** tabs: [{ id, label }] */
export default function Tabs({ tabs, activeId, onChange }) {
  return (
    <div className="tabs" role="tablist">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          role="tab"
          aria-selected={tab.id === activeId}
          className={`tabs__item ${tab.id === activeId ? "tabs__item--active" : ""}`}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
