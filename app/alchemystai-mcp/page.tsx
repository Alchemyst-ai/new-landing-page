import { Button } from "@/components/ui/button";
import { Link } from "lucide-react";
import VideoEmbed from "./VideoEmbed";
import Image from "next/image";
import Navbar from "@/components/components-new/Navbar";

const items = [
  {
    id: 1,
    image: "/images/img1.jpg",
    title: "Card One",
    description: "This is the first card.",
  },
  {
    id: 2,
    image: "/images/img2.jpg",
    title: "Card Two",
    description: "This is the second card.",
  },
  {
    id: 3,
    image: "/images/img3.jpg",
    title: "Card Three",
    description: "This is the third card.",
  },
  {
    id: 4,
    image: "/images/img4.jpg",
    title: "Card Four",
    description: "This is the fourth card.",
  },
];


const page = () => {
  return (
    <>
    <Navbar />
    <div className="w-screen pt-20 overflow-y-auto flex flex-col justify-start items-center gap-16">
        <div className="w-[80%] flex flex-col justify-center gap-2 items-center">
            <p className="text-center text-2xl">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus, necessitatibus?</p>
            <p className="text-center w-[50%]">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident laudantium pariatur quae tempora cum reprehenderit similique quas libero dicta praesentium! Architecto aliquam molestiae nihil nesciunt.</p>
            <div className="flex gap-2">
            {/* <Link href="#get-started"> */}
            <Button className="bg-white hover:bg-white/90 text-black text-base md:text-lg py-4 md:py-6 px-6 md:px-8 font-bold">
                Read the docs
            </Button>
            {/* </Link> */}
            {/* <Link href="https://platform.getalchemystai.com/auth"> */}
            <Button variant="outline" className="border-2 border-white text-white text-base md:text-lg py-4 md:py-6 px-6 md:px-8 bg-black/30 font-medium">
                Install AlchemystAI
            </Button>
            {/* </Link> */}
            </div>
        </div>
        <div className="w-[50%]">
            <VideoEmbed />
        </div>
        <div className="w-[80%] flex flex-col justify-center items-center gap-4">
            <p className="text-3xl font-semibold">Features</p>
            <p className="text-lg w-[50%] text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. A dolorum libero sit minus dolor, animi alias hic deserunt quidem, esse obcaecati officia facere, molestiae ratione totam fugiat illum necessitatibus sapiente.</p>
            <div className="w-[60%]">
                <div className="flex flex-wrap -m-4">
                {items.map((item) => (
                    <div key={item.id} className="w-1/2 p-4">
                    <div className="flex flex-col h-64 bg-white rounded-lg shadow-md overflow-hidden">
                        {/* Image - 60% height */}
                        <div className="h-[60%] relative">
                        <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover"
                        />
                        </div>

                        {/* Content - 40% height */}
                        <div className="h-[40%] p-4 flex flex-col justify-center">
                        <h3 className="text-lg font-semibold">{item.title}</h3>
                        <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                    </div>
                    </div>
                ))}
                </div>
            </div>
        </div>
        <div className="w-screen py-10 border-2 boder-red-600 flex flex-col gap-4 justify-center items-center">
            <p className="text-center flex justify-center font-semibold text-xl">Usecases</p>

        </div>
        <div className="w-[80%] flex flex-col justify-center gap-2 items-center">
            <p className="text-center text-2xl">Privacy First Design</p>
            <p className="text-center w-[50%]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, modi ex! Cupiditate eum, tempora excepturi quibusdam in reprehenderit consequatur, quis fuga corrupti tempore officia amet, numquam libero omnis delectus facere!</p>
        </div>
        <div className="w-[80%] flex flex-col justify-center items-center gap-8">
            <p className="text-8xl font-semibold text-center w-[40%]">Lorem ipsum dolor sit amet consectetur adipisicing.</p>

            <p className="text-center flex w-[50%] justify-center">Lorem, ipsum dolor.</p>
            <div className="flex gap-2">
            {/* <Link href="#get-started"> */}
            <Button className="bg-white hover:bg-white/90 text-black text-base md:text-lg py-4 md:py-6 px-6 md:px-8 font-bold">
                Get started
            </Button>
            {/* </Link> */}
            {/* <Link href="https://platform.getalchemystai.com/auth"> */}
            <Button variant="outline" className="border-2 border-white text-white text-base md:text-lg py-4 md:py-6 px-6 md:px-8 bg-black/30 font-medium">
                Pricing
            </Button>
            {/* </Link> */}
            </div>
        </div>
    </div>
    </>
  );
};

export default page;
