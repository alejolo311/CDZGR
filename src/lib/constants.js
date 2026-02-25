// ─── Event metadata ──────────────────────────────────────────────────────────
export const EVENT = {
  name:      'Caídos del Zarzo',
  year:      2026,
  date:      '2026-06-14T06:30:00',
  dateLabel: '14 de Junio 2026',
  location:  'Plaza Central, Villa del Zarzo',
  hashtag:   '#CaidosDelZarzo2026',
  email:     'info@caidosdelzarzo.co',
  whatsapp:  '+57 300 123 4567',
  whatsappHref: 'https://wa.me/573001234567',
  address:   'Centro Deportivo El Zarzo, Villa del Zarzo, Colombia',
  horario:   'Lun – Vie: 9am–6pm · Sáb: 10am–2pm',
}

// ─── Stats ribbon ─────────────────────────────────────────────────────────────
export const STATS = [
  { value: '120 km', label: 'Distancia Gravel' },
  { value: '3 200 m', label: 'Desnivel + Gravel' },
  { value: '45 km', label: 'Distancia Paseo' },
  { value: '900 m', label: 'Desnivel + Paseo' },
  { value: '500+', label: 'Cupos Totales' },
  { value: '8 h', label: 'Tiempo máx. Gravel' },
]

// ─── About feature list ───────────────────────────────────────────────────────
export const FEATURES = [
  'Kit oficial del participante incluido',
  'Avituallamiento en ruta y al llegar',
  'Servicio médico y rescate en ruta',
  'Cronometraje electrónico (Gravel Race)',
  'Fiesta de finalistas y premiación',
  'Fotos y video profesional de la jornada',
  'Seguro de accidentes incluido',
  'App oficial para seguimiento en tiempo real',
]

export const ABOUT_CARDS = [
  { icon: '🏔️', title: 'Terreno Épico', desc: 'Caminos de gravel, senderos técnicos y descensos explosivos entre montañas vírgenes.' },
  { icon: '🤝', title: 'Comunidad', desc: 'Rodadores, familias y aventureros. Un evento para todos los que aman las dos ruedas.' },
  { icon: '🛡️', title: 'Seguridad Total', desc: 'Paramédicos, puntos de control y comunicación constante durante todo el recorrido.' },
  { icon: '🎉', title: 'Post-Carrera', desc: 'Premiación, música en vivo, comida típica y cerveza artesanal para todos los finishers.' },
]

// ─── Categories ───────────────────────────────────────────────────────────────
export const CATEGORIES = {
  gravel: {
    id:       'gravel',
    badge:    '⚡ COMPETITIVA',
    icon:     '🏆',
    name:     'Gravel Race',
    subtitle: 'Para los que no conocen el límite',
    price:    '$120.000 COP',
    specs: [
      { label: 'Distancia',   value: '120 km' },
      { label: 'Desnivel +',  value: '3 200 m' },
      { label: 'Tiempo máx.', value: '8 horas' },
      { label: 'Dificultad',  value: '⬛⬛⬛⬛⬛' },
      { label: 'Cupos',       value: '300 participantes' },
      { label: 'Inscripción', value: '$120.000 COP' },
    ],
    kit: [
      'Número y chip de cronometraje',
      'Maillot oficial de la carrera',
      '5 puntos de avituallamiento',
      'Medalla finisher',
      'Clasificación general y por categoría',
      'Premios económicos top 3 general',
      'Bolsa de corredor (kit, snacks, merch)',
      'Seguro de accidentes',
      'Fotos profesionales',
    ],
    subcats: ['Sub-23', 'Open M/F', 'Master 35+', 'Master 45+', 'Master 55+'],
  },
  paseo: {
    id:       'paseo',
    badge:    '🌿 RECREATIVA',
    icon:     '🌄',
    name:     'El Paseo',
    subtitle: 'Para disfrutar sin presión de tiempo',
    price:    '$60.000 COP',
    specs: [
      { label: 'Distancia',   value: '45 km' },
      { label: 'Desnivel +',  value: '900 m' },
      { label: 'Tiempo máx.', value: 'Sin límite*' },
      { label: 'Dificultad',  value: '⬛⬛⬜⬜⬜' },
      { label: 'Cupos',       value: '200 participantes' },
      { label: 'Inscripción', value: '$60.000 COP' },
    ],
    kit: [
      'Número de participante',
      'Camiseta técnica oficial',
      '3 puntos de avituallamiento',
      'Medalla finisher',
      'Sin cronometraje (disfruta el paisaje)',
      'Apto para familias y principiantes',
      'Bolsa de corredor',
      'Seguro de accidentes',
      'Fotos profesionales',
    ],
    subcats: ['Mayores de 16 años', 'Familias', 'Todos los niveles'],
    note: '* Se recomienda no superar las 5 horas para llegar antes del cierre.',
  },
}

