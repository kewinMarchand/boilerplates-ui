export interface ProgressProps {
  /** Valeur courante (entre 0 et max). */
  value: number
  /** Valeur maximale. */
  max?: number
  /** Libellé accessible de la barre de progression. */
  label?: string
  /** Taille de la barre. */
  size?: 'sm' | 'md' | 'lg'
  /** Affiche la valeur en pourcentage à droite. */
  showValue?: boolean
  className?: string
}

export const Progress = ({
  value,
  max = 100,
  label = 'Progression',
  size = 'md',
  showValue = false,
  className,
}: ProgressProps) => {
  const safeMax = max > 0 ? max : 100
  const clamped = Math.min(Math.max(value, 0), safeMax)
  const pct = Math.round((clamped / safeMax) * 100)
  return (
    <div className={['bui-progress', size !== 'md' && `bui-progress--${size}`, className].filter(Boolean).join(' ')}>
      {(label || showValue) && (
        <div className="bui-progress__meta">
          {label ? <span className="bui-progress__label">{label}</span> : <span />}
          {showValue && <span className="bui-progress__value">{pct}%</span>}
        </div>
      )}
      <div
        className="bui-progress__track"
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={safeMax}
        aria-valuenow={clamped}
      >
        <div className="bui-progress__bar" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}
