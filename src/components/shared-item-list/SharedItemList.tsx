"use client";

import { Button } from "@/components/ui/button";
import { useContextKeyStore } from "@/hooks/context";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, Loader2, Quote, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { useCallback } from "react";
import { useInView } from "react-intersection-observer";
// import type { SharedItem } from "@/lib/supabase";

// export type SharedItem = {
// 	id: string;
// 	title: string;
// 	description: string | null;
// 	content_type:
// 		| "document"
// 		| "website"
// 		| "slides"
// 		| "video"
// 		| "image"
// 		| "audio"
// 		| "data";
// 	cover_image_url: string | null;
// 	preview_url: string | null;
// 	magic_key: string;
// 	author_name: string;
// 	author_avatar: string | null;
// 	views_count: number;
// 	likes_count: number;
// 	tags: string[] | null;
// 	metadata: Record<string, unknown>;
// 	is_featured: boolean;
// 	created_at: string;
// 	updated_at: string;
// 	about: string;
// };

export interface SharedItem {
	id: string;
	documents: string[];
	magic_key: string;
	user_id: string; // Reference to the User model
	about?: string; // Optional because 'required: true' is missing
	name: string;
	cover_image_url?: string;
	uses: number;
	upvotes: number;
	downvotes: number;
	nodes_count: number;
	data_size: number;
	is_featured: boolean;
	categories: string[];
	createdAt: Date; // Added by timestamps: true
	updatedAt: Date; // Added by timestamps: true
}

const PILLS = [
	"All",
	"Recommended",
	"Official",
	"Research",
	"Data",
	"Marketing",
	"Business",
	"Tech",
	"Design",
	"Finance",
];

interface SharedItemListProps {
	asFooter?: boolean;
}

function slugify(text: string): string {
	return text
		.toString()
		.toLowerCase()
		.trim()
		.replace(/[\s\W-]+/g, "-") // Replace spaces and non-word chars with -
		.replace(/^-+|-+$/g, ""); // Remove leading/trailing dashes
}

const checkIfKeyIsPresent = (key: string) => {
	const contextSpaceKeys: string[] = JSON.parse(
		sessionStorage.getItem("contextSpaceKeys") ?? "[]",
	);

	return contextSpaceKeys.includes(key);
};

const formatAbout = (about?: string, limit = 100) => {
	if (!about) {
		return "";
	}

	if (about.length > limit) {
		return about.slice(0, limit) + "...";
	}

	return about;
};

function SpaceCard({
	item,
	idx,
	copyMagicKey,
	copiedKey,
	toggleKeySelection,
	isKeySelected,
}: {
	item: SharedItem;
	idx: number;
	copiedKey: string | null;
	copyMagicKey: (key: string) => void;
	toggleKeySelection: (key: string) => void;
	isKeySelected: boolean;
}) {
	return (
		<motion.div
			key={item.magic_key}
			layout
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, scale: 0.95 }}
			transition={{ duration: 0.4, delay: (idx % 12) * 0.05 }}
			className="break-inside-avoid mb-6"
		>
			<div className="group flex flex-col space-y-3">
				<div
					className={cn(
						"relative rounded-[2rem] overflow-hidden transition-all duration-500",
						item.cover_image_url
							? "aspect-auto border border-border/50 bg-card group-hover:shadow-2xl group-hover:shadow-primary/5"
							: "aspect-[4/3] bg-foreground/[0.03] flex flex-col p-8",
					)}
				>
					{item.cover_image_url ? (
						<div className="relative w-full">
							<Image
								src={item.cover_image_url}
								alt={item?.about || ""}
								width={800}
								height={600}
								className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
							/>
						</div>
					) : (
						<>
							<Quote className="h-8 w-8 text-foreground/10 mb-4" />
							<p className="text-lg md:text-xl font-medium text-foreground/80 leading-relaxed">
								{item?.about}
							</p>
						</>
					)}

					{/* Magic Key Overlay */}
					<div className="absolute inset-0 bg-background/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-6 text-center space-y-4">
						{/* <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
							<Key className="h-6 w-6 text-primary" />
						</div>
						<div className="space-y-1">
							<p className="text-xs font-bold uppercase tracking-widest text-foreground/40">
								Magic Key
							</p>
							<p className="text-md font-mono font-bold text-foreground">
								{item.magic_key.length > 30
									? item.magic_key.slice(0, 21) +
										"..." +
										item.magic_key.slice(item.magic_key.length - 4)
									: item.magic_key}
							</p>
						</div> */}
						<div className="text-sm text-ellipsis max-w-full min-w-sm">
							{item.about}
						</div>
						<div className="flex flex-row text-sm gap-2">
							<Button
								variant="orange"
								size="sm"
								onClick={(e) => {
									e.stopPropagation();
									toggleKeySelection(item.magic_key);
								}}
								className="rounded-full cursor-pointer"
							>
								{isKeySelected ? "Remove from chat" : "Use in chat"}
							</Button>
							<Button
								size="sm"
								onClick={(e) => {
									e.stopPropagation();
									copyMagicKey(item.magic_key);
								}}
								variant="link"
								className="rounded-full cursor-pointer"
							>
								{copiedKey === item.magic_key ? (
									<>
										<Check className="h-4 w-4 mr-2" /> Copied
									</>
								) : (
									"Copy Key"
								)}
							</Button>
						</div>
					</div>
				</div>

				<div className="px-2 space-y-1">
					<Link
						href={`https://platform.getalchemystai.com/context/share/${item.magic_key}`}
						target="_blank"
						// ref="noopener noreferrer"
					>
						<h3 className="font-semibold text-foreground/90 group-hover:text-primary transition-colors hover:text-accent-foreground">
							{item.name}
						</h3>
					</Link>
					<div className="flex items-center gap-2 text-sm text-foreground/40 font-medium">
						<span>
							{item.name
								?.split(" ")
								.map((n) => n[0])
								.join(". ") + "."}
						</span>
						{item.is_featured && (
							<>
								<span className="w-1 h-1 rounded-full bg-foreground/20" />
								<Sparkles className="h-3 w-3 text-primary" />
							</>
						)}
					</div>
				</div>
			</div>
		</motion.div>
	);
}

