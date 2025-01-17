import Image from "next/image";

export default function Card1() {
  return (
    <div className="bg-gradient-to-r from-black to-[#272727] border border-gray-600 shadow-[0_5px_20px_1px_rgba(255,153,153,0.2)] rounded-3xl overflow-hidden relative">
      <div className="flex flex-col md:flex-row">
        <div className="p-10 md:w-1/2">
          <h2 className="text-2xl font-bold mb-8 text-white">
            Secure and Compliant Sales Tools
          </h2>
          <ul className="space-y-8 text-gray-400">
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
        <div className="w-full h-64 md:w-1/2 md:h-full md:absolute -top-8 md:-top-5 md:right-0 relative">
          <div className="relative w-full h-full">
            <Image
              src="/media/sandcsalestools.png"
              alt="Secure and Compliant Sales Tools"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

