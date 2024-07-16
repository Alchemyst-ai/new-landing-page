const Announcement: React.FC = () => {
  return (
    <div className="w-full flex justify-center items-center my-20">
      <div className="bg-[#ffffe6] text-black p-4 py-2 w-full md:w-fit rounded-full shadow-announcement">
        <p className="text-center px-8 py-1">
          🎉 Axiom V2 is live on mainnet! Read the launch post and developer
          docs to integrate today. 🎉
        </p>
      </div>
    </div>
  );
};

export default Announcement;
