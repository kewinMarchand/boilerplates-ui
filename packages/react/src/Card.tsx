import type { ReactNode } from 'react'

export interface CardProps {
  title: string
  headingLevel?: 2 | 3 | 4 | 5 | 6
  media?: ReactNode
  footer?: ReactNode
  children: ReactNode
}

export const Card = ({ title, headingLevel = 3, media, footer, children }: CardProps) => {
  const Heading = `h${headingLevel}` as const

  return (
    <div className="bui-card">
      {media && <div className="bui-card__media">{media}</div>}
      <div className="bui-card__body">
        <Heading className="bui-card__title">{title}</Heading>
        {children}
      </div>
      {footer && <div className="bui-card__footer">{footer}</div>}
    </div>
  )
}
