import Image from "next/image";

export default function Card2() {
  return (
    <div className="bg-gradient-to-r from-black to-[#272727] border border-gray-600 shadow-[0_5px_20px_1px_rgba(255,153,153,0.2)] rounded-3xl overflow-hidden hover:scale-105 transition-transform duration-500 h-[400px]">
      <div className="p-6 flex flex-col md:flex-row">
        <div className="md:w-80 md:pr-4 order-2 md:order-1">
          <Image
            src="/media/whyalchemyst1.png"
            alt="Why Choose Alchemyst.ai"
            width={500}
            height={300}
            className="object-cover rounded-lg mb-4 md:mb-4 h-40"
          />
          <h2 className="text-3xl font-bold mb-4 text-white">
            Why Choose Alchemyst AI?
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-400 text-sm mb-14">
            <li>Increase B2B lead generation efficiency.</li>
            <li>Enhance sales automation with AI.</li>
            <li>Achieve secure, compliant, and reliable results.</li>
          </ul>
        </div>
        <div className="md:w-1/2 order-1 hidden md:block md:order-2">
          <div className="mb-4 mt-14">
            <Image
              src="/media/whyalchemyst2.png"
              alt="Alchemyst.ai Features"
              width={400}
              height={400}
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
