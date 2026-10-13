import { Icon } from './Icon'

export interface PaginationProps {
  page: number
  count: number
  href: (page: number) => string
}

/** Pages affichées : toutes jusqu'à 7, sinon la première, la dernière et les voisines de la courante. */
const pageItems = (page: number, count: number): (number | 'ellipsis')[] => {
  if (count <= 7) return Array.from({ length: count }, (_, index) => index + 1)
  const pages = [1, page - 1, page, page + 1, count].filter((p) => p >= 1 && p <= count)
  return [...new Set(pages)].flatMap((p, index, list) =>
    index > 0 && p - list[index - 1]! > 1 ? (['ellipsis', p] as const) : [p],
  )
}

export const Pagination = ({ page, count, href }: PaginationProps) => (
  <nav className="bui-pagination" aria-label="Pagination">
    <ul className="bui-pagination__list">
      {page > 1 && (
        <li>
          <a className="bui-pagination__link" href={href(page - 1)} rel="prev">
            <Icon name="chevron-left" />
            Précédent
          </a>
        </li>
      )}
      {pageItems(page, count).map((item, index) =>
        item === 'ellipsis' ? (
          <li key={`ellipsis-${index}`} className="bui-pagination__ellipsis" aria-hidden="true">
            …
          </li>
        ) : (
          <li key={item}>
            <a
              className="bui-pagination__link"
              href={href(item)}
              aria-current={item === page ? 'page' : undefined}
            >
              <span className="bui-visually-hidden">Page </span>
              {item}
            </a>
          </li>
        ),
      )}
      {page < count && (
        <li>
          <a className="bui-pagination__link" href={href(page + 1)} rel="next">
            Suivant
            <Icon name="chevron-right" />
          </a>
        </li>
      )}
    </ul>
  </nav>
)
