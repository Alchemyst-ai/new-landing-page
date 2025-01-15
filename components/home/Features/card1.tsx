import Image from "next/image";

export default function Card1() {
  return (
    // bg-gradient-to-tl from-black via-black to-[#5c2e00] border border-gray-500 shadow-lg shadow-gray-600 rounded-xl
    <div className="bg-gradient-to-r from-black to-[#272727] border border-gray-600 shadow-[0_5px_20px_1px_rgba(255,153,153,0.2)] rounded-3xl overflow-hidden hover:scale-105 transition-transform duration-500 h-[400px] relative">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 p-10 md:pr-4">
          <h2 className="text-2xl font-bold mb-8 text-white">
            Secure and Compliant Sales Tools
          </h2>
          <ul className="space-y-8 text-gray-400 ">
            <li>
              <p className="font-semibold text-white text-md">
                Top-Notch Sales Data Security:
              </p>
              <p className="text-sm">
                Stay compliant with industry-leading standards, including
                <span className="text-orange-400"> SOC 2 </span>
                and <span className="text-orange-400"> ISO 27001</span>, while
                safeguarding your sales data.
              </p>
            </li>
            <li>
              <p className="font-semibold text-white text-md">
                Unparalleled Sales Platform Reliability:
              </p>
              <p className="text-sm">
                With{" "}
                <span className="text-orange-400">
                  100% observability, redundancy, and no manual interference
                </span>
                , Maya guarantees seamless sales operations every time.
              </p>
            </li>
          </ul>
        </div>
        <div className="md:w-1/2 absolute -top-8 right-0 h-full hidden md:block">
          <Image
            src="/media/sandcsalestools.png"
            alt="Secure and Compliant Sales Tools"
            width={500}
            height={500}
            className="object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}

