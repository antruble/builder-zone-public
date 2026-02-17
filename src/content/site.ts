// Boulder Zona — single source of truth for all site content.

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ContactInfo {
  name: string
  address: string
  addressNote: string
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
  items: PricingRow[]
  addons: Addon[]
}

export interface Seo {
  siteName: string
  defaultTitle: string
  defaultDescription: string
  ogImage: string
}

export interface SiteContent {
  contact: ContactInfo
  hours: Hours
  nav: Nav
  about: About
  help: Help
  pricing: Pricing
  seo: Seo
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

export const site: SiteContent = {
  contact: {
    name: 'Boulder Zóna',
    address: '4029, Debrecen, Déli sor 29.',
    addressNote: 'Az udvarba érkezve, leghátul balra találjátok a bejáratunkat.',
    phones: ['+36706360134', '+36308506098'],
    email: 'boulderzonabz@gmail.com',
    emailInfo: 'info@boulderzona.hu',
    socialLinks: ['https://www.instagram.com/boulderzona','https://www.facebook.com/profile.php?id=61585562433494','https://www.tiktok.com/@boulder.zona'], // TODO: add real social URLs
    mapLink: '', // TODO: add Google Maps link
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
    ogImage: '', // TODO: add when we have a real OG image
  },
}
