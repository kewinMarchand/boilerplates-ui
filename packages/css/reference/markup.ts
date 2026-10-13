/**
 * Balisage de référence des composants : le contrat que React et Vue reproduisent (test de parité)
 * et que Twig, Svelte ou le HTML statique recopient. Sert aussi les histoires HTML du Storybook.
 * Les contenus (`body`, `media`, `footer`) sont du HTML de confiance écrit dans le dépôt.
 */
let iconSprite = '/icons.svg'

/** Chemin du sprite, à changer quand le site est servi sous un sous-chemin. */
export const setIconSprite = (url: string) => {
  iconSprite = url
}

type AttributeValue = string | boolean | undefined

const escape = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const attributes = (attrs: Record<string, AttributeValue>) =>
  Object.entries(attrs)
    .filter(([, value]) => value !== undefined && value !== false)
    .map(([name, value]) => (value === true ? ` ${name}` : ` ${name}="${escape(value as string)}"`))
    .join('')

const classes = (...names: (string | false | undefined)[]) => names.filter(Boolean).join(' ')

const describedBy = (...ids: (string | false | undefined)[]) =>
  ids.filter(Boolean).join(' ') || undefined

export const icon = (name: string, className?: string) =>
  `<svg${attributes({ class: classes('bui-icon', className), 'aria-hidden': 'true' })}><use href="${iconSprite}#${name}"></use></svg>`

export interface ButtonOptions {
  label: string
  variant?: 'primary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  loading?: boolean
  icon?: string
}

export const button = ({
  label,
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled,
  loading,
  icon: iconName,
}: ButtonOptions) =>
  `<button${attributes({
    type,
    class: classes(
      'bui-button',
      variant !== 'primary' && `bui-button--${variant}`,
      size !== 'md' && `bui-button--${size}`,
    ),
    disabled,
    'aria-disabled': loading ? 'true' : undefined,
  })}>${loading ? icon('loader-circle', 'bui-button__spinner') : iconName ? icon(iconName) : ''}${escape(label)}${
    loading ? '<span class="bui-visually-hidden">(chargement en cours)</span>' : ''
  }</button>`

interface FieldOptions {
  id: string
  label: string
  hint?: string
  error?: string
  required?: boolean
  disabled?: boolean
}

const requiredMark = (block: string, required?: boolean) =>
  required ? `<span class="${block}__required"> (obligatoire)</span>` : ''

const errorMessage = (block: string, id: string, error?: string) =>
  error
    ? `<p class="${block}__error" id="${id}-error">${icon('circle-alert')}${escape(error)}</p>`
    : ''

const hintMessage = (block: string, id: string, hint?: string) =>
  hint ? `<p class="${block}__hint" id="${id}-hint">${escape(hint)}</p>` : ''

export interface TextFieldOptions extends FieldOptions {
  type?: 'text' | 'email' | 'tel' | 'url' | 'password' | 'search'
  autocomplete?: string
}

export const textField = ({
  id,
  label,
  hint,
  error,
  required,
  disabled,
  type = 'text',
  autocomplete,
}: TextFieldOptions) =>
  `<div class="bui-field"><label class="bui-field__label" for="${id}">${escape(label)}${requiredMark('bui-field', required)}</label>${hintMessage('bui-field', id, hint)}<input${attributes(
    {
      class: 'bui-field__input',
      id,
      type,
      autocomplete,
      required,
      disabled,
      'aria-invalid': error ? 'true' : undefined,
      'aria-describedby': describedBy(hint && `${id}-hint`, error && `${id}-error`),
    },
  )}>${errorMessage('bui-field', id, error)}</div>`

export interface CheckboxOptions extends FieldOptions {
  checked?: boolean
}

export const checkbox = ({
  id,
  label,
  hint,
  error,
  required,
  disabled,
  checked,
}: CheckboxOptions) =>
  `<div class="bui-checkbox"><input${attributes({
    class: 'bui-checkbox__input',
    id,
    type: 'checkbox',
    checked,
    required,
    disabled,
    'aria-invalid': error ? 'true' : undefined,
    'aria-describedby': describedBy(hint && `${id}-hint`, error && `${id}-error`),
  })}><label class="bui-checkbox__label" for="${id}">${escape(label)}${requiredMark('bui-checkbox', required)}</label>${hintMessage('bui-checkbox', id, hint)}${errorMessage('bui-checkbox', id, error)}</div>`

export const ALERT_VARIANTS = {
  info: { icon: 'info', prefix: 'Information :' },
  success: { icon: 'circle-check', prefix: 'Succès :' },
  warning: { icon: 'triangle-alert', prefix: 'Attention :' },
  error: { icon: 'circle-alert', prefix: 'Erreur :' },
} as const

export interface AlertOptions {
  variant?: keyof typeof ALERT_VARIANTS
  title?: string
  body: string
  role?: 'alert' | 'status'
}

