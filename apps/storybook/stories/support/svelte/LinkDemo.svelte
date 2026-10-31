<!-- Démonstration du lien dans une phrase. -->
<script lang="ts">
  import { Link } from '@kewinmarchand/svelte'

  let { label, href, external }: { label: string; href: string; external?: boolean } = $props()
</script>

<p>Pour toute question, <Link {href} {external}>{label}</Link>.</p>
