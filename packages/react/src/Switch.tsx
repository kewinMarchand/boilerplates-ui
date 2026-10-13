import type { InputHTMLAttributes } from 'react'

export interface SwitchProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'id' | 'type' | 'role'
> {
  id: string
  label: string
}

export const Switch = ({ id, label, ...rest }: SwitchProps) => (
  <div className="bui-switch">
    <input className="bui-switch__input" id={id} type="checkbox" role="switch" {...rest} />
    <label className="bui-switch__label" htmlFor={id}>
      {label}
    </label>
  </div>
)
