import { createElement as r } from 'react'
import { h } from 'vue'

import {
  alert,
  breadcrumb,
  button,
  checkbox,
  chip,
  link,
  pagination,
  radioGroup,
  stack,
  textField,
  toaster,
} from '@kewinmarchand/css/reference/markup.ts'

import * as R from '@kewinmarchand/react'
import * as V from '@kewinmarchand/vue'

import { mountReact, mountSvelte, mountVue } from './support/frameworks'
import LabelsDemo from './support/svelte/LabelsDemo.svelte'

import type { Meta, StoryObj } from '@storybook/html-vite'

/**
 * Libellés d'interface passés par un site multilingue : sans eux, chaque composant garde son français.
 * La bibliothèque n'embarque aucune traduction, le site fournit les siennes.
 */
const meta: Meta = { title: 'Fondations/Libellés traduits' }
export default meta

type Story = StoryObj

const LABELS = {
  requiredLabel: '(required)',
  loadingLabel: '(loading)',
  newWindowLabel: '(opens in a new window)',
  removeLabel: 'Remove filter:',
  breadcrumb: 'Breadcrumb',
  pagination: {
    label: 'Pagination',
    previousLabel: 'Previous',
    nextLabel: 'Next',
    pageLabel: 'Page',
  },
  alertPrefix: 'Error:',
  toaster: {
    prefixes: { info: 'Information:', success: 'Success:', warning: 'Warning:', error: 'Error:' },
    closeLabel: 'Close notification',
  },
}

const CRUMBS = [{ label: 'Home', href: '#' }, { label: 'Catalogue', href: '#' }, { label: 'Bike' }]
const OPTIONS = [
  { value: 'home', label: 'Home delivery' },
  { value: 'store', label: 'In-store pickup' },
]
const href = (page: number) => `#page-${page}`
const toastsFor = (framework: string) => [
  {
    id: `en-toast-${framework}`,
    message: 'Your order has been saved.',
    variant: 'success' as const,
  },
]

export const Html: Story = {
  name: 'HTML',
  render: () =>
    stack({
      gap: '4',
      content: [
        breadcrumb({ items: CRUMBS, label: LABELS.breadcrumb }),
        textField({
          id: 'en-name-html',
          label: 'Name',
          required: true,
          requiredLabel: LABELS.requiredLabel,
        }),
        checkbox({
          id: 'en-terms-html',
          label: 'I accept the terms',
          required: true,
          requiredLabel: LABELS.requiredLabel,
        }),
        radioGroup({
          id: 'en-delivery-html',
          name: 'en-delivery-html',
          legend: 'Delivery',
          options: OPTIONS,
          required: true,
          requiredLabel: LABELS.requiredLabel,
        }),
        `<div>${button({ label: 'Send', loading: true, loadingLabel: LABELS.loadingLabel })}</div>`,
        `<p>${link({ href: 'https://example.com', label: 'Documentation', external: true, newWindowLabel: LABELS.newWindowLabel })}</p>`,
        `<ul class="bui-chip-list" role="list"><li>${chip({ label: 'Partial shade', removable: true, removeLabel: LABELS.removeLabel })}</li></ul>`,
        alert({
          variant: 'error',
          prefix: LABELS.alertPrefix,
          body: '<p>The message could not be sent.</p>',
        }),
        pagination({ page: 2, count: 5, href, ...LABELS.pagination }),
        toaster(toastsFor('html'), LABELS.toaster),
      ].join(''),
    }),
}

export const React: Story = {
  render: () =>
    mountReact(
      r(
        R.Stack,
        { gap: '4' },
        r(R.Breadcrumb, { items: CRUMBS, label: LABELS.breadcrumb }),
        r(R.TextField, {
          id: 'en-name-react',
          label: 'Name',
          required: true,
          requiredLabel: LABELS.requiredLabel,
        }),
        r(R.Checkbox, {
          id: 'en-terms-react',
          label: 'I accept the terms',
          required: true,
          requiredLabel: LABELS.requiredLabel,
        }),
        r(R.RadioGroup, {
          id: 'en-delivery-react',
          name: 'en-delivery-react',
          legend: 'Delivery',
          options: OPTIONS,
          required: true,
          requiredLabel: LABELS.requiredLabel,
        }),
        r('div', null, r(R.Button, { loading: true, loadingLabel: LABELS.loadingLabel }, 'Send')),
        r(
          'p',
          null,
          r(
            R.Link,
            { href: 'https://example.com', external: true, newWindowLabel: LABELS.newWindowLabel },
            'Documentation',
          ),
        ),
        r(
          'ul',
          { className: 'bui-chip-list', role: 'list' },
          r(
            'li',
            null,
            r(R.Chip, { removable: true, removeLabel: LABELS.removeLabel }, 'Partial shade'),
          ),
        ),
        r(R.Alert, {
          variant: 'error',
          prefix: LABELS.alertPrefix,
          children: r('p', null, 'The message could not be sent.'),
        }),
        r(R.Pagination, { page: 2, count: 5, href, ...LABELS.pagination }),
        r(R.Toaster, { toasts: toastsFor('react'), onClose: () => {}, ...LABELS.toaster }),
      ),
    ),
}

export const Vue: Story = {
  render: () =>
    mountVue({
      render: () =>
        h(V.Stack, { gap: '4' }, () => [
          h(V.Breadcrumb, { items: CRUMBS, label: LABELS.breadcrumb }),
          h(V.TextField, {
            id: 'en-name-vue',
            label: 'Name',
            required: true,
            requiredLabel: LABELS.requiredLabel,
          }),
          h(V.Checkbox, {
            id: 'en-terms-vue',
            label: 'I accept the terms',
            required: true,
            requiredLabel: LABELS.requiredLabel,
          }),
          h(V.RadioGroup, {
            id: 'en-delivery-vue',
            name: 'en-delivery-vue',
            legend: 'Delivery',
            options: OPTIONS,
            required: true,
            requiredLabel: LABELS.requiredLabel,
          }),
          h('div', [
            h(V.Button, { loading: true, loadingLabel: LABELS.loadingLabel }, () => 'Send'),
          ]),
          h('p', [
            h(
              V.Link,
              {
                href: 'https://example.com',
                external: true,
                newWindowLabel: LABELS.newWindowLabel,
              },
              () => 'Documentation',
            ),
          ]),
          h('ul', { class: 'bui-chip-list', role: 'list' }, [
            h('li', [
              h(
                V.Chip,
                { removable: true, removeLabel: LABELS.removeLabel },
                () => 'Partial shade',
              ),
            ]),
          ]),
          h(V.Alert, { variant: 'error', prefix: LABELS.alertPrefix }, () =>
            h('p', 'The message could not be sent.'),
          ),
          h(V.Pagination, { page: 2, count: 5, href, ...LABELS.pagination }),
          h(V.Toaster, { toasts: toastsFor('vue'), ...LABELS.toaster }),
        ]),
    }),
}

export const Svelte: Story = {
  render: () =>
    mountSvelte(LabelsDemo, {
      labels: LABELS,
      crumbs: CRUMBS,
      options: OPTIONS,
      toasts: toastsFor('svelte'),
      href,
    }),
}
