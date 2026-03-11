// Boulder Zona — single source of truth for all site content.

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ContactInfo {
  name: string
  address: string
  addressNote: string
  transportNote: string
  phones: string[]
  email: string
  emailInfo: string
  socialLinks: string[] // TODO: add real social URLs
  mapLink: string // TODO: add Google Maps embed/link
}

export interface OpeningHoursSlot {
  days: string
  open: string
  close: string
}

export interface Hours {
  weekdays: OpeningHoursSlot
  weekend: OpeningHoursSlot
}

export interface NavItem {
  label: string
  href: string
}

export interface Nav {
  items: NavItem[]
}

export interface About {
  headline: string
  bullets: string[]
  mission: string
  foundersIntro: string
  vision: string
  closing: string
}

export interface DifficultyLevel {
  name: string
  description: string
}

export interface HelpRule {
  title: string
  text: string
}

export interface HelpSection {
  kicker: string
  headline: string
  description?: string
  rules: HelpRule[]
}

export interface Help {
  title: string
  intro: {
    kicker: string
    headline: string
    paragraphs: string[]
  }
  markings: HelpSection
  difficultyLegend: DifficultyLevel[]
}

export interface PricingRow {
  name: string
  prices: Record<string, number>
  highlight?: boolean
}

export interface Addon {
  name: string
  price: number
  note?: string
}

export interface Pricing {
  categories: string[]
  categoryNotes?: Record<string, string>
  items: PricingRow[]
  addons: Addon[]
}

export interface Seo {
  siteName: string
  defaultTitle: string
  defaultDescription: string
  ogImage: string
}

export interface SiteUi {
  hoursLabel: string
  addressLabel: string
  mapHintLabel: string
  comingSoonLabel: string
  readMoreLabel: string
  footerHours: string
  footerContact: string
  footerDocs: string
  footerInfoLabel: string
  footerBizLabel: string
  footerTagline: string
  menuOpenLabel: string
  closeLabel: string
  prevImageLabel: string
  nextImageLabel: string
  galleryModalLabel: string
  photoLabel: string
  pricingKicker: string
  pricingTitle: string
  pricingNote: string
  pricingBadge: string
  pricingAddonsKicker: string
  pricingAddonsSub: string
  galleryKicker: string
  galleryTitle: string
  helpKicker: string
  difficultyKicker: string
  difficultyHeadline: string
  difficultyDesc: string
  aboutKicker: string
  aboutFoundersBadge: string
  newsTitle: string
}

export interface SiteContent {
  contact: ContactInfo
  hours: Hours
  nav: Nav
  about: About
  help: Help
  pricing: Pricing
  seo: Seo
  ui: SiteUi
}

// ---------------------------------------------------------------------------
// Hungarian defaults
// ---------------------------------------------------------------------------

