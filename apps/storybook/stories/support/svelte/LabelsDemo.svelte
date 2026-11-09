<!-- Démonstration des libellés d'interface fournis par le site, ici en anglais. -->
<script lang="ts">
  import {
    Alert,
    Breadcrumb,
    Button,
    Checkbox,
    Chip,
    Link,
    Pagination,
    RadioGroup,
    Stack,
    TextField,
    Toaster,
  } from '@kewinmarchand/svelte'

  import type { ComponentProps } from 'svelte'

  interface Props {
    labels: {
      requiredLabel: string
      loadingLabel: string
      newWindowLabel: string
      removeLabel: string
      breadcrumb: string
      pagination: Omit<ComponentProps<typeof Pagination>, 'page' | 'count' | 'href'>
      alertPrefix: string
      toaster: Omit<ComponentProps<typeof Toaster>, 'toasts'>
    }
    crumbs: ComponentProps<typeof Breadcrumb>['items']
    options: ComponentProps<typeof RadioGroup>['options']
    toasts: ComponentProps<typeof Toaster>['toasts']
    href: (page: number) => string
  }

  let { labels, crumbs, options, toasts, href }: Props = $props()
</script>

<Stack gap="4">
  <Breadcrumb items={crumbs} label={labels.breadcrumb} />
  <TextField id="en-name-svelte" label="Name" required requiredLabel={labels.requiredLabel} />
  <Checkbox
    id="en-terms-svelte"
    label="I accept the terms"
    required
    requiredLabel={labels.requiredLabel}
  />
  <RadioGroup
    id="en-delivery-svelte"
    name="en-delivery-svelte"
    legend="Delivery"
    {options}
    required
    requiredLabel={labels.requiredLabel}
  />
  <div>
    <Button loading loadingLabel={labels.loadingLabel}>Send</Button>
  </div>
  <p>
    <Link href="https://example.com" external newWindowLabel={labels.newWindowLabel}
      >Documentation</Link
    >
  </p>
  <ul class="bui-chip-list" role="list">
    <li><Chip removable removeLabel={labels.removeLabel}>Partial shade</Chip></li>
  </ul>
  <Alert variant="error" prefix={labels.alertPrefix}><p>The message could not be sent.</p></Alert>
  <Pagination page={2} count={5} {href} {...labels.pagination} />
  <Toaster {toasts} {...labels.toaster} />
</Stack>
