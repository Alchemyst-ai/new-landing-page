import { Button } from "../ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import {
	McpEnvironmentTypes,
	mcpEnvironmentLabels,
	mcpInstructions,
} from "./getMcpInstructions";
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeStringify from 'rehype-stringify';

function IntegrationsMcps() {
	const [environment, setEnvironment] = useState<McpEnvironmentTypes>("claude");
	const [mode, setMode] = useState<string>("docker");
	const [renderedContent, setRenderedContent] = useState<string>("");

	const renderMarkdown = async (content: string) => {
		const result = await unified()
			.use(remarkParse)
			.use(remarkGfm)
			.use(remarkRehype)
			.use(rehypePrettyCode, {
				theme: {
					light: "min-light",
					dark: "min-dark",
				},
				keepBackground: false,
			})
			.use(rehypeStringify)
			.process(content);

		return result.toString();
	};

	useEffect(() => {
		const updateContent = async () => {
			const content = mcpInstructions[environment][mode] || "";
			const rendered = await renderMarkdown(content);
			setRenderedContent(rendered);
		};
		updateContent();
	}, [environment, mode]);

	return (
		<div className="flex flex-col gap-4">
			<h2 className="text-2xl font-bold">MCPs</h2>
			<p>Integrate our context processor MCP on the fly!</p>
			<div className="flex flex-row gap-2 items-center">
				<p>Run the MCP in </p>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant="light"
							disabled={!mcpInstructions[environment]}
						>
							{mcpEnvironmentLabels[environment]}
							<ChevronDown className="ml-2 h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						{Object.keys(mcpInstructions).map((environment, idx) => {
							return (
								<DropdownMenuItem
									key={`environment-${environment}`}
									onSelect={() => {
										setEnvironment(environment as McpEnvironmentTypes);
										// Now change the mode to the default place
										const mode = Object.keys(
											mcpInstructions[environment as McpEnvironmentTypes],
										).shift();
										setMode(mode!);
									}}
									disabled={
										!mcpInstructions[environment as McpEnvironmentTypes]
									}
								>
									{mcpEnvironmentLabels[environment as McpEnvironmentTypes]}
								</DropdownMenuItem>
							);
						})}
					</DropdownMenuContent>
				</DropdownMenu>
				<p>using</p>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="light">
							{mode.charAt(0).toUpperCase() + mode.slice(1)}
							<ChevronDown className="ml-2 h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						{Object.keys(mcpInstructions[environment]).map((mode) => {
							return (
								<DropdownMenuItem
									key={`mcp-choice-${environment}-${mode}`}
									onSelect={() => setMode(mode)}
									disabled={!mcpInstructions[environment][mode]}
								>
									{mode.charAt(0).toUpperCase() + mode.slice(1)}
								</DropdownMenuItem>
							);
						})}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			<div className="my-5" />
			<div 
				className="prose dark:prose-invert max-w-none [&_pre]:!bg-[#1E1E1E] [&_pre]:p-4 [&_pre]:rounded-lg [&_code]:text-sm"
				dangerouslySetInnerHTML={{ __html: renderedContent }}
			/>
		</div>
	);
}

export default IntegrationsMcps;
