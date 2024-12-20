import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

const MayaCard: React.FC = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 mt-16">
      <div className="relative bg-gradient-to-b from-black via-black to-[#fe9833] rounded-xl shadow-2xl p-6">
        <h2 className="text-4xl font-bold text-gray-400 text-center mb-8">Maya, the Sales Representative</h2>
        
        <Link href="#" className="absolute top-4 right-4 group">
          <div className="relative">
            <ChevronRight className="text-white w-8 h-8 transition-all duration-300 ease-in-out group-hover:scale-105" />
            <div className="absolute inset-0 bg-white rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 ease-in-out"></div>
          </div>
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Column 1 */}
          <div className="md:col-span-1">
            <div className="aspect-w-3 aspect-h-4 md:aspect-w-1 md:aspect-h-1">
              <Image
                src="/images/maya-1.png"
                alt="Maya 1"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          </div>

          {/* Column 2 */}
          <div className="md:col-span-1 flex justify-center items-center">
            <div className="aspect-w-3 aspect-h-4 md:aspect-w-1 md:aspect-h-1 w-full">
              <Image
                src="/images/maya-2.png"
                alt="Maya 2"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          </div>

          {/* Column 3 */}
          <div className="md:col-span-1 grid grid-cols-2 md:grid-cols-1 gap-4">
            <div className="aspect-w-3 aspect-h-4 md:aspect-w-1 md:aspect-h-1">
              <Image
                src="/images/maya-3.png"
                alt="Maya 3"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
            <div className="aspect-w-3 aspect-h-4 md:aspect-w-1 md:aspect-h-1">
              <Image
                src="/images/maya-4.png"
                alt="Maya 4"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MayaCard

