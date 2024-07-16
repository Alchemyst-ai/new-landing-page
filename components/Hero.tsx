import Announcement from "@/components/Announcement";
import Button from "@/components/Button";
import GridLayout from "@/components/GridLayout";

const Hero: React.FC = () => {
  const getRandomDelay = () => `${Math.random() * 5}s`;

  const verticalLines = Array.from({ length: 10 }).map((_, index) => (
    <div
      key={`v-${index}`}
      className="h-screen absolute top-0 animated-line flex flex-col justify-end items-end"
      style={{
        right: `${20 + Math.random() * 20}%`,
        animationDelay: getRandomDelay(),
      }}
    >
      <div className="w-[1px] bg-gradient-to-b from-black via-gray-300 to-white h-64"></div>
    </div>
  ));

  const horizontalLines = Array.from({ length: 10 }).map((_, index) => (
    <div
      key={`h-${index}`}
      className="w-screen absolute right-0 animated-line-w flex flex-col justify-start items-start"
      style={{
        top: `${20 + Math.random() * 60}%`,
        animationDelay: getRandomDelay(),
      }}
    >
      <div className="h-[1px] w-32 bg-gradient-to-l from-black via-gray-300 to-white"></div>
    </div>
  ));

  return (
    <GridLayout>
      <div className="relative z-20 flex h-full w-full items-center justify-center">
        {verticalLines}
        {horizontalLines}
        <div className="relative my-40 w-full md:w-2/3 px-4 md:px-0">
          <h1 className="text-4xl md:w-3/4 md:text-6xl text-center md:text-start font-bold leading-tight md:leading-[1.1] circular-gradient-text">
            Compute over the history of Ethereum in your smart contract
          </h1>
          <p className="my-10 w-full md:w-2/5 text-lg font-medium text-center md:text-start">
            Access more data at a lower cost on-chain, made trustless by the
            power of ZK. Use transactions, receipts, and historic state in your
            smart contract.
          </p>
          <div className="flex flex-col md:flex-row gap-2">
            <Button variant={"primary"}>Developer Docs</Button>
            <Button
              variant={"secondary"}
              icon={
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
              }
            >
              Contact Us
            </Button>
          </div>
          <Announcement />
          <div className="absolute top-5 right-28 hidden md:flex cursor-pointer">
            <div className="flex h-6 w-6 items-center justify-center transition-all hover:border hover:border-white">
              <div className="h-2 w-2 bg-white" />
            </div>
            <p className="-mt-4 ml-1">V2 MAINNET</p>
          </div>
          <div className="absolute top-32 right-5 hidden md:flex cursor-pointer">
            <div className="hidden md:flex h-6 w-6 items-center justify-center transition-all hover:border hover:border-white">
              <div className="h-2 w-2 bg-white" />
            </div>
            <p className="-mt-4 ml-1">AXIOM REPL</p>
          </div>
          <div className="absolute top-96 right-20 hidden md:flex cursor-pointer">
            <div className="hidden md:flex h-6 w-6 items-center justify-center transition-all hover:border hover:border-white">
              <div className="h-2 w-2 bg-white" />
            </div>
            <p className="mt-4 mr-1">READ OUR BLOG</p>
          </div>
          <div className="absolute top-80 right-72 hidden md:flex cursor-pointer">
            <p className="mt-4 mr-1">JOIN US</p>
            <div className="flex h-6 w-6 items-center justify-center transition-all hover:border hover:border-white">
              <div className="h-2 w-2 bg-white" />
            </div>
          </div>
        </div>
      </div>
    </GridLayout>
  );
};

export default Hero;
