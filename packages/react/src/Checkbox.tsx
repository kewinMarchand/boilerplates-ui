import { Icon } from './Icon'

import type { InputHTMLAttributes } from 'react'

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'type'> {
  id: string
  label: string
  hint?: string
  error?: string
}

export const Checkbox = ({ id, label, hint, error, required, ...rest }: CheckboxProps) => {
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ')

  return (
    <div className="bui-checkbox">
      <input
        className="bui-checkbox__input"
        id={id}
        type="checkbox"
        required={required}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={describedBy || undefined}
        {...rest}
      />
      <label className="bui-checkbox__label" htmlFor={id}>
        {label}
        {required && <span className="bui-checkbox__required"> (obligatoire)</span>}
      </label>
      {hint && (
        <p className="bui-checkbox__hint" id={`${id}-hint`}>
          {hint}
        </p>
      )}
      {error && (
        <p className="bui-checkbox__error" id={`${id}-error`}>
          <Icon name="circle-alert" />
          {error}
        </p>
      )}
    </div>
  )
}
