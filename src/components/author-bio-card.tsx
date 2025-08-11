import Image from "next/image";

export interface AuthorBioCardProps {
  name: string;
  role?: string;
  image?: string;
  bio?: string;
}

export default function AuthorBioCard({ name, role, image, bio }: AuthorBioCardProps) {
  if (!name && !bio) return null;

  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
      <div className="flex items-start gap-4">
        <Image
          src={image || "/logo.png"}
          alt={name || "Author"}
          width={48}
          height={48}
          className="rounded-full object-cover"
        />
        <div>
          <div className="mb-2">
            <p className="text-base font-semibold text-foreground">{name}</p>
            {role ? (
              <p className="text-xs uppercase tracking-wide text-muted-foreground">{role}</p>
            ) : null}
          </div>
          {bio ? (
            <p className="text-sm leading-6 text-muted-foreground whitespace-pre-line">{bio}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
} 