// ─── Route waypoints ──────────────────────────────────────────────────────────
export const WAYPOINTS = {
  gravel: [
    { type: 'start', label: '🟢 Salida – Plaza Central', km: 'Km 0 · Alt. 1 600 m', desc: 'Salida masiva a las 6:30 am con neutralización por el casco urbano.' },
    { type: 'feed',  label: 'Avituallamiento 1 – Vereda Los Pinos', km: 'Km 22 · Alt. 2 100 m', desc: 'Primer control. Agua, electrolitos, frutas y geles.' },
    { type: 'climb', label: '⛰️ Alto del Zarzo – Punto Máximo', km: 'Km 40 · Alt. 3 050 m', desc: 'El punto más alto de la carrera. Vista panorámica de 360°. ¡Fotógrafo oficial aquí!' },
    { type: 'feed',  label: 'Avituallamiento 2 – Finca La Esperanza', km: 'Km 55 · Alt. 1 850 m', desc: 'Descanso mayor. Comida caliente disponible. Asistencia mecánica.' },
    { type: 'feed',  label: 'Avituallamiento 3 – Puente El Diablo', km: 'Km 75 · Alt. 1 200 m', desc: 'Tramo de descenso técnico previo. Zona de hidratación.' },
    { type: 'feed',  label: 'Avituallamiento 4 – Quebrada Honda', km: 'Km 95 · Alt. 1 550 m', desc: 'Última subida importante. Agua y snacks para el sprint final.' },
    { type: 'end',   label: '🏁 Meta – Parque El Zarzo', km: 'Km 120 · Alt. 1 630 m', desc: '¡Lo lograste! Recibe tu medalla finisher, cerveza artesanal y celebra.' },
  ],
  paseo: [
    { type: 'start', label: '🟢 Salida – Plaza Central', km: 'Km 0 · Alt. 1 600 m', desc: 'Salida a las 8:00 am. Ambiente familiar y relajado.' },
    { type: 'feed',  label: 'Avituallamiento 1 – Mirador del Valle', km: 'Km 15 · Alt. 1 900 m', desc: 'Vista espectacular. Agua, frutas y snacks.' },
    { type: 'climb', label: '⛰️ Punto Más Alto – Loma Verde', km: 'Km 25 · Alt. 2 200 m', desc: 'El punto más elevado del paseo. ¡Fotógrafo oficial!' },
    { type: 'feed',  label: 'Avituallamiento 2 – Finca La Esperanza', km: 'Km 35 · Alt. 1 750 m', desc: 'Descanso mayor. Comida disponible. Zona de juegos para niños.' },
    { type: 'end',   label: '🏁 Meta – Parque El Zarzo', km: 'Km 45 · Alt. 1 630 m', desc: '¡Llegaste! Medalla finisher y acceso a la fiesta post-carrera.' },
  ],
}

// ─── Schedule ─────────────────────────────────────────────────────────────────
export const SCHEDULE = {
  sabado: [
    { time: '10:00 am', title: 'Apertura de Registro y Entrega de Kits', desc: 'Centro Deportivo El Zarzo. Presenta tu documento de identidad y recibe tu kit oficial. Horario hasta las 8:00 pm.', highlight: false },
    { time: '3:00 pm',  title: 'Revisión Técnica de Bicicletas', desc: 'Técnicos verificarán frenos, neumáticos, transmisión y equipamiento de seguridad.', highlight: false },
    { time: '4:00 pm',  title: 'Briefing Obligatorio – Gravel Race', desc: 'Reunión de participantes con los organizadores. Asistencia obligatoria. Escenario principal.', highlight: false },
    { time: '5:00 pm',  title: 'Briefing – El Paseo', desc: 'Reunión informativa para participantes del Paseo. Carpa B.', highlight: false },
    { time: '6:00 pm',  title: 'Pasta Party & Noche de Bienvenida', desc: 'Cena de carbohidratos para todos los inscritos. Música en vivo y charlas de ciclistas invitados.', highlight: false },
    { time: '8:00 pm',  title: 'Cierre de Entrega de Kits', desc: 'Último horario de recogida. No habrá entrega el día de la carrera.', highlight: false },
  ],
  domingo: [
    { time: '4:30 am', title: 'Apertura zona de salida', desc: 'Acceso al corral de la Gravel Race. Último control de equipamiento.', highlight: false },
    { time: '6:30 am', title: '🏁 Largada – Gravel Race 120km', desc: 'Salida oficial con neutralización por Villa del Zarzo. ¡El momento que todos esperaban!', highlight: true },
    { time: '8:00 am', title: '🌄 Largada – El Paseo 45km', desc: 'Salida festiva y relajada. ¡A disfrutar la montaña!', highlight: true },
    { time: '11:00 am', title: 'Primeros Finishers Gravel Race', desc: 'Se esperan los primeros ciclistas de elite en meta. Zona de celebración activa.', highlight: false },
    { time: '1:00 pm', title: 'Primeros Finishers Paseo', desc: 'Llegada estimada de los primeros participantes del Paseo a meta.', highlight: false },
    { time: '2:30 pm', title: 'Almuerzo Comunitario', desc: 'Comida típica de la región para todos los participantes y acompañantes.', highlight: false },
    { time: '4:00 pm', title: '🏆 Ceremonia de Premiación', desc: 'Reconocimiento a los primeros 3 puestos de cada categoría y subcategoría. Música en vivo.', highlight: true },
    { time: '5:30 pm', title: 'Fiesta de Clausura', desc: 'Cerveza artesanal de cortesía, música y la mejor compañía.', highlight: false },
  ],
}

