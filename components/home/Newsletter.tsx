import Image from "next/image";
import Link from "next/link";
import Button from "./Button";

const Newsletter: React.FC = () => {
  return (
    <div className="">
      <div className="container mx-auto px-4 py-12 md:py-24 flex justify-center items-center min-h-[600px]">
        <div className="p-8 w-full max-w-6xl border border-gray-600 rounded-3xl">
          <div className="flex flex-col md:flex-row items-center ">
            {/* Left Column */}
            <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pl-12 text-center md:text-start">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Join Our Newsletter
              </h2>
              <p className="text-xl mb-6 text-gray-300">
                Never Miss an Update!
              </p>
              <div className="relative mb-6 text-black">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full px-4 py-2 rounded-xl border border-gray-600 text-lg"
                />
              </div>
              <div className="flex items-center justify-center md:justify-start md:items-start space-x-4">
                <div className="flex items-center space-x-4">
                  <Link href="#">
                    <Button variant="primary">Subscribe</Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="w-full md:w-1/2 relative h-[200px] md:h-[500px]">
              <Image
                src="/media/mailbox.svg"
                alt="Background"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-lg mt-14 hidden md:block"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
