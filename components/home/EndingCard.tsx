import Image from "next/image";
import Link from "next/link";
import Button from "./Button";

const EndingCard: React.FC = () => {
  return (
    <div className="w-full bg-gradient-to-b from-[#0a0b08] via-black to-[#7c4711] text-white">
      <div className="container mx-auto px-4 py-12 md:py-24">
        <div className="flex flex-col md:flex-row items-center">
          {/* Left Column */}
          <div className="w-full md:w-1/3 mb-8 md:mb-0 md:pr-8 text-center md:text-start">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Struggling with Manual Work? Let Maya Transform Your Workflow!
            </h2>
            <p className="text-lg mb-6 text-gray-400">
              Don&#39;t let repetitive tasks hold your business back. Maya is
              built to revolutionize how you work—combining sales automation,
              WhatsApp and Telegram outreach, and email warm-up to supercharge
              your productivity and results.
            </p>
            <div className="flex justify-center md:justify-start">
              <Link href="" className="flex-1 md:flex-none">
                <Button variant="primary" className="w-full md:w-auto text-sm py-2 ">
                  Try Maya for Free
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column */}
          <div className="w-full md:w-2/3 relative h-[300px] md:h-[400px]">
            <Image
              src="/media/endingcard.png"
              alt="Background"
              fill
              style={{ objectFit: "cover" }}
              className="rounded-lg mt-14"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EndingCard;
