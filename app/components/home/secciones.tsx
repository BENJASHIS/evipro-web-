import Link from 'next/link'
import Image from 'next/image'
import type { ReactNode } from 'react'
import { DOCTORS } from '@/lib/doctors'
import Badge from '@/app/components/ui/Badge'
import Button from '@/app/components/ui/Button'
import { escaleraReserva, precioReferencia } from '@/lib/consulta-pricing'
import {
  HERO, INDICACIONES_PORTADA, PARA_QUE_NO, PREGUNTAS, PASOS_PRIMERA_CONSULTA,
  OTRAS_ESPECIALIDADES, ESPECIALIDADES_PROXIMAS, MEDICO, RENPUC_NOMBRE, WHATSAPP, MEMBRESIA,
  EVIDENCIA_PUBLICA,
} from '@/lib/home-content'

const AGENDAR = '/medicos/dr-jara/agendar'
const SECCION = 'home-section border-t border-subtle py-20 px-6'
const CAJA = 'max-w-6xl mx-auto'
const ROTULO = 'text-xs font-mono text-faint uppercase tracking-widest mb-6'

/** Envuelve cada aparición de «RENPUC» en un <abbr> con el nombre completo.
 *  Se hace aquí y no en el contenido porque el nombre oficial es kilométrico y
 *  no cabe en la tarjeta; el <abbr> lo enseña al pasar el mouse y los lectores
 *  de pantalla lo leen. Sin casos especiales por índice: cualquier texto que
 *  lleve la sigla queda cubierto, hoy y cuando se añada otro. */
function conAbbr(texto: string): ReactNode[] {
  return texto.split('RENPUC').flatMap((parte, i) =>
    i === 0
      ? [parte]
      : [
          <abbr key={i} title={RENPUC_NOMBRE} className="no-underline">RENPUC</abbr>,
          parte,
        ],
  )
}

