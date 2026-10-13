import { cx } from './cx'

export interface SkeletonProps {
  variant?: 'block' | 'text' | 'circle'
  width?: string
  height?: string
}

export const Skeleton = ({ variant = 'block', width, height }: SkeletonProps) => (
  <span
    className={cx('bui-skeleton', variant !== 'block' && `bui-skeleton--${variant}`)}
    aria-hidden="true"
    style={width || height ? { width, height } : undefined}
  />
)
