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
    mission:
      'Ez a terem azért jött létre, mert hiszünk abban, hogy a mászás mindenkié. ' +
      'Kortól, tapasztalattól, háttértől függetlenül.',
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
      headline: 'Kötél nélküli sportmászás, biztonságos környezetben.',
      paragraphs: [
        'A boulderezés kötél nélküli, alacsony falon végzett sportmászás. A falak alatt vastag szivacs (crashpad) biztosítja a biztonságot.',
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
          text: 'Az út kezdőfogásait két kézzel kell megfogni – ez a start. A startfogásokat jelölés mutatja.',
        },
        {
          title: 'Egy szín, egy út',
          text: 'Minden út egy színű fogásokból áll – csak az adott színű fogásokat használd kézzel és lábbal egyaránt.',
        },
        {
          title: 'Fekete elemek',
          text: 'A fekete fogások és térdemelők (volumes) bármely úthoz használhatók – ezek mindenki számára szabadok.',
        },
        {
          title: 'Topfogás (cél)',
          text: 'Az út végén a topfogást két kézzel kell megérinteni – ez a cél. Ha megvan, teljesítetted az utat!',
        },
        {
          title: 'Biztonságos lemászás',
          text: 'Lemászni is kötelező – ugrálni tilos! Használd a lejtős fogásokat a biztonságos lemászáshoz.',
        },
      ],
    },
    difficultyLegend: [
      {
        name: 'Rajtzászló',
        description: 'Kezdő – ismerkedj a mozgással, tanuld meg az alapokat.',
      },
      {
        name: 'Mászó cipőnyomok',
        description: 'Haladó kezdő – már magabiztosabban mozogsz a falon.',
      },
      {
        name: 'Feszített bicepszes kar',
        description: 'Középhaladó – komolyabb erő és technika szükséges.',
      },
      {
        name: 'Fogaskerék',
        description: 'Haladó – összetett mozdulatsorok és kitartás.',
      },
      {
        name: 'Tűz',
        description: 'Tapasztalt – maximális erő, precizitás és kreativitás.',
      },
      {
        name: 'Magnus Midtbo',
        description: 'Elit – csak a legjobbaknak. Ha ezt megcsinálod, kalap le!',
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
      { name: 'Edzésjegy', price: 1200, note: 'Edzésjegy a belépőn felül értendő.' },
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
