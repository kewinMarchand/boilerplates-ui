import { useTabs } from './useTabs'

import type { ReactNode } from 'react'

export interface TabsProps {
  id: string
  /** Nom accessible de la liste d'onglets. */
  label: string
  tabs: { id: string; label: string; content: ReactNode }[]
  defaultTab?: string
}

export const Tabs = ({ id, label, tabs, defaultTab }: TabsProps) => {
  const { selected, select, onKeyDown, register } = useTabs(
    tabs.map((tab) => tab.id),
    defaultTab,
  )

  return (
    <div className="bui-tabs">
      <div className="bui-tabs__list" role="tablist" aria-label={label}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            ref={register(tab.id)}
            type="button"
            className="bui-tabs__tab"
            role="tab"
            id={`${id}-tab-${tab.id}`}
            aria-controls={`${id}-panel-${tab.id}`}
            aria-selected={tab.id === selected ? 'true' : 'false'}
            tabIndex={tab.id === selected ? 0 : -1}
            onClick={() => select(tab.id)}
            onKeyDown={(event) => onKeyDown(event, tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className="bui-tabs__panel"
          role="tabpanel"
          id={`${id}-panel-${tab.id}`}
          aria-labelledby={`${id}-tab-${tab.id}`}
          tabIndex={0}
          hidden={tab.id !== selected}
        >
          {tab.content}
        </div>
      ))}
    </div>
  )
}
