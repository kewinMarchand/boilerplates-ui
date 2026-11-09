import { Icon } from './Icon'

import type { ReactNode } from 'react'

export interface FieldProps {
  id: string
  label: string
  hint?: string | undefined
  error?: string | undefined
  required?: boolean | undefined
  /** Mention ajoutée au libellé d'un champ obligatoire. */
  requiredLabel?: string | undefined
  children: ReactNode
}

export const describedBy = (id: string, hint?: string, error?: string) =>
  [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ') || undefined

/** Libellé, aide et erreur communs aux champs à un seul contrôle. */
export const Field = ({
  id,
  label,
  hint,
  error,
  required,
  requiredLabel = '(obligatoire)',
  children,
}: FieldProps) => (
  <div className="bui-field">
    <label className="bui-field__label" htmlFor={id}>
      {label}
      {required && <span className="bui-field__required">{` ${requiredLabel}`}</span>}
    </label>
    {hint && (
      <p className="bui-field__hint" id={`${id}-hint`}>
        {hint}
      </p>
    )}
    {children}
    {error && (
      <p className="bui-field__error" id={`${id}-error`}>
        <Icon name="circle-alert" />
        {error}
      </p>
    )}
  </div>
)
