import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const MayaCard: React.FC = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 mt-16">
      <div className="relative bg-gradient-to-b from-black via-black to-[#9d4f00] rounded-xl shadow-2xl">
        <h2 className="text-2xl md:text-3xl pt-10 font-bold text-gray-400 text-center">
          Maya, the Sales Representative
        </h2>

        <Link href="#" className="absolute top-8 right-4 group">
          <div className="relative">
            <ChevronRight className="text-white w-10 h-10 transition-all duration-300 ease-in-out group-hover:scale-110" />
            <div className="absolute inset-0 bg-white rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-500 ease-in-out"></div>
          </div>
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-3">
          {/* Column 1 */}
          <div className="col-span-1 md:col-span-1">
            <div className="aspect-w-3 aspect-h-4">
              <Image
                src="/media/maya-TSR-Left.png"
                alt="Maya 1"
                width={500}
                height={500}
                className="rounded-lg mt-24"
              />
            </div>
          </div>

          {/* Column 2 */}
          <div className="col-span-2 md:col-span-1">
            <div className="aspect-w-3 aspect-h-4">
              <Image
                src="/media/maya-TSR-Middle.png"
                alt="Maya 2"
                width={300}
                height={300}
                className="rounded-lg mt-20 pl-12 md:mt-32 md:pl-10"
              />
            </div>
          </div>

          {/* Column 3 */}
          <div className="">
            <div className="aspect-w-3 aspect-h-4">
              <Image
                src="/media/maya-TSR-Right.png"
                alt="Maya 4"
                width={500}
                height={500}
                className="rounded-lg mt-28 pr-10"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MayaCard;