export const alert = ({ variant = 'info', title, body, role }: AlertOptions) =>
  `<div${attributes({ class: `bui-alert bui-alert--${variant}`, role })}>${icon(ALERT_VARIANTS[variant].icon, 'bui-alert__icon')}<div class="bui-alert__content"><span class="bui-visually-hidden">${ALERT_VARIANTS[variant].prefix}</span>${
    title ? `<p class="bui-alert__title">${escape(title)}</p>` : ''
  }<div class="bui-alert__body">${body}</div></div></div>`

export interface CardOptions {
  title: string
  headingLevel?: 2 | 3 | 4 | 5 | 6
  body: string
  media?: string
  footer?: string
}

export const card = ({ title, headingLevel = 3, body, media, footer }: CardOptions) =>
  `<div class="bui-card">${media ? `<div class="bui-card__media">${media}</div>` : ''}<div class="bui-card__body"><h${headingLevel} class="bui-card__title">${escape(title)}</h${headingLevel}>${body}</div>${
    footer ? `<div class="bui-card__footer">${footer}</div>` : ''
  }</div>`

export interface ModalOptions {
  id: string
  title: string
  body: string
  footer?: string
  closeLabel?: string
}

export const modal = ({ id, title, body, footer, closeLabel = 'Fermer' }: ModalOptions) =>
  `<dialog class="bui-modal" id="${id}" aria-labelledby="${id}-title"><div class="bui-modal__header"><h2 class="bui-modal__title" id="${id}-title">${escape(title)}</h2><button${attributes(
    {
      type: 'button',
      class: 'bui-modal__close',
      'aria-label': closeLabel,
      'data-bui-modal-close': true,
    },
  )}>${icon('x')}</button></div><div class="bui-modal__body">${body}</div>${
    footer ? `<div class="bui-modal__footer">${footer}</div>` : ''
  }</dialog>`

export interface IconButtonOptions {
  label: string
  icon: string
  variant?: 'primary' | 'outline' | 'ghost'
  size?: 'sm' | 'md'
  disabled?: boolean
}

export const iconButton = ({
  label,
  icon: iconName,
  variant = 'primary',
  size = 'md',
  disabled,
}: IconButtonOptions) =>
  `<button${attributes({
    type: 'button',
    class: classes(
      'bui-button',
      variant !== 'primary' && `bui-button--${variant}`,
      size !== 'md' && `bui-button--${size}`,
      'bui-button--icon',
    ),
    'aria-label': label,
    disabled,
  })}>${icon(iconName)}</button>`

export interface LinkOptions {
  href: string
  label: string
  external?: boolean
}

export const link = ({ href, label, external }: LinkOptions) =>
  `<a${attributes({
    class: 'bui-link',
    href,
    target: external ? '_blank' : undefined,
    rel: external ? 'noopener noreferrer' : undefined,
  })}>${escape(label)}${
    external
      ? `${icon('external-link', 'bui-link__icon')}<span class="bui-visually-hidden"> (nouvelle fenêtre)</span>`
      : ''
  }</a>`

const fieldControlAttributes = ({ id, hint, error, required, disabled }: FieldOptions) => ({
  id,
  required,
  disabled,
  'aria-invalid': error ? 'true' : undefined,
  'aria-describedby': describedBy(hint && `${id}-hint`, error && `${id}-error`),
})

const field = (options: FieldOptions, control: string) =>
  `<div class="bui-field"><label class="bui-field__label" for="${options.id}">${escape(options.label)}${requiredMark('bui-field', options.required)}</label>${hintMessage('bui-field', options.id, options.hint)}${control}${errorMessage('bui-field', options.id, options.error)}</div>`

export interface TextAreaOptions extends FieldOptions {
  rows?: number
}

export const textArea = ({ rows = 4, ...options }: TextAreaOptions) =>
  field(
    options,
    `<textarea${attributes({ class: 'bui-field__input bui-field__input--multiline', rows: String(rows), ...fieldControlAttributes(options) })}></textarea>`,
  )

export interface SelectOptions extends FieldOptions {
  options: { value: string; label: string }[]
  placeholder?: string
}

export const select = ({ options, placeholder, ...fieldOptions }: SelectOptions) =>
  field(
    fieldOptions,
    `<div class="bui-select"><select${attributes({ class: 'bui-field__input bui-select__control', ...fieldControlAttributes(fieldOptions) })}>${
      placeholder ? `<option value="">${escape(placeholder)}</option>` : ''
    }${options.map((option) => `<option value="${escape(option.value)}">${escape(option.label)}</option>`).join('')}</select>${icon('chevron-down', 'bui-select__icon')}</div>`,
  )

export interface RadioOptions {
  id: string
  name: string
  value: string
  label: string
  checked?: boolean
  required?: boolean | undefined
  disabled?: boolean | undefined
  invalid?: boolean
}

