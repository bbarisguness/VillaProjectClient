/** @type {import('next').NextConfig} */

const google301 = [
  {
    source: '/b/bloglar',
    destination: '/bloglar',
    permanent: false,
  },
  {
    source: '/b/6-oludeniz-kiralik-villa',
    destination: '/bloglar/oludeniz-kiralik-villa',
    permanent: false,
  },
  {
    source: '/b/2-oludeniz-nerededir-ve-nasil-gidilir-',
    destination: '/bloglar/oludeniz-nerededir-ve-nasil-gidilir',
    permanent: false,
  },
  {
    source: '/b/3-fethiyede-terkedilmis-bir-cennet-kayakoy',
    destination: '/bloglar/fethiye-de-terkedilmis-bir-cennet-kayakoy',
    permanent: false,
  },
  {
    source: '/b/4-fethiye-at-turu',
    destination: '/bloglar/fethiye-at-turu',
    permanent: false,
  },
  {
    source: '/b/5-fethiye-kiralik-villa',
    destination: '/bloglar/fethiye-kiralik-villa',
    permanent: false,
  },
  {
    source: '/b/9-yamac-parasutu-nasil-yapilir-',
    destination: '/bloglar/yamac-parasutu-nasil-yapilir',
    permanent: false,
  },
  {
    source: '/b/8-fethiyede-gormeniz-gereken-tarihi-yerler',
    destination: '/bloglar/fethiye-de-gormeniz-gereken-tarihi-yerler',
    permanent: false,
  },
  {
    source: '/b/7-fethiyede-villa-tatili-icin-uygun-fiyatlar',
    destination: '/bloglar/fethiye-de-villa-tatili-icin-uygun-fiyatlar',
    permanent: false,
  },
  {
    source: '/b/11-fethiye-merkezin-en-guzel-koy-ve-plajlari',
    destination: '/bloglar/fethiye-merkezin-en-guzel-koy-ve-plajlari',
    permanent: false,
  },
  {
    source: '/b/10-fethiye-villa-secimi',
    destination: '/bloglar/fethiye-villa-secimi',
    permanent: false,
  },
  {
    source: '/v/balayi-villalari',
    destination: '/villalar/balayi-villalari',
    permanent: false,
  },
  {
    source: '/v/ekonomik-villalar',
    destination: '/villalar/ekonomik-villalar',
    permanent: false,
  },
  {
    source: '/v/korunakli-villalar',
    destination: '/villalar/korunakli-villalar',
    permanent: false,
  },
  {
    source: '/v/cocuk-havuzlu-villalar',
    destination: '/villalar/cocuk-havuzlu-villalar',
    permanent: false,
  },
  {
    source: '/v/populer-villalar',
    destination: '/villalar/populer-villalar',
    permanent: false,
  },
  {
    source: '/v/kis-aylarina-uygun-villalar',
    destination: '/villalar/kis-aylarina-uygun',
    permanent: false,
  },
  {
    source: '/v/kiralik-apartlar',
    destination: '/apartlar',
    permanent: false,
  },
  {
    source: '/v/kiralik-villalar',
    destination: '/villalar',
    permanent: false,
  },
  {
    source: '/v/satilik-villalar',
    destination: '/satilik-villalar',
    permanent: false,
  },
  {
    source: '/p/dolandiricilara-dikkat',
    destination: '/dolandiricilara-dikkat',
    permanent: false,
  },
  {
    source: '/p/neden-labirent',
    destination: '/neden-labirent',
    permanent: false,
  },
  {
    source: '/p/arac-kiralama',
    destination: '/arac-kiralama',
    permanent: false,
  },
  {
    source: '/p/yemek-servisi',
    destination: '/yemek-servisi',
    permanent: false,
  },
  {
    source: '/p/sikayet-bildirimi',
    destination: '/sikayet-bildirimi',
    permanent: false,
  },
  {
    source: '/p/sikca-sorulan-sorular',
    destination: '/sss',
    permanent: false,
  },
  {
    source: '/p/kiralama-sartlari',
    destination: '/kiralama-sartlari',
    permanent: false,
  },
  {
    source: '/r/ciftlik-kiralik-villa',
    destination: '/bolgeler/ciftlik-bolgesi',
    permanent: false,
  },
  {
    source: '/r/calis-kiralik-villa',
    destination: '/bolgeler/calis-bolgesi',
    permanent: false,
  },
  {
    source: '/r/kayakoy-kiralik-villa',
    destination: '/bolgeler/kayakoy-bolgesi',
    permanent: false,
  },
  {
    source: '/r/oludeniz-kiralik-villa',
    destination: '/bolgeler/oludeniz-bolgesi',
    permanent: false,
  },
  {
    source: '/f/villanizi-kiraya-verin',
    destination: '/kiraya-ver',
    permanent: false,
  },
  {
    source: '/v/balayi-villalari/19-villa-root',
    destination: '/villalar/balayi-villalari/villa-root',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/108-villa-minerva',
    destination: '/villalar/populer-villalar/villa-minerva',
    permanent: false,
  },
  {
    source: '/v/ekonomik-villalar/18-villa-moonshine',
    destination: '/villalar/ekonomik-villalar/villa-moonshine',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/96-villa-remzi',//villa alice
    destination: '/villalar/balayi-villalari/villa-alice',
    permanent: false,
  },
  {
    source: '/v/balayi-villalari/226-capella-sirius',
    destination: '/villalar/balayi-villalari/capella-sirius',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/25-villa-alp',
    destination: '/villalar/balayi-villalari/villa-alp',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/255-villa-arda',
    destination: '/villalar/populer-villalar/villa-arda',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/173-villa-sirius',
    destination: '/villalar/populer-villalar/villa-sirius',
    permanent: false,
  },
  {
    source: '/v/balayi-villalari/107-villa-kimera',
    destination: '/villalar/populer-villalar/villa-kimera',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/213-villa-cemal',
    destination: '/villalar/populer-villalar/villa-cemal',
    permanent: false,
  },
  {
    source: '/v/korunakli-villalar/15-villa-makri',
    destination: '/villalar/korunakli-villalar/villa-makri',
    permanent: false,
  },
  {
    source: '/v/balayi-villalari/1-villa-almina',
    destination: '/villalar/populer-villalar/villa-almina',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/28-villa-sudenaz',
    destination: '/villalar/populer-villalar/villa-sudenaz',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/30-villa-meysa',
    destination: '/villalar/populer-villalar/villa-meysa',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/34-villa-gumus',
    destination: '/villalar/populer-villalar/villa-gumus',
    permanent: false,
  },
  {
    source: '/v/balayi-villalari/167-villa-zumrut',
    destination: '/villalar/balayi-villalari/villa-zumrut',
    permanent: false,
  },
  {
    source: '/v/balayi-villalari/47-villa-yigit',
    destination: '/villalar/populer-villalar/villa-yigit',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/201-villa-yade',
    destination: '/villalar/populer-villalar/villa-yade',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/189-villa-devin',
    destination: '/villalar/kis-aylarina-uygun/villa-devin',
    permanent: false,
  },
  {
    source: '/v/balayi-villalari/80-villa-adeley',
    destination: '/villalar/populer-villalar/villa-adaley',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/46-villa-meyra',
    destination: '/villalar/populer-villalar/villa-meyra',
    permanent: false,
  },
  {
    source: '/v/balayi-villalari/42-villa-miray',
    destination: '/villalar/balayi-villalari/villa-miray',
    permanent: false,
  },
  {
    source: '/v/balayi-villalari/106-villa-sedna',
    destination: '/villalar/populer-villalar/villa-sedna',
    permanent: false,
  },
  {
    source: '/v/balayi-villalari/225-capella-vega',
    destination: '/villalar/balayi-villalari/capella-vega',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/168-villa-sargon',
    destination: '/villalar/populer-villalar/villa-sargon',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/199-villa-lotus',
    destination: '/villalar/populer-villalar/villa-lotus',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/155-villa-tila',
    destination: '/villalar/populer-villalar/villa-tila',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/197-villa-moonshine-duo',
    destination: '/villalar/populer-villalar/villa-moonshine-duo',
    permanent: false,
  },
  {
    source: '/v/balayi-villalari/224-capella-simal',
    destination: '/villalar/balayi-villalari/capella-simal',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/210-villa-ofelya-2',
    destination: '/villalar/populer-villalar/villa-ofelya-2',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/27-villa-bella',
    destination: '/villalar/cocuk-havuzlu-villalar/villa-bella',
    permanent: false,
  },
  {
    source: '/v/korunakli-villalar/182-villa-elam',
    destination: '/villalar/korunakli-villalar/villa-elam',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/211-villa-diamond',
    destination: '/villalar/populer-villalar/villa-diamond',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/103-villa-kaya',
    destination: '/villalar/populer-villalar/villa-kaya',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/16-villa-desen',
    destination: '/villalar/cocuk-havuzlu-villalar/villa-desen-1',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/261-villa-akdag',
    destination: '/villalar/populer-villalar/villa-akdag',
    permanent: false,
  },
  {
    source: '/v/ekonomik-villalar/155-villa-tila',
    destination: '/villalar/populer-villalar/villa-tila',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/207-villa-yaz-2',
    destination: '/villalar/populer-villalar/villa-yaz-2',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/156-villa-folia',
    destination: '/villalar/populer-villalar/villa-folia',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/113-villa-paris',
    destination: '/villalar/populer-villalar/villa-paris',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/141-villa-azmira',
    destination: '/villalar/populer-villalar/villa-azmira',
    permanent: false,
  },
  {
    source: '/v/balayi-villalari/112-villa-toska',
    destination: '/villalar/balayi-villalari/villa-toska',
    permanent: false,
  },
  {
    source: '/v/balayi-villalari/109-villa-prenses',
    destination: '/villalar/balayi-villalari/villa-prenses',
    permanent: false,
  },
  {
    source: '/v/balayi-villalari/86-inn-house-oludeniz',
    destination: '/villalar/balayi-villalari/inn-house-oludeniz-2-1',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/23-villa-baris',
    destination: '/villalar/populer-villalar/villa-baris',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/186-villa-ariessos-2',
    destination: '/villalar/populer-villalar/villa-ariessos-2',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/269-villa-aroma-terapi',
    destination: '/villalar/populer-villalar/villa-aroma-terapi',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/216-villa-lara-1',
    destination: '/villalar/populer-villalar/villa-lara-1',
    permanent: false,
  },
  {
    source: '/v/ekonomik-villalar/115-villa-aydin',
    destination: '/villalar/ekonomik-villalar/villa-aydin',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/171-villa-pera',
    destination: '/villalar/populer-villalar/villa-pera',
    permanent: false,
  },
  {
    source: '/v/balayi-villalari/214-villa-felix',
    destination: '/villalar/populer-villalar/villa-felix',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/206-villa-yaz-1',
    destination: '/villalar/populer-villalar/villa-yaz-1',
    permanent: false,
  },
  {
    source: '/v/balayi-villalari/195-villa-alice-duo',
    destination: '/villalar/balayi-villalari/villa-alice-duo',
    permanent: false,
  },
  {
    source: '/v/balayi-villalari/53-villa-levissi-b-blok',
    destination: '/villalar/populer-villalar/villa-levissi-b-blok',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/82-inn-house-oludeniz-suit',
    destination: '/villalar/balayi-villalari/inn-house-oludeniz-suit',
    permanent: false,
  },
  {
    source: '/v/balayi-villalari/82-inn-house-oludeniz-suit',
    destination: '/villalar/balayi-villalari/inn-house-oludeniz-suit',
    permanent: false,
  },
  {
    source: '/v/cocuk-havuzlu-villalar/203-villa-bella',
    destination: '/villalar/cocuk-havuzlu-villalar/villa-bella',
    permanent: false,
  },
  {
    source: '/v/balayi-villalari/190-villa-kaya-duo-1',
    destination: '/villalar/balayi-villalari/villa-kaya-duo-1',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/217-villa-lara-2',
    destination: '/villalar/populer-villalar/villa-lara-2',
    permanent: false,
  },
  {
    source: '/v/cocuk-havuzlu/52-villa-levissi-a-blok',
    destination: '/villalar/populer-villalar/villa-levissi-a-blok',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/153-villa-garden-city-c-blok',
    destination: '/villalar/populer-villalar/villa-garden-city-c-blok',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/213-villa-cemal',
    destination: '/villalar/populer-villalar/villa-cemal',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/97-villa-ata',
    destination: '/villalar/populer-villalar/villa-ata',
    permanent: false,
  },
  {
    source: '/v/populer-villalar/138-villa-olivin',
    destination: '/villalar/populer-villalar/villa-olivin',
    permanent: false,
  },
  {
    source: '/v/balayi-villalari/41-villa-simay',
    destination: '/villalar/balayi-villalari/villa-simay',
    permanent: false,
  }
]

const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'villaapi.testgrande.com',
        port: '',
        pathname: '/**',
      },
    ],
    domains: [
      'villaapi.testgrande.com'
    ],
  },
  async redirects() {
    return google301
  },
}

module.exports = nextConfig
