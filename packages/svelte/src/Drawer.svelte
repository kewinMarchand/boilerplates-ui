<script lang="ts">
  import Modal from './Modal.svelte'

  import type { ComponentProps } from 'svelte'

  interface Props extends Omit<ComponentProps<typeof Modal>, 'side'> {
    side?: 'start' | 'end' | undefined
  }

  let { side = 'end', ...props }: Props = $props()
</script>

<Modal {...props} {side} />
