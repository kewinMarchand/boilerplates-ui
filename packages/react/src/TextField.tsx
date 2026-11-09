import { Icon } from './Icon'

import type { InputHTMLAttributes } from 'react'

export interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> {
  id: string
  label: string
  hint?: string
  error?: string
  /** Mention ajoutée au libellé d'un champ obligatoire. */
  requiredLabel?: string
  type?: 'text' | 'email' | 'tel' | 'url' | 'password' | 'search'
}

export const TextField = ({
  id,
  label,
  hint,
  error,
  type = 'text',
  required,
  requiredLabel = '(obligatoire)',
  ...rest
}: TextFieldProps) => {
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ')

  return (
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
      <input
        className="bui-field__input"
        id={id}
        type={type}
        required={required}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={describedBy || undefined}
        {...rest}
      />
      {error && (
        <p className="bui-field__error" id={`${id}-error`}>
          <Icon name="circle-alert" />
          {error}
        </p>
      )}
    </div>
  )
}
