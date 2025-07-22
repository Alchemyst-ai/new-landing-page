"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { RainbowButton } from "@/components/magicui/rainbow-button";

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
      <RainbowButton 
        variant="default" 
        size="default" 
        className="flex items-center px-3 py-2 text-sm font-medium text-black rounded-full"
      >
        <FaGithub className="size-5" />
        {stars !== null && (
          <span>
            Star on GitHub ★ {stars.toLocaleString()}
          </span>
        )}
      </RainbowButton>
    </Link>
  );
};

export default GitHubButtonWithStars;
