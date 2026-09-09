# EVIPro: marca, atención y comunidad

## Decisión de producto
EVIPro encabeza la portada; ambos médicos tienen el mismo peso y enlazan a su ficha. Las membresías son la acción principal, con consulta independiente disponible. La página específica de cannabis conserva su finalidad de búsqueda y de información sobre el servicio.

## Caminos implementados
- Membresía Básica: apoyar y consultar los beneficios y precio del plan.
- Membresía EVIPro: continuidad, herramientas y tarifas; consulta no incluida por defecto.
- Atención: modalidades y tarifas de cannabis, directorio para elegir médico.
- Profesionales: propuestas mediante el formulario existente.
- Organizaciones: propuestas de colaboración o patrocinio, sin alta automática ni cobro nuevo.
- Turistas: enlace al plan existente.

Los precios se leen del catálogo y se separan por tipo. Un fallo de lectura no se convierte en un precio inventado. Los sorteos se presentan como adicionales y no se anuncian premios o fechas que no se hayan comprobado.

## Límites de dominios
Se modifica presentación pública y navegación (platform). La educación científica y la atención mantienen sus páginas y reglas; la membresía, las alianzas y los patrocinios no otorgan autoridad clínica ni acceso a datos de pacientes. No se crean donaciones, comisiones, contratos o nuevos sorteos.

## Próximas mejoras de producto
1. Revisar y conciliar beneficios de cada plan con la configuración y el cobro real; distinguir disponible, incluido y en preparación.
2. Preparar bienvenida y panel de membresía: plan, vigencia, beneficios, próxima acción y renovación/cancelación claras.
3. Medir visitas a planes, inicio y finalización de checkout, activación, uso de beneficios y renovación; no enviar datos médicos a analítica comercial.
4. Definir proceso de revisión de profesionales y propuestas: responsable, criterios, plazos y respuesta.
5. Antes de promover sorteos concretos: bases públicas, elegibilidad, fechas, premio, mecanismo, responsable y revisión aplicable. El código actual de tickets no prueba que un sorteo esté listo para anunciarse.
6. Publicar propósito y resultados verificables del apoyo comunitario antes de ofrecer un flujo independiente de aportes.

## Validación
Revalidación 2026-09-09: `npm run lint` y `tsc --noEmit` aprobados. La suite completa detectó tres expectativas antiguas en `home-secciones.test.tsx` (319 pruebas aprobadas); se actualizaron los enlaces, colegiaturas y parámetros de membresía al contrato de la portada documentado arriba. La ejecución posterior de los tres archivos de portada pasó sus 30 pruebas. El archivo corregido pasó ESLint y `git diff --check` no encontró errores.

`npm run build` aprobado fuera del sandbox. Dentro del entorno restringido falló al interpretar la salida de `tsc --showConfig`; no se modificó la configuración ni se desactivó la comprobación de tipos para resolverlo. Esta entrega no altera reglas clínicas ni publica automáticamente.

## Revisión visual local — 2026-09-09

Se inspeccionó la portada con Chromium en anchos de 1440, 768, 390 y 320 px. Las imágenes de ambos médicos cargan y no hay desbordamiento horizontal. Los destinos de Básica, EVIPro, membresías, Turista, propuestas de colaboración y perfiles médicos existen y sus anclas están presentes. No se detectaron excepciones de JavaScript en ese recorrido.

Se corrigieron dos hallazgos: el menú de escritorio comprimía sus etiquetas en tablet, por lo que el menú desplegable se mantiene hasta 1024 px; el texto `faint` tenía contraste 4,36:1 sobre el nuevo fondo y ahora usa un tono más claro limitado a la portada. El botón de menú pasa a 44 × 44 px. Una prueba de contraste comprueba el fondo real de portada y conserva la jerarquía respecto al texto `muted`.

Después de los ajustes: 35 pruebas aprobadas de portada y contraste; ESLint de los archivos modificados, `git diff --check` y compilación de producción aprobados. Se repitió el recorrido en Chromium sobre esa compilación: sin desbordamientos ni excepciones de JavaScript; menú de 44 × 44 px operativo en 768 y 390 px, navegación del menú a planes y CTA principal a `/planes#membresias` comprobados mediante clic. Capturas locales en `/tmp/evipro-browser-review/screenshots/` (temporales, fuera del repositorio).

Las dimensiones móviles son emuladas en navegador de escritorio; no constituyen una prueba en teléfono físico. No se enviaron formularios ni se ejecutaron pagos.

## Paleta pública compartida — 2026-09-09

Por indicación de Carlos se extiende el verde oscuro de portada a las páginas públicas de consulta, equipo, perfiles, reservas, planes, aliados, acceso, registro, recuperación, checkout y documentos legales. El pie de página adopta la misma paleta cuando acompaña una página pública. Los paneles de miembros, administración y reservas internas conservan su tema.

La clase `public-page` comparte los colores mediante variables CSS. `public-panel` aplica crema y texto verde oscuro a las tarjetas de médicos, aliados y planes, la información de disponibilidad, las tarifas de consulta y los documentos legales. Los logotipos conservan su fondo blanco. Los estados de error, advertencias y controles de formularios mantienen su función. El alcance es presentación (`platform`); no se modifica contenido clínico, precios, autenticación ni procesamiento de pagos.

Validación de la extensión: 83 pruebas aprobadas en 19 archivos, incluidos contraste, componentes y portada; lint y compilación de producción aprobados. Recorrido anónimo en Chromium por 14 páginas, a 1440 y 390 px: todas responden 200, fondo y pie verde oscuro, sin desbordamiento horizontal ni excepciones JavaScript. Se inspeccionaron capturas de médicos, planes, aliados, consulta y términos. No se enviaron formularios ni se procesaron pagos. Cambios locales, sin publicación.
