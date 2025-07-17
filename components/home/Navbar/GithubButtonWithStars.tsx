import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";

const GitHubButtonWithStars = () => {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    const fetchStars = async () => {
      try {
        const res = await fetch("https://api.github.com/repos/alchemyst-ai/awesome-saas");
        if (!res.ok) throw new Error("Failed to fetch stars");
        const data = await res.json();
        setStars(data.stargazers_count);
      } catch (error) {
        console.error("Error fetching GitHub stars:", error);
      }
    };

    fetchStars();
  }, []);

  return (
    <Link
      href="https://github.com/alchemyst-ai/awesome-saas"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2"
    >
      <Button
        variant="secondaryNoHover"
        className="bg-transparent py-2 text-3xl hover:scale-[1.1] rounded-full flex gap-2 p-0"
      >
        <FaGithub />
      {stars !== null && (
        <div className=" border border-gray-300 text-sm text-white px-2 py-1 rounded-md font-medium shadow-sm hover:shadow transition">
          ⭐ {stars.toLocaleString()} Stars
        </div>
      )}
      </Button>

    </Link>
  );
};

export default GitHubButtonWithStars;
