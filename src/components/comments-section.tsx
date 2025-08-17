"use client";

import { useState } from "react";
import Image from "next/image";

interface Comment {
  id: number;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
  replies?: Comment[];
}

interface CommentsSectionProps {
  postSlug: string;
}

// Dummy comments data
const dummyComments: Comment[] = [
  {
    id: 1,
    author: "Sarah Johnson",
    avatar: "/demo01.png",
    content: "This is an excellent analysis! The AI performance comparison table really helped me understand the differences between various models. I'm particularly interested in the cost-effectiveness of Claude-3.",
    timestamp: "2 hours ago",
    likes: 12,
    replies: [
      {
        id: 2,
        author: "Mike Chen",
        avatar: "/demo01.png",
        content: "I agree! The cost per token is definitely a crucial factor when choosing an AI model for production use.",
        timestamp: "1 hour ago",
        likes: 5,
      }
    ]
  },
  {
    id: 3,
    author: "Alex Rodriguez",
    avatar: "/demo01.png",
    content: "Great insights on the implementation strategies. Have you considered covering the regulatory aspects of AI deployment in enterprises?",
    timestamp: "5 hours ago",
    likes: 8,
  },
  {
    id: 4,
    author: "Emily Watson",
    avatar: "/demo01.png",
    content: "The section on machine learning integration is spot on. As someone working with TensorFlow daily, I can confirm these observations match real-world experience.",
    timestamp: "1 day ago",
    likes: 15,
    replies: [
      {
        id: 5,
        author: "David Kim",
        avatar: "/demo01.png",
        content: "Emily, what's your experience with PyTorch vs TensorFlow for production deployments?",
        timestamp: "20 hours ago",
        likes: 3,
      },
      {
        id: 6,
        author: "Emily Watson",
        avatar: "/demo01.png",
        content: "David, I find PyTorch more intuitive for research, but TensorFlow still has better production tooling in my experience.",
        timestamp: "18 hours ago",
        likes: 7,
      }
    ]
  }
];

export default function CommentsSection({ postSlug }: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>(dummyComments);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now(),
      author: "You",
      avatar: "/demo01.png",
      content: newComment,
      timestamp: "Just now",
      likes: 0,
    };

    setComments([comment, ...comments]);
    setNewComment("");
  };

  const handleSubmitReply = (parentId: number) => {
    if (!replyText.trim()) return;

    const reply: Comment = {
      id: Date.now(),
      author: "You",
      avatar: "/demo01.png",
      content: replyText,
      timestamp: "Just now",
      likes: 0,
    };

    setComments(comments.map(comment => {
      if (comment.id === parentId) {
        return {
          ...comment,
          replies: [...(comment.replies || []), reply]
        };
      }
      return comment;
    }));

    setReplyText("");
    setReplyingTo(null);
  };

  const handleLike = (commentId: number, isReply = false, parentId?: number) => {
    setComments(comments.map(comment => {
      if (isReply && parentId && comment.id === parentId) {
        return {
          ...comment,
          replies: comment.replies?.map(reply => 
            reply.id === commentId 
              ? { ...reply, likes: reply.likes + 1 }
              : reply
          )
        };
      } else if (comment.id === commentId) {
        return { ...comment, likes: comment.likes + 1 };
      }
      return comment;
    }));
  };

  const CommentItem = ({ comment, isReply = false, parentId }: { comment: Comment; isReply?: boolean; parentId?: number }) => (
    <div className={`${isReply ? 'ml-6 sm:ml-10 md:ml-12 mt-3 sm:mt-4' : 'mt-4 sm:mt-6'}`}>
      <div className="flex items-start gap-3 sm:gap-4">
        <Image
          src={comment.avatar}
          alt={comment.author}
          width={40}
          height={40}
          className="rounded-full object-cover w-8 h-8 sm:w-10 sm:h-10"
        />
        <div className="flex-1">
          <div className="bg-muted/30 rounded-lg p-3 sm:p-4">
            <div className="flex items-center gap-2 mb-2">
              <h4 className="font-medium text-foreground text-sm sm:text-base">{comment.author}</h4>
              <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
            </div>
            <p className="text-[13px] sm:text-sm text-foreground leading-relaxed">{comment.content}</p>
          </div>
          
          <div className="flex items-center gap-3 sm:gap-4 mt-2 text-xs sm:text-sm">
            <button 
              onClick={() => handleLike(comment.id, isReply, parentId)}
              className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L9 10m5 0v11m0-11l-3-3" />
              </svg>
              <span>{comment.likes}</span>
            </button>
            
            {!isReply && (
              <button 
                onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Reply
              </button>
            )}
          </div>

          {replyingTo === comment.id && (
            <div className="mt-3 sm:mt-4">
              <div className="flex gap-3">
                <div className="flex-1">
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Write a reply..."
                    className="w-full px-3 py-2 text-sm border border-muted rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
                    rows={3}
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleSubmitReply(comment.id)}
                      className="px-4 py-1 bg-primary text-primary-foreground text-sm rounded-md hover:bg-primary/90 transition-colors"
                    >
                      Reply
                    </button>
                    <button
                      onClick={() => setReplyingTo(null)}
                      className="px-4 py-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-4">
              {comment.replies.map((reply) => (
                <CommentItem key={reply.id} comment={reply} isReply={true} parentId={comment.id} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <section className="w-full mt-8 sm:mt-10 md:mt-12">
      <div className="bg-card rounded-xl border p-4 sm:p-6 shadow-sm">
        <div className="flex items-center mb-4 sm:mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <h3 className="text-lg sm:text-xl font-semibold text-foreground">Comments ({comments.length + comments.reduce((acc, c) => acc + (c.replies?.length || 0), 0)})</h3>
        </div>

        {/* Comment Form */}
        <form onSubmit={handleSubmitComment} className="mb-6 sm:mb-8">
          <div className="flex gap-3 sm:gap-4">
            <div className="flex-1">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your thoughts on this article..."
                className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-muted rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
                rows={3}
              />
              <div className="flex justify-between items-center mt-2 sm:mt-3">
                <p className="text-xs text-muted-foreground">
                  Be respectful and constructive in your comments.
                </p>
                <button
                  type="submit"
                  disabled={!newComment.trim()}
                  className="px-3 py-1.5 text-xs sm:text-sm sm:px-6 sm:py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Post Comment
                </button>
              </div>
            </div>
          </div>
        </form>

        {/* Comments List */}
        <div className="space-y-1">
          {comments.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <svg className="w-12 h-12 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <p>No comments yet. Be the first to share your thoughts!</p>
            </div>
          ) : (
            comments.map((comment) => (
              <CommentItem key={comment.id} comment={comment} />
            ))
          )}
        </div>
      </div>
    </section>
  );
} 