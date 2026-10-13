export interface SeparatorProps {
  orientation?: 'horizontal' | 'vertical'
}

export const Separator = ({ orientation = 'horizontal' }: SeparatorProps) =>
  orientation === 'vertical' ? (
    <hr className="bui-separator bui-separator--vertical" aria-orientation="vertical" />
  ) : (
    <hr className="bui-separator" />
  )