export const site: SiteContent = {
  contact: {
    name: 'Boulder Zóna',
    address: '4029, Debrecen, Déli sor 29.',
    addressNote: 'Az udvarba érkezve, leghátul balra találjátok a bejáratunkat.',
    transportNote: 'A terem körülbelül 15 perc sétára helyezkedik el a Nagyállomástól. Tömegközlekedéssel is könnyen megközelíthető: a 30, 30A vagy 30H jelzésű buszokra felszállva a Trombitás utca megállónál kell leszállni.',
    phones: ['+36706360134', '+36308506098'],
    email: 'boulderzonabz@gmail.com',
    emailInfo: 'info@boulderzona.hu',
    socialLinks: ['https://www.instagram.com/boulderzona','https://www.facebook.com/profile.php?id=61585562433494','https://www.tiktok.com/@boulder.zona'],
    mapLink: '',
  },

  hours: {
    weekdays: { days: 'Hétfő – Péntek', open: '8:00', close: '21:00' },
    weekend: { days: 'Szombat – Vasárnap', open: '10:00', close: '20:00' },
  },

  nav: {
    items: [
      { label: 'Rólunk', href: '#rolunk' },
      { label: 'Árlista', href: '#arlista' },
      { label: 'Galéria', href: '#galeria' },
      { label: 'Segédlet', href: '#segedlet' },
      { label: 'Hírek', href: '#hirek' },
      { label: 'Kapcsolat', href: '#kapcsolat' },
    ],
  },

  about: {
    headline: 'Megnyílik Debrecen legmodernebb boulder terme.',
    bullets: [
      'Fényes terek. Kiváló fogások. Valódi kihívások.',
      'Közösségi tér kicsiknek és nagyoknak.',
      'Találkozunk a falakon.',
    ],
    mission: 'A mászás mindenkié.',
    foundersIntro:
      'Mi ketten vagyunk mögötte: Zoli és Bence. Két srác, akik régóta másznak, ' +
      'gondolkodnak terekről, közösségekről, és arról, hogy milyen helyre szeretnének ' +
      'szívesen visszajárni. Olyan boulder termet álmodtunk meg Debrecenben, ahol a ' +
      'minőség, a mozgás öröme és az emberi hozzáállás egyformán fontos.',
    vision:
      'A célunk egy modern, világos, technikailag erős boulder terem, kimagasló ' +
      'színvonalú fogásokkal és átgondolt útvonalakkal. De ennél többet szeretnénk: ' +
      'egy közösségi teret, ahol kezdők és haladók, gyerekek és felnőttek, egyedül ' +
      'érkezők és baráti társaságok egyaránt otthon érzik magukat.',
    closing:
      'Debrecenben egy olyan boulder termet nyitunk, ahol a falaké a főszerep, ' +
      'de az emberek adják meg az igazi értelmét.',
  },

  help: {
    title: 'Segédlet',
    intro: {
      kicker: 'Mi az a boulderezés?',
      headline: 'Kötél nélküli mászás, biztonságos környezetben.',
      paragraphs: [
        'A boulderezés kötél nélküli, alacsony falon végzett mászás. A falak alatt vastag szivacs (matrac) nyújt biztonságot esésnél.',
        'Az utak (problémák) rövid, de intenzív mozdulatsorokból állnak. Minden út egy rejtvény, amit a tested segítségével oldasz meg.',
        'Nem kell hozzá előképzettség – bárki elkezdheti, életkortól és erőnléttől függetlenül.',
      ],
    },
    markings: {
      kicker: 'Jelölések',
      headline: 'Hogyan működnek az utak?',
      description: 'Minden út színkódolt – kövesd az alábbi szabályokat a biztonságos és helyes mászáshoz.',
      rules: [
        {
          title: 'Startfogások',
          text: 'Az utak kezdő fogásait a nehézség jelzésére szolgáló szimbólumok mutatják. Lehet egy fogás is, amit két kézzel kell megfogni, vagy két külön fogás egy-egy kéznek. A láb helyzete nincs meghatározva.',
        },
        {
          title: 'Fekete fa elemek',
          text: 'A fekete fa elemek a fal részei, minden útban egyaránt használhatóak, fogásként és lépésként is.',
        },
        {
          title: 'Egy szín, egy út',
          text: 'Minden útban csak az adott színű fogásokat, a fekete fa elemeket és a fal oldaléleit lehet használni. A fal tetejét segítségül venni az út teljesítéséhez tilos.',
        },
        {
          title: 'Topfogás (cél)',
          text: 'A "top" fogást a céltábla szimbólum jelöli minden útnál. Ezt kell két kézzel érinteni, stabil testhelyzetben az út teljesítéséhez.',
        },
        {
          title: 'Lemászó fogások',
          text: 'A szürke fogások nem tartoznak egyik útba sem, a lemászás megkönnyítésére szolgálnak.',
        },
      ],
    },
    difficultyLegend: [
      {
        name: 'Rajtzászló',
        description: 'Elrajtolsz a mászás világában. Ezek az utak tökéletesek az első próbálkozásokhoz, nem igényelnek haladó technikát vagy nyers erőt. A cél: bevezetés a mászás világába.',
      },
      {
        name: 'Mászó cipőnyomok',
        description: 'Megtetted az első lépéseket. Ezeken az utakon már érdemes mászócipőt használni, szükség lehet több erőfeszítésre és koncentrációra.',
      },
      {
        name: 'Feszített bicepszes kar',
        description: 'Már másztál korábban, vagy sportos múltad van. Ezek az utak erőt és tudatos testkontrollt igényelnek, hogy a súlypontod és mozdulataid összhangban legyenek.',
      },
      {
        name: 'Fogaskerék',
        description: 'Haladó mászó vagy. Itt már nem elég az erő és a technika: az utak igazi logikai kihívást jelentenek, a teljes tested és az elméd koordinációját kérik.',
      },
      {
        name: 'Tűz',
        description: 'Magas fokon égsz a mászás iránt. Ezek az utak a megszállottság és a szenvedély terepei, ahol a sport szeretete minden mozdulatodban látszik.',
      },
      {
        name: 'Magnus Midtbo',
        description: 'Határ a csillagos ég. Elérted azt a szintet, amin Magnus Midtbo a bemelegítéseit végzi. Büszke lehetsz a befektetett munkára: ezek az utak a csúcsot képviselik.',
      },
    ],
  },

  pricing: {
    categories: ['Felnőtt', 'Diák', 'Gyerek'],
    categoryNotes: { Gyerek: '12 éves korig' },
    items: [
      { name: 'Napi jegy', prices: { Felnőtt: 3300, Diák: 2800, Gyerek: 2400 } },
      { name: 'Havi bérlet', prices: { Felnőtt: 28000, Diák: 24000, Gyerek: 21000 }, highlight: true },
      { name: '10 alkalmas', prices: { Felnőtt: 30000, Diák: 25500, Gyerek: 22000 } },
      { name: '3 havi bérlet', prices: { Felnőtt: 72000, Diák: 61000, Gyerek: 54000 } },
      { name: 'Fél éves bérlet', prices: { Felnőtt: 135000, Diák: 110000, Gyerek: 95000 } },
      { name: 'Éves bérlet', prices: { Felnőtt: 250000, Diák: 200000, Gyerek: 165000 } },
    ],
    addons: [
      { name: 'Cipő bérlés', price: 700 },
      { name: 'Zia bérlés', price: 500 },
    ],
  },

  seo: {
    siteName: 'Boulder Zóna',
    defaultTitle: 'Boulder Zóna – boulder terem Debrecenben',
    defaultDescription:
      'Modern, világos boulder terem Debrecenben. Árlista, segédlet és elérhetőségek egy helyen.',
    ogImage: '',
  },

  ui: {
    hoursLabel: 'Nyitvatartás',
    addressLabel: 'Címünk',
    mapHintLabel: 'Kattints a térkép megnyitásához',
    comingSoonLabel: 'Hamarosan érkezik',
    readMoreLabel: 'Tovább →',
    footerHours: 'Nyitvatartás',
    footerContact: 'Elérhetőség',
    footerDocs: 'Dokumentumok',
    footerInfoLabel: 'Információ / érdeklődés:',
    footerBizLabel: 'Üzleti megkeresés:',
    footerTagline: 'Boulder terem Debrecenben',
    menuOpenLabel: 'Menü megnyitása',
    closeLabel: 'Bezárás',
    prevImageLabel: 'Előző kép',
    nextImageLabel: 'Következő kép',
    galleryModalLabel: 'Galéria',
    photoLabel: 'kép',
    pricingKicker: 'Árlista',
    pricingTitle: 'Válaszd ki a neked megfelelő jegyet vagy bérletet.',
    pricingNote: 'Áraink forintban értendők. Kísérőknek jegy váltása nem kötelező.',
    pricingBadge: 'Népszerű',
    pricingAddonsKicker: 'Extrák',
    pricingAddonsSub: 'Kiegészítő szolgáltatások',
    galleryKicker: 'Galéria',
    galleryTitle: 'Nézz körül a termünkben',
    helpKicker: 'Segédlet',
    difficultyKicker: 'Nehézségi szintek',
    difficultyHeadline: 'Hat szint a kezdőtől az elitig',
    difficultyDesc: 'Minden út jelölve van – keresd a szimbólumokat a startfogásoknál.',
    aboutKicker: 'Rólunk',
    aboutFoundersBadge: 'Alapítók',
    newsTitle: 'A terem hírei és közösségi frissítések egy helyen.',
  },
}

