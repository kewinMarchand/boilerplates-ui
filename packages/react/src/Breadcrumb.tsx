export interface BreadcrumbProps {
  /** Le dernier élément est la page courante. */
  items: { label: string; href?: string }[]
  /** Nom accessible de la navigation. */
  label?: string
}

export const Breadcrumb = ({ items, label = 'Fil d’Ariane' }: BreadcrumbProps) => (
  <nav className="bui-breadcrumb" aria-label={label}>
    <ol className="bui-breadcrumb__list">
      {items.map((item, index) => (
        <li key={item.label} className="bui-breadcrumb__item">
          {index === items.length - 1 ? (
            <span className="bui-breadcrumb__current" aria-current="page">
              {item.label}
            </span>
          ) : (
            <a className="bui-link" href={item.href ?? '#'}>
              {item.label}
            </a>
          )}
        </li>
      ))}
    </ol>
  </nav>
)