export function Hero() {
  return (
    <section className="home-hero max-w-6xl mx-auto px-6 pt-20 pb-16">
      <div className="grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7">
          <Badge className="mb-6">{HERO.etiqueta}</Badge>
          <h1 className="home-title font-light font-serif mb-6">{HERO.titulo}<br />{HERO.titulo2}</h1>
          <p className="text-muted text-lg leading-relaxed max-w-xl mb-8">{HERO.subtitulo}</p>
          <div className="flex flex-wrap gap-3">
            <Button variant="primary" href="/planes#membresias">Conocer las membresías →</Button>
            <Button variant="outline" href="/medicos">Buscar una consulta →</Button>
          </div>
          <p className="text-muted text-sm mt-5">Puedes consultar sin membresía o apoyar sin ser paciente.</p>
          <div className="flex flex-wrap items-center gap-4 mt-6">
            <span className="text-muted text-sm">{HERO.escribir}</span>
            <Button variant="outline" href={`https://wa.me/51${WHATSAPP}`} className="px-5 py-2">WhatsApp</Button>
          </div>
          <Link href="/planes#turista" className="inline-block text-sm text-brand mt-6 underline">¿Visitas Perú? Conoce el Plan Turista →</Link>
        </div>
        <div className="lg:col-span-5">
          <p className="text-brand text-xs font-mono tracking-widest uppercase mb-5">El equipo detrás de EVIPro</p>
          <div className="grid grid-cols-2 gap-4">
            {DOCTORS.map(doctor => (
              <Link key={doctor.slug} href={`/medicos/${doctor.slug}`} className="group min-w-0">
                <div className="relative aspect-[3/4] overflow-hidden rounded-t-[5rem] bg-white/5">
                  <Image src={doctor.photo} alt={doctor.name} fill priority sizes="(min-width: 1024px) 220px, 45vw" className="object-cover object-[center_18%]" />
                </div>
                <h2 className="text-base mt-4 leading-snug group-hover:text-brand">{doctor.name}</h2>
                <p className="text-brand text-xs font-mono mt-2">CMP {doctor.cmp}</p>
                <p className="text-muted text-xs mt-2">{doctor.location} · {doctor.modality}</p>
                <span className="inline-block text-sm mt-3 underline underline-offset-4">Ver perfil →</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function ParaQueSi() {
  return (
    <section className={SECCION}>
      <div className={CAJA}>
        <h2 className={ROTULO}>Para qué sí</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {INDICACIONES_PORTADA.map(i => (
            <div
              key={i.titulo}
              className={`border border-subtle rounded-lg p-5 ${i.anchoCompleto ? 'md:col-span-2' : ''}`}
            >
              <h3 className="text-base font-light mb-1">{i.titulo}</h3>
              <p className="text-muted text-sm leading-relaxed">{i.matiz}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ParaQueNo() {
  return (
    <section className={`${SECCION} bg-white/[0.02]`}>
      <div className={CAJA}>
        <p className={ROTULO}>Para qué no</p>
        <h2 className="text-2xl font-light font-serif italic mb-3">{PARA_QUE_NO.titulo}</h2>
        <p className="text-muted leading-relaxed max-w-2xl">{PARA_QUE_NO.texto}</p>
      </div>
    </section>
  )
}

export function EvidenciaLimites() {
  return (
    <section className={SECCION}>
      <div className={CAJA}>
        <p className={ROTULO}>Evidencia y límites</p>
        <h2 className="text-2xl font-light font-serif italic mb-3">
          No todo paciente necesita cannabis.
        </h2>
        <p className="text-muted leading-relaxed max-w-2xl mb-8">
          La consulta decide si corresponde, qué riesgos revisar y cuándo buscar otra ruta.
          Estas fuentes públicas orientan el criterio clínico.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          {EVIDENCIA_PUBLICA.map(item => (
            <article key={item.titulo} className="border border-subtle rounded-lg p-5">
              <h3 className="text-base font-light mb-1">{item.titulo}</h3>
              <p className="text-muted text-sm leading-relaxed mb-3">{item.resumen}</p>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-brand hover:text-white transition-colors"
              >
                {item.fuente} →
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Preguntas() {
  return (
    <section className={SECCION}>
      <div className={CAJA}>
        <h2 className={ROTULO}>Lo que todos preguntan</h2>
        <dl className="divide-y divide-subtle">
          {PREGUNTAS.map(q => (
            <div key={q.p} className="py-4">
              <dt className="font-light mb-1">{conAbbr(q.p)}</dt>
              <dd className="text-muted text-sm leading-relaxed">{q.r}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

export function QuienTeAtiende() {
  return <section className={SECCION}><div className={CAJA}><h2 className={ROTULO}>Atención con un profesional responsable</h2><p className="text-muted max-w-2xl leading-relaxed">Conoce la formación, las áreas de atención y la modalidad de cada médico antes de elegir tu consulta.</p><Link href="/medicos" className="inline-block mt-5 text-brand underline">Conocer al equipo médico →</Link></div></section>
}

export function PrimeraConsulta() {
  return (
    <section className={SECCION}>
      <div className={CAJA}>
        <h2 className={ROTULO}>Cómo es la primera consulta</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {PASOS_PRIMERA_CONSULTA.map(p => (
            <div key={p.n} className="border border-subtle rounded-lg p-5">
              <h3 className="text-base font-light mb-1">
                {p.n} · {conAbbr(p.titulo)}
              </h3>
              <p className="text-muted text-sm leading-relaxed">{conAbbr(p.texto)}</p>
            </div>
          ))}
        </div>
        <p className="text-faint text-xs mt-5">
          Presencial: {escaleraReserva('presencial')} · Virtual: {escaleraReserva('virtual')}
        </p>
      </div>
    </section>
  )
}

export function OtrasEspecialidades() {
  return (
    <section className={SECCION}>
      <div className={CAJA}>
        <h2 className={ROTULO}>También atendemos</h2>
        <p className="text-muted leading-relaxed">
          {OTRAS_ESPECIALIDADES.join(' · ')}{' '}
          <span className="text-faint">
            (+ {ESPECIALIDADES_PROXIMAS.join(' y ').toLowerCase()}, pronto)
          </span>
        </p>
      </div>
    </section>
  )
}

export function Membresia({ desde, basica }: { desde: number | null; basica: number | null }) {
  return (
    <section id="comunidad" className="home-modalities px-6 py-20" aria-labelledby="comunidad-titulo">
      <div className={CAJA}>
        <p className="text-xs font-mono uppercase tracking-widest mb-5">Forma parte de EVIPro</p>
        <h2 id="comunidad-titulo" className="text-3xl md:text-5xl font-serif mb-6">Una comunidad.<br />Distintas formas de participar.</h2>
        <p className="max-w-2xl leading-relaxed mb-10">Elige según lo que buscas: apoyar el proyecto o sumar beneficios para la continuidad de tu atención. Revisa lo que incluye cada plan antes de activarlo.</p>
        <div className="grid md:grid-cols-2 gap-10">
          <article className="border-t border-current/25 pt-6">
            <p className="text-xs uppercase tracking-widest mb-3">Para apoyar</p>
            <h3 className="text-2xl font-serif mb-3">Membresía Básica</h3>
            <p className="leading-relaxed mb-5">Una forma de apoyar la plataforma y acceder al contenido y a los beneficios del plan. No necesitas estar en tratamiento.</p>
            {basica !== null && <p className="text-2xl font-serif mb-5">S/{basica} <span className="text-sm font-sans">al mes</span></p>}
            <Link href="/planes#basica" className="inline-block underline">Ver precio y beneficios de Básica →</Link>
          </article>
          <article className="border-t border-current/25 pt-6">
            <p className="text-xs uppercase tracking-widest mb-3">Para dar continuidad</p>
            <h3 className="text-2xl font-serif mb-3">Membresía EVIPro</h3>
            <p className="leading-relaxed mb-5">{MEMBRESIA.texto}. Las consultas se cobran según la tarifa del plan.</p>
            {desde !== null && <p className="text-2xl font-serif mb-5">Desde S/{desde} <span className="text-sm font-sans">al mes</span></p>}
            <Link href="/planes#evipro" className="inline-block underline">Comparar opciones EVIPro →</Link>
          </article>
        </div>
        <p className="text-sm border-t border-current/25 pt-6 mt-10">Los sorteos son un beneficio adicional según el plan y las condiciones de cada sorteo. La membresía no garantiza un premio ni un resultado médico.</p>
      </div>
    </section>
  )
}

export function Participar() {
  const caminos = [
    { titulo: 'Soy médico o profesional', texto: 'Propón atención, educación o una colaboración desde tu área. Evaluaremos tu experiencia y el alcance de tu propuesta.', enlace: 'Presentar mi propuesta' },
    { titulo: 'Represento una organización', texto: 'Conversemos sobre alianzas o propuestas de patrocinio. Cada colaboración requiere evaluación y un acuerdo de alcance.', enlace: 'Proponer una colaboración' },
  ]
  return <section className={SECCION}><div className={CAJA}><p className={ROTULO}>Construyamos juntos</p><h2 className="text-3xl md:text-4xl font-serif mb-10">También puedes aportar lo que sabes.</h2><div className="grid md:grid-cols-2 gap-10">{caminos.map(c => <article key={c.titulo} className="border-t border-subtle pt-6"><h3 className="text-xl mb-3">{c.titulo}</h3><p className="text-muted leading-relaxed mb-5">{c.texto}</p><Link href="/aliados#propuesta" className="text-brand underline">{c.enlace} →</Link></article>)}</div><p className="text-muted text-sm mt-10">El apoyo y los patrocinios no determinan las recomendaciones médicas. Los aliados actuales se presentan por separado.</p><Link href="/aliados" className="inline-block text-brand mt-4 underline">Conocer a los aliados →</Link></div></section>
}

export function Modalidades() {
  return (
    <section id="modalidades" className="home-modalities px-6 py-20" aria-labelledby="modalidades-titulo">
      <div className={CAJA}>
        <p className="text-xs font-mono uppercase tracking-widest mb-5">Atención médica</p>
        <div className="grid md:grid-cols-2 gap-6 mb-12 items-end">
          <h2 id="modalidades-titulo" className="text-3xl md:text-5xl font-serif leading-tight">En Cusco.<br />O desde donde estés.</h2>
          <p className="leading-relaxed max-w-md">Consulta de cannabis medicinal con evaluación individual. La prescripción depende del criterio médico y de tu situación clínica.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-10">
          {(['presencial', 'virtual'] as const).map(modalidad => (
            <article key={modalidad} className="border-t border-current/25 pt-6">
              <div className="flex flex-wrap justify-between items-start gap-4">
                <h3 className="text-2xl">{modalidad === 'presencial' ? 'Consulta presencial' : 'Consulta online'}</h3>
                <p className="text-3xl font-serif">S/{precioReferencia(modalidad)}</p>
              </div>
              <p className="text-sm mt-3 mb-6">{modalidad === 'presencial' ? MEDICO.direccion : 'Teleconsulta para pacientes en Perú.'}</p>
              <p className="text-xs mb-6">Primera consulta · tarifa regular, sin membresía</p>
              <Link href={AGENDAR} className="inline-flex min-h-12 items-center border border-current rounded-full px-6 text-sm hover:bg-black/5">Agendar {modalidad === 'presencial' ? 'en Cusco' : 'online'} <span aria-hidden="true" className="ml-6">↗</span></Link>
            </article>
          ))}
        </div>
        <Link href="/consulta-cannabis-medicinal" className="inline-block mt-10 underline underline-offset-4 text-sm">Ver qué incluye la consulta y las tarifas de seguimiento</Link>
      </div>
    </section>
  )
}
export function CierreConsulta() {
  return <section className="px-6 py-20 border-t border-subtle"><div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-8"><div><p className="text-brand text-xs font-mono uppercase tracking-widest mb-4">EVIPro · Cusco y online</p><h2 className="text-3xl md:text-5xl font-serif">Empecemos por escucharte.</h2></div><Button href={AGENDAR} variant="outline" className="text-center">Reservar mi consulta →</Button></div></section>
}
