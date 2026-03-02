// ─── Event metadata ──────────────────────────────────────────────────────────
export const EVENT = {
  name:      'Caídos del Zarzo',
  year:      2025,
  date:      '2025-09-19T07:00:00',
  dateLabel: '19 y 20 de septiembre 2025',
  location:  'Sevilla, Valle del Cauca',
  organizer: 'Caídos del Zarzo',
  hashtag:   '#CaidosDelZarzo',
  email:     'info@caidosdelzarzo.co',
  whatsapp:  '+57 300 123 4567',
  whatsappHref: 'https://wa.me/573001234567',
  address:   'Sevilla, Valle del Cauca, Colombia',
  capacity:  280,
}

// ─── Stats ribbon ─────────────────────────────────────────────────────────────
export const STATS = [
  { value: '280',     label: 'Cupos' },
  { value: '110 km',  label: 'La Trocha' },
  { value: '2.500 m', label: 'Desnivel +' },
  { value: '60 km',   label: 'La Visita' },
  { value: '2',       label: 'Modalidades' },
]

// ─── Categories (used by Registration form) ─────────────────────────────────
export const CATEGORIES = {
  gravel: {
    id:         'gravel',
    badge:      'COMPETITIVA',
    icon:       '⛰️',
    name:       'La Trocha',
    subtitle:   '240 cupos · Cronometrada',
    price:      '$499.000 COP',
    priceNum:   499000,
    difficulty: 5,
    specs: [
      { label: 'Distancia',   value: '90–110 km' },
      { label: 'Desnivel +',  value: '2.000–2.500 m' },
      { label: 'Terreno',     value: 'Destapados técnicos' },
      { label: 'Tiempo est.', value: '7–10 horas' },
    ],
    kit: [
      'Jersey de ciclismo exclusivo del evento',
      'Pocillo cafetero esmaltado',
      'Mapa-póster de la ruta',
      'Número de participante y cronometraje',
      'Nutrition bag de yute con productos locales',
      '3 puntos de hidratación y alimentación',
      'Mecánico volante en moto',
      'Cuarto de libra de café de Sevilla',
    ],
    subcats: ['Open Masculino', 'Open Femenino', 'Master 35+'],
  },
  paseo: {
    id:         'paseo',
    badge:      'EXPERIENCIA',
    icon:       '☕',
    name:       'La Visita',
    subtitle:   '40 cupos · Sin cronómetro',
    price:      '$399.000 COP',
    priceNum:   399000,
    difficulty: 2,
    specs: [
      { label: 'Distancia',   value: '45–60 km' },
      { label: 'Desnivel +',  value: '800–1.200 m' },
      { label: 'Paradas',     value: '3–4 experienciales' },
      { label: 'Tiempo est.', value: '4–5 horas' },
    ],
    kit: [
      'Jersey de ciclismo exclusivo del evento',
      'Pocillo cafetero esmaltado',
      'Mapa-póster de la ruta',
      'Número de participante',
      'Nutrition bag de yute con productos locales',
      '3–4 paradas con café, frutas y agua de panela',
      'Visita a finca cafetera en ruta',
      'Cuarto de libra de café de Sevilla',
    ],
    subcats: ['Todos los niveles'],
    note: 'Solo 40 cupos — experiencia íntima y exclusiva.',
  },
}

// ─── Schedule ─────────────────────────────────────────────────────────────────
export const SCHEDULE = {
  sabado: [
    { time: 'Mañana',   title: 'Registro y Kit', desc: 'Llegás a Sevilla y recogés tu kit en un punto central del pueblo. Mecánico disponible para ajustes de último minuto.', highlight: false },
    { time: 'Tarde',    title: 'Feria y Mercado Campesino', desc: 'El parque principal se transforma. Productores locales con café de las veredas, panela, miel, frutas, conservas, quesos. La forma más directa de conocer el territorio antes de rodarlo.', highlight: false },
    { time: 'Tarde',    title: 'La Doble al Manzanillo', desc: 'Tradición ciclista revivida. Un grupo seleccionado sale rumbo a la vereda de Manzanillo. En cada parada recibe una pieza de indumentaria campesina. Al regreso, brindis con aguardiente en el parque.', highlight: true },
    { time: 'Noche',    title: 'Charla de Ruta', desc: 'Un caficultor o líder veredal presenta el territorio y cuenta la historia de cada camino por donde van a pasar al día siguiente.', highlight: false },
  ],
  domingo: [
    { time: '5:30 AM',  title: 'Desayuno Campesino', desc: 'Calentado, huevos, arepa, chocolate y fruta. Comida de verdad para lo que viene.', highlight: false },
    { time: '6:30 AM',  title: 'Concentración', desc: 'La Trocha y La Visita juntos en el punto de salida.', highlight: false },
    { time: '7:00 AM',  title: 'Salida Conjunta', desc: 'Los 280 participantes salen juntos. Primeros 10–15 km todos por el mismo camino, luego bifurcación.', highlight: true },
    { time: '11:30–1 PM', title: 'Llegada La Visita', desc: 'Los participantes de La Visita van regresando después de recorrer los caminos más lindos del territorio.', highlight: false },
    { time: 'Tarde',    title: 'Llegadas La Trocha', desc: 'Los corredores de La Trocha van llegando a lo largo de la tarde después de 7 a 10 horas de ruta.', highlight: false },
    { time: 'Tarde',    title: 'La Fiesta del Zarzo', desc: 'Almuerzo valluno, premiación breve (3 categorías), música, cerveza e historias de ruta. Cada participante recibe su cuarto de libra de café.', highlight: true },
  ],
}

// ─── Modal content (used by Registration) ────────────────────────────────────
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
    title: 'Reglamento',
    sections: [
      { heading: 'Equipamiento Obligatorio', body: '• Casco rígido homologado\n• Celular con batería al 100%\n• Al menos 1 bidón o sistema de hidratación\n• Kit de reparación básico (cámara, bomba, desmontables)' },
      { heading: 'Conducta en Ruta', body: '• Respetar señalizaciones y trazado oficial\n• Cero atajos no autorizados\n• No arrojar basura — si lo empacaste, te lo llevas\n• Ayudar en caso de accidente' },
      { heading: 'Descalificación', body: 'Será descalificado quien use atajos, reciba asistencia exterior no permitida, o cause daño a otro participante.' },
    ],
  },
}

// ─── Kept for backward compat with Registration and other components ─────────
export const FEATURES = []
export const ABOUT_CARDS = []
export const WAYPOINTS = { gravel: [], paseo: [] }
export const ROUTE_RULES = []
export const FAQ_ITEMS = []
export const PODIUM = []
export const SPECIAL_PRIZES = []
