import type { InputHTMLAttributes } from 'react'

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'type'> {
  id: string
  name: string
  value: string
  label: string
  invalid?: boolean
}

export const Radio = ({ id, label, invalid = false, ...rest }: RadioProps) => (
  <div className="bui-radio">
    <input
      className="bui-radio__input"
      id={id}
      type="radio"
      aria-invalid={invalid ? 'true' : undefined}
      {...rest}
    />
    <label className="bui-radio__label" htmlFor={id}>
      {label}
    </label>
  </div>
)
