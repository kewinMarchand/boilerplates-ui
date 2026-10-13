/**
 * Balisage de référence des composants : le contrat que React et Vue reproduisent (test de parité)
 * et que Twig, Svelte ou le HTML statique recopient. Sert aussi les histoires HTML du Storybook.
 * Les contenus (`body`, `media`, `footer`) sont du HTML de confiance écrit dans le dépôt.
 */
export const ICON_SPRITE = '/icons.svg'

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
  `<svg${attributes({ class: classes('bui-icon', className), 'aria-hidden': 'true' })}><use href="${ICON_SPRITE}#${name}"></use></svg>`

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