export function SharedItemList({ asFooter }: SharedItemListProps) {
	const [items, setItems] = React.useState<SharedItem[]>([]);
	const [loading, setLoading] = React.useState(true);
	const [loadingMore, setLoadingMore] = React.useState(false);
	const [activeTab, setActiveTab] = React.useState("Featured");
	const [copiedKey, setCopiedKey] = React.useState<string | null>(null);
	const [hasMore, setHasMore] = React.useState(true);
	const [offset, setOffset] = React.useState(0);
	// const [selectedKeys, setSelectedKeys] = React.useState<string[]>([]);
	const selectedKeys = useContextKeyStore((store) => store.selectedKeys);
	const setStoreState = useContextKeyStore((store) => store.setState);

	const setSelectedKeys = useCallback(
		(keys: string[]) => {
			setStoreState({ selectedKeys: keys });
		},
		[setStoreState],
	);

	const ITEMS_PER_PAGE = asFooter ? 6 : 12;

	// Initialize selectedKeys from sessionStorage on mount
	React.useEffect(() => {
		console.log("Getting stored keys..");
		let stored: string[] = [];
		try {
			const raw = sessionStorage.getItem("contextSpaceKeys");
			if (raw) {
				stored = JSON.parse(raw);
			}
		} catch (e) {
			console.warn("Failed to parse contextSpaceKeys from sessionStorage:", e);
			stored = [];
		}
		console.log(`Found ${stored.length} selected keys. Setting them up.`);
		setSelectedKeys(stored);
	}, []);

	const { ref, inView } = useInView({
		threshold: 0,
		skip: loading || !hasMore || loadingMore,
	});

	const fetchItems = React.useCallback(
		async (currentOffset: number, isInitial: boolean = false) => {
			if (isInitial) setLoading(true);
			else setLoadingMore(true);

			try {
				const params = new URLSearchParams({
					limit: ITEMS_PER_PAGE.toString(),
					offset: currentOffset.toString(),
				});

				params.set("type", slugify(activeTab));

				const res = await fetch(`/api/tools?${params}`);
				const data = await res.json();
				console.log("templates fetched : ", data);

				if (Array.isArray(data)) {
					if (isInitial) {
						setItems(data);
					} else {
						setItems((prev) => [...prev, ...data]);
					}
					setHasMore(data.length === ITEMS_PER_PAGE);
				}
			} catch (error) {
				console.error("Error fetching items:", error);
			} finally {
				setLoading(false);
				setLoadingMore(false);
			}
		},
		[activeTab, ITEMS_PER_PAGE],
	);

	const toggleKeySelection = React.useCallback(
		(key: string) => {
			console.log("Selected keys here = ", selectedKeys);
			if (selectedKeys.includes(key)) {
				console.log("Removing selected key...");
			} else {
				console.log("Adding new Key to selected keys...");
			}
			const newKeys = selectedKeys.includes(key)
				? selectedKeys.filter((k) => k !== key)
				: [...selectedKeys, key];

			console.log("Setting new keys = ", newKeys);
			setSelectedKeys(newKeys);
			sessionStorage.setItem("contextSpaceKeys", JSON.stringify(newKeys));
			return newKeys;
		},
		[selectedKeys, setSelectedKeys],
	);

	const checkIfKeyIsPresent = React.useCallback(
		(key: string) => {
			// console.log("Received key = ", key);
			// console.warn("Selected Keys = ", selectedKeys);
			return selectedKeys.includes(key);
		},
		[selectedKeys],
	);

	const copyMagicKey = (key: string) => {
		navigator.clipboard.writeText(key);
		setCopiedKey(key);
		setTimeout(() => setCopiedKey(null), 2000);
	};
	React.useEffect(() => {
		setOffset(0);
		fetchItems(0, true);
		console.log("Items recived from tools : ", items);
	}, [activeTab, fetchItems]);

	React.useEffect(() => {
		if (!asFooter && inView && hasMore && !loadingMore) {
			const nextOffset = offset + ITEMS_PER_PAGE;
			setOffset(nextOffset);
			fetchItems(nextOffset);
		}
	}, [inView, hasMore, loadingMore, offset, fetchItems, ITEMS_PER_PAGE]);

	return (
		<div className="space-y-12">
			<div className="text-center space-y-4 ">
				{asFooter && (
					<div className="w-full lg:min-w-[70vw] text-center space-y-3 my-6">
						<h2 className="text-xl md:text-3xl font-semibold tracking-tight text-foreground">
							Community Contexts
						</h2>
						<h3 className="text-muted-foreground">
							Select any number of context spaces from here, and start chatting
							with data in them.
						</h3>
					</div>
				)}
				<div className="flex flex-wrap justify-center gap-2 max-w-6xl mx-auto">
					{PILLS.map((pill) => (
						<Button
							variant={activeTab === pill ? "default" : "outline"}
							key={pill}
							onClick={() => setActiveTab(pill)}
							className={
								"px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 border cursor-pointer"
							}
						>
							{pill}
						</Button>
					))}
				</div>
			</div>

			{loading && items.length === 0 ? (
				<div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
					{[...Array(6)].map((_, i) => (
						<div
							key={i}
							className="break-inside-avoid h-80 rounded-3xl bg-foreground/5 animate-pulse"
						/>
					))}
				</div>
			) : (
				<div className="mx-auto max-w-6xl">
					{items.length === 0 && (
						<div className="w-full text-center text-foreground">
							Well, that's embarassing, we don't have any context space for
							this. Why don't you create one?
						</div>
					)}
					{items.length > 0 && (
						<div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 ">
							<AnimatePresence mode="popLayout">
								{items.map((item, idx) => (
									<SpaceCard
										item={item}
										idx={idx}
										key={`space-card-${idx + 1}`}
										copyMagicKey={copyMagicKey}
										copiedKey={copiedKey}
										toggleKeySelection={toggleKeySelection}
										isKeySelected={checkIfKeyIsPresent(item.magic_key)}
									/>
								))}
							</AnimatePresence>
						</div>
					)}
				</div>
			)}
			<p className="text-xs text-foreground/30 max-w-3xl mx-auto leading-relaxed">
				All tasks and intelligence in the community are voluntarily shared by
				users. The platform does not display any content without user consent.
			</p>

			{asFooter && (
				<div className="flex justify-center mt-8">
					<Link href="/spaces" target="_blank">
						<Button
							size="lg"
							variant="ghost"
							className="rounded-full px-8 cursor-pointer space-x-1 text-muted-foreground"
						>
							<span>View More Templates</span>
							<ArrowUpRight size="20" />
						</Button>
					</Link>
				</div>
			)}

			{hasMore && (
				<div ref={ref} className="flex justify-center py-12">
					{loadingMore && (
						<div className="flex items-center gap-2 text-foreground/50">
							<Loader2 className="h-5 w-5 animate-spin" />
							<span className="text-sm font-medium">
								Loading context spaces...
							</span>
						</div>
					)}
				</div>
			)}
		</div>
	);
}
