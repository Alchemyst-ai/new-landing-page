export type McpEnvironmentTypes = "claude" | "cursor" | "vscode" | "others";
export type McpModeTypes = "npx" | "docker" | "default";

export const mcpEnvironmentLabels: Record<McpEnvironmentTypes, string> = {
	claude: "Claude Desktop",
	cursor: "Cursor IDE",
	vscode: "Visual Studio Code",
	others: "Others",
};

export const mcpInstructions: Record<
	McpEnvironmentTypes,
	Record<string, string | null>
> = {
	claude: {
		docker:
			"Navigate to Hamburger Menu on top left corner > File > Settings.\n\nA new popup will come up. Choose **Developer**, click the **Edit Config**.\n\nIt will take you to a file called `claude_desktop_config.json`.\n\nIn that file, put the following configuration:\n\n```json\n" +
			// DO NOT REMOVE THE NEWLINE AFTER `.
			`"mcpServers": {
    "alchemyst_context_processor_mcp": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "supercorp/supergateway",
        "--sse",
        "https://mcp.getalchemystai.com/mcp/sse",
        "--oauth2Bearer",
        "YOUR_ALCHEMYST_PLATFORM_API_KEY"
      ]
    }
  }` +
			"\`\`\`\n\nRestart Claude Desktop\n\n**Note that these instructions are valid for all desktop applications that use the STDIO MCP mode.**",

		npx:
			"Navigate to Hamburger Menu on top left corner > File > Settings.\n\nA new popup will come up. Choose **Developer**, click the **Edit Config**.\n\nIt will take you to a file called `claude_desktop_config.json`.\n\nIn that file, put the following configuration:\n\n```json\n" +
			`"mcpServers": {
    "alchemyst_context_processor_mcp": {
      "command": "npx",
      "args": [
        "-y",
        "supergateway",
        "--sse",
        "https://mcp.getalchemystai.com/mcp/sse",
        "--oauth2Bearer",
        "YOUR_ALCHEMYST_PLATFORM_API_KEY"
      ]
    }
  }` +
			"\`\`\`\n\n**Note that these instructions are valid for all desktop applications that use the STDIO MCP mode.**",
	},
	vscode: {
		"settings.json":
			"1. Ensure that you have VSCode v101 or above. \n\n2. Press Ctrl (or Cmd) + Shift + P. \n\n2. Go to **User Settings JSON**, then add the following section:\n\n```json\n" +
			`"mcp": {
    "servers": {
      "alchemyst-context-mcp": {
        "url": "https://mcp.getalchemystai.com/mcp/sse",
        "headers": {
          "Authorization": "Bearer YOUR_ALCHEMYST_API_KEY"
        }
      }
    }
  }
        ` +
			"```\n\n3. You will see a faint Start button popping right up on top of the snippet you pasted from above. Your MCP will be ready to use!",
		"interactive setup":
			"1. Ensure that you have VSCode v101 or above.\n\n2. Press Ctrl (or Cmd) + Shift + P.\n\n3. Type MCP\n\n3. You will see an option called `MCP: Add Server...` . Select that.\n\n4. You will see multiple options for MCP transport, select 'HTTP (HTTP or Server-sent events)'. Select that.\n\n5. Enter the URL: `https://mcp.getalchemystai.com/mcp/sse`\n\n6. Select a server ID. This is going to be your server name.\n\n7. You will be asked if the settings is to be saved for your User-level `settings.json` or Workspace.\n\n8. You will then be redirected to the respective `settings.json` file.\n\n9. Then edit the headers inside the MCP server object in `settings.json` with\n\n```json\n" +
			`"headers": {
  "Authorization": "Bearer YOUR_ALCHEMYST_API_KEY"
}
        ` +
			"```\n\nYou will see a faint Start button popping right up on top of the MCP object in your present `settings.json` file. Your MCP will be ready to use!",
	},
	cursor: {
		"mcps.json":
			"1. In the editor, invoke the Command Palette (⌘K) and select **Settings > Cursor Settings**.\n\n2. In the Settings sidebar, go to **Features** → **Model Context Protocol** and toggle **MCP Servers** on (green).\n\n3. Under **Model Context Protocol**, click **Browse MCP Tools**.\n\n4. Locate an “SSE Server” entry (or similar), then click **Add to Cursor**\n\n5. When prompted, supply your authorization details in the OAuth/auth flow. Cursor will install and configure the SSE endpoint automatically.\n\n6. Click **+ Add New MCP Server**. In the dialog:, set **Name**: e.g. `My-SSE-Feed`, **Type**: **http** , **Command**: leave blank (Cursor will call the HTTP endpoint directly)",
	},
	others: { default: "Coming soon" },
};
