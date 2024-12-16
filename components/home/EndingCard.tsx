import Image from 'next/image'
import Link from "next/link";
import Button from "./Button";

const EndingCard: React.FC = () => {
  return (
    <div className="w-full bg-gradient-to-b from-black via-black to-[#fe9833] text-white">
      <div className="container mx-auto px-4 py-12 md:py-24">
        <div className="flex flex-col md:flex-row items-center">
          {/* Left Column */}
          <div className="w-full md:w-1/3 mb-8 md:mb-0 md:pr-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Hire Maya and Supercharge Your Team?
            </h2>
            <p className="text-lg mb-6">
              Ava is equipped with the best-in-class outbound tools to automate your outbound, 
              freeing your reps' time to focus on closing deals.
            </p>
            <Link
                  href=""
                  className="flex-1"
                >
                  <Button variant="primary" className="w-full text-sm py-2">
                    Connect now!
                  </Button>
                </Link>
          </div>

          {/* Right Column */}
          <div className="w-full md:w-2/3 relative">
            <div className="aspect-w-16 aspect-h-9">
              <Image
                src=""
                alt="Background"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4">
              <Image
                src=""
                alt="Foreground"
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EndingCard

