declare module 'svgstore' {
  interface Store {
    add(id: string, svg: string): Store
    toString(options?: { inline?: boolean }): string
  }
  const svgstore: (options?: { svgAttrs?: Record<string, string> }) => Store
  export default svgstore
}
