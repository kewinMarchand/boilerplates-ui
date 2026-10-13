import { Icon } from './Icon'

export type SortDirection = 'ascending' | 'descending'

const SORT_ICONS = {
  ascending: 'arrow-up',
  descending: 'arrow-down',
  none: 'arrow-up-down',
} as const

export interface TableProps {
  id: string
  caption: string
  columns: { key: string; label: string; sortable?: boolean }[]
  /** La première colonne sert d'en-tête de ligne. */
  rows: Record<string, string>[]
  sort?: { key: string; direction: SortDirection } | undefined
  onSort?: (key: string) => void
}

export const Table = ({ id, caption, columns, rows, sort, onSort }: TableProps) => (
  <div className="bui-table" role="region" aria-labelledby={`${id}-caption`} tabIndex={0}>
    <table className="bui-table__table">
      <caption className="bui-table__caption" id={`${id}-caption`}>
        {caption}
      </caption>
      <thead>
        <tr>
          {columns.map((column) => {
            const direction = sort?.key === column.key ? sort.direction : undefined
            return (
              <th key={column.key} scope="col" aria-sort={direction}>
                {column.sortable ? (
                  <button
                    type="button"
                    className="bui-table__sort"
                    onClick={() => onSort?.(column.key)}
                  >
                    {column.label}
                    <Icon name={SORT_ICONS[direction ?? 'none']} />
                  </button>
                ) : (
                  column.label
                )}
              </th>
            )
          })}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column, index) =>
              index === 0 ? (
                <th key={column.key} scope="row">
                  {row[column.key]}
                </th>
              ) : (
                <td key={column.key}>{row[column.key]}</td>
              ),
            )}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)
