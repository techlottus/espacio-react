export const dashboardBodyInit = 
    {
    "data": {
      "permissions": {
        "email": "admin@lottus.com",
        "PAF": true,
        "CLS": true,
        "CLA": true,
        "BIB": true,
        "DOA": true,
        "CAE": true,
        "CRE": true,
        "BEC": true,
        "COE": true,
        "HIA": true,
        "CEE": true,
        "SES": true,
        "EQU": true,
        "REE": true,
        "TIT": true,
        "TUT": true,
        "ATA": true,
        "ATT": true,
        "CAP": true,
        "PRF": true,
        "AYC": true,
        "IDU": true,
        "PRO": true,
        "LOG": true,
        "INT": true
      },
      "news": [
        {
          "title": "Noticia 1",
          "subtitle": "subtitulo noticia 1",
          "image": "string",
          "link": "string"
        },
        {
            "title": "Noticia 2",
            "subtitle": "subtitulo noticia 1",
            "image": "string",
            "link": "string"
          },
          {
            "title": "Noticia 3",
            "subtitle": "subtitulo noticia 1",
            "image": "string",
            "link": "string"
          }
      ],
      "quotes": [
        {
          "quote": "Los campeones siguen jugando hasta que lo hacen bien"
        }
      ]
    },
    "error": {},
    "service": {},
    "status": {},
    "partialResponse": {}
  }


  export const textDashboardMock = {
    dashboard: {
      menu: {
        aula: {
          emoji: 'mortar-board',
          text: 'Aula'
        },
        book: {
          emoji: 'books',
          text: 'Biblioteca'
        },
        procedures: {
          emoji: 'page-with-curl',
          text: 'Trámites'
        },
        accountStatus: {
          emoji: 'chart-with-upwards-trend',
          text: 'Estado de cuenta'
        },
        payment: {
          emoji: 'credit-card',
          text: 'Pagos'
        },
        logout: {
          emoji: 'back',
          text: 'Cerrar sesión'
        }
      },
      titleWelcome: 'Hola',
      images: {
        cardHeader: 'images/header.png'
      },
      logo: {
        urlLogo: '/images/Logos/ULA.svg'
      },
      logos: {
        utc: {
          urlUtc: '/images/Logos/UTC.svg'
        },
        ula: {
          urlUla: '/images/Logos/ULA.svg'
        }
      },
      sectionDashboard: {
        titleNews: 'Noticias de tu universidad ULA',
        titleCards: '¿Qué harás hoy?'
      },
      playIcon: 'play_circle_outline',
      cards: {
        one: {
          title: 'Aula',
          icon: 'school'
        },
        two: {
          title: 'Pagos',
          icon: 'credit_card'
        },
        three: {
          title: 'Biblioteca',
          icon: 'import_contacts'
        },
        four: {
          title: 'Trámites',
          icon: 'post_add'
        }
      },
      footerText: {
        text: '©2021 Derechos reservados Lottus ABC',
        privacy: 'Aviso de privacidad y Términos y condiciones'
      }
    },
  }
