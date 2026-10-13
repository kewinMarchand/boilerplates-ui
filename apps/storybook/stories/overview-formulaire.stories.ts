import {
  checkbox,
  fieldset,
  radioGroup,
  select,
  switchControl,
  textArea,
  textField,
} from '@kewinmarchand/css/reference/markup.ts'

import { familyOverview, OVERVIEW_PAGE } from './support/overview'

import type { Meta, StoryObj } from '@storybook/html-vite'

const meta: Meta = { title: 'Formulaire/Vue d’ensemble', parameters: OVERVIEW_PAGE }
export default meta

const OPTIONS = [
  { value: 'fr', label: 'France' },
  { value: 'be', label: 'Belgique' },
]

const column = (html: string) => `<div class="sb-column" style="width: 100%">${html}</div>`

export const VueDEnsemble: StoryObj = {
  name: 'Vue d’ensemble',
  render: () =>
    familyOverview(
      'Formulaire',
      'Les champs de saisie, avec libellé, aide sous le libellé, erreur et mention obligatoire.',
      [
        {
          title: 'Champ texte',
          story: 'formulaire-champ-texte--toutes-les-variantes',
          demo: column(
            textField({
              id: 'ov-nom',
              label: 'Nom',
              hint: 'Tel qu’indiqué sur la pièce d’identité',
              required: true,
            }) +
              textField({
                id: 'ov-email',
                label: 'E-mail',
                type: 'email',
                error: 'Saisir une adresse e-mail valide',
              }),
          ),
        },
        {
          title: 'Zone de texte',
          story: 'formulaire-zone-de-texte--toutes-les-variantes',
          demo: column(
            textArea({ id: 'ov-message', label: 'Message', hint: '500 caractères au plus' }),
          ),
        },
        {
          title: 'Liste déroulante',
          story: 'formulaire-liste-déroulante--toutes-les-variantes',
          demo: column(
            select({
              id: 'ov-pays',
              label: 'Pays',
              options: OPTIONS,
              placeholder: 'Choisir un pays',
            }),
          ),
        },
        {
          title: 'Case à cocher',
          story: 'formulaire-case-à-cocher--toutes-les-variantes',
          demo: column(
            checkbox({
              id: 'ov-lettre',
              label: 'Recevoir la lettre',
              checked: true,
              hint: 'Une fois par mois',
            }) +
              checkbox({
                id: 'ov-cgu',
                label: 'J’accepte les conditions',
                required: true,
                error: 'Cocher la case pour continuer',
              }),
          ),
        },
        {
          title: 'Bouton radio',
          story: 'formulaire-bouton-radio--toutes-les-variantes',
          demo: radioGroup({
            id: 'ov-livraison',
            name: 'ov-livraison',
            legend: 'Livraison',
            options: [
              { value: 'domicile', label: 'À domicile' },
              { value: 'relais', label: 'En point relais' },
            ],
            value: 'relais',
          }),
        },
        {
          title: 'Interrupteur',
          story: 'formulaire-interrupteur--toutes-les-variantes',
          demo: column(
            switchControl({ id: 'ov-notif', label: 'Notifications' }) +
              switchControl({ id: 'ov-sombre', label: 'Thème sombre', checked: true }),
          ),
        },
        {
          title: 'Groupe de champs',
          story: 'formulaire-groupe-de-champs--toutes-les-variantes',
          demo: fieldset({
            id: 'ov-contact',
            legend: 'Être contacté',
            hint: 'Une ou plusieurs options',
            body:
              checkbox({ id: 'ov-contact-sms', label: 'Par SMS' }) +
              checkbox({ id: 'ov-contact-mail', label: 'Par e-mail' }),
          }),
        },
      ],
    ),
}
