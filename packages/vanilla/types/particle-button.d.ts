export interface ParticleButtonOptions {
  count?: number;
  color?: string | null;
  duration?: number;
  hover?: boolean;
}

export function attachParticleButtons(
  root?: ParentNode,
  options?: ParticleButtonOptions,
): Element[];

export function initParticleButtons(): Element[];
