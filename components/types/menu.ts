export interface MenuObject {
  title: string;
  description?: string;
  level: "primary" | "secondary" | "tertiary";
  style?: Record<string, any>;
  icon?: string;
  mediaType?: "img" | "video";
  mediaSrc?: string;
  link?: string;
  children?: MenuObject[];
}

export const menuData: MenuObject[] = [
  {
    title: "Product",
    level: "primary",
    children: [
      {
        title: "Sales",
        level: "secondary",
        children: [
          {
            title: "Dashboard",
            level: "tertiary",
            children: [
              {
                title: "Maya, the Sales Platform",
                level: "tertiary",
                icon: "/icons/dashboardLayout.png",
                link: "/dashboard?mode=copilot",
              },
              {
                title: "Maya, the AI Sales Employee",
                level: "tertiary",
                icon: "/icons/AISparking.png",
                link: "/dashboard?mode=autopilot",
              },
            ],
          },
          {
            title: "Products",
            level: "tertiary",
            children: [
              {
                title: "Sales Automation",
                level: "tertiary",
                icon: "/icons/IncreaseProfits.png",
                link: "/products",
              },
              {
                title: "Whatsapp Automation",
                level: "tertiary",
                icon: "/icons/WhatsApp.png",
                link: "/products#whatsapp-automation",
              },
              {
                title: "Telegram Automation",
                level: "tertiary",
                icon: "/icons/TelegramApp.png",
                link: "/products#telegram-automation",
              },
              {
                title: "Email Warmup",
                level: "tertiary",
                icon: "/icons/Fire.png",
                link: "/products#email-warmup ",
              },
              {
                title: "B2B data",
                level: "tertiary",
                icon: "/icons/B2B.png",
                link: "/b2b",
              },
            ],
          },
          {
            title: "Privacy",
            level: "tertiary",
            children: [
              {
                title: "Deliverability",
                level: "tertiary",
                icon: "/icons/Fast Track.png",
                link: "#",
              },
              {
                title: "Security and Compliance",
                level: "tertiary",
                icon: "/icons/SecurityShield.png",
                link: "#",
              },
            ],
          },
        ],
      },
      { title: "Marketing", level: "secondary", style: { opacity: 0.5 } },
      { title: "HR tech", level: "secondary", style: { opacity: 0.5 } },
      {
        title: "Customer Support",
        level: "secondary",
        style: { opacity: 0.5 },
      },
      { title: "Analytics", level: "secondary", style: { opacity: 0.5 } },
    ],
  },
  {
    title: "Solutions",
    level: "primary",
    children: [
      {
        title: "Startups",
        level: "secondary",
        icon: "/icons/Rocket.png",
        description:
          "Let Maya handle your entire outbound operations to keep your team streamlined and productive.",
        link: "#",
      },
      {
        title: "Midmarket",
        level: "secondary",
        icon: "/icons/Stall.png",
        description:
          "Optimize your outbound workflow by automating up to 80% of repetitive tasks.",
        link: "#",
      },
      {
        title: "Enterprise",
        level: "secondary",
        icon: "/icons/Company.png",
        description:
          "Empower your team with advanced tools for every stage of the outbound process, supported by an AI assistant to ensure seamless tracking and management.",
        link: "#",
      },
      {
        title: "SMEs and MSMEs",
        level: "secondary",
        icon: "/icons/Home.png",
        description:
          "Enhance client outcomes by reducing manual effort and focusing on strategic priorities.",
        link: "#",
      },
    ],
  },
  {
    title: "Resources",
    level: "primary",
    children: [
      {
        title: "Company",
        level: "secondary",
        children: [
          {
            title: "About Us",
            level: "tertiary",
            icon: "/icons/Info.png",
            link: "#",
          },
          {
            title: "Careers",
            level: "tertiary",
            icon: "/icons/Goal.png",
            link: "#",
          },
          {
            title: "Alchemyst Labs",
            level: "tertiary",
            icon: "/icons/Lab Items.png",
            link: "#",
          },
        ],
      },
      {
        title: "Learn",
        level: "secondary",
        children: [
          {
            title: "Demo",
            level: "tertiary",
            icon: "/icons/Video.png",
            link: "#",
          },
          {
            title: "Support",
            level: "tertiary",
            icon: "/icons/Technical Support.png",
            link: "#",
          },
          {
            title: "FAQ",
            level: "tertiary",
            icon: "/icons/FAQ.png",
            link: "#",
          },
        ],
      },
      {
        title: "Discover",
        level: "secondary",
        children: [
          {
            title: "Case Study",
            level: "tertiary",
            icon: "/icons/Case Study.png",
            link: "#",
          },
          {
            title: "Change Log",
            level: "tertiary",
            icon: "/icons/Layers.png",
            link: "#",
          },
        ],
      },
    ],
  },
];
