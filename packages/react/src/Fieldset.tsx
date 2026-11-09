import { describedBy } from './Field'
import { Icon } from './Icon'

import type { ReactNode } from 'react'

export interface FieldsetProps {
  id: string
  legend: string
  hint?: string | undefined
  error?: string | undefined
  required?: boolean | undefined
  /** Mention ajoutée à la légende d'un groupe obligatoire. */
  requiredLabel?: string | undefined
  children: ReactNode
}

export const Fieldset = ({
  id,
  legend,
  hint,
  error,
  required,
  requiredLabel = '(obligatoire)',
  children,
}: FieldsetProps) => (
  <fieldset className="bui-fieldset" id={id} aria-describedby={describedBy(id, hint, error)}>
    <legend className="bui-fieldset__legend">
      {legend}
      {required && <span className="bui-fieldset__required">{` ${requiredLabel}`}</span>}
    </legend>
    {hint && (
      <p className="bui-fieldset__hint" id={`${id}-hint`}>
        {hint}
      </p>
    )}
    <div className="bui-fieldset__content">{children}</div>
    {error && (
      <p className="bui-fieldset__error" id={`${id}-error`}>
        <Icon name="circle-alert" />
        {error}
      </p>
    )}
  </fieldset>
)
