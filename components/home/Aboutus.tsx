import Link from 'next/link'
import Image from 'next/image'

const AboutUs: React.FC = () => {
  return (
    <div className="w-full mx-auto p-6 transition-all duration-500 ease-in-out hover:scale-95">
      <div className="relative overflow-hidden rounded-lg shadow-xl bg-gradient-to-b from-black via-black to-gray-900 border border-gray-700">
        {/* <div className="absolute inset-0 z-0">
          <Image
            src="/images/about-us-background.jpg"
            alt="Abstract background image"
            layout="fill"
            objectFit="cover"
            quality={100}
          />
        </div> */}
        <div className="relative z-10 p-8 text-center text-gray-400">
          <h2 className="text-3xl font-bold mb-4">About Us</h2>
          <h3 className="text-xl font-semibold mb-4">Driving sales innovation with AI</h3>
          <p className="text-sm max-w-xl mx-auto mt-8">
            At Alchemyst.AI, we are on a mission to redefine sales through cutting edge AI tools. 
            Whether you're a startup, SME, or enterprise, our AI powered sales tools help you 
            close deals faster and smarter.
          </p>
          <Link href="">
            <button className="inline-block px-6 py-2 mt-16 text-black font-semibold text-center rounded-full bg-[#fe9833] transition-all duration-500 ease-in-out hover:scale-125">
                Connect Now!
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AboutUs

