import Image from "next/image";

export default function Card1() {
  return (
    <div className="bg-gradient-to-br from-[#9b4d00] via-black to-[#9b4d00] border border-gray-500 shadow-lg shadow-gray-600 rounded-xl overflow-hidden hover:scale-105 transition-transform duration-500 h-[450px]">
      <div className=" flex flex-col md:flex-row">
        <div className="md:w-1/2 p-10 md:pr-4">
          <h2 className="text-3xl font-bold mb-8 text-white">
            Secure and Compliant Sales Tools
          </h2>
          <ul className="space-y-8 text-gray-400 ">
            <li>
              <p className="font-semibold">Top-Notch Sales Data Security:</p>
              <p>
                Stay compliant with industry-leading standards, including SOC 2
                and ISO 27001, while safeguarding your sales data.
              </p>
            </li>
            <li>
              <p className="font-semibold">
                Unparalleled Sales Platform Reliability:
              </p>
              <p>
                With 100% observability, redundancy, and no manual interference,
                Maya guarantees seamless sales operations every time.
              </p>
            </li>
          </ul>
        </div>
        <div className="md:w-1/2 md:-mt-8 hidden md:block">
          <Image
            src="/media/sandcsalestools.png"
            alt="Secure and Compliant Sales Tools"
            width={500}
            height={500}
            className="w-full md:h-full h-52 object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}
