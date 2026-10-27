import { Question } from './types.ts';

export const QUESTIONS: Question[] = [
  // Parte 1. Reglas del fútbol — Ֆուտբոլի կանոններ
  {
    id: 1,
    letter: 'A',
    part: 1,
    partTitleEs: 'Parte 1. Reglas del fútbol',
    partTitleHy: 'Մաս 1. Ֆուտբոլի կանոններ',
    textEs: 'Un partido de fútbol normalmente dura 90 minutos.',
    textHy: 'Ֆուտբոլային խաղը սովորաբար տևում է 90 րոպե։',
    isTrue: true,
    explanationEs: 'Normalmente se divide en dos tiempos de 45 minutos.',
    explanationHy: 'Սովորաբար բաժանվում է 45-ական րոպե տևողությամբ երկու խաղակեսի։'
  },
  {
    id: 2,
    letter: 'B',
    part: 1,
    partTitleEs: 'Parte 1. Reglas del fútbol',
    partTitleHy: 'Մաս 1. Ֆուտբոլի կանոններ',
    textEs: 'Un equipo juega con 12 jugadores en el campo.',
    textHy: 'Թիմը խաղադաշտում խաղում է 12 ֆուտբոլիստով։',
    isTrue: false,
    explanationEs: 'Un equipo juega con 11 jugadores.',
    explanationHy: 'Թիմը խաղում է 11 ֆուտբոլիստով։'
  },
  {
    id: 3,
    letter: 'C',
    part: 1,
    partTitleEs: 'Parte 1. Reglas del fútbol',
    partTitleHy: 'Մաս 1. Ֆուտբոլի կանոններ',
    textEs: 'El portero puede tocar el balón con las manos dentro de su propia área penal.',
    textHy: 'Դարպասապահը կարող է իր տուգանային հրապարակում ձեռքերով դիպչել գնդակին։',
    isTrue: true,
    explanationEs: 'Ճիշտ է։ (Կան որոշ բացառություններ՝ օրինակ թիմակցի ոտքով փոխանցումը)։',
    explanationHy: 'Ճիշտ է։ (Կան որոշ բացառություններ, օրինակ՝ թիմակցի կանխամտածված փոխանցումը ոտքով)։'
  },
  {
    id: 4,
    letter: 'D',
    part: 1,
    partTitleEs: 'Parte 1. Reglas del fútbol',
    partTitleHy: 'Մաս 1. Ֆուտբոլի կանոններ',
    textEs: 'Un gol vale dos puntos durante un partido.',
    textHy: 'Խաղի ընթացքում մեկ գոլը հաշվվում է երկու միավոր։',
    isTrue: false,
    explanationEs: 'Un gol cuenta como un gol.',
    explanationHy: 'Մեկ գոլը հաշվվում է որպես մեկ գոլ։'
  },
  {
    id: 5,
    letter: 'E',
    part: 1,
    partTitleEs: 'Parte 1. Reglas del fútbol',
    partTitleHy: 'Մաս 1. Ֆուտբոլի կանոններ',
    textEs: 'El árbitro puede mostrar una tarjeta roja a un jugador.',
    textHy: 'Մրցավարը կարող է ֆուտբոլիստին կարմիր քարտ ցույց տալ։',
    isTrue: true,
    explanationEs: 'La tarjeta roja significa la expulsión inmediata del jugador.',
    explanationHy: 'Կարմիր քարտը նշանակում է ֆուտբոլիստի անհապաղ հեռացում խաղադաշտից։'
  },
  {
    id: 6,
    letter: 'F',
    part: 1,
    partTitleEs: 'Parte 1. Reglas del fútbol',
    partTitleHy: 'Մաս 1. Ֆուտբոլի կանոններ',
    textEs: 'Un penalti se lanza desde once metros.',
    textHy: 'Տասնմեկմետրանոց հարվածը կատարվում է 11 մետր հեռավորությունից։',
    isTrue: true,
    explanationEs: 'El punto de penalti está a exactamente 11 metros (12 yardas) de la línea de gol.',
    explanationHy: '11 մետրանոց նշակետը գտնվում է դարպասի գծից ուղիղ 11 մետր (12 յարդ) հեռավորության վրա։'
  },

  // Parte 2. Durante el partido — Խաղի ընթացքում
  {
    id: 7,
    letter: 'G',
    part: 2,
    partTitleEs: 'Parte 2. Durante el partido',
    partTitleHy: 'Մաս 2. Խաղի ընթացքում',
    textEs: 'Un defensa tiene como función principal proteger su portería.',
    textHy: 'Պաշտպանի հիմնական պարտականությունը սեփական դարպասը պաշտպանելն է։',
    isTrue: true,
    explanationEs: 'Su labor esencial es frenar a los atacantes rivales y evitar goles.',
    explanationHy: 'Նրա գլխավոր խնդիրն է կասեցնել մրցակցի հարձակումները և կանխել գոլերը։'
  },
  {
    id: 8,
    letter: 'H',
    part: 2,
    partTitleEs: 'Parte 2. Durante el partido',
    partTitleHy: 'Մաս 2. Խաղի ընթացքում',
    textEs: 'Un delantero nunca puede ayudar a defender.',
    textHy: 'Հարձակվողը երբեք չի կարող օգնել պաշտպանությանը։',
    isTrue: false,
    explanationEs: 'Un delantero también puede defender.',
    explanationHy: 'Հարձակվողը նույնպես կարող է պաշտպանվել։'
  },
  {
    id: 9,
    letter: 'I',
    part: 2,
    partTitleEs: 'Parte 2. Durante el partido',
    partTitleHy: 'Մաս 2. Խաղի ընթացքում',
    textEs: 'Si el balón sale completamente por la línea de banda, se realiza un saque de banda.',
    textHy: 'Եթե գնդակը ամբողջությամբ անցնում է կողային գիծը, կատարվում է կողային նետում։',
    isTrue: true,
    explanationEs: 'El saque de banda lo efectúa el equipo contrario al último jugador que tocó el balón.',
    explanationHy: 'Կողային նետումը կատարում է այն թիմի մրցակիցը, ում խաղացողը վերջինն է դիպել գնդակին։'
  },
  {
    id: 10,
    letter: 'J',
    part: 2,
    partTitleEs: 'Parte 2. Durante el partido',
    partTitleHy: 'Մաս 2. Խաղի ընթացքում',
    textEs: 'En un saque de banda, el jugador lanza el balón con una sola mano.',
    textHy: 'Կողային նետման ժամանակ ֆուտբոլիստը գնդակը նետում է մեկ ձեռքով։',
    isTrue: false,
    explanationEs: 'Se lanza con las dos manos por encima de la cabeza.',
    explanationHy: 'Գնդակը նետում են երկու ձեռքով՝ գլխավերևից։'
  },
  {
    id: 11,
    letter: 'K',
    part: 2,
    partTitleEs: 'Parte 2. Durante el partido',
    partTitleHy: 'Մաս 2. Խաղի ընթացքում',
    textEs: 'Un jugador puede marcar un gol directamente desde un saque de esquina.',
    textHy: 'Ֆուտբոլիստը կարող է անմիջապես գոլ խփել անկյունային հարվածից։',
    isTrue: true,
    explanationEs: 'Conocido históricamente en el fútbol como "gol olímpico".',
    explanationHy: 'Ֆուտբոլում դա հայտնի է նաև որպես «օլիմպիական գոլ»։'
  },
  {
    id: 12,
    letter: 'L',
    part: 2,
    partTitleEs: 'Parte 2. Durante el partido',
    partTitleHy: 'Մաս 2. Խաղի ընթացքում',
    textEs: 'Un jugador está siempre en fuera de juego cuando está delante del balón.',
    textHy: 'Ֆուտբոլիստը միշտ խաղից դուրս վիճակում է, երբ գտնվում է գնդակից առաջ։',
    isTrue: false,
    explanationEs: 'Estar delante del balón no significa siempre estar en fuera de juego (depende de los defensores, propio campo, etc.).',
    explanationHy: 'Գնդակից առաջ լինելը միշտ չի նշանակում խաղից դուրս վիճակ (կախված է պաշտպանների դիրքից, սեփական կիսադաշտից և այլն)։'
  },

  // Parte 3. Entrenamiento — Մարզում
  {
    id: 13,
    letter: 'M',
    part: 3,
    partTitleEs: 'Parte 3. Entrenamiento',
    partTitleHy: 'Մաս 3. Մարզում',
    textEs: 'Calentar antes de jugar ayuda a preparar los músculos.',
    textHy: 'Խաղից առաջ տաքացումը օգնում է պատրաստել մկանները։',
    isTrue: true,
    explanationEs: 'El calentamiento previene lesiones musculares y mejora el rendimiento.',
    explanationHy: 'Տաքացումը կանխում է մկանային վնասվածքները և բարելավում մարզավիճակը։'
  },
  {
    id: 14,
    letter: 'N',
    part: 3,
    partTitleEs: 'Parte 3. Entrenamiento',
    partTitleHy: 'Մաս 3. Մարզում',
    textEs: 'Un futbolista solo necesita entrenar las piernas.',
    textHy: 'Ֆուտբոլիստը պետք է մարզի միայն ոտքերը։',
    isTrue: false,
    explanationEs: 'Debe entrenar todo el cuerpo: tronco, resistencia cardiovascular, agilidad y fuerza general.',
    explanationHy: 'Պետք է մարզի ամբողջ մարմինը՝ իրանը, դիմացկունությունը, ճկունությունը և ընդհանուր ուժը։'
  },
  {
    id: 15,
    letter: 'Ñ',
    part: 3,
    partTitleEs: 'Parte 3. Entrenamiento',
    partTitleHy: 'Մաս 3. Մարզում',
    textEs: 'Beber agua durante los descansos ayuda a mantener una buena hidratación.',
    textHy: 'Ընդմիջումների ժամանակ ջուր խմելը օգնում է պահպանել օրգանիզմի ջրային հավասարակշռությունը։',
    isTrue: true,
    explanationEs: 'La correcta hidratación es vital para evitar calambres y deshidratación.',
    explanationHy: 'Ճիշտ ջրային հավասարակշռությունը կենսական է մկանային ձգումները և ջրազրկումը կանխելու համար։'
  },
  {
    id: 16,
    letter: 'O',
    part: 3,
    partTitleEs: 'Parte 3. Entrenamiento',
    partTitleHy: 'Մաս 3. Մարզում',
    textEs: 'Es mejor jugar con una lesión sin decírselo al entrenador.',
    textHy: 'Ավելի լավ է վնասվածքով խաղալ՝ առանց մարզչին ասելու։',
    isTrue: false,
    explanationEs: 'Hay que informar al entrenador sobre una lesión.',
    explanationHy: 'Վնասվածքի մասին պետք է տեղեկացնել մարզչին։'
  },
  {
    id: 17,
    letter: 'P',
    part: 3,
    partTitleEs: 'Parte 3. Entrenamiento',
    partTitleHy: 'Մաս 3. Մարզում',
    textEs: 'Entrenar los pases mejora el juego en equipo.',
    textHy: 'Փոխանցումները մարզելը բարելավում է թիմային խաղը։',
    isTrue: true,
    explanationEs: 'La precisión en los pases es la base del control y la circulación del balón.',
    explanationHy: 'Ճշգրիտ փոխանցումները հանդիսանում են գնդակի վերահսկման և թիմային խաղի հիմքը։'
  },
  {
    id: 18,
    letter: 'Q',
    part: 3,
    partTitleEs: 'Parte 3. Entrenamiento',
    partTitleHy: 'Մաս 3. Մարզում',
    textEs: 'Un buen futbolista nunca necesita descansar.',
    textHy: 'Լավ ֆուտբոլիստը երբեք հանգստանալու կարիք չունի։',
    isTrue: false,
    explanationEs: 'El descanso es importante para recuperarse.',
    explanationHy: 'Հանգիստը կարևոր է վերականգնվելու համար։'
  },

  // Parte 4. Situaciones reales — Իրական իրավիճակներ
  {
    id: 19,
    letter: 'R',
    part: 4,
    partTitleEs: 'Parte 4. Situaciones reales',
    partTitleHy: 'Մաս 4. Իրական իրավիճակներ',
    textEs: 'Si un compañero está libre, puede ser buena idea pasarle el balón.',
    textHy: 'Եթե թիմակիցդ ազատ է, կարող է լավ որոշում լինել նրան գնդակը փոխանցելը։',
    isTrue: true,
    explanationEs: 'El fútbol es un deporte colectivo donde aprovechar los espacios libres es clave.',
    explanationHy: 'Ֆուտբոլը թիմային խաղ է, որտեղ ազատ գոտիներն օգտագործելը որոշիչ նշանակություն ունի։'
  },
  {
    id: 20,
    letter: 'S',
    part: 4,
    partTitleEs: 'Parte 4. Situaciones reales',
    partTitleHy: 'Մաս 4. Իրական իրավիճակներ',
    textEs: 'Si tu equipo pierde por un gol, el partido ya está perdido.',
    textHy: 'Եթե քո թիմը պարտվում է մեկ գոլով, խաղն արդեն պարտված է։',
    isTrue: false,
    explanationEs: 'Todavía podéis empatar o ganar.',
    explanationHy: 'Դուք դեռ կարող եք հավասարեցնել հաշիվը կամ հաղթել։'
  },
  {
    id: 21,
    letter: 'T',
    part: 4,
    partTitleEs: 'Parte 4. Situaciones reales',
    partTitleHy: 'Մաս 4. Իրական իրավիճակներ',
    textEs: 'Un capitán debe animar a sus compañeros.',
    textHy: 'Թիմի ավագը պետք է ոգևորի իր թիմակիցներին։',
    isTrue: true,
    explanationEs: 'El liderazgo positivo y el apoyo moral son esenciales para un capitán.',
    explanationHy: 'Դրական առաջնորդությունն ու բարոյական աջակցությունը էական են ավագի համար։'
  },
  {
    id: 22,
    letter: 'U',
    part: 4,
    partTitleEs: 'Parte 4. Situaciones reales',
    partTitleHy: 'Մաս 4. Իրական իրավիճակներ',
    textEs: 'Cuando un compañero comete un error, lo mejor es insultarlo.',
    textHy: 'Երբ թիմակիցը սխալ է թույլ տալիս, լավագույն տարբերակը նրան վիրավորելն է։',
    isTrue: false,
    explanationEs: 'Es mejor apoyarlo y animarlo.',
    explanationHy: 'Ավելի լավ է աջակցել և ոգևորել նրան։'
  },
  {
    id: 23,
    letter: 'V',
    part: 4,
    partTitleEs: 'Parte 4. Situaciones reales',
    partTitleHy: 'Մաս 4. Իրական իրավիճակներ',
    textEs: 'Un portero debe comunicarse con sus defensas.',
    textHy: 'Դարպասապահը պետք է շփվի իր պաշտպանների հետ։',
    isTrue: true,
    explanationEs: 'El portero ve todo el campo y organiza las marcas defensivas mediante la voz.',
    explanationHy: 'Դարպասապահը տեսնում է ամբողջ դաշտը և ձայնով կազմակերպում է պաշտպանությունը։'
  },
  {
    id: 24,
    letter: 'W',
    part: 4,
    partTitleEs: 'Parte 4. Situaciones reales',
    partTitleHy: 'Մաս 4. Իրական իրավիճակներ',
    textEs: 'Si el entrenador cambia la táctica, los jugadores deben adaptarse.',
    textHy: 'Եթե մարզիչը փոխում է մարտավարությունը, ֆուտբոլիստները պետք է հարմարվեն։',
    isTrue: true,
    explanationEs: 'La adaptabilidad táctica durante el juego permite responder a los cambios del rival.',
    explanationHy: 'Խաղի ընթացքում մարտավարական ճկունությունը թույլ է տալիս արձագանքել մրցակցին։'
  },

  // Parte 5. Preguntas más difíciles — Ավելի բարդ հարցեր
  {
    id: 25,
    letter: 'X',
    part: 5,
    partTitleEs: 'Parte 5. Preguntas más difíciles',
    partTitleHy: 'Մաս 5. Ավելի բարդ հարցեր',
    textEs: 'Un jugador puede recibir una tarjeta roja después de dos tarjetas amarillas en el mismo partido.',
    textHy: 'Ֆուտբոլիստը նույն խաղում երկու դեղին քարտ ստանալուց հետո կարող է կարմիր քարտ ստանալ։',
    isTrue: true,
    explanationEs: 'Dos amonestaciones amarillas se convierten automáticamente en tarjeta roja (expulsión).',
    explanationHy: 'Երկու դեղին քարտը ինքնաբերաբար վերածվում է կարմիր քարտի (հեռացում)։'
  },
  {
    id: 26,
    letter: 'Y',
    part: 5,
    partTitleEs: 'Parte 5. Preguntas más difíciles',
    partTitleHy: 'Մաս 5. Ավելի բարդ հարցեր',
    textEs: 'Si el portero toca el balón con la mano fuera de su área penal, siempre recibe una tarjeta roja.',
    textHy: 'Եթե դարպասապահը տուգանային հրապարակից դուրս ձեռքով դիպչում է գնդակին, նա միշտ կարմիր քարտ է ստանում։',
    isTrue: false,
    explanationEs: 'La sanción depende de la situación: si no evita una ocasión manifiesta de gol, puede ser amarilla o solo tiro libre.',
    explanationHy: 'Պատիժը կախված է իրավիճակից. եթե դա ակնհայտ գոլային պահ չի խափանում, կարող է լինել դեղին քարտ կամ միայն տուգանային հարված։'
  },
  {
    id: 27,
    letter: 'Z',
    part: 5,
    partTitleEs: 'Parte 5. Preguntas más difíciles',
    partTitleHy: 'Մաս 5. Ավելի բարդ հարցեր',
    textEs: 'Un jugador puede estar en fuera de juego si recibe el balón directamente de un saque de banda.',
    textHy: 'Ֆուտբոլիստը կարող է հայտնվել խաղից դուրս վիճակում, եթե գնդակը ստանում է անմիջապես կողային նետումից։',
    isTrue: false,
    explanationEs: 'No existe fuera de juego directamente de un saque de banda (tampoco de saque de esquina o saque de meta).',
    explanationHy: 'Անմիջապես կողային նետումից խաղից դուրս վիճակ չի արձանագրվում (ինչպես նաև անկյունայինից և դարպասապահի հարվածից)։'
  }
];
