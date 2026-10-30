import { describe, expect, it, vi } from 'vitest'

import { Button } from '../src/Button'

import type { MouseEvent, ReactElement } from 'react'

type Rendered = ReactElement<{ onClick?: (event: MouseEvent<HTMLButtonElement>) => void }>

const render = (props: Parameters<typeof Button>[0]) => Button(props) as Rendered

const click = () => ({ preventDefault: vi.fn() }) as unknown as MouseEvent<HTMLButtonElement>

describe('Button', () => {
  it('ne pose aucun gestionnaire de clic sans onClick ni loading (rendu possible par un composant serveur)', () => {
    expect(render({ children: 'Envoyer' }).props.onClick).toBeUndefined()
  })

  it('transmet onClick tel quel', () => {
    const onClick = vi.fn()
    expect(render({ children: 'Envoyer', onClick }).props.onClick).toBe(onClick)
  })

  it('bloque le clic pendant le chargement, sans appeler onClick', () => {
    const onClick = vi.fn()
    const event = click()
    render({ children: 'Envoyer', loading: true, onClick }).props.onClick?.(event)

    expect(event.preventDefault).toHaveBeenCalledOnce()
    expect(onClick).not.toHaveBeenCalled()
  })
})