// ─── Prizes ───────────────────────────────────────────────────────────────────
export const PODIUM = [
  { pos: '🥇 1er Lugar', amount: '$1.500.000 COP', desc: '+ Trofeo personalizado\n+ Kit premium de patrocinadores\n+ Maillot de campeón', note: 'General Masculino & Femenino', tier: 'gold' },
  { pos: '🥈 2do Lugar', amount: '$800.000 COP',   desc: '+ Trofeo personalizado\n+ Kit de patrocinadores', note: 'General Masculino & Femenino', tier: 'silver' },
  { pos: '🥉 3er Lugar', amount: '$400.000 COP',   desc: '+ Trofeo personalizado\n+ Kit de patrocinadores', note: 'General Masculino & Femenino', tier: 'bronze' },
]

export const SPECIAL_PRIZES = [
  { icon: '🏆', title: 'Rey/Reina de la Montaña', desc: 'Mejor tiempo en el segmento del Alto del Zarzo. Kit especial + $200.000 COP' },
  { icon: '⚡', title: 'Sprint Intermedio', desc: 'Mayor velocidad en el sprint del Km 75. Voucher de tienda oficial.' },
  { icon: '👴', title: 'Veterano Más Veloz', desc: 'Mayor de 55 años con mejor tiempo general. Trofeo especial + kit.' },
  { icon: '🌟', title: 'Subcategorías Gravel', desc: 'Podio en Sub-23, Open, Master 35+, 45+ y 55+. Trofeo + kit.' },
  { icon: '🤳', title: 'Mejor Foto del Evento', desc: 'Vota en Instagram con #CaidosDelZarzo2026. Premio: inscripción 2027 gratis.' },
  { icon: '🏅', title: 'Medalla Finisher', desc: 'Todo participante que complete el recorrido recibe su medalla.' },
]

// ─── FAQ ──────────────────────────────────────────────────────────────────────
export const FAQ_ITEMS = [
  { q: '¿Qué tipo de bicicleta necesito?', a: 'Para la Gravel Race es imprescindible una bicicleta de Gravel o MTB con neumáticos de al menos 35mm y frenos de disco. Para El Paseo cualquier bicicleta de terreno mixto: MTB, gravel, híbrida o cicloturista.' },
  { q: '¿Puedo inscribirme el mismo día del evento?', a: 'No. La inscripción cierra el 9 de junio de 2026 o cuando se agoten los cupos. No habrá inscripciones el día del evento.' },
  { q: '¿Hay política de reembolso?', a: 'Sí. Cancelaciones hasta el 30 de mayo reciben el 80% del valor. Del 31 de mayo al 9 de junio se reembolsa el 50%. Después no hay reembolso, pero puedes ceder tu inscripción (costo administrativo $15.000 COP).' },
  { q: '¿Incluye transporte o alojamiento?', a: 'La inscripción no incluye transporte ni alojamiento. Tenemos alianzas con hoteles locales con tarifas especiales. Escríbenos para el código de descuento.' },
  { q: '¿Dónde dejo la bicicleta al terminar?', a: 'Habrá zona de parqueo de bicicletas vigilada y gratuita en meta desde las 4:30 am hasta las 7:00 pm.' },
  { q: '¿Puedo llevar a mis hijos al evento?', a: '¡Claro! Los menores de 16 años no pueden participar en las categorías de carrera, pero hay zona de actividades recreativas para niños en el área de meta.' },
  { q: '¿Se puede participar en grupo?', a: 'Cada persona debe inscribirse individualmente. Puedes usar el código de grupo para aparecer agrupados en los resultados y tener corral de salida cercano.' },
  { q: '¿Qué pasa si el clima es muy malo?', a: 'La carrera se realiza con lluvia moderada. En caso de emergencia climática extrema se puede postergar. Los organizadores comunicarán cambios por correo y redes sociales con al menos 12 horas de anticipación.' },
  { q: '¿Cómo sé mi número de participante?', a: 'Tu número se asignará al confirmar el pago. Lo recibirás por correo electrónico junto con la confirmación de inscripción.' },
  { q: '¿Habrá servicio de mecánica en ruta?', a: 'Sí. Habrá equipos de apoyo mecánico en los puntos de avituallamiento y una motocicleta de soporte técnico que recorre el circuito periódicamente.' },
]

