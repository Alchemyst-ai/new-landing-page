"use client";

import { X } from "lucide-react";
import { KeyboardEvent, useState } from "react";
// import ContextPage from "../Context/ContextUpload"
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

interface ContextBarProps {
	isOpen: boolean;
	magicKey: string[];
	toggleMagicKey: (value: string) => void;
	onFilesUpload: (files: FileList) => void;
	uploadedFiles: string[];
	onImagesUpload: (images: { name: string; url: string }[]) => void;
	uploadedImages: { name: string; url: string }[];
	onRemoveFile: (index: number) => void;
	onRemoveImage: (index: number) => void;
}

export function ContextBar({
	isOpen,
	magicKey,
	toggleMagicKey,
	onImagesUpload,
	uploadedImages,
	onRemoveImage,
}: ContextBarProps) {
	const [dragActive, setDragActive] = useState<"file" | "image" | null>(null);
	const [inputValue, setInputValue] = useState("");

	console.log("Magic keys = ", magicKey);

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" || e.key === ",") {
			e.preventDefault();
			const trimmedValue = inputValue.trim().replace(/,$/, "");

			if (trimmedValue && !magicKey.includes(trimmedValue)) {
				toggleMagicKey(trimmedValue);
				setInputValue("");
			}
		} else if (e.key === "Backspace" && !inputValue && magicKey.length > 0) {
			toggleMagicKey(magicKey[magicKey.length - 1]);
		}
	};

	const removeKey = (keyToRemove: string) => {
		toggleMagicKey(keyToRemove);
	};

	if (!isOpen) return null;

	return (
		<div className="backdrop-blur-md w-full">
			<div className="mx-auto max-w-3xl px-1 py-0">
				{/* Magic Key Section */}
				<div className="flex justify-center">
					<div className="space-y-2 w-full">
						{/* <Label
							htmlFor="magic-key"
							className="flex items-center max-w-2xl w-80 gap-2 text-xs font-medium text-muted-foreground"
						>
							<Key className="h-3.5 w-3.5" />
							Context Keys
						</Label> */}

						<div className="flex relative min-h-xs flex-col gap-2 rounded-md border-1 border-input border-border/50 bg-muted/30 hover:border-primary/40 p-2">
							<Badge
								className="absolute right-1 bottom-1 md:text-[10px] text-[5px] rounded-full"
								variant="outline"
							>
								{magicKey.length}
							</Badge>
							<div className="flex flex-wrap gap-1.5">
								{magicKey.map((key, idx) => (
									<Badge
										key={key}
										variant="secondary"
										className="flex items-center gap-1 py-0.5 pl-2 pr-1 md:text-[10px] text-[5px]"
									>
										{key.length > 30
											? key.slice(0, 21) + "..." + key.slice(key.length - 4)
											: key}
										<Button
											size="xs"
											variant="ghost"
											onClick={() => removeKey(key)}
											className="rounded-full px-[0.5] outline-none hover:bg-card cursor-pointer"
										>
											<X className="h-2 w-4" />
										</Button>
									</Badge>
								))}

								<input
									id={`magic-key-element`}
									type="text"
									placeholder={
										magicKey.length === 0
											? "Enter context keys from spaces"
											: ""
									}
									value={inputValue}
									onChange={(e) => setInputValue(e.target.value)}
									onKeyDown={handleKeyDown}
									className="flex-1 bg-transparent spx-1 md:text-[10px] text-[5px] outline-none placeholder:text-muted-foreground/40 min-w-[80px] w-full"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
