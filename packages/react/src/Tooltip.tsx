import { useTooltip } from './useTooltip'

import type { ReactNode } from 'react'

export interface TooltipProps {
  id: string
  text: string
  /** Rend le déclencheur focalisable, qui pose `aria-describedby` avec l'identifiant reçu. */
  children: (describedBy: string) => ReactNode
}

export const Tooltip = ({ id, text, children }: TooltipProps) => {
  const { ref, dismissed, reset } = useTooltip()

  return (
    <span
      ref={ref}
      className="bui-tooltip"
      data-dismissed={dismissed ? '' : undefined}
      onMouseLeave={reset}
      onBlur={reset}
    >
      {children(id)}
      <span className="bui-tooltip__bubble" role="tooltip" id={id}>
        {text}
      </span>
    </span>
  )
}
