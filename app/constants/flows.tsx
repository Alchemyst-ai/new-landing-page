import Flow from "../types/flow";

export   const flows: Flow[] = [
    {
      image:
        "/flows/read.webp",
      title: "Read",
      moto: "Trustlessly access Ethereum history",
      description:
        "Axiom supports computing over the entire history of Ethereum, verified by ZK proofs on-chain. Combine data from block headers, accounts, contract storage, transactions, and receipts.",
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
      image:
        "/flows/compute.webp",
      title: "Analyze",
      moto: "Unlock the power of data",
      description:
        "Analyze Ethereum data with ease, leveraging powerful tools and integrations to gain insights and drive decision-making.",
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
      image:
        "/flows/verify.webp",
      title: "Build",
      moto: "Create with confidence",
      description:
        "Build robust and scalable applications using our comprehensive development tools and resources.",
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