export const radio = ({
  id,
  name,
  value,
  label,
  checked,
  required,
  disabled,
  invalid,
}: RadioOptions) =>
  `<div class="bui-radio"><input${attributes({
    class: 'bui-radio__input',
    id,
    type: 'radio',
    name,
    value,
    checked,
    required,
    disabled,
    'aria-invalid': invalid ? 'true' : undefined,
  })}><label class="bui-radio__label" for="${id}">${escape(label)}</label></div>`

export interface FieldsetOptions {
  id: string
  legend: string
  hint?: string
  error?: string
  required?: boolean
  body: string
}

export const fieldset = ({ id, legend, hint, error, required, body }: FieldsetOptions) =>
  `<fieldset${attributes({
    class: 'bui-fieldset',
    id,
    'aria-describedby': describedBy(hint && `${id}-hint`, error && `${id}-error`),
  })}><legend class="bui-fieldset__legend">${escape(legend)}${requiredMark('bui-fieldset', required)}</legend>${hintMessage('bui-fieldset', id, hint)}<div class="bui-fieldset__content">${body}</div>${errorMessage('bui-fieldset', id, error)}</fieldset>`

export interface RadioGroupOptions extends Omit<FieldsetOptions, 'body'> {
  name: string
  options: { value: string; label: string }[]
  value?: string
  disabled?: boolean
}

export const radioGroup = ({ name, options, value, disabled, ...group }: RadioGroupOptions) =>
  fieldset({
    ...group,
    body: options
      .map((option) =>
        radio({
          id: `${group.id}-${option.value}`,
          name,
          value: option.value,
          label: option.label,
          checked: option.value === value,
          required: group.required,
          disabled,
          invalid: Boolean(group.error),
        }),
      )
      .join(''),
  })

export interface SwitchOptions {
  id: string
  label: string
  checked?: boolean
  disabled?: boolean
}

export const switchControl = ({ id, label, checked, disabled }: SwitchOptions) =>
  `<div class="bui-switch"><input${attributes({
    class: 'bui-switch__input',
    id,
    type: 'checkbox',
    role: 'switch',
    checked,
    disabled,
  })}><label class="bui-switch__label" for="${id}">${escape(label)}</label></div>`

export interface BadgeOptions {
  label: string
  variant?: 'neutral' | 'info' | 'success' | 'warning' | 'error'
}

export const badge = ({ label, variant = 'neutral' }: BadgeOptions) =>
  `<span class="${classes('bui-badge', variant !== 'neutral' && `bui-badge--${variant}`)}">${escape(label)}</span>`

export const separator = ({
  orientation = 'horizontal',
}: { orientation?: 'horizontal' | 'vertical' } = {}) =>
  orientation === 'vertical'
    ? '<hr class="bui-separator bui-separator--vertical" aria-orientation="vertical">'
    : '<hr class="bui-separator">'

export interface SpinnerOptions {
  label?: string
  size?: 'md' | 'lg'
}

export const spinner = ({ label = 'Chargement en cours', size = 'md' }: SpinnerOptions = {}) =>
  `<span class="${classes('bui-spinner', size !== 'md' && `bui-spinner--${size}`)}" role="status">${icon('loader-circle', 'bui-spinner__icon')}<span class="bui-visually-hidden">${escape(label)}</span></span>`

export interface SkeletonOptions {
  variant?: 'block' | 'text' | 'circle'
  width?: string
  height?: string
}

export const skeleton = ({ variant = 'block', width, height }: SkeletonOptions = {}) => {
  const style = [width && `width: ${width}`, height && `height: ${height}`]
    .filter(Boolean)
    .join('; ')
  return `<span${attributes({
    class: classes('bui-skeleton', variant !== 'block' && `bui-skeleton--${variant}`),
    'aria-hidden': 'true',
    style: style || undefined,
  })}></span>`
}

export const AVATAR_SIZES = { sm: 36, md: 44, lg: 64 } as const

export interface AvatarOptions {
  name: string
  src?: string
  size?: keyof typeof AVATAR_SIZES
  decorative?: boolean
}

export const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join('')

export const avatar = ({ name, src, size = 'md', decorative }: AvatarOptions) => {
  const className = classes('bui-avatar', size !== 'md' && `bui-avatar--${size}`)
  if (src)
    return `<span class="${className}"><img${attributes({
      class: 'bui-avatar__image',
      src,
      alt: decorative ? '' : name,
      width: String(AVATAR_SIZES[size]),
      height: String(AVATAR_SIZES[size]),
      loading: 'lazy',
    })}></span>`
  return `<span${attributes({
    class: className,
    role: decorative ? undefined : 'img',
    'aria-label': decorative ? undefined : name,
    'aria-hidden': decorative ? 'true' : undefined,
  })}>${escape(initials(name))}</span>`
}
