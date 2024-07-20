import Flow from "../types/flow";

export const flows: Flow[] = [
  {
    image: "/flows/read.webp",
    title: "Discover",
    moto: "Access Historical Data Seamlessly",
    description:
      "Our platform enables seamless access to comprehensive historical data, verified by advanced quantum algorithms. Integrate data from multiple sources, including logs, records, and transactions.",
    linkText: "View Docs",
    link: "/docs",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
        />
      </svg>
    ),
  },
  {
    image: "/flows/compute.webp",
    title: "Analyze",
    moto: "Harness the Power of Cognitive Insights",
    description:
      "Unlock the full potential of your data with our cutting-edge analytical tools. Leverage powerful AI models and integrations to derive insights and drive intelligent decision-making.",
    linkText: "Learn More",
    link: "/learn",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
        />
      </svg>
    ),
  },
  {
    image: "/flows/verify.webp",
    title: "Innovate",
    moto: "Build with Future-Ready Solutions",
    description:
      "Develop robust, scalable applications using our state-of-the-art development tools and resources. Empower your creations with the latest in AI technology and cognitive computing.",
    linkText: "Get Started",
    link: "/start",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
        />
      </svg>
    ),
  },
];
