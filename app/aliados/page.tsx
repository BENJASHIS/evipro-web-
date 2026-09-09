import type { Metadata } from 'next'
import Nav from '@/app/components/Nav'
import Badge from '@/app/components/ui/Badge'
import Image from 'next/image'
import PropuestaForm from './PropuestaForm'
import { ALIADOS } from '@/lib/aliados'
import { publicMetadata } from '@/lib/seo'

export const metadata: Metadata = publicMetadata('/aliados', 'Aliados · EVIPro',
  'Farmacias, centros, asociaciones y proyectos con los que trabaja EVIPro en Cusco.')

export default function AliadosPage() {
  return (
    <main className="public-page min-h-screen bg-ink text-white">
      <Nav />
      <div className="max-w-5xl mx-auto px-4 py-16">
        <Badge className="mb-4">Aliados</Badge>
        <h1 className="text-4xl font-light font-serif italic mb-4">
          Con quiénes trabajamos
        </h1>
        <p className="text-muted mb-12 max-w-xl text-sm">
          Farmacias, centros, asociaciones y proyectos de confianza: para preparar lo que tu
          médico indica, para acompañar tu tratamiento y para informarte bien. Cada uno es
          independiente de EVIPro y no te cobramos ni nos pagan por estar aquí: tú eliges.
        </p>

        <div className="space-y-6">
          {ALIADOS.map(aliado => (
            <div
              key={aliado.slug}
              className="public-panel border border-subtle rounded-lg p-6 flex flex-col sm:flex-row items-center gap-5"
            >
              {/* Fondo blanco: varios logos vienen con fondo blanco y otros con
                  transparencia, y sobre el tema oscuro se leerían distinto. */}
              <div className="bg-white rounded-lg p-4 shrink-0 w-36 h-36 flex items-center justify-center overflow-hidden">
                <Image
                  src={aliado.logo}
                  alt={aliado.nombre}
                  width={120}
                  height={120}
                  className="w-full h-full object-contain"
                  style={
                    aliado.slug === 'mayac'
                      ? { clipPath: 'inset(0 2px 2px 0)' }
                      : undefined
                  }
                />
              </div>
              <div className="flex-1 text-center sm:text-left">
                {aliado.rol && (
                  <p className="text-xs font-mono uppercase tracking-widest text-brand mb-1">
                    {aliado.rol}
                  </p>
                )}
                <h2 className="text-white text-lg font-light mb-1">{aliado.nombre}</h2>
                {aliado.descripcion && (
                  <p className="text-muted text-sm mb-3">{aliado.descripcion}</p>
                )}
                <div className="flex flex-wrap gap-x-4 gap-y-1 justify-center sm:justify-start">
                  {aliado.enlaces.map(enlace => (
                    <a
                      key={enlace.url}
                      href={enlace.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-brand hover:underline"
                    >
                      {enlace.etiqueta} →
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Puerta de propuestas */}
        <section id="propuesta" className="mt-16 border-t border-subtle pt-12 scroll-mt-8">
          <h2 className="text-2xl font-light font-serif italic mb-3">Profesionales y organizaciones: propongan una colaboración</h2>
          <p className="text-muted text-sm mb-8 max-w-xl">
            Puedes proponer atención profesional, educación, colaboración técnica o un patrocinio.
            Cuéntanos qué aportas, qué necesitas y a quién beneficia. Cada propuesta se evalúa antes
            de incorporarse; enviarla no implica aprobación ni aparecer en el directorio de aliados.
          </p>
          <PropuestaForm />
        </section>
      </div>
    </main>
  )
}
