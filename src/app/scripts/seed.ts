import { ObjectId } from 'mongodb';
import mongoose from "mongoose";
import ContextSpace from "../models/ContextSpace";

const MONGODB_URI = process.env.MONGODB_URI!;

// 👇 replace with a real user _id from your DB
const USER_ID = new mongoose.Types.ObjectId("64f000000000000000000001");

function generateMagicKey() {
  return `mk-${Date.now().toString(36)}-${Math.random()
    .toString(36)
    .substring(2, 8)}`;
}

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ MongoDB connected");

    // Optional: clear existing data
    await ContextSpace.deleteMany({});
    console.log("🧹 Existing tools cleared");

    const tools = [
      {
        name: "Product Launch Keynote",
        about: "Complete keynote presentation for tech product launch with animated slides, speaker notes, and audience engagement metrics.",
        magic_key: "mk-keynote-launch",
        user_id: ObjectId.createFromHexString("68c07ecb08cab506d34e4159"),
        cover_image_url: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80",
        uses: 3421,
        upvotes: 567,
        categories: ["Presentation", "Product", "Keynote"],
        is_featured: true,
        nodes_count: 12,
        data_size: 45000000 // 45MB
      },
      {
        name: "Q4 Financial Analysis Report",
        about: "Comprehensive quarterly financial analysis with interactive charts, automated insights, and executive summary generation.",
        magic_key: "mk-finance-q4",
        user_id: ObjectId.createFromHexString("68c07ecb08cab506d34e4159"),
        cover_image_url: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
        uses: 1523,
        upvotes: 189,
        categories: ["Finance", "Analytics", "Reports"],
        is_featured: true,
        nodes_count: 8,
        data_size: 12500000 // 12.5MB
      },
      {
        name: "Technical Documentation Hub",
        about: "Centralized API documentation with code examples, interactive playground, and version history.",
        magic_key: "mk-api-docs",
        user_id: ObjectId.createFromHexString("68c07ecb08cab506d34e4159"),
        cover_image_url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
        uses: 4521,
        upvotes: 678,
        categories: ["API", "Documentation", "Developer"],
        is_featured: true,
        nodes_count: 24,
        data_size: 89000000 // 89MB
      },
      {
        name: "Customer Research Podcast",
        about: "Audio compilation of customer interviews with AI-generated transcripts and sentiment analysis.",
        magic_key: "mk-podcast-research",
        user_id: ObjectId.createFromHexString("68c07ecb08cab506d34e4159"),
        cover_image_url: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&q=80",
        uses: 654,
        upvotes: 87,
        categories: ["Research", "Audio", "UX"],
        is_featured: false,
        nodes_count: 5,
        data_size: 256000000 // 256MB
      },
      {
        name: "Onboarding Video Series",
        about: "Complete employee onboarding video series with interactive quizzes and progress tracking.",
        magic_key: "mk-onboard-series",
        user_id: ObjectId.createFromHexString("68c07ecb08cab506d34e4159"),
        cover_image_url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
        uses: 2134,
        upvotes: 312,
        categories: ["HR", "Training", "Video"],
        is_featured: false,
        nodes_count: 15,
        data_size: 1200000000 // 1.2GB
      },
      {
        name: "Marketing Campaign Assets",
        about: "Full marketing campaign including social media graphics, email templates, and brand guidelines document.",
        magic_key: "mk-marketing-2024",
        user_id: ObjectId.createFromHexString("68c07ecb08cab506d34e4159"),
        cover_image_url: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
        uses: 892,
        upvotes: 124,
        categories: ["Marketing", "Design", "Branding"],
        is_featured: false,
        nodes_count: 10,
        data_size: 78000000 // 78MB
      },
      {
        name: "AI-Powered Resume Website",
        about: "Transformed a traditional resume into a fully functional, professionally designed portfolio website with voice-first AI technology.",
        magic_key: "mk-resume-2024",
        user_id: ObjectId.createFromHexString("68c07ecb08cab506d34e4159"),
        cover_image_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
        uses: 2847,
        upvotes: 342,
        categories: ["AI", "Portfolio", "Web Design"],
        is_featured: true,
        nodes_count: 3,
        data_size: 4500000 // 4.5MB
      },
      {
        name: "Brand Identity Package",
        about: "Complete brand identity including logo variations, color palette, typography, and usage guidelines.",
        magic_key: "mk-brand-identity",
        user_id: ObjectId.createFromHexString("68c07ecb08cab506d34e4159"),
        cover_image_url: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
        uses: 1245,
        upvotes: 198,
        categories: ["Branding", "Design", "Identity"],
        is_featured: false,
        nodes_count: 7,
        data_size: 32000000 // 32MB
      },
      {
        name: "E-commerce Analytics Dashboard",
        about: "Real-time analytics dashboard tracking sales, inventory, and customer behavior with predictive insights.",
        magic_key: "mk-ecom-dashboard",
        user_id: ObjectId.createFromHexString("68c07ecb08cab506d34e4159"),
        cover_image_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
        uses: 1876,
        upvotes: 234,
        categories: ["Analytics", "E-commerce", "Dashboard"],
        is_featured: true,
        nodes_count: 18,
        data_size: 156000000 // 156MB
      }
    ];

    await ContextSpace.insertMany(tools);
    console.log(`🌱 Seeded ${tools.length} tools`);

    await mongoose.disconnect();
    console.log("🔌 MongoDB disconnected");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seed failed", err);
    process.exit(1);
  }
}

seed();

