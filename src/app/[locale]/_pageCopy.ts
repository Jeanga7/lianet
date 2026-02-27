import type { Locale } from "@/i18n/config";

export type PageKey =
  | "solutions"
  | "solutionsTalent"
  | "solutionsStrategy"
  | "solutionsLab"
  | "experts"
  | "about"
  | "contact"
  | "insights"
  | "careers"
  | "caseStudies";

interface PageCopy {
  eyebrow: string;
  title: string;
  description: string;
  modules: ReadonlyArray<{
    title: string;
    description: string;
  }>;
}

const frCopy: Record<PageKey, PageCopy> = {
  solutions: {
    eyebrow: "SOLUTIONS",
    title: "Solutions Lianet",
    description:
      "Cette page servira de hub pour présenter les offres clés et orienter vers les parcours Talent, Strategy et Lab.",
    modules: [
      { title: "Vue d’ensemble", description: "Structure éditoriale de l’offre et segmentation par besoin business." },
      { title: "Cas d’usage", description: "Emplacements prévus pour les preuves de valeur et résultats mesurables." },
      { title: "Parcours utilisateur", description: "Blocs CTA et redirections vers les sous-pages spécialisées." },
    ],
  },
  solutionsTalent: {
    eyebrow: "SOLUTIONS / TALENT",
    title: "Talent Solutions",
    description:
      "Structure de la page Talent dédiée au recrutement, à la staff augmentation et à l’accompagnement des équipes digitales.",
    modules: [
      { title: "Offres de talents", description: "Sections prévues pour les profils, niveaux d’expertise et modalités." },
      { title: "Méthodologie", description: "Bloc process: qualification, matching, onboarding et suivi." },
      { title: "Conversion", description: "Espaces CTA pour prise de contact et brief projet." },
    ],
  },
  solutionsStrategy: {
    eyebrow: "SOLUTIONS / STRATEGY",
    title: "Digital Strategy",
    description:
      "Page cadre pour la stratégie digitale: audit, feuille de route, exécution et pilotage des indicateurs.",
    modules: [
      { title: "Diagnostic", description: "Zone dédiée à l’évaluation de maturité et aux enjeux prioritaires." },
      { title: "Roadmap", description: "Structure pour les jalons de transformation et priorisation." },
      { title: "Gouvernance", description: "Sections pour KPI, rituels de pilotage et amélioration continue." },
    ],
  },
  solutionsLab: {
    eyebrow: "SOLUTIONS / LAB",
    title: "Innovation Lab",
    description:
      "Page de présentation des dispositifs d’expérimentation et de prototypage rapide autour des technologies émergentes.",
    modules: [
      { title: "Exploration", description: "Bloc pour cas d’exploration IA, Web3, automation et data products." },
      { title: "Prototype", description: "Sections pour MVP, itérations et validation de concept." },
      { title: "Industrialisation", description: "Zone pour passage à l’échelle et transfert vers la production." },
    ],
  },
  experts: {
    eyebrow: "EXPERTS",
    title: "Nos Experts",
    description:
      "Cette page accueillera les profils experts, leurs domaines et les modalités de collaboration.",
    modules: [
      { title: "Profils", description: "Composants prévus pour fiches experts et compétences clés." },
      { title: "Domaines", description: "Sections pour spécialités techniques et industrielles." },
      { title: "Engagement", description: "Bloc pour disponibilité, format de mission et niveau de séniorité." },
    ],
  },
  about: {
    eyebrow: "À PROPOS",
    title: "À propos de Lianet",
    description:
      "Page institutionnelle pour la vision, l’histoire, les valeurs et la proposition de différenciation.",
    modules: [
      { title: "Vision", description: "Espace narratif pour mission, ambition et promesse de marque." },
      { title: "Histoire", description: "Timeline et jalons de croissance." },
      { title: "Preuves", description: "Blocs pour certifications, partenaires et indicateurs de confiance." },
    ],
  },
  contact: {
    eyebrow: "CONTACT",
    title: "Démarrons l'impossible.",
    description:
      "Prêt à élever vos standards technologiques ? L'élite est à un message de distance. Nous analysons chaque projet avec une rigueur chirurgicale.",
    modules: [
      { title: "Brief Projet", description: "Discutez de vos ambitions avec nos architectes et recevez un diagnostic d'impact sous 48h." },
      { title: "Network Support", description: "Un besoin spécifique sur le réseau ou une question sur nos Elite Squads ? Nous sommes là." },
      { title: "Partenariats", description: "Explorez comment Lianet peut devenir l'infrastructure de confiance de votre croissance." },
    ],
  },
  insights: {
    eyebrow: "INSIGHTS",
    title: "Blog & Insights",
    description:
      "Espace éditorial prévu pour articles, analyses, retours d’expérience et perspectives marché.",
    modules: [
      { title: "Editorial Grid", description: "Structure listing des contenus avec filtres thématiques." },
      { title: "Featured", description: "Zone mise en avant des analyses stratégiques." },
      { title: "Newsletter", description: "Bloc d’inscription et capture d’audience qualifiée." },
    ],
  },
  careers: {
    eyebrow: "CAREERS",
    title: "Carrières",
    description:
      "Page recrutement pour postes ouverts, culture d’entreprise et parcours de candidature.",
    modules: [
      { title: "Opportunités", description: "Composants liste des postes et filtres." },
      { title: "Culture", description: "Sections valeurs, environnement et avantages." },
      { title: "Candidature", description: "Flux de candidature et informations process." },
    ],
  },
  caseStudies: {
    eyebrow: "CASE STUDIES",
    title: "Études de Cas",
    description:
      "Page dédiée aux succès clients, méthodologies appliquées et résultats observables.",
    modules: [
      { title: "Success Stories", description: "Structure pour cas clients par secteur." },
      { title: "Méthode", description: "Sections détaillant approche, stack et livrables." },
      { title: "Impact", description: "Blocs KPI avant/après et preuves de performance." },
    ],
  },
};

