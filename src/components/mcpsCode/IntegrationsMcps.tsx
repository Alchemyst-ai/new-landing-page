import { Button } from "../ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import {
	McpEnvironmentTypes,
	mcpEnvironmentLabels,
	mcpInstructions,
} from "./getMcpInstructions";

function IntegrationsMcps() {
	const [environment, setEnvironment] = useState<McpEnvironmentTypes>("claude");
	const [mode, setMode] = useState<string>("docker");

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
			<div className="prose dark:prose-invert max-w-none">
				<pre className="whitespace-pre-wrap">
					{mcpInstructions[environment][mode] || ""}
				</pre>
			</div>
		</div>
	);
}

export default IntegrationsMcps;
