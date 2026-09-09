import Link from 'next/link'
import Image from 'next/image'
import Nav from '@/app/components/Nav'
import Button from '@/app/components/ui/Button'
import { DOCTORS } from '@/lib/doctors'
import { precioConsulta } from '@/lib/consulta-pricing'
import { MEDICO } from '@/lib/home-content'
import { CONSULTA_PATH, SITE_URL, publicMetadata } from '@/lib/seo'

export const metadata = publicMetadata(
  CONSULTA_PATH,
  'Consulta de cannabis medicinal: precios y reserva | EVIPro',
  'Evaluación con el Dr. Carlos Jara en Cusco o por teleconsulta en Perú. Consulta precios, qué incluye la atención y cómo reservar. Receta solo si corresponde.',
)

export default function ConsultaCannabisPage() {
  const doctor = DOCTORS.find(d => d.slug === 'dr-jara')!
  const agendar = `/medicos/${doctor.slug}/agendar`
  const modalidades = [
    { id: 'presencial' as const, nombre: 'Consulta presencial en Cusco', detalle: MEDICO.direccion },
    { id: 'virtual' as const, nombre: 'Consulta online en Perú', detalle: 'Teleconsulta con el médico. Coordina la fecha y el horario al reservar.' },
  ]
  // Describe únicamente la oferta visible. No declara eficacia, estrellas,
  // especialidades acreditadas ni horarios que no estén verificados.
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Consulta de cannabis medicinal en Cusco y online',
    url: `${SITE_URL}${CONSULTA_PATH}`,
    serviceType: 'Consulta médica',
    areaServed: { '@type': 'Country', name: 'Perú' },
    provider: { '@type': 'Organization', name: 'EVIPro', url: SITE_URL },
    offers: modalidades.map(m => ({
      '@type': 'Offer', name: `${m.nombre} · primera consulta, tarifa regular`,
      price: precioConsulta(m.id, 'regular', 1), priceCurrency: 'PEN',
      url: `${SITE_URL}${CONSULTA_PATH}#modalidades`,
    })),
  }

  return (
    <main className="public-page min-h-screen bg-ink text-white">
      <Nav />
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
      }} />
      <div className="max-w-5xl mx-auto px-6 py-12 md:py-20">
        <p className="text-brand text-xs font-mono uppercase tracking-widest mb-5">Evaluación médica · Cusco y Perú</p>
        <h1 className="text-3xl md:text-5xl font-serif font-light leading-tight max-w-3xl mb-6">
          Consulta de cannabis medicinal en Cusco y online
        </h1>
        <p className="text-muted text-lg leading-relaxed max-w-2xl mb-8">
          Conversa con el médico sobre tu motivo de consulta, los tratamientos que utilizas
          y tus dudas. La evaluación determina si el cannabis medicinal corresponde a tu caso;
          reservar una consulta no garantiza una receta.
        </p>
        <div className="flex flex-wrap gap-4 mb-14">
          <Button variant="primary" href={agendar}>Reservar con el Dr. Jara →</Button>
          <Button variant="outline" href="#modalidades">Ver modalidades y precios</Button>
        </div>

        <section id="modalidades" className="public-panel scroll-mt-8 rounded-lg px-6 py-10 mb-10">
          <h2 className="text-2xl font-serif mb-3">Modalidades y precios de consulta</h2>
          <p className="text-muted mb-6">Tarifa regular, sin membresía. El precio corresponde a la atención médica.</p>
          <div className="grid md:grid-cols-2 gap-8">
            {modalidades.map(m => (
              <div key={m.id} className="border-l-2 border-brand pl-5">
                <h3 className="text-lg mb-2">{m.nombre}</h3>
                <p className="text-3xl mb-2">S/{precioConsulta(m.id, 'regular', 1)} <span className="text-sm text-muted">primera consulta</span></p>
                <p className="text-muted text-sm mb-3">Reconsulta: S/{precioConsulta(m.id, 'regular', 2)} · Desde la tercera: S/{precioConsulta(m.id, 'regular', 3)}</p>
                <p className="text-sm text-muted leading-relaxed">{m.detalle}</p>
              </div>
            ))}
          </div>
          <p className="text-muted text-sm mt-6">Si tienes membresía, revisa las condiciones de tu <Link className="text-brand underline" href="/planes">plan EVIPro</Link>.</p>
        </section>

        <section className="border-t border-subtle py-10 grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl font-serif mb-4">Qué se revisa en la consulta</h2>
            <ul className="list-disc pl-5 text-muted space-y-3 leading-relaxed">
              <li>Tu motivo de consulta, antecedentes y tratamientos actuales.</li>
              <li>La pertinencia de un tratamiento y sus límites para tu situación.</li>
              <li>Las indicaciones y el seguimiento que el médico considere necesarios.</li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-serif mb-4">Qué debes tener a mano</h2>
            <ul className="list-disc pl-5 text-muted space-y-3 leading-relaxed">
              <li>Tu documento de identidad.</li>
              <li>La lista de medicamentos y suplementos que utilizas.</li>
              <li>Informes o exámenes previos relacionados con tu consulta, si los tienes.</li>
            </ul>
          </div>
        </section>

        <section className="border-t border-subtle py-10 flex flex-col sm:flex-row gap-6 items-start">
          <Image src={doctor.photo} alt={doctor.name} width={112} height={112} sizes="112px" className="w-28 h-28 rounded-lg object-cover object-top" />
          <div>
            <h2 className="text-2xl font-serif mb-3">Quién te atiende</h2>
            <p className="mb-2">{doctor.name}</p>
            <p className="text-brand text-sm font-mono mb-3">Médico Cirujano · CMP {doctor.cmp}{doctor.rna ? ` · RNA ${doctor.rna}` : ''}</p>
            <p className="text-muted text-sm mb-4">Atención presencial en Wanchaq, Cusco, y por teleconsulta.</p>
            <Link href={`/medicos/${doctor.slug}`} className="text-brand underline">Ver formación y perfil del médico →</Link>
          </div>
        </section>

        <section className="border-t border-subtle py-10">
          <h2 className="text-2xl font-serif mb-6">Antes de reservar</h2>
          <div className="space-y-6 max-w-3xl text-muted leading-relaxed">
            <div><h3 className="text-white mb-2">¿La consulta incluye el producto?</h3><p>No. EVIPro ofrece atención médica y no vende cannabis ni derivados. La adquisición del producto, si se prescribe, es independiente.</p></div>
            <div><h3 className="text-white mb-2">¿Necesito membresía?</h3><p>Puedes reservar a tarifa regular. Las membresías son una opción adicional; consulta sus condiciones antes de elegir.</p></div>
            <div><h3 className="text-white mb-2">¿Estoy reservando una consulta o comprando una receta?</h3><p>Una consulta médica. La receta se emite solo si corresponde tras la evaluación del profesional.</p></div>
            <div><h3 className="text-white mb-2">¿Voy a viajar a Cusco?</h3><p>Consulta la información del <Link href="/planes#turista" className="text-brand underline">Plan Turista</Link> para conocer el acompañamiento disponible antes o durante tu viaje.</p></div>
          </div>
        </section>
        <div className="border-t border-subtle pt-10 flex flex-wrap items-center gap-5">
          <Button variant="primary" href={agendar}>Elegir modalidad y reservar →</Button>
          <Link href={`https://wa.me/${doctor.whatsapp}`} className="text-brand underline">Coordinar por WhatsApp</Link>
          <Link href="/politica-devoluciones" className="text-muted text-sm underline">Política de cancelaciones</Link>
        </div>
      </div>
    </main>
  )
}
