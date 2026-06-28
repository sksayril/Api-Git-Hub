export interface Review {
  name: string;
  rating: number;
  comment: string;
  initials: string;
}

export interface UpdateLog {
  version: string;
  date: string;
  changes: string[];
}

export interface Project {
  id: string;
  title: string;
  category: string;
  tech: string[];
  tags: string[];
  price: number;
  rating: number;
  sales: number;
  image: string;
  description: string;
  descriptionMarkdown: string;
  longDescription: string;
  features: string[];
  thumbnails: string[];
  reviewsCount: number;
  creator: {
    name: string;
    avatar: string;
  };
  details: {
    lastUpdated: string;
    released: string;
    highResolution: boolean;
    documentation: string;
    fileTypes: string[];
  };
  updates: UpdateLog[];
  reviews: Review[];
}

export const seedProjects: Project[] = [
  {
    id: "fintech-pro-dashboard",
    title: "Fintech Pro Dashboard",
    category: "UI Kits",
    tech: ["Figma", "React"],
    price: 49,
    rating: 4.9,
    sales: 1204,
    image: "/images/lumina_dashboard.png",
    description: "Web App - React Admin System",
    descriptionMarkdown: "Web App - React Admin System",
    tags: ["Admin", "Dashboard", "React", "Figma"],
    longDescription: "Fintech Pro Dashboard is a meticulously crafted SaaS dashboard designed for high-growth startups and creative enterprises.",
    features: [
      "50+ Modular Components",
      "Dark & Light Mode Toggle",
      "Interactive data grids"
    ],
    thumbnails: [],
    reviewsCount: 120,
    creator: { name: "Lumina Creative", avatar: "LC" },
    details: { lastUpdated: "Oct 20, 2023", released: "Jan 18, 2023", highResolution: true, documentation: "Online PDF", fileTypes: ["Figma", "TSX"] },
    updates: [],
    reviews: []
  },
  {
    id: "abstract-3d-pack",
    title: "Abstract 3D Pack Vol. 1",
    category: "3D Assets",
    tech: ["Figma"],
    price: 24,
    rating: 4.8,
    sales: 850,
    image: "/images/finflow_wallet.png",
    description: "High quality 3D assets.",
    descriptionMarkdown: "High quality 3D assets.",
    tags: ["3D", "Assets", "Figma"],
    longDescription: "A massive pack of 3D assets for your next project.",
    features: ["High Resolution", "Multiple Angles"],
    thumbnails: [],
    reviewsCount: 42,
    creator: { name: "Apex Mobile Lab", avatar: "AM" },
    details: { lastUpdated: "Dec 05, 2023", released: "Jun 12, 2023", highResolution: true, documentation: "HTML Guide", fileTypes: ["PNG", "Blend"] },
    updates: [],
    reviews: []
  },
  {
    id: "hyper-saas",
    title: "Hyper SaaS Landing Page",
    category: "Templates",
    tech: ["React", "Tailwind"],
    price: 59,
    rating: 5.0,
    sales: 432,
    image: "/images/synthetix_ai.png",
    description: "Premium SaaS landing page.",
    descriptionMarkdown: "Premium SaaS landing page.",
    tags: ["SaaS", "Landing Page", "React", "Tailwind"],
    longDescription: "A beautiful and convertible landing page for your SaaS product.",
    features: ["Fully Responsive", "Dark Mode Ready"],
    thumbnails: [],
    reviewsCount: 68,
    creator: { name: "Neural Labs", avatar: "NL" },
    details: { lastUpdated: "Nov 12, 2023", released: "Mar 22, 2023", highResolution: true, documentation: "Online GitBook", fileTypes: ["TSX", "CSS"] },
    updates: [],
    reviews: []
  },
  {
    id: "streamline-icon",
    title: "Streamline Icon Set",
    category: "Icons",
    tech: ["Figma"],
    price: 15,
    rating: 4.7,
    sales: 2140,
    image: "/images/ethereal_portfolio.png",
    description: "Minimalist icon set.",
    descriptionMarkdown: "Minimalist icon set.",
    tags: ["Icons", "SVG", "Design"],
    longDescription: "Over 1000 minimalist icons for modern UI design.",
    features: ["SVG Format", "Vector Shapes"],
    thumbnails: [],
    reviewsCount: 84,
    creator: { name: "Minimal Studio", avatar: "MS" },
    details: { lastUpdated: "Sep 30, 2023", released: "Jan 05, 2023", highResolution: true, documentation: "Markdown File", fileTypes: ["SVG", "Figma"] },
    updates: [],
    reviews: []
  },
  {
    id: "geist-mono-pro",
    title: "Geist Mono Pro",
    category: "Fonts",
    tech: [],
    price: 32,
    rating: 4.9,
    sales: 654,
    image: "/images/collab_flow.png",
    description: "Modern monospaced font.",
    descriptionMarkdown: "Modern monospaced font.",
    tags: ["Font", "Mono", "Typography"],
    longDescription: "A beautiful monospaced font family for coding and design.",
    features: ["Multiple Weights", "Ligatures"],
    thumbnails: [],
    reviewsCount: 220,
    creator: { name: "Lumina Creative", avatar: "LC" },
    details: { lastUpdated: "Nov 01, 2023", released: "Apr 10, 2023", highResolution: true, documentation: "Online Documentation", fileTypes: ["OTF", "TTF", "WOFF"] },
    updates: [],
    reviews: []
  },
  {
    id: "cryptowallet-mobile-ui",
    title: "CryptoWallet Mobile UI",
    category: "UI Kits",
    tech: ["Figma", "Adobe XD"],
    price: 39,
    rating: 4.6,
    sales: 1080,
    image: "/images/avenue_fashion.png",
    description: "Mobile App UI Kit.",
    descriptionMarkdown: "Mobile App UI Kit.",
    tags: ["Mobile", "UI Kit", "Figma", "Adobe XD"],
    longDescription: "Complete UI kit for cryptocurrency wallet mobile apps.",
    features: ["50+ Screens", "Light & Dark Mode"],
    thumbnails: [],
    reviewsCount: 78,
    creator: { name: "Minimal Studio", avatar: "MS" },
    details: { lastUpdated: "Aug 15, 2023", released: "Feb 02, 2023", highResolution: true, documentation: "PDF Manual", fileTypes: ["Figma", "XD"] },
    updates: [],
    reviews: []
  }
];
