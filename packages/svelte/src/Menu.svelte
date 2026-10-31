<script lang="ts">
  import { tick } from 'svelte'

  import Icon from './Icon.svelte'

  import type { IconName } from './iconNames'

  interface Props {
    id: string
    label: string
    /** `testId` : attribut de test de l'élément (`data-testid`). */
    items: { id: string; label: string; testId?: string | undefined }[]
    /** Identifiant de l'option cochée : les éléments deviennent des choix exclusifs (`menuitemradio`, `aria-checked`). */
    checked?: string | undefined
    /** Déclencheur en bouton icône : le libellé devient son nom accessible. */
    triggerIcon?: IconName | undefined
    /** Variante du déclencheur, `nav` sur fond primaire (header). */
    triggerVariant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'nav'
    /** Attribut de test du déclencheur (`data-testid`). */
    testId?: string | undefined
    onselect?: (id: string) => void
    class?: string | undefined
  }

  let {
    id,
    label,
    items,
    checked,
    triggerIcon,
    triggerVariant = 'outline',
    testId,
    onselect,
    class: className,
  }: Props = $props()

  let open = $state(false)
  let root = $state<HTMLDivElement>()
  let trigger = $state<HTMLButtonElement>()
  const buttons: HTMLButtonElement[] = []

  const openAt = async (index: number) => {
    open = true
    await tick()
    buttons[index]?.focus()
  }

  const close = (restoreFocus = true) => {
    open = false
    if (restoreFocus) trigger?.focus()
  }

  // Un clic hors du menu le ferme, sans reprendre le focus.
  $effect(() => {
    if (!open) return
    const handleOutsideClick = (event: MouseEvent) => {
      if (!(event.target instanceof Node) || !root?.contains(event.target)) close(false)
    }
    document.addEventListener('click', handleOutsideClick)
    return () => document.removeEventListener('click', handleOutsideClick)
  })

  const onTriggerKeyDown = (event: KeyboardEvent) => {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return
    event.preventDefault()
    void openAt(event.key === 'ArrowDown' ? 0 : items.length - 1)
  }

  const onItemKeyDown = (event: KeyboardEvent, index: number) => {
    const count = items.length
    const next = {
      ArrowDown: (index + 1) % count,
      ArrowUp: (index - 1 + count) % count,
      Home: 0,
      End: count - 1,
    }[event.key]
    if (next !== undefined) {
      event.preventDefault()
      buttons[next]?.focus()
    } else if (event.key === 'Escape') close()
    else if (event.key === 'Tab') close(false)
  }

  const choose = (itemId: string) => {
    onselect?.(itemId)
    close()
  }

  const toggle = () => (open ? close() : void openAt(0))
</script>

<div bind:this={root} class={['bui-menu', className]}>
  <button
    id="{id}-trigger"
    bind:this={trigger}
    type="button"
    class={[
      'bui-button',
      triggerVariant !== 'primary' && `bui-button--${triggerVariant}`,
      triggerIcon && 'bui-button--icon',
      'bui-menu__trigger',
    ]}
    aria-label={triggerIcon ? label : undefined}
    aria-haspopup="menu"
    aria-expanded={open ? 'true' : 'false'}
    aria-controls="{id}-list"
    data-testid={testId}
    onclick={toggle}
    onkeydown={onTriggerKeyDown}
  >
    {#if triggerIcon}<Icon name={triggerIcon} />{:else}{label}<Icon name="chevron-down" />{/if}
  </button>
  <ul
    id="{id}-list"
    class="bui-menu__list"
    role="menu"
    aria-labelledby="{id}-trigger"
    hidden={!open}
  >
    {#each items as item, index (item.id)}
      <li role="none">
        <button
          bind:this={buttons[index]}
          type="button"
          class="bui-menu__item"
          role={checked === undefined ? 'menuitem' : 'menuitemradio'}
          aria-checked={checked === undefined ? undefined : item.id === checked ? 'true' : 'false'}
          tabindex="-1"
          data-testid={item.testId}
          onclick={() => choose(item.id)}
          onkeydown={(event) => onItemKeyDown(event, index)}
        >
          {#if checked !== undefined}<Icon name="check" class="bui-menu__check" />{/if}
          {item.label}
        </button>
      </li>
    {/each}
  </ul>
</div>
