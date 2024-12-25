import Image from "next/image";

export default function Card2() {
  return (
    <div className="bg-gradient-to-br from-[#9b4d00] via-black to-[#9b4d00] border border-gray-500 shadow-lg shadow-gray-600 rounded-xl overflow-hidden hover:scale-105 transition-transform duration-500 h-1/2">
      <div className="p-6 flex flex-col md:flex-row">
        <div className="md:w-80 md:pr-4 order-2 md:order-1">
          <Image
            src="/media/whyalchemyst1.png"
            alt="Why Choose Alchemyst.ai"
            width={500}
            height={300}
            className="object-cover rounded-lg mb-4 md:mb-0"
          />
          <h2 className="text-4xl font-bold mb-4 text-white">Why Choose Alchemyst.ai</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-400">
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
              height={200}
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
