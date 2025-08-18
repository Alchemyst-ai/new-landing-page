"use client";

import { useState } from "react";

interface Comment {
  id: number;
  author: string;
  content: string;
}

interface CommentsSectionProps {
  postSlug: string;
}

// Simple seed comments
const initialComments: Comment[] = [
  { id: 1, author: "Sarah Johnson", content: "This is an excellent analysis!" },
  { id: 2, author: "Alex Rodriguez", content: "Great insights on implementation strategies." },
];

export default function CommentsSection({ postSlug }: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [commentText, setCommentText] = useState("");
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !commentText.trim()) return;

    const newComment: Comment = {
      id: Date.now(),
      author: name.trim(),
      content: commentText.trim(),
    };

    setComments([newComment, ...comments]);
    if (remember) {
      try {
        localStorage.setItem("commenter_name", name.trim());
        localStorage.setItem("commenter_email", email.trim());
      } catch (_) {}
    }
    setCommentText("");
  };

  // Prefill from storage
  useState(() => {
    try {
      const savedName = localStorage.getItem("commenter_name") || "";
      const savedEmail = localStorage.getItem("commenter_email") || "";
      if (savedName) setName(savedName);
      if (savedEmail) setEmail(savedEmail);
    } catch (_) {}
    return undefined;
  });

  return (
    <section className="w-full mt-8 sm:mt-10 md:mt-12">
      <div className="bg-card rounded-xl border p-4 sm:p-6 shadow-sm">
        <h3 className="text-xl font-semibold text-foreground">Leave a Reply</h3>
        <p className="text-sm text-muted-foreground mt-2">Your email address will not be published. Required fields are marked *</p>

        {/* Comment Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Name *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-3 py-2 border border-muted rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Email *</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-3 py-2 border border-muted rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Write a comment *</label>
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a comment"
              className="w-full px-3 py-2 border border-muted rounded-lg resize-y min-h-[120px] bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>

          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
            Save my name, email in this browser for the next time I comment.
          </label>

          <div className="pt-2">
            <button
              type="submit"
              disabled={!name.trim() || !email.trim() || !commentText.trim()}
              className="px-3 py-1.5 text-xs sm:text-sm sm:px-6 sm:py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors w-full sm:w-auto"
            >
              Post
            </button>
          </div>
        </form>

        {/* Comments List */}
        <div className="mt-8">
          {comments.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No comments yet. Be the first to share your thoughts!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {comments.map((c) => (
                <div key={c.id} className="border border-muted rounded-lg p-4 bg-card/50">
                  <p className="font-semibold text-foreground text-sm">{c.author}</p>
                  <p className="text-sm text-foreground mt-1 leading-relaxed">{c.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
} 