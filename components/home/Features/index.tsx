import Card1 from "./card1";
import Card2 from "./card2";
import Card3 from "./card3";

export default function Features() {
  return (
    <section className="w-full py-12 -mt-28 md:py-24 lg:py-32 px-4 md:px-6 lg:px-8">
      <h2 className="text-6xl font-bold mb-12 text-center">
        Features
      </h2>
      <div className="container mx-auto max-w-[90%]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col justify-between space-y-10">
            <Card1 />
            <Card2 />
          </div>
          <div className="flex flex-col justify-between md:h-full">
            <Card3 />
          </div>
        </div>
      </div>
    </section>
  );
}