const enCopy: Record<PageKey, PageCopy> = {
  solutions: {
    eyebrow: "SOLUTIONS",
    title: "Lianet Solutions",
    description:
      "This page will serve as a hub to present core offers and direct users to Talent, Strategy, and Lab journeys.",
    modules: [
      { title: "Overview", description: "Offer narrative structure and business-oriented segmentation." },
      { title: "Use Cases", description: "Reserved areas for value proof and measurable outcomes." },
      { title: "User Journey", description: "CTA blocks and routing to specialized sub-pages." },
    ],
  },
  solutionsTalent: {
    eyebrow: "SOLUTIONS / TALENT",
    title: "Talent Solutions",
    description:
      "Talent page structure for hiring, staff augmentation, and high-performing digital team enablement.",
    modules: [
      { title: "Talent Offers", description: "Sections for profiles, expertise levels, and engagement models." },
      { title: "Method", description: "Process block: qualification, matching, onboarding, and follow-up." },
      { title: "Conversion", description: "CTA areas for project discovery and contact." },
    ],
  },
  solutionsStrategy: {
    eyebrow: "SOLUTIONS / STRATEGY",
    title: "Digital Strategy",
    description:
      "Framework page for digital strategy: audit, roadmap, execution, and KPI-driven governance.",
    modules: [
      { title: "Diagnostic", description: "Space for maturity assessment and top priorities." },
      { title: "Roadmap", description: "Transformation milestones and prioritization structure." },
      { title: "Governance", description: "Sections for KPIs, operating rituals, and continuous improvement." },
    ],
  },
  solutionsLab: {
    eyebrow: "SOLUTIONS / LAB",
    title: "Innovation Lab",
    description:
      "Page for experimentation and rapid prototyping programs around emerging technologies.",
    modules: [
      { title: "Exploration", description: "Areas for AI, Web3, automation, and data product explorations." },
      { title: "Prototype", description: "Sections for MVP cycles and concept validation." },
      { title: "Scale", description: "Area for production readiness and scale-up transfer." },
    ],
  },
  experts: {
    eyebrow: "EXPERTS",
    title: "Our Experts",
    description:
      "This page will host expert profiles, domain strengths, and collaboration options.",
    modules: [
      { title: "Profiles", description: "Components planned for expert cards and core skills." },
      { title: "Domains", description: "Sections for technical and industry specializations." },
      { title: "Engagement", description: "Block for availability, mission format, and seniority." },
    ],
  },
  about: {
    eyebrow: "ABOUT",
    title: "About Lianet",
    description:
      "Institutional page for vision, story, values, and strategic differentiation.",
    modules: [
      { title: "Vision", description: "Narrative space for mission, ambition, and brand promise." },
      { title: "Story", description: "Timeline and growth milestones." },
      { title: "Proof", description: "Blocks for certifications, partners, and trust indicators." },
    ],
  },
  contact: {
    eyebrow: "CONTACT",
    title: "Let's build the impossible.",
    description:
      "Ready to elevate your technological standards? The elite is one message away. We analyze every project with surgical precision.",
    modules: [
      { title: "Project Brief", description: "Discuss your ambitions with our architects and receive an impact diagnosis within 48h." },
      { title: "Network Support", description: "A specific need for the network or a question about our Elite Squads? We are here." },
      { title: "Partnerships", description: "Explore how Lianet can become the trusted infrastructure for your growth." },
    ],
  },
  insights: {
    eyebrow: "INSIGHTS",
    title: "Blog & Insights",
    description:
      "Editorial space planned for articles, analysis, experience reports, and market perspectives.",
    modules: [
      { title: "Editorial Grid", description: "Listing structure with thematic filters." },
      { title: "Featured", description: "Spotlight zone for strategic analysis." },
      { title: "Newsletter", description: "Subscription block for qualified audience capture." },
    ],
  },
  careers: {
    eyebrow: "CAREERS",
    title: "Careers",
    description:
      "Recruitment page for open roles, company culture, and candidate journey.",
    modules: [
      { title: "Opportunities", description: "Job listing components and filters." },
      { title: "Culture", description: "Sections for values, work environment, and benefits." },
      { title: "Application", description: "Application flow and hiring process information." },
    ],
  },
  caseStudies: {
    eyebrow: "CASE STUDIES",
    title: "Case Studies",
    description:
      "Page dedicated to client wins, applied methods, and measurable outcomes.",
    modules: [
      { title: "Success Stories", description: "Client case structure by industry." },
      { title: "Method", description: "Sections detailing approach, stack, and deliverables." },
      { title: "Impact", description: "Before/after KPIs and performance proof blocks." },
    ],
  },
};

export const getPageCopy = (page: PageKey, locale: Locale): PageCopy =>
  locale === "en" ? enCopy[page] : frCopy[page];