// ---------------------------------------------------------------------------
// English defaults
// ---------------------------------------------------------------------------

export const siteEn: SiteContent = {
  contact: {
    name: 'Boulder Zóna',
    address: '4029, Debrecen, Déli sor 29.',
    addressNote: 'Once in the courtyard, the entrance is in the back on the left.',
    transportNote: 'The gym is approximately 15 minutes on foot from the Main Station. Easily reachable by public transport: take buses 30, 30A or 30H and get off at the Trombitás utca stop.',
    phones: ['+36706360134', '+36308506098'],
    email: 'boulderzonabz@gmail.com',
    emailInfo: 'info@boulderzona.hu',
    socialLinks: ['https://www.instagram.com/boulderzona','https://www.facebook.com/profile.php?id=61585562433494','https://www.tiktok.com/@boulder.zona'],
    mapLink: '',
  },

  hours: {
    weekdays: { days: 'Monday – Friday', open: '8:00', close: '21:00' },
    weekend: { days: 'Saturday – Sunday', open: '10:00', close: '20:00' },
  },

  nav: {
    items: [
      { label: 'About', href: '#rolunk' },
      { label: 'Pricing', href: '#arlista' },
      { label: 'Gallery', href: '#galeria' },
      { label: 'Guide', href: '#segedlet' },
      { label: 'News', href: '#hirek' },
      { label: 'Contact', href: '#kapcsolat' },
    ],
  },

  about: {
    headline: "Debrecen's most modern bouldering gym is opening.",
    bullets: [
      'Bright spaces. Excellent holds. Real challenges.',
      'A community space for kids and adults alike.',
      'See you on the walls.',
    ],
    mission: 'Climbing is for everyone.',
    foundersIntro:
      "It's the two of us: Zoli and Bence. Two guys who have been climbing for a long time, " +
      "thinking about spaces, communities, and what kind of place they'd love to come back to. " +
      "We dreamed up a bouldering gym in Debrecen where quality, the joy of movement, and a " +
      "human approach are equally important.",
    vision:
      "Our goal is a modern, bright, technically strong bouldering gym, with outstanding " +
      "holds and well-designed routes. But we want more than that: a community space where " +
      "beginners and advanced climbers, children and adults, solo visitors and groups of " +
      "friends alike feel at home.",
    closing:
      "In Debrecen, we're opening a bouldering gym where the walls take center stage, " +
      "but the people give it its true meaning.",
  },

  help: {
    title: 'Guide',
    intro: {
      kicker: 'What is bouldering?',
      headline: 'Rope-free climbing in a safe environment.',
      paragraphs: [
        'Bouldering is rope-free climbing on low walls. Thick foam mats below the walls provide safety in case of a fall.',
        'The routes (problems) consist of short but intense movement sequences. Each route is a puzzle that you solve with your body.',
        'No prior experience needed – anyone can start, regardless of age or fitness level.',
      ],
    },
    markings: {
      kicker: 'Markings',
      headline: 'How do the routes work?',
      description: 'Every route is color-coded – follow the rules below for safe and correct climbing.',
      rules: [
        {
          title: 'Start holds',
          text: 'The starting holds of each route are marked with difficulty symbols. There may be one hold to grip with both hands, or two separate holds, one for each hand. Foot position is not specified.',
        },
        {
          title: 'Black wooden elements',
          text: 'Black wooden elements are part of the wall and can be used in every route, both as hand and foot holds.',
        },
        {
          title: 'One color, one route',
          text: 'On each route, only the holds of the specific color, black wooden elements, and the side edges of the wall may be used. Using the top of the wall to complete a route is not allowed.',
        },
        {
          title: 'Top hold (goal)',
          text: 'The "top" hold is marked with a target symbol on every route. You must touch it with both hands in a stable position to complete the route.',
        },
        {
          title: 'Downclimb holds',
          text: 'Gray holds do not belong to any route – they are there to make downclimbing easier.',
        },
      ],
    },
    difficultyLegend: [
      {
        name: 'Starting flag',
        description: 'You are taking off into the world of climbing. These routes are perfect for first attempts, requiring no advanced technique or raw strength. The goal: an introduction to climbing.',
      },
      {
        name: 'Climbing shoe prints',
        description: "You've taken your first steps. On these routes it's worth wearing climbing shoes, and some extra effort and concentration will be needed.",
      },
      {
        name: 'Flexed bicep',
        description: "You've climbed before, or you have an athletic background. These routes require strength and deliberate body control to keep your center of gravity and movements in sync.",
      },
      {
        name: 'Gear',
        description: "You're an advanced climber. Here, strength and technique are not enough: the routes present real logical challenges, requiring coordination of your whole body and mind.",
      },
      {
        name: 'Fire',
        description: "You burn at a high level for climbing. These routes are the territory of obsession and passion, where your love of the sport shows in every move.",
      },
      {
        name: 'Magnus Midtbo',
        description: "The sky's the limit. You've reached the level that Magnus Midtbo uses for his warm-ups. Be proud of the work you've put in: these routes represent the peak.",
      },
    ],
  },

  pricing: {
    categories: ['Adult', 'Student', 'Child'],
    categoryNotes: { Child: 'Up to 12 years old' },
    items: [
      { name: 'Day pass', prices: { Adult: 3300, Student: 2800, Child: 2400 } },
      { name: 'Monthly pass', prices: { Adult: 28000, Student: 24000, Child: 21000 }, highlight: true },
      { name: '10-visit pass', prices: { Adult: 30000, Student: 25500, Child: 22000 } },
      { name: '3-month pass', prices: { Adult: 72000, Student: 61000, Child: 54000 } },
      { name: '6-month pass', prices: { Adult: 135000, Student: 110000, Child: 95000 } },
      { name: 'Annual pass', prices: { Adult: 250000, Student: 200000, Child: 165000 } },
    ],
    addons: [
      { name: 'Shoe rental', price: 700 },
      { name: 'Chalk bag rental', price: 500 },
    ],
  },

  seo: {
    siteName: 'Boulder Zóna',
    defaultTitle: 'Boulder Zóna – Bouldering gym in Debrecen',
    defaultDescription:
      'Modern, bright bouldering gym in Debrecen, Hungary. Pricing, guide and contact in one place.',
    ogImage: '',
  },

  ui: {
    hoursLabel: 'Opening Hours',
    addressLabel: 'Our Address',
    mapHintLabel: 'Click to open map',
    comingSoonLabel: 'Coming soon',
    readMoreLabel: 'Read more →',
    footerHours: 'Opening Hours',
    footerContact: 'Contact',
    footerDocs: 'Documents',
    footerInfoLabel: 'Information / enquiries:',
    footerBizLabel: 'Business enquiries:',
    footerTagline: 'Bouldering gym in Debrecen',
    menuOpenLabel: 'Open menu',
    closeLabel: 'Close',
    prevImageLabel: 'Previous image',
    nextImageLabel: 'Next image',
    galleryModalLabel: 'Gallery',
    photoLabel: 'photo',
    pricingKicker: 'Pricing',
    pricingTitle: 'Choose the right ticket or pass for you.',
    pricingNote: 'All prices are in Hungarian Forint. Companions do not need to buy a ticket.',
    pricingBadge: 'Popular',
    pricingAddonsKicker: 'Extras',
    pricingAddonsSub: 'Additional services',
    galleryKicker: 'Gallery',
    galleryTitle: 'Take a look around our gym',
    helpKicker: 'Guide',
    difficultyKicker: 'Difficulty levels',
    difficultyHeadline: 'Six levels from beginner to elite',
    difficultyDesc: 'Every route is marked – look for the symbols on the start holds.',
    aboutKicker: 'About us',
    aboutFoundersBadge: 'Founders',
    newsTitle: 'Gym news and community updates all in one place.',
  },
}
