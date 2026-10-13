import { cx } from './cx'
import { Icon } from './Icon'

export interface SpinnerProps {
  label?: string
  size?: 'md' | 'lg'
}

export const Spinner = ({ label = 'Chargement en cours', size = 'md' }: SpinnerProps) => (
  <span className={cx('bui-spinner', size !== 'md' && `bui-spinner--${size}`)} role="status">
    <Icon name="loader-circle" className="bui-spinner__icon" />
    <span className="bui-visually-hidden">{label}</span>
  </span>
)
