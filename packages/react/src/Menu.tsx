import { Icon } from './Icon'
import { useMenu } from './useMenu'

export interface MenuProps {
  id: string
  label: string
  items: { id: string; label: string }[]
  onSelect: (id: string) => void
}

export const Menu = ({ id, label, items, onSelect }: MenuProps) => {
  const { open, root, trigger, registerItem, toggle, close, onTriggerKeyDown, onItemKeyDown } =
    useMenu(items.length)

  return (
    <div ref={root} className="bui-menu">
      <button
        ref={trigger}
        type="button"
        className="bui-button bui-button--outline bui-menu__trigger"
        id={`${id}-trigger`}
        aria-haspopup="menu"
        aria-expanded={open ? 'true' : 'false'}
        aria-controls={`${id}-list`}
        onClick={toggle}
        onKeyDown={onTriggerKeyDown}
      >
        {label}
        <Icon name="chevron-down" />
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
              role="menuitem"
              tabIndex={-1}
              onClick={() => {
                onSelect(item.id)
                close()
              }}
              onKeyDown={(event) => onItemKeyDown(event, index)}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
