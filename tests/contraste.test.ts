import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

/** Luminancia relativa (WCAG 2.1). */
function luminancia(hex: string): number {
  const h = hex.replace('#', '')
  const canales = [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16) / 255)
  const [r, g, b] = canales.map(c => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4))
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

function contraste(a: string, b: string): number {
  const [la, lb] = [luminancia(a), luminancia(b)]
  const [alto, bajo] = la > lb ? [la, lb] : [lb, la]
  return (alto + 0.05) / (bajo + 0.05)
}

function token(nombre: string): string {
  const css = readFileSync(resolve(process.cwd(), 'app/globals.css'), 'utf-8')
  const m = css.match(new RegExp(`--color-${nombre}:\\s*(#[0-9a-fA-F]{6})`))
  if (!m) throw new Error(`no existe el token --color-${nombre}`)
  return m[1]
}

// El texto que menos contrasta es el que más se usa en móvil a plena luz:
// notas al pie, credenciales del hero, pies de tarjeta.
describe('contraste de los tokens de texto', () => {
  const fondo = () => token('ink')

  it.each(['faint', 'muted', 'brand'])('%s cumple AA sobre el fondo (4,5:1)', nombre => {
    expect(contraste(token(nombre), fondo())).toBeGreaterThanOrEqual(4.5)
  })

  it('faint sigue siendo más tenue que muted: la jerarquía se mantiene', () => {
    expect(contraste(token('faint'), fondo())).toBeLessThan(contraste(token('muted'), fondo()))
  })

  it('el texto tenue de portada cumple AA sobre su fondo verde', () => {
    const css = readFileSync(resolve(process.cwd(), 'app/globals.css'), 'utf-8')
    const portada = css.match(/body:has\(\.public-page\) > footer\s*\{([^}]+)\}/)![1]
    const fondo = portada.match(/background:\s*(#[0-9a-fA-F]{6})/)![1]
    const tenue = portada.match(/--color-faint:\s*(#[0-9a-fA-F]{6})/)![1]
    expect(contraste(tenue, fondo)).toBeGreaterThanOrEqual(4.5)
    expect(contraste(tenue, fondo)).toBeLessThan(contraste(token('muted'), fondo))
  })

  it.each(['muted', 'faint', 'brand'])('%s cumple AA en los paneles crema', nombre => {
    const css = readFileSync(resolve(process.cwd(), 'app/globals.css'), 'utf-8')
    const panel = css.match(/\.public-page \.public-panel\s*\{([^}]+)\}/)![1]
    const fondo = panel.match(/background:\s*(#[0-9a-fA-F]{6})/)![1]
    const texto = panel.match(new RegExp(`--color-${nombre}:\\s*(#[0-9a-fA-F]{6})`))![1]
    expect(contraste(texto, fondo)).toBeGreaterThanOrEqual(4.5)
  })
})
