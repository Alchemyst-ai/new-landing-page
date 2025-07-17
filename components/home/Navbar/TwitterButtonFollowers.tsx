import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaTwitter } from "react-icons/fa";

const TwitterButtonWithFollowers = () => {
  const [followers, setFollowers] = useState<number | null>(null);

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const res = await fetch("/api/x/followers");
        if (!res.ok) throw new Error("Failed to fetch Twitter followers");
        const data = await res.json();
        const count = data.meta?.result_count ?? data.data?.length ?? null;
        if (data.meta?.result_count) {
          setFollowers(data.meta.result_count);
        } else if (Array.isArray(data.data)) {
          setFollowers(data.data.length);
        }
      } catch (error) {
        console.error("Error fetching Twitter followers:", error);
      }
    };

    fetchFollowers();
  }, []);

  return (
    <Link
      href="https://x.com/getalchemyst"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2"
    >
      <Button
        variant="secondaryNoHover"
        className="bg-transparent py-2 text-3xl hover:scale-[1.1] rounded-full flex gap-2 p-0"
      >
        <FaTwitter className="text-[#1DA1F2]" />
        {followers !== null && (
          <div className="border border-gray-300 text-sm text-white px-2 py-1 rounded-md font-medium shadow-sm hover:shadow transition">
            👥 {followers.toLocaleString()} Followers
          </div>
        )}
      </Button>
    </Link>
  );
};

export default TwitterButtonWithFollowers;
