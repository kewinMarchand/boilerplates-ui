import { Fieldset, type FieldsetProps } from './Fieldset'
import { Radio } from './Radio'

import type { ChangeEvent } from 'react'

export interface RadioGroupProps extends Omit<FieldsetProps, 'children'> {
  name: string
  options: { value: string; label: string }[]
  defaultValue?: string | undefined
  disabled?: boolean
  onChange?: (value: string) => void
}

export const RadioGroup = ({
  name,
  options,
  defaultValue,
  disabled,
  onChange,
  ...group
}: RadioGroupProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => onChange?.(event.target.value)

  return (
    <Fieldset {...group}>
      {options.map((option) => (
        <Radio
          key={option.value}
          id={`${group.id}-${option.value}`}
          name={name}
          value={option.value}
          label={option.label}
          defaultChecked={option.value === defaultValue}
          required={group.required}
          disabled={disabled}
          invalid={Boolean(group.error)}
          onChange={handleChange}
        />
      ))}
    </Fieldset>
  )
}
