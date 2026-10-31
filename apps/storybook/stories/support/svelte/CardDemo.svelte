<!-- Démonstration de la carte, image et bouton de pied facultatifs. -->
<script lang="ts">
  import { Button, Card } from '@kewinmarchand/svelte'

  interface Props {
    title: string
    text: string
    headingLevel?: 2 | 3 | 4 | 5 | 6 | undefined
    image?: { src: string; alt: string; width: number; height: number } | undefined
    action?: string | undefined
  }

  let { title, text, headingLevel = 3, image, action }: Props = $props()
</script>

{#snippet media()}{#if image}<img {...image} alt={image.alt} loading="lazy" />{/if}{/snippet}
{#snippet footer()}<Button>{action}</Button>{/snippet}

<Card {title} {headingLevel} media={image ? media : undefined} footer={action ? footer : undefined}>
  <p>{text}</p>
</Card>
