import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Hero } from '@/app/components/home/secciones'
import { HERO, MEDICO, WHATSAPP } from '@/lib/home-content'
import { DOCTORS } from '@/lib/doctors'

describe('Hero — doble puerta', () => {
  it('mantiene el titular y el subtítulo del contenido, sin inventar copy', () => {
    render(<Hero />)
    expect(screen.getByRole('heading', { level: 1 }).textContent)
      .toContain(HERO.titulo)
    expect(screen.getByText(HERO.subtitulo)).toBeTruthy()
  })

  it('ofrece las dos puertas y cada una lleva a un sitio distinto', () => {
    render(<Hero />)
    const local = screen.getByText(HERO.puertas.local.cta).closest('a')
    const viaje = screen.getByText(HERO.puertas.viaje.cta).closest('a')
    expect(local?.getAttribute('href')).toContain('/agendar')
    expect(viaje?.getAttribute('href')).toContain('turista')
    expect(local?.getAttribute('href')).not.toBe(viaje?.getAttribute('href'))
  })

  it('la puerta local es la acción primaria y la de viaje la secundaria', () => {
    // Dos puertas no son dos acciones iguales: el paciente local es la base.
    render(<Hero />)
    expect(screen.getByText(HERO.puertas.local.cta).className).toContain('bg-brand')
    expect(screen.getByText(HERO.puertas.viaje.cta).className).not.toContain('bg-brand')
  })

  it('WhatsApp es un botón con el número real, no un texto suelto', () => {
    render(<Hero />)
    const wa = screen.getByText(/WhatsApp/).closest('a')
    expect(wa?.getAttribute('href')).toBe(`https://wa.me/51${WHATSAPP}`)
    expect(wa?.className).toContain('border')
  })

  it('la confianza sube al hero: foto, nombre y colegiatura', () => {
    render(<Hero />)
    expect(screen.getByAltText(MEDICO.nombre)).toBeTruthy()
    expect(screen.getByText(MEDICO.credenciales)).toBeTruthy()
  })

  it('la foto del hero es la misma que la ficha del médico', () => {
    // Un segundo sitio con la ruta a mano se desincroniza en silencio.
    const jara = DOCTORS.find(d => d.slug === 'dr-jara')
    expect(MEDICO.foto).toBe(jara?.photo)
  })
})
