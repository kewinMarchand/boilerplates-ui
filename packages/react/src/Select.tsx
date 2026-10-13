import { describedBy, Field } from './Field'
import { Icon } from './Icon'

import type { SelectHTMLAttributes } from 'react'

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'id'> {
  id: string
  label: string
  options: { value: string; label: string }[]
  placeholder?: string
  hint?: string
  error?: string
}

export const Select = ({
  id,
  label,
  options,
  placeholder,
  hint,
  error,
  required,
  ...rest
}: SelectProps) => (
  <Field id={id} label={label} hint={hint} error={error} required={required}>
    <div className="bui-select">
      <select
        className="bui-field__input bui-select__control"
        id={id}
        required={required}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={describedBy(id, hint, error)}
        {...rest}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <Icon name="chevron-down" className="bui-select__icon" />
    </div>
  </Field>
)
