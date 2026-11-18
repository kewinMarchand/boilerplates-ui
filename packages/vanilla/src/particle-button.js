/**
 * particle-button.js — a tiny, dependency-free particle burst for buttons.
 *
 * Original implementation inspired by the visual idea of Codrops'
 * "Particle Effects for Buttons" (codrops/ParticleEffectsButtons), not a copy
 * of its code: no anime.js, no DOM disintegration, one canvas per element.
 *
 * Usage:
 *   <a class="button" data-particles href="#jeux">Découvrir</a>
 *   <script type="module" src="particle-button.js"></script>
 *
 * Options can be set per element with data-particles-color and
 * data-particles-count. Honours prefers-reduced-motion and keyboard input.
 */

const ATTACHED = new WeakSet();
const PAD = 24;
const DEFAULTS = { count: 18, color: null, duration: 620, hover: false };

function prefersReducedMotion() {
  return typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function accentFor(el) {
  const css = getComputedStyle(el);
  const explicit = el.dataset.particlesColor;
  if (explicit) return explicit;
  const token = css.getPropertyValue('--lime').trim()
    || css.getPropertyValue('--bui-accent').trim()
    || css.getPropertyValue('--accent').trim();
  return token || css.color || '#c8ff4d';
}

function makeCanvas(el) {
  const canvas = document.createElement('canvas');
  canvas.setAttribute('aria-hidden', 'true');
  Object.assign(canvas.style, {
    position: 'absolute',
    left: `-${PAD}px`,
    top: `-${PAD}px`,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    zIndex: '2',
  });
  if (getComputedStyle(el).position === 'static') el.style.position = 'relative';
  el.appendChild(canvas);
  return canvas;
}

function burst(el, canvas, state, options) {
  if (prefersReducedMotion() || state.running) return;
  const rect = el.getBoundingClientRect();
  if (!rect.width || !rect.height) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = rect.width + PAD * 2, h = rect.height + PAD * 2;
  canvas.width = Math.round(w * dpr);
  canvas.height = Math.round(h * dpr);
  const ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const color = accentFor(el);
  const count = Number(el.dataset.particlesCount) || options.count;
  const particles = Array.from({ length: count }, () => {
    const angle = Math.random() * Math.PI * 2;
    const speed = 1.2 + Math.random() * 3.2;
    return {
      x: PAD + Math.random() * rect.width,
      y: PAD + Math.random() * rect.height,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 1,
      size: 1.5 + Math.random() * 3.5,
      life: 1,
    };
  });

  state.running = true;
  const start = performance.now();
  function frame(now) {
    const t = (now - start) / options.duration;
    ctx.clearRect(0, 0, w, h);
    ctx.globalAlpha = Math.max(0, 1 - t);
    ctx.fillStyle = color;
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.06;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * (1 - t * 0.5), 0, Math.PI * 2);
      ctx.fill();
    }
    if (t < 1) requestAnimationFrame(frame);
    else { ctx.clearRect(0, 0, w, h); ctx.globalAlpha = 1; state.running = false; }
  }
  requestAnimationFrame(frame);
}

/** Attach particle bursts to every [data-particles] element under `root`. */
export function attachParticleButtons(root = document, options = {}) {
  const opts = { ...DEFAULTS, ...options };
  const attached = [];
  root.querySelectorAll('[data-particles]').forEach((el) => {
    if (ATTACHED.has(el)) return;
    ATTACHED.add(el);
    const canvas = makeCanvas(el);
    const state = { running: false };
    const run = () => burst(el, canvas, state, opts);

    el.addEventListener('click', run);
    el.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') run();
    });
    if (opts.hover || el.dataset.particles === 'hover') {
      el.addEventListener('pointerenter', run);
    }
    attached.push(el);
  });
  return attached;
}

export function initParticleButtons() {
  return attachParticleButtons(document);
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initParticleButtons, { once: true });
  else initParticleButtons();
}
