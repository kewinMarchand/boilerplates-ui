<script lang="ts">
  import type { Snippet } from 'svelte'

  interface Props {
    id: string
    /** Nom accessible de la liste d'onglets. */
    label: string
    tabs: { id: string; label: string; content: Snippet }[]
    defaultTab?: string | undefined
  }

  let { id, label, tabs, defaultTab }: Props = $props()

  // Onglet choisi au départ ; ensuite, c'est l'état du composant qui décide.
  // svelte-ignore state_referenced_locally
  let selected = $state(defaultTab ?? tabs[0]?.id)
  const buttons: Record<string, HTMLButtonElement> = {}

  const select = (tabId: string | undefined) => {
    if (!tabId) return
    selected = tabId
    buttons[tabId]?.focus()
  }

  const onkeydown = (event: KeyboardEvent, tabId: string) => {
    const ids = tabs.map((tab) => tab.id)
    const index = ids.indexOf(tabId)
    const next = {
      ArrowLeft: ids[(index - 1 + ids.length) % ids.length],
      ArrowRight: ids[(index + 1) % ids.length],
      Home: ids[0],
      End: ids[ids.length - 1],
    }[event.key]
    if (!next) return
    event.preventDefault()
    select(next)
  }
</script>

<div class="bui-tabs">
  <div class="bui-tabs__list" role="tablist" aria-label={label}>
    {#each tabs as tab (tab.id)}
      <button
        id="{id}-tab-{tab.id}"
        bind:this={buttons[tab.id]}
        type="button"
        class="bui-tabs__tab"
        role="tab"
        aria-controls="{id}-panel-{tab.id}"
        aria-selected={tab.id === selected ? 'true' : 'false'}
        tabindex={tab.id === selected ? 0 : -1}
        onclick={() => select(tab.id)}
        onkeydown={(event) => onkeydown(event, tab.id)}
      >
        {tab.label}
      </button>
    {/each}
  </div>
  {#each tabs as tab (tab.id)}
    <div
      id="{id}-panel-{tab.id}"
      class="bui-tabs__panel"
      role="tabpanel"
      aria-labelledby="{id}-tab-{tab.id}"
      tabindex="0"
      hidden={tab.id !== selected}
    >
      {@render tab.content()}
    </div>
  {/each}
</div>
