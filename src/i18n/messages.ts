const fr = {
  metadata: {
    title: "Lianet",
    description:
      "Lianet connecte les entreprises africaines avec des talents digitaux d'élite pour concevoir des solutions impactantes et évolutives.",
  },
  navigation: {
    solutions: "Solutions",
    experts: "Experts",
    about: "À Propos",
    contact: "Contact",
    search: "Rechercher",
    langActiveFr: "Langue française active",
    langSwitchFr: "Passer en français",
    langSwitchEn: "Passer en anglais",
    langActiveEn: "Langue anglaise active",
  },
  sidebar: {
    hero: "Accueil",
    expertise: "Expertise",
    manifeste: "Manifeste",
    menu: "Menu",
  },
  hero: {
    eyebrow: "LIANET — STRATEGIC EXCELLENCE",
    titleLine1: "Connecting",
    titleLine2: "the Future",
    paragraph:
      "Lianet connecte les entreprises africaines aux meilleurs talents digitaux pour bâtir des solutions impactantes et évolutives.",
    primaryCta: "Nos Solutions",
    secondaryCta: "Start Project",
    scrollCta: "Scroller vers la section suivante",
  },
  fullMenu: {
    ecosystem: "Lianet Ecosystem",
    close: "Fermer le menu",
    startProject: "Start a Project",
    sections: {
      poles: "Pôles",
      resources: "Ressources",
      contact: "Contact & Localisation",
      social: "Social",
    },
    poles: {
      talent: {
        title: "Talent Solutions",
        description:
          "Nous ne nous contentons pas de trouver des profils ; nous bâtissons des équipes de choc. Accédez au top 3% des experts digitaux africains pour propulser vos développements techniques et vos designs d'interface.",
        tags: "Staff Augmentation • Recrutement Expert • Agilité",
      },
      strategy: {
        title: "Digital Strategy",
        description:
          "Le digital n'est pas une option, c'est votre moteur de croissance. Nos consultants dessinent la feuille de route de votre transformation, de l'audit initial au déploiement de solutions scalables et sécurisées.",
        tags: "Conseil • Roadmap • ROI Mesurable",
      },
      lab: {
        title: "Innovation Lab",
        description:
          "Le laboratoire où les idées deviennent des produits. Nous incubons des projets disruptifs et explorons les technologies émergentes (IA, Web3, IoT) pour maintenir votre entreprise à l'avant-garde du marché.",
        tags: "R&D • Prototypage rapide • Futurisme",
      },
    },
    resources: {
      insights: "Blog & Insights",
      careers: "Carrières",
      careersSuffix: "(Join the Liane)",
      caseStudies: "Études de cas",
      caseStudiesSuffix: "(Success Stories)",
    },
    contact: {
      dakar: "Dakar HQ",
      city: "Dakar, Sénégal",
      map: "Voir sur la carte",
      email: "Email",
    },
    manifesto:
      "Parce que l’avenir de l’Afrique s’écrit en lignes de code et en visions audacieuses, Lianet tisse la liane entre les ambitions des leaders et l’excellence des talents. Nous ne construisons pas seulement des solutions ; nous connectons les bâtisseurs du monde de demain.",
    tagline: "Propulser les ambitions africaines vers l’ère numérique.",
    langActiveFr: "Langue française active",
    langSwitchFr: "Passer en français",
    langSwitchEn: "Passer en anglais",
    langActiveEn: "Langue anglaise active",
  },
} as const;

const en = {
  metadata: {
    title: "Lianet",
    description:
      "Lianet connects African businesses with top-tier digital talent to craft impactful and scalable solutions.",
  },
  navigation: {
    solutions: "Solutions",
    experts: "Experts",
    about: "About",
    contact: "Contact",
    search: "Search",
    langActiveFr: "Switch to French",
    langSwitchFr: "Switch to French",
    langSwitchEn: "English language active",
    langActiveEn: "English language active",
  },
  sidebar: {
    hero: "Home",
    expertise: "Expertise",
    manifeste: "Manifesto",
    menu: "Menu",
  },
  hero: {
    eyebrow: "LIANET — STRATEGIC EXCELLENCE",
    titleLine1: "Connecting",
    titleLine2: "the Future",
    paragraph:
      "Lianet connects African businesses with top digital talents to build impactful, scalable solutions.",
    primaryCta: "Our Solutions",
    secondaryCta: "Start Project",
    scrollCta: "Scroll to next section",
  },
  fullMenu: {
    ecosystem: "Lianet Ecosystem",
    close: "Close menu",
    startProject: "Start a Project",
    sections: {
      poles: "Pillars",
      resources: "Resources",
      contact: "Contact & Location",
      social: "Social",
    },
    poles: {
      talent: {
        title: "Talent Solutions",
        description:
          "We do more than source profiles, we build high-impact teams. Access the top 3% of African digital experts to accelerate your engineering and product design execution.",
        tags: "Staff Augmentation • Expert Hiring • Agility",
      },
      strategy: {
        title: "Digital Strategy",
        description:
          "Digital is not optional, it is your growth engine. Our consultants shape your transformation roadmap, from initial audit to scalable and secure deployment.",
        tags: "Consulting • Roadmap • Measurable ROI",
      },
      lab: {
        title: "Innovation Lab",
        description:
          "A laboratory where ideas become products. We incubate disruptive projects and explore emerging tech (AI, Web3, IoT) to keep your business ahead of the curve.",
        tags: "R&D • Rapid Prototyping • Future-ready",
      },
    },
    resources: {
      insights: "Blog & Insights",
      careers: "Careers",
      careersSuffix: "(Join the Liane)",
      caseStudies: "Case Studies",
      caseStudiesSuffix: "(Success Stories)",
    },
    contact: {
      dakar: "Dakar HQ",
      city: "Dakar, Senegal",
      map: "View on map",
      email: "Email",
    },
    manifesto:
      "Because Africa’s future is written in lines of code and bold vision, Lianet weaves a bridge between leaders’ ambitions and top-tier talent. We do not just build solutions, we connect tomorrow’s builders.",
    tagline: "Powering African ambitions into the digital era.",
    langActiveFr: "Switch to French",
    langSwitchFr: "Switch to French",
    langSwitchEn: "English language active",
    langActiveEn: "English language active",
  },
} as const;

export const messages = {
  fr,
  en,
} as const;

export type Messages = typeof fr;
