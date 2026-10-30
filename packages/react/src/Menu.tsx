import { cx } from './cx'
import { Icon } from './Icon'
import { useMenu } from './useMenu'

import type { IconName } from './iconNames'

export interface MenuProps {
  id: string
  label: string
  /** `testId` : attribut de test de l'élément (`data-testid`). */
  items: { id: string; label: string; testId?: string }[]
  onSelect: (id: string) => void
  /** Identifiant de l'option cochée : les éléments deviennent des choix exclusifs (`menuitemradio`, `aria-checked`). */
  checked?: string
  /** Déclencheur en bouton icône : le libellé devient son nom accessible. */
  triggerIcon?: IconName
  /** Variante du déclencheur, `nav` sur fond primaire (header). */
  triggerVariant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'nav'
  /** Attribut de test du déclencheur (`data-testid`). */
  testId?: string
}

export const Menu = ({
  id,
  label,
  items,
  onSelect,
  checked,
  triggerIcon,
  triggerVariant = 'outline',
  testId,
}: MenuProps) => {
  const { open, root, trigger, registerItem, toggle, close, onTriggerKeyDown, onItemKeyDown } =
    useMenu(items.length)

  return (
    <div ref={root} className="bui-menu">
      <button
        ref={trigger}
        type="button"
        className={cx(
          'bui-button',
          triggerVariant !== 'primary' && `bui-button--${triggerVariant}`,
          triggerIcon && 'bui-button--icon',
          'bui-menu__trigger',
        )}
        id={`${id}-trigger`}
        aria-label={triggerIcon ? label : undefined}
        aria-haspopup="menu"
        aria-expanded={open ? 'true' : 'false'}
        aria-controls={`${id}-list`}
        data-testid={testId}
        onClick={toggle}
        onKeyDown={onTriggerKeyDown}
      >
        {triggerIcon ? (
          <Icon name={triggerIcon} />
        ) : (
          <>
            {label}
            <Icon name="chevron-down" />
          </>
        )}
      </button>
      <ul
        className="bui-menu__list"
        role="menu"
        id={`${id}-list`}
        aria-labelledby={`${id}-trigger`}
        hidden={!open}
      >
        {items.map((item, index) => (
          <li key={item.id} role="none">
            <button
              ref={registerItem(index)}
              type="button"
              className="bui-menu__item"
              role={checked === undefined ? 'menuitem' : 'menuitemradio'}
              aria-checked={checked === undefined ? undefined : item.id === checked}
              tabIndex={-1}
              data-testid={item.testId}
              onClick={() => {
                onSelect(item.id)
                close()
              }}
              onKeyDown={(event) => onItemKeyDown(event, index)}
            >
              {checked !== undefined && <Icon name="check" className="bui-menu__check" />}
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
