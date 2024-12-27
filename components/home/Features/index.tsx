import Card1 from "./card1";
import Card2 from "./card2";
import Card3 from "./card3";

export default function Features() {
  return (
    <section className="w-full py-12 -mt-28 md:py-24 lg:py-32 px-4 md:px-6 lg:px-8">
      <h2 className="text-4xl font-bold text-gray-400 mb-12 text-center">
        Features
      </h2>
      <div className="container mx-auto max-w-fit">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-10">
            <Card1 />
            <Card2 />
          </div>
          <div className="md:h-fit">
            <Card3 />
          </div>
        </div>
      </div>
    </section>
  );
}
