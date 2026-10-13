import type { Meta, StoryObj } from '@storybook/html-vite'

const meta: Meta = { title: 'Introduction', parameters: { controls: { disable: true } } }
export default meta

type Story = StoryObj

const FAMILIES = [
  ['Fondations', 'Tokens et icônes'],
  ['Actions', 'Bouton, bouton icône, lien'],
  ['Formulaire', 'Champs, liste déroulante, cases, radios, interrupteur, groupe de champs'],
  ['Affichage', 'Carte, badge, avatar, séparateur, tableau, accordéon'],
  ['Navigation', 'Fil d’Ariane, pagination, onglets'],
  ['Retours', 'Alerte, toast, indicateur de chargement, squelette'],
  ['Superpositions', 'Modale, tiroir, info-bulle, menu déroulant'],
]

export const Bienvenue: Story = {
  render: () => `<div class="sb-page">
    <header class="sb-stack" style="align-items: center"><img src="logo-mark.svg" alt="" width="64" height="64"><h1>boilerplates-ui</h1></header>
    <p>Bibliothèque de composants commune aux boilerplates : une source de tokens, un balisage HTML et CSS de référence, le comportement en JavaScript natif, et des composants React et Vue qui produisent exactement ce balisage. Accessibilité WCAG 2.1 AA en mode standard et en mode renforcé.</p>
    <section><h2>Parcourir</h2><ul class="sb-families" style="list-style: none; margin: 0; padding: 0">${FAMILIES.map(
      ([family, content]) =>
        `<li class="bui-card"><div class="bui-card__body"><h3 class="bui-card__title">${family}</h3><p>${content}</p></div></li>`,
    ).join('')}</ul></section>
    <section><h2>Dans chaque composant</h2><ul>
      <li><strong>Toutes les variantes</strong> : variantes, tailles et états côte à côte.</li>
      <li><strong>HTML</strong>, <strong>React</strong> et <strong>Vue</strong> : le même balisage, piloté par le panneau de contrôles.</li>
    </ul></section>
    <section><h2>Barre d’outils</h2><ul>
      <li><strong>Accessibilité</strong> : bascule entre mode standard et mode renforcé.</li>
      <li><strong>Couleurs</strong> : primaire, secondaire et erreur pour tous les composants à la fois. Un bandeau signale un contraste sous AA.</li>
    </ul></section>
  </div>`,
}
