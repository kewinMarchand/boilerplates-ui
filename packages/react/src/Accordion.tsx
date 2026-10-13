import { Icon } from './Icon'

import type { ReactNode } from 'react'

export interface AccordionProps {
  /** Nom commun des `<details>` : un seul panneau ouvert à la fois. */
  name?: string
  items: { id: string; title: string; content: ReactNode; open?: boolean }[]
}

export const Accordion = ({ name, items }: AccordionProps) => (
  <div className="bui-accordion">
    {items.map((item) => (
      <details key={item.id} className="bui-accordion__item" name={name} open={item.open}>
        <summary className="bui-accordion__summary">
          {item.title}
          <Icon name="chevron-down" className="bui-accordion__icon" />
        </summary>
        <div className="bui-accordion__content">{item.content}</div>
      </details>
    ))}
  </div>
)
