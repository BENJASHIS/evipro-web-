import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Hero } from '@/app/components/home/secciones'
import { HERO, WHATSAPP } from '@/lib/home-content'
import { DOCTORS } from '@/lib/doctors'

describe('Hero — marca, membresías y equipo', () => {
  it('mantiene el titular y el subtítulo del contenido, sin inventar copy', () => {
    render(<Hero />)
    expect(screen.getByRole('heading', { level: 1 }).textContent)
      .toContain(HERO.titulo)
    expect(screen.getByText(HERO.subtitulo)).toBeTruthy()
  })

  it('ofrece las dos puertas y cada una lleva a un sitio distinto', () => {
    render(<Hero />)
    const local = screen.getByText('Conocer las membresías →').closest('a')
    const viaje = screen.getByText('Buscar una consulta →').closest('a')
    expect(local?.getAttribute('href')).toContain('/planes#membresias')
    expect(viaje?.getAttribute('href')).toContain('/medicos')
    expect(local?.getAttribute('href')).not.toBe(viaje?.getAttribute('href'))
  })

  it('la membresía es primaria y la consulta sigue accesible', () => {
    // Dos puertas no son dos acciones iguales: el paciente local es la base.
    render(<Hero />)
    expect(screen.getByText('Conocer las membresías →').className).toContain('bg-brand')
    expect(screen.getByText('Buscar una consulta →').className).not.toContain('bg-brand')
  })

  it('WhatsApp es un botón con el número real, no un texto suelto', () => {
    render(<Hero />)
    const wa = screen.getByText(/WhatsApp/).closest('a')
    expect(wa?.getAttribute('href')).toBe(`https://wa.me/51${WHATSAPP}`)
    expect(wa?.className).toContain('border')
  })

  it('presenta a ambos médicos con sus perfiles y credenciales del catálogo', () => {
    render(<Hero />)
    for (const doctor of DOCTORS) {
      expect(screen.getByAltText(doctor.name)).toBeTruthy()
      expect(screen.getByText(`CMP ${doctor.cmp}`)).toBeTruthy()
      expect(screen.getByText(doctor.name).closest('a')?.getAttribute('href'))
        .toBe(`/medicos/${doctor.slug}`)
    }
  })
})
