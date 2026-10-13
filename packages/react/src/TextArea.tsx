import { describedBy, Field } from './Field'

import type { TextareaHTMLAttributes } from 'react'

export interface TextAreaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'id'> {
  id: string
  label: string
  hint?: string
  error?: string
}

export const TextArea = ({
  id,
  label,
  hint,
  error,
  required,
  rows = 4,
  ...rest
}: TextAreaProps) => (
  <Field id={id} label={label} hint={hint} error={error} required={required}>
    <textarea
      className="bui-field__input bui-field__input--multiline"
      rows={rows}
      id={id}
      required={required}
      aria-invalid={error ? 'true' : undefined}
      aria-describedby={describedBy(id, hint, error)}
      {...rest}
    />
  </Field>
)
