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
  price: number;
  rating: number;
  sales: number;
  image: string;
  description: string;
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
    id: "nebula-dashboard",
    title: "Nebula Dashboard Kit",
    category: "Web Templates",
    tech: ["React / Next.js", "Tailwind CSS"],
    price: 49,
    rating: 4.9,
    sales: 850,
    image: "/images/lumina_dashboard.png",
    description: "Web App - React Admin System",
    longDescription: "Nebula is a meticulously crafted SaaS dashboard designed for high-growth startups and creative enterprises. Built with performance and scalability in mind, it provides a comprehensive toolkit for monitoring analytics, managing users, and overseeing complex workflows with ease. Featuring over 50+ modular components and 15+ pre-built page templates, Lumina allows you to launch your product interface in hours rather than weeks.",
    features: [
      "50+ Modular Components",
      "Dark & Light Mode Toggle",
      "Recharts Visualizations",
      "Tailwind CSS v4 Configuration",
      "Full layout animations",
      "Interactive data grids"
    ],
    thumbnails: [
      "/images/lumina_dashboard.png",
      "/images/collab_flow.png",
      "/images/synthetix_ai.png",
      "/images/ethereal_portfolio.png",
      "/images/finflow_wallet.png"
    ],
    reviewsCount: 120,
    creator: {
      name: "Lumina Creative",
      avatar: "LC"
    },
    details: {
      lastUpdated: "Oct 20, 2023",
      released: "Jan 18, 2023",
      highResolution: true,
      documentation: "Online PDF",
      fileTypes: ["TSX", "SCSS", "JSON"]
    },
    updates: [
      {
        version: "v1.2.0",
        date: "Oct 15, 2023",
        changes: [
          "Fixed minor responsive bug in data tables",
          "Added 3 new chart variations for financial tracking",
          "Optimized image loading for better LCP scores"
        ]
      },
      {
        version: "v1.1.0",
        date: "Aug 02, 2023",
        changes: [
          "Complete overhaul of the charts system, migrated from Chart.js to Recharts for better React performance",
          "Improved component modularity"
        ]
      },
      {
        version: "v1.0.0",
        date: "Jan 18, 2023",
        changes: ["Initial release of the Lumina SaaS Dashboard template."]
      }
    ],
    reviews: [
      {
        name: "Alex Rivera",
        rating: 5,
        comment: "Saved me months of development time. The code is extremely clean and the dark mode implementation is the best I've seen in any marketplace template.",
        initials: "AR"
      },
      {
        name: "Sarah Jenkins",
        rating: 5,
        comment: "The documentation is top-notch. I had a small question about the Tailwind config and the support team responded within two hours. Highly recommended!",
        initials: "SJ"
      }
    ]
  },
  {
    id: "vault-wallet",
    title: "Vault Crypto Wallet",
    category: "Mobile Apps",
    tech: ["Flutter"],
    price: 29,
    rating: 4.8,
    sales: 194,
    image: "/images/finflow_wallet.png",
    description: "Mobile App - Swift & Flutter",
    longDescription: "Vault Crypto Wallet is a clean, modern cryptocurrency dashboard UI built using Flutter. Includes crypto balance charts, transactional lists, user profiles, and a sleek glassmorphic dark interface design designed for crypto trading, staking, and asset transfers.",
    features: [
      "Flutter 3 Integration",
      "Sleek Glassmorphic Layouts",
      "Interactive Balance Charts",
      "Biometric Login Screens",
      "Mock API integration hooks",
      "Dark theme optimization"
    ],
    thumbnails: [
      "/images/finflow_wallet.png",
      "/images/avenue_fashion.png",
      "/images/synthetix_ai.png",
      "/images/lumina_dashboard.png",
      "/images/collab_flow.png"
    ],
    reviewsCount: 42,
    creator: {
      name: "Apex Mobile Lab",
      avatar: "AM"
    },
    details: {
      lastUpdated: "Dec 05, 2023",
      released: "Jun 12, 2023",
      highResolution: true,
      documentation: "HTML Guide",
      fileTypes: ["Dart", "SVG", "YAML"]
    },
    updates: [
      {
        version: "v1.1.0",
        date: "Dec 05, 2023",
        changes: ["Updated Flutter to version 3.16", "Added biometric auth mock screens"]
      },
      {
        version: "v1.0.0",
        date: "Jun 12, 2023",
        changes: ["Initial release of Vault Wallet template."]
      }
    ],
    reviews: [
      {
        name: "Marcus Thorne",
        rating: 5,
        comment: "Very clean layouts. The Dart code is structured well and follows standard design patterns. Highly recommend this for mobile devs.",
        initials: "MT"
      }
    ]
  },
  {
    id: "synthetix-ai",
    title: "Synthetix AI Generator",
    category: "AI Tools",
    tech: ["Node.js", "React / Next.js"],
    price: 75,
    rating: 4.8,
    sales: 215,
    image: "/images/synthetix_ai.png",
    description: "AI Tool - Neural Network App",
    longDescription: "Synthetix is an advanced AI UI generator kit, built on Node.js and React. Features sleek visual network node mappings, prompt inputs, image rendering queues, dynamic canvas visualizations, and usage statistics.",
    features: [
      "Node.js API Middleware",
      "React Mapped Nodes Flow",
      "Usage Metric Trackers",
      "Custom Theme Variables",
      "Prompt suggestion logs",
      "Full canvas drawing simulation"
    ],
    thumbnails: [
      "/images/synthetix_ai.png",
      "/images/lumina_dashboard.png",
      "/images/collab_flow.png",
      "/images/ethereal_portfolio.png",
      "/images/finflow_wallet.png"
    ],
    reviewsCount: 68,
    creator: {
      name: "Neural Labs",
      avatar: "NL"
    },
    details: {
      lastUpdated: "Nov 12, 2023",
      released: "Mar 22, 2023",
      highResolution: true,
      documentation: "Online GitBook",
      fileTypes: ["JS", "JSX", "TSX", "JSON"]
    },
    updates: [
      {
        version: "v1.0.2",
        date: "Nov 12, 2023",
        changes: ["Optimized Node backend API routers", "Fixed node map connection lines bug"]
      },
      {
        version: "v1.0.0",
        date: "Mar 22, 2023",
        changes: ["Initial launch of Synthetix AI interface."]
      }
    ],
    reviews: [
      {
        name: "Emma Watson",
        rating: 5,
        comment: "The visual node-linking workflow is incredibly smooth. I used this interface for my startup mockup, and the feedback was phenomenal.",
        initials: "EW"
      }
    ]
  },
  {
    id: "ethereal-portfolio",
    title: "Ethereal Portfolio v2",
    category: "Web Templates",
    tech: ["React / Next.js"],
    price: 19,
    rating: 4.7,
    sales: 342,
    image: "/images/ethereal_portfolio.png",
    description: "Template - Portfolio Site",
    longDescription: "Ethereal Portfolio v2 is a minimalist website template for designers, artists, and creators. Features beautiful smooth web layouts, abstract gradient waves, and contact form overlays designed to highlight premium artwork and case studies.",
    features: [
      "Minimalist Portfolio grid",
      "Framer Motion Transitions",
      "SEO & Meta Optimizations",
      "Stripe Checkout Donation Link",
      "Markdown case study pages",
      "Fluid responsive layout grids"
    ],
    thumbnails: [
      "/images/ethereal_portfolio.png",
      "/images/lumina_dashboard.png",
      "/images/collab_flow.png",
      "/images/synthetix_ai.png",
      "/images/finflow_wallet.png"
    ],
    reviewsCount: 84,
    creator: {
      name: "Minimal Studio",
      avatar: "MS"
    },
    details: {
      lastUpdated: "Sep 30, 2023",
      released: "Jan 05, 2023",
      highResolution: true,
      documentation: "Markdown File",
      fileTypes: ["TSX", "CSS", "JSON"]
    },
    updates: [
      {
        version: "v2.0.0",
        date: "Sep 30, 2023",
        changes: ["Complete visual redesign", "Migrated animation to Framer Motion v10", "Added contact form overlays"]
      }
    ],
    reviews: [
      {
        name: "Devon Lane",
        rating: 4,
        comment: "Elegant and very minimal. Easy to configure and modify. The animations are clean and don't lag.",
        initials: "DL"
      }
    ]
  },
  {
    id: "collab-flow",
    title: "Collab Flow Pro",
    category: "Web Templates",
    tech: ["React / Next.js", "Node.js"],
    price: 55,
    rating: 4.9,
    sales: 1100,
    image: "/images/collab_flow.png",
    description: "SaaS - Team Workspace Dashboard",
    longDescription: "Collab Flow Pro is a comprehensive project management dashboard template designed for teams. Features calendar task drag-and-drop, progress circles, nested checklist rows, active team metrics, and dark layout parameters for task tracking.",
    features: [
      "Drag and Drop Tasks",
      "Circular Progress Metrics",
      "Team Activity Streams",
      "JWT Auth API Integration",
      "Interactive Calendar view",
      "Dynamic dashboard stats"
    ],
    thumbnails: [
      "/images/collab_flow.png",
      "/images/lumina_dashboard.png",
      "/images/synthetix_ai.png",
      "/images/ethereal_portfolio.png",
      "/images/finflow_wallet.png"
    ],
    reviewsCount: 220,
    creator: {
      name: "Lumina Creative",
      avatar: "LC"
    },
    details: {
      lastUpdated: "Nov 01, 2023",
      released: "Apr 10, 2023",
      highResolution: true,
      documentation: "Online Documentation",
      fileTypes: ["TSX", "CSS", "JSON", "Node"]
    },
    updates: [
      {
        version: "v1.1.2",
        date: "Nov 01, 2023",
        changes: ["Fixed JWT token refresh bugs", "Added task drag drop animations"]
      }
    ],
    reviews: [
      {
        name: "Jenny Wilson",
        rating: 5,
        comment: "Best SaaS template I've purchased. Team features were very easy to hook up to our Node database.",
        initials: "JW"
      }
    ]
  },
  {
    id: "avenue-fashion",
    title: "Avenue Fashion App",
    category: "Mobile Apps",
    tech: ["Flutter"],
    price: 39,
    rating: 4.6,
    sales: 540,
    image: "/images/avenue_fashion.png",
    description: "Mobile App - E-Commerce App",
    longDescription: "Avenue Fashion App is a luxury e-commerce mobile template built in Flutter. Contains beautiful item carousels, custom filtering models, user profiles, checkout logs, and elegant dark modes designed for boutique apparel shopping.",
    features: [
      "E-Commerce Products Grid",
      "Interactive Checkout Flow",
      "Animated Slide transitions",
      "Flutter Web Version Included",
      "Custom shopping basket state",
      "Rich product cards design"
    ],
    thumbnails: [
      "/images/avenue_fashion.png",
      "/images/finflow_wallet.png",
      "/images/synthetix_ai.png",
      "/images/lumina_dashboard.png",
      "/images/collab_flow.png"
    ],
    reviewsCount: 78,
    creator: {
      name: "Minimal Studio",
      avatar: "MS"
    },
    details: {
      lastUpdated: "Aug 15, 2023",
      released: "Feb 02, 2023",
      highResolution: true,
      documentation: "PDF Manual",
      fileTypes: ["Dart", "YAML", "PNG"]
    },
    updates: [
      {
        version: "v1.0.5",
        date: "Aug 15, 2023",
        changes: ["Added product sorting metrics", "Improved scroll physics in carousels"]
      }
    ],
    reviews: [
      {
        name: "Cody Fisher",
        rating: 5,
        comment: "Stunning layouts. The styling aligns perfectly with my design system. Product detail page layout is top notch.",
        initials: "CF"
      }
    ]
  }
];
