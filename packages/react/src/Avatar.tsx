import { cx } from './cx'

const SIZES = { sm: 36, md: 44, lg: 64 } as const

export interface AvatarProps {
  name: string
  src?: string
  size?: keyof typeof SIZES
  /** Avatar voisin du nom affiché : masqué aux technologies d'assistance. */
  decorative?: boolean
}

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join('')

export const Avatar = ({ name, src, size = 'md', decorative = false }: AvatarProps) => {
  const className = cx('bui-avatar', size !== 'md' && `bui-avatar--${size}`)

  if (src)
    return (
      <span className={className}>
        <img
          className="bui-avatar__image"
          src={src}
          alt={decorative ? '' : name}
          width={SIZES[size]}
          height={SIZES[size]}
          loading="lazy"
        />
      </span>
    )

  return (
    <span
      className={className}
      role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : name}
      aria-hidden={decorative ? 'true' : undefined}
    >
      {initials(name)}
    </span>
  )
}