// ─── Route rules ──────────────────────────────────────────────────────────────
export const ROUTE_RULES = [
  { icon: '⛑️', text: 'Casco rígido **obligatorio** en todo momento.' },
  { icon: '📱', text: 'Celular cargado al **100%** al inicio.' },
  { icon: '🗑️', text: 'Cero basura en el campo. Lleva tus residuos.' },
  { icon: '🔢', text: 'Número visible en manillar y espalda.' },
  { icon: '🤝', text: 'Ayuda a otros ciclistas en apuros.' },
  { icon: '🚫', text: 'Respetar los cierres de ruta. Sin atajos.' },
]

// ─── Modal content ────────────────────────────────────────────────────────────
export const MODAL_CONTENT = {
  terms: {
    title: 'Términos y Condiciones',
    sections: [
      { heading: '1. Aceptación', body: 'Al inscribirse, el participante acepta íntegramente estos términos.' },
      { heading: '2. Participación', body: 'Abierto a mayores de 16 años con condiciones físicas aptas. Los menores de 18 requieren autorización escrita de su representante legal.' },
      { heading: '3. Responsabilidad', body: 'La organización no se hace responsable por accidentes o pérdidas, salvo negligencia comprobable. Cada participante corre bajo su propia responsabilidad.' },
      { heading: '4. Modificaciones', body: 'La organización se reserva el derecho de modificar el recorrido o fechas por razones de seguridad o fuerza mayor.' },
      { heading: '5. Derechos de imagen', body: 'El participante autoriza el uso de fotos y videos tomados durante el evento para fines promocionales.' },
      { heading: '6. Pagos', body: 'La inscripción es personal e intransferible salvo autorización expresa. Los pagos no son reembolsables salvo lo establecido en la política de cancelaciones.' },
    ],
  },
  privacy: {
    title: 'Política de Privacidad',
    sections: [
      { heading: '1. Datos recopilados', body: 'Nombre, documento de identidad, correo electrónico, teléfono, fecha de nacimiento, información médica de emergencia y datos de pago.' },
      { heading: '2. Uso de los datos', body: 'Los datos se utilizan exclusivamente para gestión de inscripciones, comunicaciones del evento y asistencia médica en caso de emergencia.' },
      { heading: '3. Protección', body: 'Los datos se almacenan en servidores seguros con cifrado SSL. No compartimos datos con terceros salvo entidades médicas de emergencia.' },
      { heading: '4. Derechos', body: 'Puedes solicitar acceso, corrección o eliminación de tus datos escribiendo a privacidad@caidosdelzarzo.co' },
    ],
  },
  reglamento: {
    title: 'Reglamento de la Carrera',
    sections: [
      { heading: 'Equipamiento Obligatorio', body: '• Casco rígido homologado\n• Número visible en manillar y espalda\n• Celular con batería al 100%\n• Al menos 1 bidón o sistema de hidratación\n• Kit de reparación básico' },
      { heading: 'Conducta en Ruta', body: '• Respetar señalizaciones y trazado oficial\n• Cero atajos no autorizados\n• Ceder paso a vehículos de emergencia\n• No arrojar basura\n• Ayudar en caso de accidente' },
      { heading: 'Descalificación', body: 'Será descalificado quien: use atajos, reciba asistencia exterior no permitida, cause daño a otro participante, no respete al personal de seguridad.' },
      { heading: 'Tiempo Límite (Gravel Race)', body: 'El tiempo máximo es de 8 horas desde la salida. Participantes fuera de tiempo serán retirados por el servicio de rescate.' },
    ],
  },
}
