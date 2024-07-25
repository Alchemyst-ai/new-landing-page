import Team from "@/app/types/team";
import Image from "next/image";
import Link from "next/link";
import { LinkedIn } from "./IconComponent/Linkedin";
import { Twitter } from "./IconComponent/Twitter";

interface TeamMemberCardProps {
  member: Team;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="relative flex flex-col items-end justify-end h-[37vh] overflow-hidden rounded-lg bg-gradient-radial to-[#04022eed] via-[#15107aed] from-[#353B92] group ">
        <Image src={member.image} alt={member.name} width={300} height={400} />
        <HoverOverlay member={member} />
        <BottomOverlay member={member} />
      </div>
    </div>
  );
};

const HoverOverlay: React.FC<{ member: Team }> = ({ member }) => (
  <div className="absolute bg-grid inset-0 flex flex-col items-center justify-center bg-[#080419] opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-3">
    <h2 className="text-2xl">{member.name}</h2>
    <p className="text-lg text-gray-300">{member.role}</p>
    <p className="mt-3 text-center text-sm text-balance text-slate-400">
      {member.achievement}
    </p>
    <SocialLinks member={member} />
  </div>
);

const BottomOverlay: React.FC<{ member: Team }> = ({ member }) => (
  <div className="absolute bottom-0 left-0 flex flex-col items-start justify-end w-full h-[38vh] p-4 bg-gradient-to-b from-[#00000038] via-[#00000010] to-[#000000c3] bg-opacity-50 transition-transform duration-300 transform group-hover:-translate-y-full">
    <h2 className="text-2xl">{member.name}</h2>
    <p className="text-sm text-gray-400">{member.role}</p>
  </div>
);

const SocialLinks: React.FC<{ member: Team }> = ({ member }) => (
  <div className="mt-4 flex items-center gap-4">
    <Link href={member.twitter} className="h-5 w-5">
      <Twitter />
    </Link>
    <Link href={member.linkedin} className="h-5 w-5">
      <LinkedIn />
    </Link>
  </div>
);

export default TeamMemberCard;
